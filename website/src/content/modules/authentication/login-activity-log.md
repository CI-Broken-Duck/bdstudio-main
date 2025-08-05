---
title: "Login Activity Log"
code: "LOGN"
category: "Authentication"
subcategory: "Standard"
summary: "Track and display user login history, device, and IP metadata."
price: "$500"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/databases/postgresql.png
  - /assets/modules/tools/vscode.png
  - /assets/modules/language/react.png
---

# Overview: Login Activity Log Module

## Purpose:
The Login Activity Log module serves to record and maintain a detailed history of all user login activities within the system. This includes capturing essential details such as the date, time, success status of the login attempt, along with metadata related to the device used (e.g., model, OS) and the originating IP address.

## Benefits:
- **Enhanced Security Monitoring**: Enables developers to track login patterns, detect potential security threats, and respond promptly to suspicious activities.
- **Effective Debugging**: Provides a comprehensive log of login attempts, aiding in identifying and resolving issues related to authentication processes.
- **Comprehensive Auditing**: Facilitates internal audits and compliance checks by maintaining an accurate record of user access history.

## Usage Scenarios:
1. **Security Monitoring**: Developers can utilize the module to monitor login activity for signs of unauthorized access or brute force attacks, enhancing system security.
2. **Investigative Debugging**: In cases of failed logins or unexpected behavior, the module provides detailed logs to trace and resolve issues.
3. **Behavioral Analysis**: Helps in understanding user interaction with the system over time, aiding in service improvement and informed decision-making.

This module is a crucial tool for developers aiming to maintain robust security, ensure compliance, and enhance system reliability through thorough monitoring and analysis of login activities.

## Feature 1: Login History Tracking
The module logs all login attempts, both successful and failed. Each entry includes a timestamp, user ID, IP address, device details, and login method (e.g., password, OAuth). This feature allows developers to analyze user activity patterns.

## Feature 2: Failed Login Handling
Failed login attempts are logged with attempt count, timestamps, and user IDs. The module blocks access after multiple failed attempts ( configurable threshold) and logs these incidents for security monitoring.

## Feature 3: Device Metadata Collection
The module captures device details such as OS, browser type, device model, and screen resolution. This data helps in identifying suspicious activity or incompatible devices, aiding developers in troubleshooting and enhancing user experience.

## Feature 4: IP Address Logging
Each login attempt's source IP address is recorded. This feature supports geo-IP lookups for location tracking and detecting unauthorized access from unexpected regions, providing developers with insights into potential security threats.

## Feature 5: Data Privacy Compliance
The module adheres to data protection regulations by pseudonymizing user IDs and storing logs securely. Sensitive information is encrypted, ensuring compliance with privacy standards while safeguarding user data.

These features collectively provide a robust solution for monitoring and managing login activities, offering developers comprehensive tools to enhance security and user management.

# Module Name: Login Activity Log
## Category: Authentication
## Summary: Track and display user login history, device, and IP metadata.

This module provides functionality to track and retrieve user login activity logs. It includes details such as login timestamp, device information, and IP address metadata for each login attempt.

## API Reference

### GET `/api/login-logs`
Retrieves the login activity log history with pagination support.

#### Query Parameters:
- `page` (int): Page number for pagination.
- `limit` (int): Number of records per page.

#### Response Model:
```python
# Using Pydantic for data validation and serialization
from pydantic import BaseModel
from datetime import datetime

class LoginLog(BaseModel):
    id: str  # Unique identifier for the login event
    username: str  # User's username
    login_time: datetime  # Timestamp of login attempt
    device_info: dict | None  # Device details (e.g., browser, OS)
    ip_address: str | None  # IP address of the login

# Example Response Model:
class LoginLogResponse(BaseModel):
    data: list[LoginLog]
    page: int
    limit: int
    total_pages: int
```

## Code Samples

### FastAPI Endpoint Implementation:

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import List, Optional
import models.login_log  # Contains LoginLog schema and model
from database import SessionLocal
from sqlalchemy.orm import Session

router = APIRouter()

def get_db() -> Session:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/api/login-logs", response_model=models.login_log.LoginLogResponse)
def get_login_logs(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
):
    """Get paginated login logs."""
    offset = (page - 1) * limit
    # Query the database for login logs with optional filtering
    login_logs = db.query(models.login_log.LoginLog).offset(offset).limit(limit).all()
    return {"data": login_logs, "page": page, "limit": limit, "total_pages": ...}
