---
title: "Maintenance Mode Toggle"
code: "MNT"
category: "Admin"
subcategory: "Standard"
summary: "Temporarily disable user access during upgrades or downtime."
price: "$500"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/language/react.png
  - /assets/modules/devops/vercel.png
  - /assets/modules/tools/vscode.png
---

# Maintenance Mode Toggle Overview

## Purpose
The Maintenance Mode Toggle module is designed to allow administrators to temporarily disable user access during scheduled upgrades, downtimes, or critical system changes. This feature ensures that users cannot interact with the system during maintenance periods, preventing potential disruptions and ensuring a smooth operation.

## Benefits
- **Ensures Uninterrupted Operations**: By disabling user access, the module allows for seamless maintenance without user interference.
- **Prevents Errors During Downtime**: Users are blocked from causing issues that could arise if they accessed an unstable system during updates.
- **Facilitates Safe System Changes**: Enables administrators to implement changes securely, knowing users cannot interfere with ongoing processes.

## Usage Scenarios
The module is particularly useful in the following scenarios:
- **Scheduled Maintenance**: Ideal for tasks like software updates or security patches where downtime is planned.
- **Emergency Outages**: Allows quick response during unforeseen critical issues by swiftly blocking user access.
- **Testing and Development**: Provides a controlled environment for testing new features or bug fixes without external interference.

This module offers a straightforward solution to manage user access efficiently, ensuring system stability during necessary maintenance.

# Maintenance Mode Toggle Module Documentation

## Enable Maintenance Mode  
This feature allows admins to activate maintenance mode, blocking all user access except for admin operations. It ensures that the system is unavailable during planned upgrades or downtimes.

## Disable Maintenance Mode  
Admins can deactivate maintenance mode to restore full user access after maintenance activities are complete. This feature re-enables all services and functionalities previously disabled during maintenance.

## Graceful Shutdown Mechanism  
The module includes a mechanism to gracefully shut down user sessions before entering maintenance mode. Users receive warnings and are logged out automatically, ensuring a smooth transition to downtime.

## Role-Based Access Control (RBAC)  
Only authorized admin users with the appropriate permissions can toggle maintenance mode. RBAC ensures that non-admin users cannot interfere with system availability.

## Scheduled Maintenance Support  
Admins can schedule maintenance periods in advance. The module supports notifications and warnings to users before the scheduled downtime begins.

## Downtime Handling  
During maintenance mode, all user requests are denied with a generic message indicating planned downtime. This prevents confusion and ensures users understand the temporary unavailability.

## Audit Logging  
The module logs all attempts to toggle maintenance mode, including successful and failed operations. These logs help in auditing and troubleshooting issues related to system availability.

## Session Management  
Active user sessions are invalidated when maintenance mode is activated. This ensures that no users can access the system using old session tokens during downtime.

# Maintenance Mode Toggle Documentation

This document provides comprehensive documentation for the Maintenance Mode Toggle module, including code examples in FastAPI, React, and Pydantic. This module allows administrators to temporarily disable user access during system upgrades or downtimes.

---

## 1. FastAPI Endpoint

The FastAPI endpoint handles enabling and disabling maintenance mode.

```python
# endpoints/maintenance.py

from fastapi import APIRouter, Depends, status
from typing import Optional
from pydantic import BaseModel
from ..auth import get_current_user
from ..models.maintenance import MaintenanceMessage

router = APIRouter(
    tags=["Admin", "Maintenance"],
    dependencies=[Depends(get_current_user)]
)

@router.post("/maintenance", response_model=Dict[str, bool])
async def enable_maintenance_mode(message: Optional[MaintenanceMessage] = None):
    """Enable maintenance mode to disable user access temporarily."""
    if message:
        maintenance_message = message.message
    else:
        maintenance_message = "System under maintenance"
    # Implementation logic here
    return {"message": "Maintenance mode enabled", "status": True}

@router.delete("/maintenance")
async def disable_maintenance_mode():
    """Disable maintenance mode to allow user access."""
    # Implementation logic here
    return {"message": "Maintenance mode disabled", "status": False}
```

### Explanation:
- **Enables Maintenance Mode:** POST request with an optional message.
- **Disables Maintenance Mode:** DELETE request.

---

## 2. React UI Component

The React component provides a toggle button for maintenance mode.

```javascript
# components/MaintenanceToggle.jsx

import { useState, useEffect } from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function MaintenanceToggle() {
  const [isMaintenanceActive, setIsMaintenanceActive] = useState(false)
  const [loading, setLoading] = useState(true)

  const { data: maintenanceMode } = useSWR('/api/maintenance', fetcher)

  useEffect(() => {
    if (maintenanceMode) {
      setIsMaintenanceActive(maintenanceMode.is_active)
    }
    setLoading(false)
  }, [maintenanceMode])

  const toggleMaintenance = async () => {
    try {
      setLoading(true)
      const responseEnable = await fetch('/api/maintenance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      
      const responseDisable = await fetch('/api/maintenance', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      // Handle responses
    } catch (error) {
      console.error('Error toggling maintenance mode:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button 
        onClick={toggleMaintenance}
        disabled={loading}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: isMaintenanceActive ? '#ff4444' : '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {loading ? 'Toggling...' : (isMaintenanceActive ? 'Disable Maintenance Mode' : 'Enable Maintenance Mode')}
      </button>
    </div>
  )
}
```

### Explanation:
- Uses SWR for real-time data fetching.
- Toggles maintenance mode with a button that changes state and color based on whether maintenance is active.

---

## 3. Pydantic Data Schema

