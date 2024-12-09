import pandas as pd
from pandas.tseries.offsets import DateOffset
from datetime import datetime

# Example dataset for testing
data = {
    'clnt_no': ['client1', 'client1', 'client1', 'client1'],
    'snap_dt': ['2023-01-15', '2023-03-20', '2023-03-20', '2023-04-10'],  # Duplicate snap_dt
    'other_column1': [10, 20, 25, 30],  # Example additional column
    'other_column2': ['A', 'B', 'C', 'D']  # Example additional column
}

df_example = pd.DataFrame(data)

# Ensure the snap_dt is in datetime format
df_example['snap_dt'] = pd.to_datetime(df_example['snap_dt'])

# Normalize snap_dt to the first of the month
df_example['snap_dt_normalized'] = df_example['snap_dt'].dt.to_period('M').dt.to_timestamp()

# Initialize an empty DataFrame to store the results
final_df = pd.DataFrame()

# Process each client
client_ids = df_example['clnt_no'].unique()
current_date = pd.to_datetime(datetime.now().date()).to_period('M').to_timestamp()  # Normalize to first of the current month

for client_id in client_ids:
    # Filter data for the specific client and sort by snap_dt_normalized
    df_client = df_example[df_example['clnt_no'] == client_id].sort_values(by='snap_dt_normalized', ascending=False)
    
    # Start from the latest normalized date and expand backwards
    latest_date = current_date
    earliest_date = df_client['snap_dt_normalized'].min()
    current_date_iter = latest_date
    
    expanded_data = []
    while current_date_iter >= earliest_date:
        # Find rows with snap_dt_normalized less than or equal to the current month
        valid_rows = df_client[df_client['snap_dt_normalized'] <= current_date_iter]
        
        # Append all rows with the same snap_dt_normalized
        for _, row in valid_rows.iterrows():
            new_row = row.to_dict()
            new_row['month_year'] = current_date_iter.strftime('%B %Y')  # Add the month_year column
            expanded_data.append(new_row)
        
        # Move to the previous month
        current_date_iter -= DateOffset(months=1)
    
    # Convert expanded data to a DataFrame and append to final_df
    final_df = pd.concat([final_df, pd.DataFrame(expanded_data)], ignore_index=True)

# Display the final DataFrame
print(final_df)
