---
title: "Two-Factor Authentication"
code: "TFA"
category: "Authentication"
subcategory: "Gold"
summary: "Enhance account security with optional 2FA via email or authenticator app."
price: "$2000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/cloudservices/sendgrid.png
  - /assets/modules/devops/vercel.png
  - /assets/modules/language/react.png
---

**Two-Factor Authentication Module Overview**

The Two-Factor Authentication (2FA) module enhances account security by requiring an additional verification step beyond passwords, significantly reducing unauthorized access risks. This module offers flexibility, allowing users to choose between email or authenticator app methods for their second factor of authentication.

**Benefits:**
- **Enhanced Security:** Safeguards accounts even if primary credentials are compromised.
- **Compliance:** Meets industry security standards and regulations.
- **User Trust:** Increases confidence in your platform's safety, fostering user satisfaction.

**Usage Scenarios:**
- Implement during registration or login to protect new users.
- Secure sensitive actions such as account modifications or financial transactions.
- Integrate into multi-layered security strategies for comprehensive protection.

This optional module provides developers with an easy-to-implement solution to bolster security, offering peace of mind for both users and your system.

## Key Features of the Two-Factor Authentication Module

### **Two-Factor Authentication (2FA) Support**
The module provides the core functionality to enable 2FA for user accounts. It integrates seamlessly into existing authentication workflows, requiring both a password and an additional verification factor during login.

### **Email-Based 2FA**
This feature allows users to receive a one-time verification code via email. The module securely handles code generation, distribution, and validation, ensuring that only the intended recipient can use the code.

### **Authenticator App Integration**
Supports authenticator apps like Google Authenticator and Authy for TOTP-based 2FA. This feature enhances security by enabling time-based codes, which are more secure than static codes.

### **Optional Enablement**
Administrators can optionally enforce 2FA for specific user groups or roles. Users with the option enabled must complete the second verification step during login.

### **Security Best Practices**
The module incorporates best practices such as rate-limiting to prevent brute force attacks, logging failed attempts, and encrypting sensitive data to protect against unauthorized access.

### **Integration Hooks**
Offers hooks and APIs for developers to integrate 2FA into their applications. This includes callbacks for login events, allowing enforcement of 2FA at appropriate points in the authentication process.

### **Session Management**
Manages sessions securely after successful 2FA verification. Features include session expiration handling and secure storage mechanisms to prevent session hijacking and maintain user security post-authentication.

### Module Name: Two-Factor Authentication  
**Category:** Authentication  
**Summary:** Enhance account security by adding optional two-factor authentication (2FA) using email or an authenticator app.

---

#### 1. **FastAPI Endpoint Example**  
This endpoint handles enabling 2FA for a user and verifying the 2FA code.

```python
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class RequestTwoFactor(BaseModel):
    user_id: str
    code: str

# Mock database to store users and their 2FA status
users_db = {
    "12345": {"email": "user@example.com", "two_factor_enabled": False, "two_factor_secret": None}
}

@router.put("/api/users/{user_id}/enable-2fa")
async def enable_two_factor(user_id: str, request: RequestTwoFactor):
    user = users_db.get(user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Verify 2FA code
    secret = user.get("two_factor_secret")
    if not secret:
        # Generate and store the secret (for authenticator app) or send via email
        secret = "mock-secret-123"
        users_db[user_id]["two_factor_secret"] = secret
        users_db[user_id]["two_factor_enabled"] = True
        return {"message": "2FA enabled successfully. Use the generated secret in your authenticator app."}
    
    if request.code == "123456":  # Mock verification
        users_db[user_id]["two_factor_enabled"] = True
        return {"message": "2FA enabled successfully"}
    else:
        raise HTTPException(status_code=401, detail="Invalid verification code")
```

---

#### 2. **React UI Snippet**  
This component handles the 2FA verification form.

```javascript
import React, { useState } from 'react';

function TwoFactorVerification({ userId }: { userId: string }) {
    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch(`/api/users/${userId}/enable-2fa`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ user_id: userId, code }),
            });
            alert('2FA enabled successfully!');
            window.location.href = '/dashboard';
        } catch (err) {
            setError('Failed to enable 2FA. Please try again.');
        }
    };

    return (
        <div className="container">
            <h1>Verify 2FA Code</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Enter 6-digit code"
                    required
                />
                {error && <p className="error">{error}</p>}
                <button type="submit">Enable 2FA</button>
            </form>
        </div>
    );
}

export default TwoFactorVerification;
```

---

#### 3. **Pydantic Data Schema**  
This schema defines the request body for enabling 2FA.

```python
from pydantic import BaseModel

class RequestTwoFactor(BaseModel):
    user_id: str
    code: str
    # Optional fields for additional validation (e.g., verifying it's a numeric code)
    __annotations__ = {
        "user_id": "Required string representing the user ID",
        "code": "Required string representing the 6-digit verification code",
    }

# Example usage:
# request_data = {"user_id": "12345", "code": "123456"}
```

---

**Summary:**  
This module provides a secure way to enable two-factor authentication for user accounts. The FastAPI endpoint handles the 2FA verification process, while the React component provides a simple UI for users to input their verification code. Pydantic ensures proper request validation and type safety.

# Two-Factor Authentication Integration Guide

## Overview
Two-Factor Authentication (2FA) enhances account security by requiring two forms of verification: something the user knows (password) and something they have (mobile app or code). This guide provides step-by-step instructions for integrating 2FA into your application using email or an authenticator app.

## Integration Steps

### Step 1: Decide on 2FA Requirements
- **Optional or Required**: Determine if 2FA will be optional during registration or mandatory for all users.
- **Method Selection**: Choose between email-based codes and/or authenticator apps (e.g., Google Authenticator).

### Step 2: Integrate with Authentication Flow
1. **Post-Password Verification**: After a user logs in with their password, check if 2FA is enabled.
2. **Prompt for 2FA Code**: If enabled, redirect or prompt the user to enter the 2FA code.

### Step 3: Implement Code Generation and Validation
- **TOTP Libraries**:
  - **Python**: Use `python-dototp` for TOTP generation.
  - **JavaScript**: Use `OTP-Auth` for authenticator app integration.
- **Email Setup**: Integrate with email services (e.g., SendGrid) to send codes via email.

### Step 4: Configure Settings
| Setting                   | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| Enable 2FA               | Toggle 2FA requirement.                                                    |
| Method Options            | Email, authenticator app, or both.                                         |
| Session Timeout (days)   | Default: 14 days; adjust based on security needs.                          |
| Code Expiration (minutes)| Default: 5 minutes; ensures timely verification.                           |
| SMS Fallback             | Enable/disable SMS as a backup method.                                    |

### Step 5: Handle Errors and Fallbacks
- **Error Handling**: Gracefully manage incorrect codes and multiple failed attempts.
- **Fallback Options**: Provide SMS as an alternative if primary methods fail.

### Step 6: Test Scenarios
- Simulate scenarios including:
  - Successful 2FA entry.
  - Expired or invalid codes.
  - Fallback to SMS.
  - Multiple failed attempts to prevent brute force attacks.

### Step 7: User Education and Monitoring
- **User Instructions**: Provide clear setup guides for authenticator apps, possibly with QR codes.
- **Monitoring**: Watch for suspicious activities and enhance alerts if detected.

## Conclusion
Integrating Two-Factor Authentication is a multi-step process involving careful configuration, error handling, and user education. By following these steps, you can significantly enhance your application's security.