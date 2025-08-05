---
title: "Account Verification Workflow"
code: "VER"
category: "Authentication"
subcategory: "Standard"
summary: "Ensure email or phone number is confirmed before enabling full access."
price: "$500"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/cloudservices/sendgrid.png
  - /assets/modules/devops/vercel.png
  - /assets/modules/language/react.png
---

# Account Verification Workflow Overview

## Summary
The Account Verification Workflow module enforces user verification through email or phone number before granting full access, enhancing security and compliance.

## Purpose
This module addresses the critical need for account verification to prevent unauthorized access. It ensures that only legitimate users can proceed beyond basic system features, thereby safeguarding sensitive data and aligning with regulatory requirements.

## Benefits
- **Enhanced Security**: Mitigates risks of compromised accounts by requiring verification.
- **Regulatory Compliance**: Ensures adherence to legal standards for user authentication.
- **User Trust**: Builds confidence through transparent and secure access processes.
- **Flexibility**: Supports multiple verification methods (email, phone) catering to different user preferences.

## Usage Scenarios
1. **Preventing Unauthorized Access**:MANDATORY_VERIFICATION_DETAILED_DESCRIPTION
2. **Ensuring Data Accuracy**:VALIDATION_OF_USER_INFORMATION_DESCRIPTION
3. **Selective Access Before Verification**:LIMITED_FUNCTIONALITY_BEFORE_VERIFICATION_DESCRIPTION
4. **Multiple Verification Options**:CHOICE_BETWEEN_EMAIL_OR_PHONE_VERIFICATION_DESCRIPTION

This overview provides a clear and structured understanding of the module's role, benefits, and applications in securing user accounts.

**Answer:**

The Account Verification Workflow module is designed to ensure secure and user-friendly account verification processes. Here's an organized breakdown of its key features and considerations:

1. **Unverified Account Handling**: 
   - Upon signup, accounts are inactive until email or phone number verification is completed. This enhances security by preventing unauthorized access.

2. **Verification Methods**:
   - Supports both email (verification links) and SMS (codes). Users can choose their preferred method, enhancing flexibility and convenience.

3. **Automated Verification Links**:
   - These links are time-sensitive to ensure security, expiring after a set period to prevent misuse.

4. **Resend Options**:
   - Allows users to request re-sending verification messages if not received, with potential limits to prevent abuse.

5. **Verification Status Management**:
   - Manages states (unverified, verified, expired) and transitions between them, crucial for accurate tracking.

6. **User Lockout Mechanisms**:
   - Implements locks after multiple failed attempts to prevent brute-force attacks, with clear definitions of what constitutes a failed attempt.

7. **Integration and Customization Features**:
   - Offers APIs and hooks for customization, enabling tailored verification processes across different applications.

8. **Audit Logging**:
   - Tracks all verification activities for debugging and security purposes, ensuring accountability.

9. **Cross-Channel Verification**:
   - Enables users to use either email or phone number interchangeably for verification flexibility.

10. **Compliance and Security Features**:
    - Ensures data security with encryption and compliance with regulations like GDPR and CCPA.

**Additional Considerations:**

- **Verification Link Expiry**: Links expire after a set period, with options to request new ones without waiting.
- **Handling Domain Blocks**: Potential support for alternative methods or retries if email delivery fails.
- **Security Measures**: Implementation of CAPTCHA or other mechanisms to prevent bot attacks on SMS codes.

This module addresses specific needs in security and user experience, with developers needing to know implementation details for effective integration.

# Account Verification Workflow Documentation

This module provides functionality to verify user accounts via email or phone number before granting full access to the application. The workflow ensures secure and authenticated access by validating user credentials.

## Components

### 1. FastAPI Endpoint for Verification

The following FastAPI endpoint handles account verification using a token:

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from pydantic import BaseModel, EmailStr
from datetime import datetime, timedelta
import jwt
from ..models.user import User
from ..database import database

router = APIRouter()

class VerificationToken(BaseModel):
    token: str
    email: EmailStr

