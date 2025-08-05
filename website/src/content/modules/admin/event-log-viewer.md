---
title: "Event Log Viewer"
code: "LOGS"
category: "Admin"
subcategory: "Standard"
summary: "Timestamped audit log of admin actions, system triggers, and user events."
price: "$500"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/databases/postgresql.png
  - /assets/modules/language/react.png
  - /assets/modules/tools/vscode.png
---

```markdown
# Event Log Viewer Module Overview

## Purpose:
The **Event Log Viewer** module is designed to provide developers and administrators with comprehensive visibility into system activities. It captures and displays timestamped audit logs of admin actions, system triggers, and user events in a single, centralized location. This module serves as a critical tool for monitoring, debugging, and auditing system behavior.

## Benefits:
- **Real-Time Monitoring:** Track all system events in real-time to quickly identify issues or unusual activity.
- **Centralized Logging:** Gather logs from multiple sources into one interface, simplifying the process of troubleshooting and analysis.
- **Filtering and Searching:** Easily filter logs by event type, timestamp, user, or keyword to focus on specific incidents.
- **Customizable Alerts:** Set up alerts for critical events, enabling proactive response to potential issues.
- **Comprehensive Auditing:** Maintain a detailed record of all admin actions and system triggers for compliance and security audits.

## Usage Scenarios:
1. **Debugging Issues:**
   - Identify the root cause of bugs or errors by reviewing logs of user actions and system responses.
   - Track the sequence of events leading up to a specific issue to pinpoint the source.

2. **Security Auditing:**
   - Monitor admin activity to ensure compliance with security policies and detect unauthorized access attempts.
   - Review user logins, permission changes, and other sensitive operations for potential security risks.

3. **System Monitoring:**
   - Track system health by monitoring triggers related to resource usage, performance metrics, or error conditions.
   - Use historical logs to identify patterns or trends that may indicate underlying system issues.

4. **Compliance Reporting:**
   - Generate detailed reports of admin actions and user events for audits or regulatory compliance purposes.
   - Export logs in various formats (e.g., CSV, JSON) for further analysis or reporting requirements.

By leveraging the Event Log Viewer module, developers can gain deeper insights into system behavior, improve security, and ensure smooth operation of critical applications.

## Search and Filter  
The Event Log Viewer allows developers to quickly locate specific events by searching or filtering logs based on criteria like timestamp, event type (admin action, system trigger, user event), severity level, or keyword. This feature ensures efficient navigation of potentially large log datasets.

## Event Details  
Each logged event includes detailed information such as a unique identifier, timestamp, event type, description, and any associated data (e.g., user ID, action performed). Developers can view these details to understand the context and implications of each event.

## Real-Time Updates  
The module provides real-time updates of new events as they occur. This feature ensures that developers are always aware of the most recent activity without needing to manually refresh the interface.

## Export Functionality  
Logs can be exported in various formats (e.g., CSV, JSON, XML) for further analysis or reporting. This is particularly useful for debugging and auditing purposes outside the module's interface.

## Severity Levels  
Events are categorized by severity levels (e.g., info, warning, error, critical). Developers can prioritize their attention on higher-severity events while still having access to lower-priority logs when needed.

## Correlation Features  
The module supports correlation of related events. For example, developers can view a sequence of events leading up to a specific outcome or error, helping them identify patterns or root causes.

## Customizable Views  
Developers can customize the display of logs based on their needs. This includes options like sorting by timestamp, filtering by user, or grouping similar events together for easier analysis.

## Integration with Monitoring Tools  
The Event Log Viewer integrates with external monitoring and analytics tools (e.g., Grafana, Splunk). Logs can be forwarded to these systems in real time for comprehensive monitoring and alerting.

### Event Log Viewer Documentation

#### 1. FastAPI Endpoint

This example uses FastAPI to create an API endpoint that retrieves event logs.

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
import datetime
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database.models import EventLog
from authentication import get_current_user

# Initialize the router
event_log_router = APIRouter()

# Define response models
class EventLogResponse(BaseModel):
    id: int
    timestamp: datetime.datetime
    level: str  # e.g., "INFO", "ERROR"
    user_id: Optional[int] = None
    action: str
    data: dict

class EventLogsResponse(BaseModel):
    page: int
    size: int
    total: int
    events: List[EventLogResponse]

# Dependency for database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@event_log_router.get("/api/event_logs", response_model=EventLogsResponse)
async def get_event_logs(
    page: int = 1,
    size: int = 10,
    user_id: Optional[int] = None,
    start_date: Optional[datetime.date] = None,
    end_date: Optional[datetime.date] = None,
    db: Session = Depends(get_db),
    current_user: dict = Depends(get_current_user)
):
    """
    Retrieve event logs with optional filtering.
    
    Args:
        page: Page number for pagination
        size: Number of items per page
        user_id: Filter by user ID
        start_date: Start date for filtering events
        end_date: End date for filtering events
    
    Returns:
        EventLogsResponse object containing paginated event logs
    """
    try:
        query = db.query(EventLog)
        
        # Apply filters
        if user_id:
            query = query.filter(EventLog.user_id == user_id)
        if start_date:
            query = query.filter(EventLog.timestamp >= start_date)
        if end_date:
            query = query.filter(EventLog.timestamp <= end_date)
        
        total = query.count()
        logs = query.order_by(EventLog.timestamp.desc()).offset((page-1)*size).limit(size).all()
        
        return {
            "page": page,
            "size": size,
            "total": total,
            "events": [EventLogResponse(
                id=log.id,
                timestamp=log.timestamp,
                level=log.level,
                user_id=log.user_id,
                action=log.action,
                data=log.data
            ) for log in logs]
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

#### 2. React UI Snippet

This example shows a React component that displays event logs using the API endpoint.

```javascript
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button } from 'reactstrap';

