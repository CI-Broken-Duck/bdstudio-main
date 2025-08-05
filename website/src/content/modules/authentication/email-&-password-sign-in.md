---
title: "Email & Password Sign-In"
code: "EPS"
category: "Authentication"
subcategory: "Included"
summary: "Standard login using registered email and secure password."
price: "$0"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/devops/vercel.png
  - /assets/modules/databases/postgresql.png
  - /assets/modules/language/react.png
---

# Overview: Email & Password Sign-In Module

## Purpose
The Email & Password Sign-In module is designed to facilitate user authentication through a familiar and secure mechanism. It allows users to log in using their registered email addresses and passwords, serving as the cornerstone of user access control within applications.

## Benefits

### Security
- **Encrypted Communication:** Transmissions are secured using HTTPS, ensuring data integrity and confidentiality.
- **Secure Password Handling:** Implements industry-standard password hashing (e.g., bcrypt) to protect sensitive information from unauthorized access.
- **Rate Limiting & Lockouts:** Prevents brute force attacks by limiting login attempts and temporarily locking accounts after a set number of failed tries.

### Reliability
- **Built-in Error Handling:** Robust mechanisms detect and handle errors such as invalid credentials, expired sessions, or server issues, ensuring smooth user experience.
- **Session Management:** Manages user sessions efficiently with secure cookie handling and session expiration policies to maintain authentication state across requests.

### User Experience (UX)
- **Familiar Interface:** Offers a standard login form that users are accustomed to, reducing the learning curve.
- **Customizable Fields:** Allows for customization of email and password fields, including placeholders and validation messages, enhancing adaptability to different design needs.

## Usage Scenarios

1. **User Authentication in Web Applications**
   - Enables registered users to access their accounts securely on websites or web-based applications.

2. **Mobile App Login**
   - Facilitates user sign-in within mobile applications, leveraging email and password as a primary authentication method before integrating with other services like OAuth for enhanced security.

3. **Legacy System Integration**
   - Provides a reliable fallback authentication mechanism for systems transitioning to more advanced multi-factor authentication solutions, ensuring continued access without disruption.

4. **High-Security Environments**
   - Serves as the first line of defense in scenarios where additional security layers (e.g., MFA) are applied, offering a strong initial barrier against unauthorized access.

5. **Distributed Systems**
   - Effectively manages user sessions across distributed environments, ensuring consistent authentication experiences and handling session replication if necessary.

## Conclusion
The Email & Password Sign-In module is an essential tool for developers seeking to implement secure and reliable user authentication within their applications. Its robust security features, flexibility in customization, and seamless integration capabilities make it a cornerstone for various authentication needs, from simple web apps to complex distributed systems.

## Features of Email & Password Sign-In Module

### 1. **Email-Based User Verification**
   - Users must verify their email to create an account, ensuring legitimacy and reducing spam.

### 2. **Secure Password Handling**
   - Passwords are hashed using secure algorithms (e.g., bcrypt) for storage, protecting against plaintext exposure.

### 3. **Account Lockout Mechanism**
   - Temporarily locks accounts after multiple failed login attempts to prevent brute force attacks.

### 4. **Password Reset Functionality**
   - Enables users to reset passwords via a verification process, enhancing security and convenience.

### 5. **Login Activity Logging**
   - Records login details for monitoring, auditing, and detecting suspicious activities.

### 6. **Cross-Platform Compatibility**
   - Ensures seamless functionality across various operating systems, devices, and browsers for consistent user experience.

### Module Name: Email & Password Sign-In
**Category:** Authentication  
**Summary:** Standard login using registered email and secure password.  
**Target User:** Developer  

This module provides authentication functionality for users to log in using their registered email address and password. The implementation includes secure password handling, user validation, and session management.

---

### 1. API Endpoint (FastAPI)

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from pydantic import EmailStr
from ..models.user import UserBase, UserInDB
from ..auth import authenticate_user, create_access_token

router = APIRouter()

