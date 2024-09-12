import pandas as pd
from datetime import datetime

# Read CSV file
df = pd.read_csv('client_data.csv')

# Convert snap_dt to datetime
df['snap_dt'] = pd.to_datetime(df['snap_dt'], format='%m/%d/%Y')

# Sort data by clnt_no and snap_dt (Descending order for dates)
df = df.sort_values(['clnt_no', 'snap_dt'], ascending=[True, False])

# Get the current date
current_date = datetime.now()

# Create an empty DataFrame to hold the expanded data
expanded_df = pd.DataFrame()

# Loop through each client
for clnt_no in df['clnt_no'].unique():
    # Get client-specific data
    client_data = df[df['clnt_no'] == clnt_no].reset_index(drop=True)

    # Get all assessment dates
    snap_dates = client_data['snap_dt'].tolist()

    # Initialize the first (most recent) assessment
    previous_date = snap_dates[0]

    # Fill months between the latest assessment and the current month, in reverse (from current month back to most recent assessment)
    months_diff = (current_date.year - previous_date.year) * 12 + (current_date.month - previous_date.month)
    
    for i in range(months_diff, 0, -1):
        new_date = previous_date + pd.DateOffset(months=i)
        new_row = client_data.iloc[0].copy()  # Copy the most recent data
        new_row['snap_dt'] = new_date
        new_row['month_year'] = new_date.strftime('%B %Y')  # Store month and year

        # Append new row to expanded_df
        expanded_df = pd.concat([expanded_df, new_row.to_frame().T], ignore_index=True)

    # Now handle the previous assessments in descending order
    for current_date in snap_dates[1:]:
        # Get the range of months between assessments
        month_diff = (previous_date.year - current_date.year) * 12 + (previous_date.month - current_date.month)

        # Create rows for missing months between assessments, filling from latest to earliest
        for i in range(month_diff - 1, 0, -1):
            new_date = current_date + pd.DateOffset(months=i)
            new_row = client_data.iloc[0].copy()  # Copy the most recent data
            new_row['snap_dt'] = new_date
            new_row['month_year'] = new_date.strftime('%B %Y')  # Store month and year

            # Append new row to expanded_df
            expanded_df = pd.concat([expanded_df, new_row.to_frame().T], ignore_index=True)

        # Move to the next (earlier) assessment date
        previous_date = current_date

# Save expanded DataFrame to CSV
expanded_df.to_csv('expanded_client_data.csv', index=False)