@router.get("/verify")
async def verify_account(
    token: Annotated[str, Query()],
    db: Session = Depends(database.session),
):
    # Check if user is already verified
    user = await db.query(User).filter(User.verification_token == token).first()
    
    if not user:
        raise HTTPException(status_code=404, detail="Token not found or expired")
    
    if user.is_verified:
        return {"message": "Account already verified"}
    
    # Validate token and update user status
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.JWT_ALGORITHM])
        expire_date = datetime.fromisoformat(payload.get("expires"))
        
        if expire_date < datetime.now():
            raise HTTPException(status_code=422, detail="Token expired")
        
        user.is_verified = True
        user.verification_token = None  # Clear token after verification
        db.commit()
        
        return {"message": "Account successfully verified"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### 2. React UI for Verification

The following React component handles the user interface for verification:

```javascript
import React, { useState } from 'react';
import axios from 'axios';

const VerifyAccount = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleVerify = async () => {
        try {
            setLoading(true);
            setError('');
            
            // Verify account using token
            const response = await axios.get('/api/verify', {
                params: {
                    token: new URLSearchParams(window.location.search).get('token')
                }
            });
            
            if (response.data.message === 'Account already verified') {
                window.location.href = '/';
            } else {
                alert('Verification successful!');
                window.location.href = '/';
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1>Account Verification</h1>
            
            {error && <p className="error">{error}</p>}
            
            {!loading ? (
                <>
                    <p>Please verify your account using the link sent to your email.</p>
                    <button onClick={handleVerify} className="btn">Verify Now</button>
                </>
            ) : (
                <div className="loading">
                    Verifying...
                </div>
            )}
            
            {error && !loading ? (
                <a href="/auth/login" className="resend-link">
                    Resend Verification
                </a>
            ) : null}
        </div>
    );
};

export default VerifyAccount;
```

### 3. Pydantic Data Schema

The following Pydantic model defines the user data schema:

```python
from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class User(BaseModel):
    id: str
    email: EmailStr
    phone_number: Annotated[str, Field(min_length=10, max_length=15)]
    is_verified: bool = False
    verification_token: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    
    class Config:
        orm_mode = True
```

## Explanation

### FastAPI Endpoint

- **Path**: `/api/verify`
- **Method**: GET
- **Description**: Verifies user account using a token. Checks if the user already exists and verifies their account status.
- **Parameters**:
  - `token`: Verification token sent via email or SMS.

### React Component

- **Functionality**:
  - Displays verification message with an optional "Resend Verification" link.
  - Handles token validation and redirects to home page upon successful verification.
  - Shows loading state during the verification process.
  
### Pydantic Schema

- **Model**: `User`
- **Fields**:
  - `id`: Unique identifier for the user.
  - `email`: Email address of the user (required).
  - `phone_number`: Phone number of the user (optional).
  - `is_verified`: Boolean indicating if account is verified.
  - `verification_token`: Temporary token used for verification.
  - `created_at` and `updated_at`: Timestamps tracking creation and modification.

## Usage

- **Developers** should integrate this module to ensure all users verify their accounts before accessing sensitive functionality.
- **Endpoints** must be secured with proper authentication middleware.
- **UI Components** should handle token validation and display appropriate error messages if verification fails.

# Account Verification Workflow Module

## Summary
The **Account Verification Workflow** module ensures that users verify their email addresses or phone numbers before accessing certain features of your application. This adds an additional layer of security and helps prevent unauthorized access.

## Related Modules
- **User Authentication**: Handles user login and session management.
- **Email Service**: Sends verification emails to users.
- **SMS Service**: Sends verification codes via SMS.
- **Audit Logs**: Tracks user activities for monitoring purposes.
- **Security Policies**: Enforces security rules and restrictions.

## Use Cases

### 1. Email Verification
- Users are required to verify their email addresses before accessing sensitive features.
- Example: A user registers with an email address but must confirm it via a verification link sent to their inbox.

### 2. Two-Factor Authentication (2FA)
- Combines email and SMS verification for enhanced security.
- Example: After entering their password, users are prompted to enter a verification code sent to their phone number.

### 3. Phone Number Verification
- Users verify their phone numbers instead of or in addition to email addresses.
- Example: A user provides their phone number during registration and receives a verification code via SMS.

## Integration Tips

1. **Hooks for Triggers**:
   - Use hooks in the User Authentication module to trigger the Account Verification Workflow upon user registration or login attempts.
   
2. **Verification Endpoints**:
   - Provide API endpoints for developers to integrate the verification process seamlessly into their applications.

3. **UI/UX Considerations**:
   - Display verification status during login or account setup to inform users of their current status.

## Configuration Options

| **Parameter Name**                | **Type**       | **Default Value** | **Description**                                                                 |
|------------------------------------|----------------|-------------------|---------------------------------------------------------------------------------|
| `enable_email_verification`        | Boolean        | true              | Enables email verification for users.                                          |
| `enable_sms_verification`          | Boolean        | false             | Enables SMS verification for users.                                            |
| `verification_required_on_login`   | Boolean        | true              | Requires verification before allowing full access to the application.       |
| `verification_code_expiration`     | Integer       | 15                | Time in minutes that a verification code remains valid.                      |
| `max_verification_retries`         | Integer       | 3                 | Maximum number of failed attempts before blocking the user temporarily.      |

## Conclusion
The **Account Verification Workflow** module is essential for ensuring secure and reliable user access to your application. By integrating this module, you can enhance user trust and protect sensitive data from unauthorized access.