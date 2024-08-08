# Financial Benchmarking Tool

This Financial Benchmarking Tool allows you to compare various financial ratios across different industries, helping you assess the performance of a client against their peers. The tool provides flexibility through various filters to tailor the peer group comparison.

## Features

1. **Industry-Specific Ratios**: Display different financial ratios specific to the client's industry.
2. **Highlighted Metrics**: Emphasize key metrics for easy analysis.
3. **Customizable Filters**: Select different filters to create a peer group versus client comparison view.

### Features Overview

#### 1. Industry-Specific Ratios

The tool automatically selects and displays financial ratios that are relevant to the client's industry, providing a more meaningful comparison.

#### 2. Highlighted Metrics

Key metrics are highlighted to draw attention to critical areas of performance, making it easier to identify strengths and weaknesses.

#### 3. Customizable Filters

Use the filter options to refine the peer group comparison. Filters can include:
- **Industry**: Choose the industry for peer comparison.
- **Region**: Select a geographical region for a more localized comparison.
- **Size**: Filter based on company size (e.g., revenue, number of employees).
- **Time Period**: Compare data from specific time periods.

### Comparison View

Once the filters are applied, the tool creates a comparison view displaying:
- **Client's financial ratios**: Presented alongside the average ratios of the selected peer group.
- **Visual indicators**: Graphs and charts to illustrate the differences and trends.


### Data Fetching and Rendering Process

The comparison and visualization process works by pulling data from the database using custom queries that are dynamically generated based on the filters selected by the user.

1. **Filters Array**: The frontend sends a `filters` array to the backend.
2. **Query Generation**: The backend uses these filters to generate three custom queries, pulling the necessary data from the database.
3. **Data Processing**: Once the data is fetched, it is sent back to the frontend.
4. **Frontend Calculation and Rendering**:
    - The frontend calculates and applies the appropriate design based on the data received.
    - Specific ratio components are rendered depending on the industry.
    - Graphs are rendered using the Victory library.
5. **Dynamic Updates**: When filters are changed, the components are re-rendered, and new data is fetched and displayed.

### Comparison View

Once the filters are applied, the tool creates a comparison view displaying:
- **Client's financial ratios**: Presented alongside the average ratios of the selected peer group.
- **Visual indicators**: Graphs and charts to illustrate the differences and trends.



Data Fetching and Rendering Process
This section outlines how the tool dynamically generates and processes data to create a tailored comparison view. The process starts with the frontend sending a filters array to the backend, which then constructs three custom queries to pull the necessary data from the database. Once the data is retrieved, the frontend takes over, calculating and applying the appropriate design elements. Industry-specific ratio components are rendered, and graphs are created using the Victory library. The entire system is dynamic—whenever filters are adjusted, the components are automatically re-rendered, ensuring that the comparison view is always up-to-date with the latest data.
