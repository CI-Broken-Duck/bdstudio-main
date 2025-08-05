---
title: "Typing Indicator System"
code: "TYP"
category: "Communication"
subcategory: "Silver"
summary: "Shows when the other person is composing a message."
price: "$1000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/language/react.png
  - /assets/modules/devops/vercel.png
  - /assets/modules/databases/postgresql.png
---

# Typing Indicator System Overview

## Purpose
The Typing Indicator System module is designed to enhance real-time communication experiences by providing immediate feedback on whether the other party is typing or composing a message. This feature enriches user interactions, making them feel more natural and dynamic.

## How It Works
The system operates through client-side JavaScript events that detect when text input begins (e.g., pressing 'a' key) or specific actions like backspace or paste occur. These triggers initiate a WebSocket connection to the server, periodically sending updates to indicate typing activity. Once typing ceases for a set period (e.g., 1 second), the indicator is removed.

## Key Features
- **Real-Time Updates**: Instantly informs users when someone starts typing.
- **Versatile Triggers**: Detects various actions including text input, backspace, and paste.
- **Cross-Platform Compatibility**: Works seamlessly across different devices and platforms.
- **Efficient Handling**: Gracefully manages network fluctuations to minimize false indicators.

## Why It Matters
This module significantly enhances user experience by:
- Reducing waiting time anxiety during messaging.
- Providing clear feedback on ongoing interactions.
- Increasing user satisfaction through more natural communication flow.

## Usage Scenarios
1. **Instant Messaging Apps**: Real-time indicators improve conversational clarity.
2. **Social Media Platforms**: Enhances the feel of live interaction among users.
3. **Customer Service Chats**: Assures users that agents are actively responding, building trust.
4. **Multi-Device Compatibility**: Ensures consistent experience across desktops, mobile devices, and tablets.

The Typing Indicator System is a crucial component for creating engaging and intuitive communication experiences in various applications.

# Typing Indicator System

## Feature: Real-Time Detection of User Input
The module detects when a user begins typing or composing a message, including text input, emoji selection, or formatting changes. This detection happens locally on the client side before any data is sent to the server.

## Feature: Immediate Server-Sent Updates
Once detected, the system sends this information to the server in real-time. The updates are transmitted using efficient mechanisms like WebSockets or long polling to ensure minimal latency.

## Feature: Visual Indication of Typing Status
The module provides customizable visual indicators that display the typing status to other users. This can be a simple text message ("User is typing..."), an animated icon, or any other UI element defined by the developer.

## Feature: Handling Pauses and Stops
The system includes logic to detect when a user has stopped typing, such as after a brief pause (e.g., 1-2 seconds). It then stops sending typing indicators to avoid unnecessary updates.

## Feature: Offline Detection and Handling
If either user loses connectivity or the server is temporarily unavailable, the module gracefully handles this scenario. Typing indicators may be disabled or shown as "offline" until the connection is restored.

## Feature: Privacy Controls
Users can choose to enable or disable their typing indicator visibility. This provides an added layer of privacy control for users who prefer not to show when they are composing a message.

## Feature: Performance Optimization
The module is designed with lightweight code and efficient data transmission to minimize performance impact on both the client and server sides. It avoids excessive resource usage while maintaining real-time functionality.

## Feature: Cross-Platform Compatibility
The system supports multiple platforms, including web browsers, mobile devices, and desktop applications. The indicators are adapted to fit each platform's UI/UX standards and capabilities.

## Feature: Customizable Indicators
Developers can customize the appearance and behavior of typing indicators to match their application's design. This includes changing colors, text, animations, or even implementing entirely new types of indicators.

## Feature: Integration with Message History
The module integrates seamlessly with message history systems. If a user starts typing but does not send a message, the system can still record this activity for reference in chat logs or transcripts.

## Feature: Error Handling and Logging
The system includes robust error handling to manage network issues, server errors, or unexpected client-side events. It also provides logging capabilities to help developers troubleshoot integration issues.

# Typing Indicator System Documentation

This module provides functionality to indicate when a user is typing in a communication application. It allows real-time updates on the typing status of users.

## Components

### 1. FastAPI Endpoint (Backend)

Below is an example of a FastAPI endpoint that handles typing indicators:

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

class TypingStatus(BaseModel):
    user_id: int
    status: bool  # True if typing, False otherwise

# Mock database (replace with actual database)
typing_status_db = {}