function EventLogViewer() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [selectedUser, setSelectedUser] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(() => {
        const fetchEventLogs = async () => {
            try {
                const response = await fetch(`/api/event_logs?page=${page}&size=${size}${
                    selectedUser ? `&user_id=${selectedUser}` : ''
                }${startDate ? `&start_date=${startDate.toISOString()}` : ''}${
                    endDate ? `&end_date=${endDate.toISOString()}` : ''
                }`);
                
                if (!response.ok) {
                    throw new Error('Failed to fetch event logs');
                }

                const data = await response.json();
                setEvents(data.events);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchEventLogs();
    }, [page, size, selectedUser, startDate, endDate]);

    return (
        <div className="event-log-viewer">
            <h1>Event Logs</h1>
            
            <div className="filters mb-4">
                <div className="form-group">
                    <label htmlFor="user">Filter by User:</label>
                    <select 
                        id="user"
                        className="form-control"
                        value={selectedUser}
                        onChange={(e) => setSelectedUser(e.target.value)}
                    >
                        <option value="">All Users</option>
                        {/* Add user options here */}
                    </select>
                </div>

                <div className="form-group">
                    <label>Date Range:</label>
                    <div className="input-group">
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            placeholderText="Start Date"
                            className="form-control"
                        />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            placeholderText="End Date"
                            className="form-control"
                        />
                    </div>
                </div>

                <Button 
                    onClick={() => setPage(1)}
                    disabled={loading}
                >
                    Refresh
                </Button>
            </div>

            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <div className="event-list">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Level</th>
                                <th>User</th>
                                <th>Action</th>
                                <th>Data</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.map((event, index) => (
                                <tr key={index}>
                                    <td>{event.timestamp}</td>
                                    <td>{event.level}</td>
                                    <td>{event.user_id || '-'}</td>
                                    <td>{event.action}</td>
                                    <td>{JSON.stringify(event.data)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="pagination mt-4">
                        <Button 
                            onClick={() => setPage(Math.max(1, page - 1))} 
                            disabled={page === 1}
                        >
                            Previous
                        </Button>
                        
                        <span>Page {page} of {Math.ceil(events.length / size)} ({events.length} items)</span>
                        
                        <Button 
                            onClick={() => setPage(page + 1)} 
                            disabled={page * size >= events.length}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EventLogViewer;
```

#### 3. Data Schema (Pydantic)

This example defines the data schema for event logs using Pydantic.

```python
from pydantic import BaseModel
from typing import Optional, Dict
import datetime

class EventLog(BaseModel):
    id: int
    timestamp: datetime.datetime
    level: str  # "INFO", "WARNING", "ERROR"
    user_id: Optional[int] = None
    action: str
    data: Dict[str, any]

class EventLogsResponse(BaseModel):
    page: int
    size: int
    total: int
    events: List[EventLog]
```

### Summary

- **FastAPI Endpoint**: `/api/event_logs` - Retrieves paginated event logs with filtering by user and date range.
- **React UI**: Displays a table of event logs with filters for user, start/end dates, and pagination controls.
- **Data Schema**: Uses Pydantic models to define the structure of event logs and API responses.

The implementation provides a secure, filtered, and paginated view of event logs with a clean UI.

# Event Log Viewer Module Documentation

## Summary
The **Event Log Viewer** module provides a timestamped audit log of admin actions, system triggers, and user events. This module is designed for developers who need to monitor and analyze system activities for debugging, auditing, and performance optimization purposes.

---

## Related Modules
1. **User Management**: Manages user accounts, permissions, and roles.
2. **Audit Dashboard**: Centralized interface for viewing and analyzing audit logs.
3. **System Monitor**: Tracks system health, resource usage, and performance metrics.
4. **Configuration Manager**: Manages application settings and configurations.

---

## Use Cases
1. **Monitoring System Health**  
   - Developers can track system events to identify potential issues or bottlenecks in real-time.
2. **Tracking User Activity**  
   - Log user actions (e.g., login attempts, API calls) to ensure compliance with security policies.
3. **Auditing Admin Actions**  
   - Monitor and review all admin operations for auditing and accountability purposes.
4. **Performance Monitoring**  
   - Analyze system triggers and events to optimize application performance.
5. **Custom Filtering**  
   - Use filters to focus on specific events (e.g., failed login attempts, resource usage spikes).

---

## Integration Tips
1. **Single Sign-On (SSO)**: Integrate the Event Log Viewer with your SSO provider for streamlined access control.
2. **RESTful APIs**: Use RESTful APIs to pull log data into other tools or systems for analysis.
3. **Centralized Logging**: Combine the Event Log Viewer with a centralized logging system for comprehensive monitoring.
4. **Webhooks**: Set up webhooks to trigger automated responses based on specific events (e.g., alerting on failed login attempts).
5. **Real-Time Updates**: Use WebSocket integration for real-time event notifications.

---

## Configuration Options
Below is a table of configuration options for the Event Log Viewer module:

| **Option**               | **Description**                                                                 |
|--------------------------|---------------------------------------------------------------------------------|
| `max_log_retention`      | Maximum number of days to retain logs.                                       |
| `log_file_size_limit`    | Maximum size (in MB) of log files before rotation occurs.                     |
| `log_level`              | Logging severity level (`DEBUG`, `INFO`, `WARNING`, `ERROR`, `CRITICAL`).     |
| `enable_audit_trails`    | Enable or disable audit trails for admin actions.                              |
| `time_zone`              | Time zone to use for logging (e.g., UTC, US/Eastern).                         |

---

This documentation provides a comprehensive overview of the Event Log Viewer module and its integration with other system components. For further details, refer to the full API documentation or contact support.