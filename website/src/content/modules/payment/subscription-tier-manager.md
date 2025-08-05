---
title: "Subscription Tier Manager"
code: "SUB"
category: "Payment"
subcategory: "Gold"
summary: "Define and manage monthly or annual pricing plans."
price: "$2000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/cloudservices/stripe.png
  - /assets/modules/language/react.png
  - /assets/modules/databases/postgresql.png
---

```markdown
# Subscription Tier Manager Overview

The **Subscription Tier Manager** module provides a robust solution for defining and managing subscription pricing plans. It supports both monthly and annual billing cycles, allowing businesses to create flexible tiered subscription models tailored to different customer needs.

## Purpose
The purpose of the Subscription Tier Manager is to streamline the creation, management, and administration of subscription tiers. This module enables developers to define custom pricing structures, assign features or benefits to each tier, and manage proration rules for seamless upgrades/downgrades between plans. It is designed to handle complex subscription logic while providing a clear interface for managing subscriptions at scale.

## Benefits
The Subscription Tier Manager offers several key benefits:

1. **Flexible Tier Configuration**: Define an unlimited number of subscription tiers with custom pricing, features, and restrictions.
2. **Automatic Proration**: Handle prorated billing when users upgrade or downgrade between tiers without manual intervention.
3. **Cross-Platform Integration**: Easily integrate the module into existing payment systems, CRM tools, and customer-facing platforms.
4. **Usage Analytics**: Track subscription tier performance with built-in analytics and reporting features.

## Usage Scenarios
The Subscription Tier Manager is ideal for scenarios such as:

1. **Creating Custom Pricing Models**: Build tiered pricing structures to cater to different customer segments (e.g., individuals, small businesses, enterprises).
2. **Handling Trial Periods**: Manage free or discounted trial periods that seamlessly convert into paid subscriptions.
3. **Managing Upgrades/Downgrades**: Allow customers to switch between tiers effortlessly while handling proration and billing adjustments automatically.
4. **Analyzing Subscription Data**: Monitor subscription tier performance with real-time data, including churn rates, conversion rates, and revenue insights.

By leveraging the Subscription Tier Manager, developers can create a scalable, flexible, and user-friendly subscription management system that aligns with their business goals.

## Subscription Tier Manager Technical Documentation

### 1. Subscription Plans
The core of our system, this module allows businesses to define multiple subscription tiers with unique names, prices, durations (monthly or annual), and features. Each tier can be tailored to offer varying levels of access, such as basic vs. premium services, enabling a flexible pricing strategy.

### 2. Flexible Subscription Types
Supports both monthly and annual subscriptions, providing flexibility for businesses to cater to different customer preferences and market strategies, enhancing customer acquisition and retention through varied subscription options.

### 3. Pricing Rules
Configurable conditions that apply discounts or tier upgrades based on user behavior or purchase history. For example, bulk purchases can trigger a discount, or usage patterns may automatically elevate the user to a higher tier, enhancing customer value.

### 4. Trial Periods
Manages free trial periods (e.g., 7 or 14 days) to attract new customers. The module integrates with upselling features post-trial, converting trials into paid subscriptions and offering options for different tiers upon purchase.

### 5. Renewal Management
Automates subscription renewals by processing payments on behalf of the business, ensuring seamless operations without manual intervention. This feature minimizes customer churn by handling billing efficiently.

### 6. Usage Limits
Sets resource or service limits per tier to control access levels and ensure fair usage. Exceeding these limits can trigger notifications or automatic upgrades, guiding users to suitable plans.

### 7. Discounts and Promotions
Applies promotional offers such as percentage discounts or fixed amounts on subscriptions. Configurable for scenarios like first-time purchases or holidays, this feature aids in attracting and retaining customers through flexible pricing strategies.

### 8. Tier Upgrades/Downgrades
Enables dynamic changes to subscription tiers during the billing cycle. Customers can seamlessly move up for more features or down for cost savings, enhancing their experience with flexible options.

### 9. API Integration
Provides APIs for integration with third-party systems, allowing businesses to automate subscription management within their existing tech stack. Offers endpoints for operations like creating subscriptions, facilitating seamless integration and efficient workflow management.

### 10. Audit Logs and Reporting
Maintains comprehensive logs of all subscription-related activities, crucial for monitoring user actions, debugging issues, and ensuring compliance with regulations. These reports provide detailed insights into billing and usage trends, aiding in strategic decision-making.

### Subscription Tier Manager Documentation

#### 1. FastAPI Endpoint

This endpoint retrieves all available subscription tiers from the system.

```python
from fastapi import APIRouter, Depends
from typing import List
from pydantic import BaseModel

router = APIRouter(prefix="/subscription-tiers")

class SubscriptionTier(BaseModel):
    id: str
    name: str
    price: float
    duration: str  # "monthly" or "annual"
    features: List[str]
    is_active: bool

