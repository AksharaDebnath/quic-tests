import pandas as pd
import numpy as np

# Sample DataFrame for reference
data = {
    'client_id': [1, 1, 2, 2],
    'snap_dt': ['2023-01-01', '2024-05-01', '2023-03-01', '2024-04-01'],
    'other_data': ['A', 'B', 'C', 'D']  # Additional data related to clients
}

# Load data into DataFrame
df = pd.DataFrame(data)

# Convert snap_dt column to datetime
df['snap_dt'] = pd.to_datetime(df['snap_dt'])

# Function to fill missing months
def fill_missing_months(group):
    # Create a date range from the min to the max snap_dt
    all_months = pd.date_range(start=group['snap_dt'].min(), 
                               end=group['snap_dt'].max(), 
                               freq='MS')  # 'MS' is month start frequency
    
    # Create a DataFrame with all months in between
    all_months_df = pd.DataFrame(all_months, columns=['fill_month'])
    
    # Merge with the original group to fill in missing months
    merged_df = pd.merge(all_months_df, group, how='left', left_on='fill_month', right_on='snap_dt')
    
    # Forward fill the missing data for months that were not asked
    merged_df.fillna(method='ffill', inplace=True)
    
    # Add the month name and year to a new column
    merged_df['month_name'] = merged_df['fill_month'].dt.strftime('%B %Y')
    
    # Drop the fill_month column to keep only the original snap_dt
    merged_df.drop(columns=['fill_month'], inplace=True)
    
    return merged_df

# Apply the function to each client group
result_df = df.groupby('client_id').apply(fill_missing_months).reset_index(drop=True)

# Display the final DataFrame
print(result_df)