@router.post("/typing-status", response_model=TypingStatusResponse)
async def update_typing_status(typing_status: TypingStatus):
    """
    Update the typing status of a user.
    """
    try:
        typing_status_db[typing_status.user_id] = typing_status.status
        return {"message": "Typing status updated successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### 2. React UI Component (Frontend)

Here's a React component that displays the typing indicator:

```javascript
import React, { useState, useEffect } from 'react';

const TypingIndicator = () => {
    const [isTyping, setIsTyping] = useState(false);

    // Poll every 3 seconds to check for typing status updates (not ideal in production)
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const response = await fetch('/typing-status');
                const data = await response.json();
                setIsTyping(data.is_typing);
            } catch (error) {
                console.error('Error fetching typing status:', error);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="typing-indicator">
            {isTyping ? (
                <span>typing...</span>
            ) : (
                <span>ready to chat</span>
            )}
        </div>
    );
};

export default TypingIndicator;
```

### 3. Data Schema (Pydantic)

Here's the Pydantic schema for the typing status:

```python
from pydantic import BaseModel

class TypingStatus(BaseModel):
    user_id: int
    is_typing: bool

class TypingStatusResponse(BaseModel):
    message: str
    error: Optional[str] = None
```

## Features

1. **Real-time updates**: The system provides real-time feedback on when a user is typing.
2. **Efficient resource usage**: Minimal server load due to client-side polling and lightweight data transfers.
3. **User-friendly interface**: Clear visual indicators for typing status.

## Notes

- For production use, consider implementing WebSocket connections instead of HTTP polling for better real-time performance.
- The mock database (`typing_status_db`) should be replaced with an actual database in a production environment.

# Typing Indicator System Module Documentation

## Overview
The Typing Indicator System module provides a real-time communication feature indicating when another user is composing a message.

## Related Modules
- **WebSocket Handler**: Manages real-time messaging.
- **Message Router**: Routes messages to appropriate recipients.
- **User Presence Manager**: Tracks online users and their statuses.
- **Notification Service**: Handles user notifications.
- **UI Framework**: Manages visual elements for end-users.

## Use Cases

1. **Initiating Typing Status**  
   When a user starts typing, the system sends a "typing" event to indicate they are composing a message.

2. **Handling Multiple Users**  
   The system can track and display typing indicators for multiple users simultaneously in a chat interface.

3. **Stopping Typing Indicator**  
   If a user stops typing or pauses for more than 1,000ms, the indicator is removed, and a "stopped typing" event is sent.

4. **Network Issues**  
   The system includes retry logic to handle temporary network disruptions when sending typing indicators.

5. **Persistence Beyond Session**  
   Typing statuses can be persisted beyond a single session using a database or cache for continuity across sessions.

## Integration Tips

1. **WebSocket Integration**: Use WebSocket protocol to enable real-time updates of typing indicators between the server and client.
2. **Event Handling**: Implement event listeners on the client side to display the typing indicator when receiving "typing" events.
3. **Database Integration**: Store typing statuses in a database to maintain state across server restarts or for logging purposes.
4. **Asynchronous Operations**: Use asynchronous programming to handle multiple typing indicators without blocking the main thread.
5. **UI Considerations**: Design UI components that dynamically show/hide typing indicators based on received events.

## Configuration Options

| Setting                  | Description                                                                 | Default Value |
|--------------------------|-----------------------------------------------------------------------------|--------------|
| `enable_typing_indicator` | Enables or disables the typing indicator feature.                         | true         |
| `typing_timeout`          | Time (ms) after which typing stops being detected if no new characters are received. | 1000        |
| `max_concurrent_typers`   | Maximum number of users that can be shown as typing simultaneously in a chat. | 5           |
| `notification_interval`    | Frequency (ms) of sending typing status updates to the server.            | 300         |
| `heartbeat_enabled`       | Enables periodic heartbeat messages to keep the connection alive.          | true         |

## Example Usage

```javascript
// Initialize Typing Indicator with default configurations
const typingIndicator = new TypingIndicatorSystem();

// Start typing
typingIndicator.startTyping();

// Stop typing after 10 seconds
setTimeout(typingIndicator.stopTyping, 10000);
```

## Conclusion
The Typing Indicator System enhances user communication by providing real-time feedback on message composition. By integrating with related modules and using the provided configurations, developers can efficiently implement this feature in their applications.