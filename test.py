from ucimlrepo import fetch_ucirepo 
import pandas as pd
  
# fetch dataset 
file_path = './Downloads/data.csv'
df = pd.read_csv(file_path)
df.head()
  
instance = [84667401, 'M', 13.73, 22.61, 93.6, 578.3, 0.1131, 0.2293, 0.2128, 0.08025, 0.2069, 0.07682, 0.2121, 1.169, 2.061, 19.21, 0.006429, 0.05936, 0.05501, 0.01628, 0.01961, 0.008093, 15.03, 32.01, 108.8, 697.7, 0.1651, 0.7725, 0.6943, 0.2208, 0.3596, 0.1431]
attributes = ['diagnosis', 'area_mean', 'symmetry_worst']

# Convert instance to dictionary
instance_dict = {
    attributes[0] : instance[1],
    attributes[1] : instance[5],
    attributes[2] : instance[29]
}

# Filter dataset based on attributes in instance
filtered_df = df[
    (df[attributes[0]] == instance_dict[attributes[0]]) & 
    (df[attributes[1]] == instance_dict[attributes[0]]) 
]

print(filtered_df)