```

### React UI Snippet:

```javascript
import { useEffect } from 'react';
import { Table, Pagination } from 'react-table';

const LoginLogsTable = () => {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetch(`/api/login-logs?page=${currentPage}&limit=${itemsPerPage}`)
      .then((response) => response.json())
      .then((data) => setLogs(data.data));
  }, [currentPage]);

  return (
    <div>
      <Table
        data={logs}
        columns={[
          { name: 'Username', accessor: 'username' },
          { name: 'Login Time', accessor: 'login_time' },
          { name: 'Device Info', accessor: 'device_info' },
          { name: 'IP Address', accessor: 'ip_address' }
        ]}
      />
      <div style={{ marginTop: '20px' }}>
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={logs.length} // Replace with actual total count from API
          onChange={(newPage) => setCurrentPage(newPage)}
        />
      </div>
    </div>
  );
};

export default LoginLogsTable;
```

### Data Schema (Pydantic):

```python
# models/login_log.py
from pydantic import BaseModel
from datetime import datetime

class LoginLog(BaseModel):
    id: str
    username: str
    login_time: datetime
    device_info: dict | None = {}
    ip_address: str | None = None

class LoginLogResponse(BaseModel):
    data: list[LoginLog]
    page: int
    limit: int
    total_pages: int
```

## Example Usage:

### API Call:
```javascript
fetch('/api/login-logs?page=1&limit=10')
  .then((response) => response.json())
  .then((data) => console.log(data.data));
```

### React Component Integration:
```javascript
<LoginLogsTable />
```

This module provides a comprehensive solution for tracking and displaying user login activity logs, with support for pagination and detailed metadata.

```markdown
# Login Activity Log Module Documentation

## Module Name: Login Activity Log  
**Category:** Authentication  
**Summary:** Track and display user login history along with device and IP metadata.

---

## Related Modules
- **Audit Trail**: For comprehensive logging of system activities, including login attempts.  
- **User Session Manager**: Manages user sessions and tracks session-related data.  
- **Security Event Monitor**: Detects and alerts on suspicious login patterns.  
- **Activity Dashboard**: Provides visual insights into login trends and patterns.

---

## Use Cases
1. **Audit User Login History**  
   - Track all login attempts, including successful and failed attempts.  
   - Retrieve detailed information about each login event for auditing purposes.

2. **Monitor Suspicious Activities**  
   - Detect unusual login patterns such as multiple failed attempts from the same IP address or device.  
   - Identify potential security threats by analyzing login metadata.

3. **Generate Login Reports**  
   - Create reports based on login history, including time stamps, user IDs, devices, and IPs.  
   - Export data for further analysis or compliance purposes.

4. **Correlate Events Across Systems**  
   - Integrate with other modules to correlate login events with system activities for comprehensive security monitoring.

---

## Integration Tips
- **Data Normalization**: Ensure that login events are normalized before being stored in the activity log. This includes standardizing device identifiers and IP addresses.
- **Event Correlation**: Use this module alongside the **Security Event Monitor** to correlate login attempts with other security-related events.
- **Asynchronous Logging**: Implement asynchronous logging to handle high volumes of login events without impacting system performance.

---

## Configuration Options
Below are the configuration options for the Login Activity Log module:

| Parameter                  | Description                                                                 |
|----------------------------|-----------------------------------------------------------------------------|
| `ENABLE_LOGIN_LOGGING`     | Enable or disable login logging.                                           | Default: `true` |
| `LOG_LEVEL`                | Set the log level (e.g., DEBUG, INFO, WARNING, ERROR, CRITICAL).         | Default: `INFO` |
| `MAX_LOG_RETENTION_DAYS`   | Specify the maximum number of days to retain login logs.                    | Default: `30`  |
| `IP_BLACKLIST`            | List of IP addresses to be blacklisted (prevent login attempts from these IPs). | Example: `["192.168.1.1", "10.0.0.1"]` |
| `DEVICE_WHITELIST`        | List of device identifiers to allow login attempts only from these devices.    | Example: `["MacBookPro-UUID", "WindowsPC-UUID"]`

---

## Conclusion
The Login Activity Log module is essential for tracking and analyzing user login events, providing valuable insights into system security and user behavior. By integrating it with related modules like **Audit Trail** and **Security Event Monitor**, you can enhance your system's security posture.
```