# Example response model
SubscriptionResponse = dict[str, any]

@router.get("/", response_model=List[SubscriptionTier])
async def get_subscription_tiers():
    """
    Retrieve all available subscription tiers.
    """
    # In a real implementation, this would query a database
    tiers = [
        SubscriptionTier(
            id="tier_1",
            name="Basic Tier",
            price=9.99,
            duration="monthly",
            features=["Basic features", "Limited usage"],
            is_active=True
        ),
        SubscriptionTier(
            id="tier_2",
            name="Pro Tier",
            price=29.99,
            duration="monthly",
            features=["Advanced features", "Unlimited usage", "Priority support"],
            is_active=True
        )
    ]
    return tiers
```

#### 2. React UI Snippet

This component fetches and displays subscription tiers using the API endpoint.

```javascript
import { useState, useEffect } from 'react';

const SubscriptionTiersList = () => {
    const [tiers, setTiers] = useState<SubscriptionTier[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    interface SubscriptionTier {
        id: string;
        name: string;
        price: number;
        duration: string;
        features: string[];
        is_active: boolean;
    }

    useEffect(() => {
        fetch('/api/subscription-tiers/')
            .then(response => response.json())
            .then(data => {
                setTiers(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Failed to fetch subscription tiers');
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h1>Available Subscription Tiers</h1>
            <ul>
                {tiers.map(tier => (
                    <li key={tier.id} className="subscription-tier">
                        <h3>{tier.name}</h3>
                        <p>Price: ${tier.price.toFixed(2)}</p>
                        <p>Duration: {tier.duration}</p>
                        <div>Features:</div>
                        <ul>
                            {tier.features.map(feature => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SubscriptionTiersList;
```

#### 3. Pydantic Data Schema

This defines the structure of a subscription tier.

```python
from pydantic import BaseModel

class SubscriptionTier(BaseModel):
    id: str
    name: str
    price: float
    duration: str  # "monthly" or "annual"
    features: List[str]
    is_active: bool
    
# Example usage:
subscription_tier = SubscriptionTier(
    id="tier_1",
    name="Basic Tier",
    price=9.99,
    duration="monthly",
    features=["Basic features", "Limited usage"],
    is_active=True
)
```

### Summary

- **FastAPI Endpoint**: `/api/subscription-tiers/` - Returns a list of subscription tiers with their details.
- **React Component**: Displays the subscription tiers in a user-friendly format.
- **Pydantic Model**: Defines the structure of a subscription tier, ensuring data consistency and validation.

The Subscription Tier Manager module is a crucial component of a SaaS application, designed to manage subscription plans effectively. Here's an organized overview based on the thought process:

### Module Overview
The Subscription Tier Manager module handles the creation, management, and assignment of subscription tiers, integrating seamlessly with other modules such as Auth & Permissions, Payment Gateway Integration, Customer Database, Usage Analytics, and Notifications.

### Related Modules
1. **Auth & Permissions**: Manages user authentication to ensure secure access.
2. **Payment Gateway Integration**: Processes transactions securely.
3. **Customer Database**: Stores user information for tier management.
4. **Usage Analytics**: Tracks user interactions to optimize offerings.
5. **Notifications**: Sends alerts about subscription statuses and changes.

### Use Cases
1. **Creating/Updating Pricing Tiers**: Administrators can define monthly or annual plans with flexible features.
2. **Assigning Tiers**: Users are assigned tiers based on criteria like usage or company size, with notifications for updates.
3. **Managing Subscriptions**: Handles payments, retries, and cancellations, ensuring efficient billing cycles.

### Integration Tips
- **API Endpoints**: Create endpoints for managing tiers and subscriptions.
- **Webhooks**: Implement for real-time updates without polling.
- **External APIs**: Integrate with other systems like analytics tools for seamless communication.

### Configuration Options
| Parameter                  | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| Plan Duration Units       | Set to 'month' or 'year'.                                                 |
| Payment Interval          | Choose between monthly, yearly, etc.                                      |
| Trial Period              | Specify length in days or months.                                          |
| Currencies                | Define supported currencies using ISO codes.                              |
| Feature Toggles            | Enable/disable features based on tier.                                  |
| Notification Templates     | Customizable for different subscription events.                            |
| User Attributes           | Define attributes (e.g., usage, company size) to assign tiers.              |

### Considerations and Insights
- **Edge Cases**: Handle scenarios like payment failures, tier upgrades/downgrades, and secure data handling.
- **Scalability**: Ensure optimization for high loads with real-time analytics.
- **Security**: Comply with regulations like PCI-DSS for data protection.
- **Testing**: Verify correct module updates and error handling.

### Conclusion
The Subscription Tier Manager is a comprehensive solution for managing subscription plans, requiring careful configuration and consideration of various edge cases to ensure smooth integration and operation.