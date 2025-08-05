---
title: "Activity Heatmap for Admins"
slug: admin/activity-heatmap-for-admins
code: "HMA"
category: "Admin"
subcategory: "Gold"
summary: "Overview of system-wide activity, logins, and resource usage."
price: "$2000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/language/react.png
  - /assets/modules/databases/postgresql.png
  - /assets/modules/tools/vscode.png
---


# Activity Heatmap for Admins Overview

## Purpose
The **Activity Heatmap for Admins** module provides a visual and interactive interface that aggregates and displays system-wide activity data. Its primary goal is to give administrators a comprehensive view of user logins, resource usage, and overall system behavior over time. This tool empowers admins to monitor trends, identify patterns, and respond proactively to potential issues or opportunities for optimization.

## Benefits
- **Real-time visualization**: Gain insights into login frequencies, resource consumption, and activity spikes in an easy-to-understand format.
- **Anomaly detection**: Identify unusual patterns or sudden changes in system behavior that may indicate security threats, misconfigurations, or performance bottlenecks.
- **Trend analysis**: Track long-term trends to optimize resource allocation, plan capacity, and anticipate user demands more effectively.
- **Efficient troubleshooting**: Quickly pinpoint the source of issues by correlating activity data with specific timeframes or events.
- **Compliance and auditing**: Maintain a clear record of system activities for auditing purposes and ensure adherence to regulatory requirements.

## Usage Scenarios
The Activity Heatmap is designed for administrators who need to:
1. Monitor system health and user behavior in real-time.
2. Troubleshoot performance issues by analyzing activity patterns during specific time windows.
3. Plan capacity based on historical usage trends.
4. Detect suspicious activities or potential security breaches.
5. Ensure compliance with internal policies and external regulations.

By leveraging the Activity Heatmap, administrators can make informed decisions to enhance system performance, security, and user satisfaction.


## Real-Time Overview  
This module provides a real-time dashboard displaying system-wide activity, including login events and resource usage across all users. It offers an aggregated view of key metrics, enabling admins to quickly assess overall system health.

## User Login Tracking  
Admins can monitor user logins in real-time or over custom date ranges. The module tracks login frequency, geographic locations, and failed attempts, helping identify potential security issues or suspicious activity.

## Resource Usage Monitoring  
Track CPU, memory, and storage usage across all resources. Visualize trends and spikes to optimize resource allocation, plan capacity expansion, and troubleshoot performance bottlenecks.

## Custom Date Range Analysis  
Analyze activity data within specific time frames, such as daily, weekly, or monthly reports. This feature supports detailed investigation of user behavior and system performance during particular events.

## Export Options  
Export activity data in formats like CSV or PDF for reporting and sharing with stakeholders. This allows admins to generate customized reports that meet organizational needs.

Here's a detailed technical documentation with sample code snippets:

### FastAPI Endpoint Example (Python/Pydantic)

This endpoint retrieves system activity data for admins.

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import List
from datetime import datetime
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

class ActivityLog:
    def __init__(self):
        self.data = []

async def get_activity_data(start_date: str = None, end_date: str = None) -> List[dict]:
    """
    Retrieve system activity logs within optional date range
    Args:
        start_date (str): ISO formatted datetime string
        end_date (str): ISO formatted datetime string
    Returns:
        list of activity dicts
    """
    filters = {}
    if start_date:
        filters["timestamp"] = {"$gte": parse_iso(start_date)}
    if end_date:
        filters["timestamp"] = {"$lte": parse_iso(end_date)}
    
    return await ActivityLog().get_logs(filters)

@router.get("/api/admin/heatmap")
async def get_admin_heatmap(
    user_id: str = Depends(authenticate_user),  # OAuth2 password flow
    start_date: str = None,
    end_date: str = None
):
    data = await get_activity_data(start_date, end_date)
    if not data:
        logger.warning("No activity data returned")
        raise HTTPException(status_code=404, detail="No activity found")
    
    return {"data": data}
```

### React UI Example (JavaScript/TypeScript)

This component displays the admin heatmap dashboard.

```javascript
import React from 'react';
import { useFetch } from '@reativ/web';
import * as d3 from 'd3';