@router.post("/api/auth/login", response_model=UserInDB)
async def login(
    user_data: UserBase,
    db: Annotated[Session, Depends(db_session)],
):
    """
    Authenticate user using email and password.
    - **Email:** Registered user email address
    - **Password:** Secure password for the account
    """
    try:
        user = await authenticate_user(db, user_data.email, user_data.password)
        if not user:
            raise HTTPException(status_code=401, detail="Incorrect email or password")
        
        # Create JWT token
        access_token = create_access_token(data={"email": user.email})
        return {"user": user, "access_token": access_token}
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Internal server error: {str(e)}"
        )
```

---

### 2. React UI Snippet

```react
import { useState, useEffect } from 'react';

function SignInForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError('');
            
            // Replace with actual API call
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            if (!response.ok) {
                throw new Error('Login failed');
            }

            const data = await response.json();
            window.localStorage.setItem('token', data.access_token);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message || 'Failed to log in');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <h2>Sign In</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging In...' : 'Sign In'}
                </button>
            </form>
        </div>
    );
}

export default SignInForm;
```

---

### 3. Data Schema (Pydantic)

```python
from pydantic import BaseModel, EmailStr

class LoginRequest(BaseModel):
    email: str
    password: str

    class Config:
        json_schema_extra = {
            "example": {
                "email": "user@example.com",
                "password": "secure_password123"
            }
        }
    
    # Exclude the model's own fields (like id, created_at)
    exclude_unset = True
```

---

### Summary

This module provides a secure email and password sign-in mechanism with:
- Password hashing for security
- JWT token generation for authentication
- Error handling for invalid credentials
- Loading states for UI feedback

The implementation can be integrated into any application that requires user authentication, ensuring secure and reliable login functionality.

# Email & Password Sign-In Module Documentation

## Summary
The **Email & Password Sign-In** module provides a standard login mechanism for users using their registered email address and password. This module is designed to integrate seamlessly with authentication systems, offering secure and user-friendly sign-in functionality.

---

## Related Modules

- **User Authentication API**: Handles user registration, login, and session management.
- **Database Integration**: Stores user credentials securely in a database.
- **Social Login**: Integrates third-party login methods (e.g., Google, Facebook).
- **Password Reset**: Manages password reset functionality for users.
- **Session Management**: Manages user sessions after successful login.

---

## Use Cases

1. **User Login**  
   - A registered user enters their email and password to access the system.  
   - The module verifies credentials and returns a session token if successful.

2. **Unauthenticated Access Handling**  
   - Users are redirected to the sign-in page when accessing protected resources without valid credentials.

3. **Password Reset Flow**  
   - If a user forgets their password, they can request a reset link via email. The module integrates with the Password Reset module for this functionality.

4. **Rate Limiting**  
   - The module implements rate limiting to prevent brute-force attacks on login attempts.

---

## Integration Tips

1. **Secure Password Hashing**  
   - Ensure passwords are stored as hashed values (e.g., using bcrypt or PBKDF2) and never plaintext.

2. **Rate Limiting**  
   - Implement rate limiting for failed login attempts to mitigate brute-force attacks.  

3. **HTTPS Enforcement**  
   - Always use HTTPS for communication between the client and server to protect sensitive data.

4. **CSRF Protection**  
   - Use CSRF tokens in login forms to prevent cross-site request forgery attacks.

5. **Session Management**  
   - After a successful login, implement secure session management with proper cookie handling.

---

## Configuration Options

| **Parameter**               | **Description**                                                                 | **Example Value**                     |
|------------------------------|---------------------------------------------------------------------------------|---------------------------------------|
| `enabled`                    | Enables or disables the Email & Password Sign-In module.                      | `true`                                |
| `password_policy`            | Enforces password complexity rules (e.g., length, special characters).         | `"min_length": 8, "require_special": true` |
| `email_verification`          | Requires email verification before login is allowed.                          | `true`                                |
| `token_expiry_time`          | Sets the expiration time for authentication tokens.                              | `1200` (seconds)                      |
| `rate_limit`                 | Configures rate limiting thresholds for failed attempts.                        | `max_attempts: 5, window_in_seconds: 60` |
| `secure_headers`             | Enforces secure headers like HSTS and CORS.                                    | `true`                                |
| `logging_level`              | Sets the logging level for authentication events (e.g., debug, info, error).    | `"info"`                              |

---

## Conclusion
The Email & Password Sign-In module is a critical component of user authentication systems. By integrating this module, developers can provide secure and reliable login functionality while adhering to best practices in security and usability.