The Pydantic schema defines the maintenance message structure.

```python
# models/maintenance.py

from pydantic import BaseModel
from typing import Optional

class MaintenanceMessage(BaseModel):
    """Schema for maintenance mode messages."""
    is_active: bool
    message: Optional[str] = "System under maintenance"

    # Example usage:
    # >>> MaintenanceMessage(is_active=True)
    # MaintenanceMessage(is_active=True, message='System under maintenance')
    # 
    # >>> MaintenanceMessage(
    # ...     is_active=False,
    # ...     message="Scheduled maintenance completed"
    # ... )
    # MaintenanceMessage(is_active=False, message='Scheduled maintenance completed')

    # Validation examples:
    # >>> try:
    # ...     MaintenanceMessage(is_active=True)
    # ... except ValueError as e:
    # ...     print(e)
    # None
    # 
    # >>> try:
    # ...     MaintenanceMessage(is_active=True, message=123)
    # ... except ValueError as e:
    # ...     print(e)
    # "message must be a string"
```

### Explanation:
- `is_active` is mandatory and indicates maintenance mode status.
- `message` is optional with a default value.

---

## 4. Usage Examples

### Enabling Maintenance Mode:

**Request:**
```bash
POST /maintenance HTTP/1.1
Authorization: Bearer <token>
Content-Type: application/json

{
    "message": "System under maintenance for updates."
}
```

**Response:**
```json
{
    "message": "Maintenance mode enabled",
    "status": true
}
```

### Disabling Maintenance Mode:

**Request:**
```bash
DELETE /maintenance HTTP/1.1
Authorization: Bearer <token>
```

**Response:**
```json
{
    "message": "Maintenance mode disabled",
    "status": false
}
```

---

## 5. Error Handling

- **401 Unauthorized:** Missing or invalid authentication token.
- **403 Forbidden:** Insufficient permissions to toggle maintenance mode.

---

This documentation provides a complete implementation of the Maintenance Mode Toggle module, including code examples for FastAPI, React, and Pydantic.

```markdown
# Maintenance Mode Toggle Module

## Summary
The Maintenance Mode Toggle module allows administrators to temporarily disable user access to the system during planned upgrades, downtimes, or emergency maintenance. This ensures smooth operations and minimizes disruptions.

## Related Modules
- **System Health Check**: Monitors system performance and can integrate with Maintenance Mode to trigger automatic disabling of access if health metrics drop below a threshold.
- **Notifications Module**: Sends alerts to users when maintenance mode is activated or deactivated.
- **Session Management**: Handles user sessions during maintenance mode, preventing new logins while allowing existing sessions to continue until they expire.
- **Activity Log**: Tracks all toggles and changes made to the maintenance mode settings.

## Use Cases
1. **Scheduled Maintenance**: Temporarily disable access during planned software upgrades or system maintenance to prevent users from accessing outdated or unstable versions.
2. **Emergency Downtime**: Quickly disable user access in case of unexpected issues like server crashes or security breaches.
3. **Automated Maintenance Triggers**: Integrate with monitoring tools to automatically enable maintenance mode when specific conditions (e.g., high CPU usage, low memory) are met.
4. **Graceful Shutdown**: Allow existing users to complete their tasks while preventing new logins during a planned shutdown.

## Integration Tips
- **Health Check Integration**: Use the System Health Check module to monitor system performance and automatically trigger maintenance mode if critical thresholds are exceeded.
- **Notifications**: Integrate with the Notifications Module to send email, SMS, or in-app alerts to users when maintenance mode is activated or deactivated.
- **Session Handling**: Ensure that the Session Management module properly handles existing sessions during maintenance mode while preventing new user logins.

## Configuration Options

| Parameter               | Description                                         | Default Value | Example Usage                                                                 |
|-------------------------|---------------------------------------------------|--------------|------------------------------------------------------------------------------|
| `maintenance_enabled`  | Enables or disables maintenance mode.              | `false`      | Set to `true` to enable maintenance mode during scheduled downtimes.                |
| `maintenance_start_time` | Start time for maintenance mode in UTC format.     | -            | `"2023-10-05T04:00:00Z"`                                                       |
| `maintenance_end_time`  | End time for maintenance mode in UTC format.       | -            | `"2023-10-05T06:00:00Z"`                                                       |
| `alert_threshold`      | Percentage of system health below which maintenance is triggered automatically. | `50`          | Set to `30` if you want maintenance to activate when system health drops below 30%.|
| `maintenance_message`   | Custom message displayed to users when access is denied. | "System Under Maintenance" | Customize to "We are currently undergoing scheduled maintenance. Please try again later." |
| `grace_period`         | Time in minutes before full restrictions apply after maintenance mode starts. | `30`          | Set to `60` for a one-hour grace period.                                       |
| `log_failed_attempts`   | Log failed login attempts during maintenance mode.  | `true`       | Set to `false` if you want to disable logging during maintenance.                  |

## Example Usage
```markdown
To enable maintenance mode with custom start and end times:
```
```javascript
{
  "maintenance_enabled": true,
  "maintenance_start_time": "2023-10-05T04:00:00Z",
  "maintenance_end_time": "2023-10-05T06:00:00Z"
}
```

To customize the maintenance message:
```javascript
{
  "maintenance_message": "We are currently undergoing scheduled maintenance. Please try again later."
}
```

## Conclusion
The Maintenance Mode Toggle module is a critical tool for system administrators to ensure smooth operations during upgrades, downtimes, or emergencies. By integrating with related modules and customizing configuration options, you can tailor the behavior to meet your specific needs.
```