const ActivityHeatmap = () => {
  const [{ data, loading }, error] = useFetch({
    url: '/api/admin/heatmap',
    method: 'GET',
    headers: { 'Authorization': `Bearer ${localStorage.token}` }
  });

  React.useEffect(() => {
    if (data?.length) {
      // Initialize the SVG
      const svg = d3.select('#heatmap-svg');
      const width = document.getElementById('heatmap-container').clientWidth;
      const height = 500;

      svg.attr('width', width)
         .attr('height', height);

      // Create scales
      const xScale = d3.scaleBand()
                       .domain(data.map(d => d.timestamp))
                       .range([0, width])
                       .padding(0.2);
      
      const yScale = d3.scaleOrdinal()
                       .domain(['Login', 'Resource Access', 'API Call'])
                       .range([0, 50, 100]);

      // Draw heatmap
      data.forEach((activity) => {
        const x = xScale(activity.timestamp);
        const y = yScale(activity.action);
        
        d3.select('#heatmap-svg')
          .append('rect')
          .attr('x', x)
          .attr('y', y)
          .attr('width', 20)
          .attr('height', 20)
          .attr('fill', activity.status === 'success' ? '#4CAF50' : '#f44336')
          .on('mouseover', () => {
            d3.select(this).transition().duration(100)
              .attr('opacity', 0.7);
          })
          .on('mouseout', () => {
            d3.select(this).transition().duration(100)
              .attr('opacity', 1);
          });
      });
    }
  }, [data]);

  return (
    <div className="dashboard-container">
      <h2>System Activity Heatmap</h2>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error.message}</p>}
      <div id="heatmap-container">
        <svg id="heatmap-svg" />
      </div>
    </div>
  );
};

export default ActivityHeatmap;
```

### Pydantic Data Schema Example

This defines the schema for activity data.

```python
from pydantic import BaseModel, Field, Optional
from datetime import datetime
from typing import List

class Activity(BaseModel):
    id: str = Field(..., description="Unique identifier")
    timestamp: datetime = Field(..., description="When the activity occurred")
    user_id: str = Field(..., description="User who performed the action")
    action: str = Field(..., description="Type of action taken", 
                       enum=["login", "resource_access", "api_call"])
    resource_type: Optional[str] = Field(None, description="Type of resource accessed")
    duration: float = Field(..., description="Time taken in seconds", gt=0)
    status: str = Field(..., description="Outcome of the action",
                        enum=["success", "failure"])

class ActivityLogResponse(BaseModel):
    data: List[Activity] = Field(..., description="List of activity records")
```


## Related Modules

1. **Log Management**: Handles collection, storage, and analysis of logs across the system.
2. **User Tracking**: Tracks user activities, including login details and session durations.
3. **Resource Monitoring**: Monitors usage of CPU, memory, disk space, and network resources.
4. **Audit Logs**: Maintains detailed records of all system access attempts and changes.
5. **Session Management**: Manages user sessions, tracking start and end times.

---

## Use Cases

1. **System-Wide Activity Overview**: Provides a visual representation of activity across all users and resources.
2. **Identify High-Usage Periods**: Highlights peak usage times to optimize resource allocation.
3. **Monitor Failed Login Attempts**: Tracks login failures to identify potential security breaches.
4. **Detect Anomalies**: Uses anomaly detection to flag unusual activity patterns.
5. **Integration with Monitoring Tools**: Facilitates data export for third-party monitoring tools.

---

## Integration Tips

1. **Data Collection Frequency**: Set regular intervals (e.g., hourly, daily) based on system size and requirements.
2. **Authentication/Authorization**: Ensure secure access to the heatmap data using appropriate credentials and policies.
3. **API Usage**: Use RESTful APIs for real-time data retrieval and integration with other systems.
4. **Real-Time vs Batch Processing**: Choose processing method based on data volume and performance needs.
5. **Handle Timezone Differences**: Standardize timezones to avoid discrepancies in activity logs.

---

## Configuration Options

| Parameter | Description | Default Value |
|-----------|-------------|---------------|
| `data_collection_frequency` | Frequency of data collection (e.g., "hourly", "daily"). | "hourly" |
| `retention_period` | Duration for which data is retained. | 30 days |
| `granularity` | Level of detail in the heatmap (e.g., "daily", "hourly"). | "daily" |
| `thresholds` | Threshold values for alerts (e.g., login failures, resource usage). | None |

---

## Additional Considerations

- **Scalability**: Ensure infrastructure can handle large data volumes.
- **Error Handling**: Implement checks for system downtimes during data collection.
- **Troubleshooting Tips**: Monitor resource usage spikes and adjust collection frequency if necessary.

This documentation provides a thorough guide for integrating and configuring the Activity Heatmap module effectively.

### Notes

- The FastAPI endpoint uses OAuth2 password flow for authentication.
- The React component uses D3.js for visualization and includes hover effects.
- Pydantic models ensure type safety both on the server and client side (via JSON).
- Error handling is included but simplified in these examples.
