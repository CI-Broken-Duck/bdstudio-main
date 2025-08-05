---
title: "Completion Rate Charts"
code: "CRC"
category: "Performance"
subcategory: "Standard"
summary: "Visualize course or module completion percentages by user or group."
price: "$500"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/tools/vscode.png
  - /assets/modules/databases/postgresql.png
  - /assets/modules/language/react.png
---

# Completion Rate Charts Module Overview

## Purpose
The Completion Rate Charts module is designed to provide a visual representation of course or module completion percentages for users or groups. This module helps track learner progress, enabling insights into how effectively courses are being completed.

## Benefits
- **Track Progress**: Monitor individual and group completion rates in real-time.
- **Identify Trends**: Analyze trends over time to understand engagement levels.
- **Assess Effectiveness**: Evaluate the effectiveness of different course modules.
- **Data-Driven Decisions**: Use insights to enhance learning strategies and user experience.

## Usage Scenarios
- **Monitor Learner Progress**: Track individual or group completion rates for targeted interventions.
- **Analyze Trends Over Time**: Compare completion rates across different periods or cohorts.
- **Compare Groups**: Identify disparities in completion rates between various groups, such as different departments or regions.
- **Optimize Learning Paths**: Use data to refine course content and delivery methods.

## Integrating with Other Modules
The Completion Rate Charts module integrates seamlessly with other modules like User Management, Course Modules, and Reporting Tools. This integration allows for a comprehensive view of learner interactions and outcomes across the platform.

## Feature 1: User-Level Completion Tracking
This feature allows the tracking of individual user completion rates for courses or modules. Developers can view whether specific users have completed certain sections and monitor their progress over time.

## Feature 2: Group Completion Analysis
The module enables the analysis of completion rates across different user groups, such as cohorts or departments. This helps identify trends or performance gaps within specific segments.

## Feature 3: Custom Date Range Filters
Users can filter completion data by custom date ranges to focus on specific periods, like monthly summaries or peak usage times, aiding in trend identification and targeted analysis.

## Feature 4: Interactive Visualizations
The charts are interactive, allowing zooming and hovering over data points for detailed insights. This feature enhances the user experience by providing instant access to granular information without additional tools.

## Feature 5: Export Options
Data and visualizations can be exported in formats like CSV or PDF, facilitating easy sharing and integration into reports or presentations for stakeholders.

## Feature 6: Comparison Capabilities
The module supports comparisons of completion rates across different groups or modules, helping developers identify performance variations and areas needing improvement.

## Feature 7: Integration with Course Modules
Completion rate charts are seamlessly integrated with course structures, allowing comprehensive tracking of how each module's completion impacts overall user progress through the course.

## Feature 8: Real-Time Data Updates
The module provides real-time data updates, ensuring developers have access to the latest metrics without manual refreshes, crucial for timely monitoring and response.

Here's a detailed documentation for the "Completion Rate Charts" module with sample code implementations:

### 1. FastAPI Endpoint

This endpoint provides completion rates based on date ranges.

```python
# models.py
from pydantic import BaseModel
from datetime import date

class CompletionRateRequest(BaseModel):
    start_date: date
    end_date: date

class CompletionRateResponse(BaseModel):
    user_id: str
    completion_percentage: float
    total_users: int
    timestamp: date
```

```python
# endpoints.py
from fastapi import APIRouter, Depends
from typing import List
from models import CompletionRateRequest, CompletionRateResponse
from database import get_completion_rates

router = APIRouter()

@router.get("/completion-rates", response_model=List[CompletionRateResponse])
async def get_completion_rates(request: CompletionRateRequest):
    """Get completion rate statistics within a date range"""
    return await get_completion_rates(request.start_date, request.end_date)
```

### 2. React UI Component

This component fetches and displays completion rates from the API.

```javascript
// CompletionRatesChart.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompletionRatesChart = () => {
    const [completionRates, setCompletionRates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCompletionRates = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/completion-rates', {
                    params: {
                        start_date: '2023-01-01',
                        end_date: '2023-12-31'
                    }
                });
                setCompletionRates(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCompletionRates();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Course Completion Rates</h1>
            <table>
                <thead>
                    <tr>
                        <th>User ID</th>
                        <th>Completion %</th>
                        <th>Total Users</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    {completionRates.map((rate, index) => (
                        <tr key={index}>
                            <td>{rate.user_id}</td>
                            <td>{rate.completion_percentage}%</td>
                            <td>{rate.total_users}</td>
                            <td>{new Date(rate.timestamp).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompletionRatesChart;
```

### Explanation

- **FastAPI Endpoint**: This provides a RESTful API endpoint to fetch completion rate data filtered by date ranges. It uses Pydantic models for request and response validation.
  
- **React Component**: This component integrates with the FastAPI endpoint, making an HTTP request to fetch completion rates and displays them in tabular format. It handles loading states and errors appropriately.

- **Data Schema**: The completion rate data includes user IDs, their respective completion percentages, total users, and timestamps. The schema is defined using Pydantic models for type safety and validation.

# Completion Rate Charts Module Documentation

## Overview
The **Completion Rate Charts** module provides a visualization tool to track and display the completion rates of courses or modules by individual users or groups. This module is part of the Reporting category and is designed to help stakeholders (e.g., administrators, instructional designers) monitor user progress and engagement.

---

## Related Modules

1. **Course Progress Tracking**
   - Monitors user progress through courses or modules.
   - Provides detailed completion metrics for each user.

2. **User Analytics**
   - Aggregates user data for reporting purposes.
   - Integrates with Completion Rate Charts to visualize trends.

3. **Group Management**
   - Manages user groups for targeted analysis.
   - Enables group-level completion rate visualization.

---

## Use Cases

1. **Individual Learner Performance**
   - Track and display the completion rates of individual users over time.
   - Identify patterns in learner engagement and course completion.

2. **Group Comparisons**
   - Visualize completion rates across different user groups (e.g., departments, regions).
   - Compare performance trends between groups to identify areas for improvement.

3. **Course Optimization**
   - Analyze completion rates to identify underperforming courses or modules.
   - Use insights to refine course content or delivery methods.

---

## Integration Tips

1. **Data Accuracy**  
   Ensure that the tracking module (e.g., Course Progress Tracking) records accurate completion data before integrating with Completion Rate Charts.

2. **Performance Considerations**  
   Optimize queries and database interactions to handle large datasets efficiently, especially when generating charts for many users or groups.

3. **Customization**  
   Use configuration options to tailor the appearance and behavior of the charts (e.g., color schemes, chart types) based on your application's design requirements.

---

## Configuration Options

| Parameter                  | Description                                                                 | Default Value |
|----------------------------|-----------------------------------------------------------------------------|---------------|
| `enableTracking`           | Enables or disables completion rate tracking.                              | `true`        |
| `chartType`                | Specifies the type of chart to display (e.g., bar, line, pie).             | `bar`         |
| `userGrouping`             | Determines how users are grouped for visualization (e.g., by department).  | `none`        |
| `completionThreshold`      | Sets the minimum completion percentage required to mark a course as complete. | `70`          |
| `updateFrequency`          | Controls how often completion data is updated in the charts.               | `daily`       |
| `themeIntegration`         | Specifies whether to apply theme-based styling to the charts.               | `true`        |

---

## Example Usage

```python
# Configuration example:
completion_charts_config = {
    "enableTracking": True,
    "chartType": "bar",
    "userGrouping": "department",
    "completionThreshold": 70,
    "updateFrequency": "weekly",
    "themeIntegration": True
}
```

This module provides a flexible and powerful way to visualize completion rates, enabling data-driven decisions for improving user engagement and course outcomes.