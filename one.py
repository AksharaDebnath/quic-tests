import pandas as pd
from datetime import datetime, timedelta

# Load the Excel file
file_path = 'your_file.xlsx'  # Replace with your actual file path
df = pd.read_excel(file_path)

# Ensure the snap_dt is in datetime format
df['snap_dt'] = pd.to_datetime(df['snap_dt'])

# Sort by client number and snap date
df = df.sort_values(by=['clnt_no', 'snap_dt'])

# Create an empty DataFrame to store the expanded rows
expanded_df = pd.DataFrame()

# Process each client
for clnt_no, group in df.groupby('clnt_no'):
    group = group.sort_values(by='snap_dt')
    for i in range(len(group) - 1):
        current_row = group.iloc[i]
        next_row = group.iloc[i + 1]
        
        current_date = current_row['snap_dt']
        next_date = next_row['snap_dt']
        
        # Append the current row
        expanded_df = pd.concat([expanded_df, current_row.to_frame().T], ignore_index=True)
        
        # Generate the missing months
        while current_date < next_date - timedelta(days=1):
            current_date += pd.DateOffset(months=1)
            new_row = current_row.copy()
            new_row['snap_dt'] = current_date
            new_row['month_year'] = current_date.strftime('%B %Y')  # Add the new column
            expanded_df = pd.concat([expanded_df, new_row.to_frame().T], ignore_index=True)
    
    # Append the last row of the group
    expanded_df = pd.concat([expanded_df, next_row.to_frame().T], ignore_index=True)

# Save the expanded DataFrame to a new Excel file
expanded_df.to_excel('expanded_data.xlsx', index=False)
