import pandas as pd
from datetime import datetime

# Load the CSV into a DataFrame
df = pd.read_csv('client_data.csv')

# Function to generate monthly data between two dates
def generate_monthly_data(client_data):
    snap_dates = pd.to_datetime(client_data['snap_dt'])
    client_data['snap_dt'] = snap_dates
    
    # Initialize a list to store the result rows
    result_rows = []
    
    for i in range(len(client_data)-1, -1, -1):
        current_row = client_data.iloc[i]
        next_row = client_data.iloc[i-1] if i > 0 else None

        # Generate monthly entries between the current snap date and next one (or now if most recent)
        current_date = current_row['snap_dt']
        last_date = next_row['snap_dt'] if next_row is not None else pd.Timestamp(datetime.now().strftime('%Y-%m-01'))

        # Iterate over the months between current_date and last_date (inclusive of current and future months)
        while current_date <= last_date:
            month_name = current_date.strftime('%B %Y')
            row_data = current_row.copy()  # Copy the current row
            
            # Add the 'repeat' column for month name
            row_data['repeat'] = month_name

            # Append the updated row data
            result_rows.append(row_data)

            # Move to the next month
            current_date += pd.DateOffset(months=1)
    
    return result_rows

# Apply the function for each client
results = []
for clnt_no, group in df.groupby('clnt_no'):
    results.extend(generate_monthly_data(group))

# Create a new DataFrame from the results
output_df = pd.DataFrame(results)

# Reorder the columns: bring the 'repeat' column to the front
columns = ['repeat'] + [col for col in output_df.columns if col != 'repeat']
output_df = output_df[columns]

# Sort by the 'repeat' column in descending order (latest to oldest)
output_df['repeat_dt'] = pd.to_datetime(output_df['repeat'], format='%B %Y')
output_df = output_df.sort_values(['clnt_no', 'repeat_dt'], ascending=[True, False]).drop(columns=['repeat_dt'])

# Save the result to a new CSV
output_df.to_csv('expanded_client_data.csv', index=False)

print(output_df)
