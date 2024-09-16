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

        # Generate monthly entries between the two snap dates
        current_date = current_row['snap_dt']
        last_date = next_row['snap_dt'] if next_row is not None else datetime.now()

        # Iterate over the months between current_date and last_date
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

# Save the result to a new CSV
output_df.to_csv('expanded_client_data.csv', index=False)

print(output_df)
