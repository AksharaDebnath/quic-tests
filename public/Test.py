# Check for dates that are NaT after parsing
problematic_dates = df[df['snap_dt'].isna()]['original_snap_dt']
print(problematic_dates)

import pandas as pd
import numpy as np

# Load the data from CSV into a DataFrame
file_path = 'your_file_path.csv'  # Replace with the actual file path
df = pd.read_csv(file_path)

# Keep a copy of original dates for debugging
df['original_snap_dt'] = df['snap_dt']

# Custom date parsing function
def parse_dates(date_str):
    for fmt in ('%Y-%m-%d', '%m/%d/%Y', '%d/%m/%Y', '%d-%m-%Y'):
        try:
            return pd.to_datetime(date_str, format=fmt)
        except ValueError:
            continue
    return pd.NaT  # Return NaT if no format matches

# Apply the custom parsing function
df['snap_dt'] = df['snap_dt'].apply(parse_dates)

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
    
    # Reorder the columns to bring month_name to the left
    cols = ['month_name'] + [col for col in merged_df.columns if col != 'month_name']
    merged_df = merged_df[cols]
    
    return merged_df

# Apply the function to each client group (assuming 'client_id' is the client identifier column)
result_df = df.groupby('client_id').apply(fill_missing_months).reset_index(drop=True)

# Display the final DataFrame
print(result_df)


