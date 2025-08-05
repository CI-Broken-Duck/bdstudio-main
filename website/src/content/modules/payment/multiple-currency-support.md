---
title: "Multiple Currency Support"
code: "CUR"
category: "Payment"
subcategory: "Gold"
summary: "Allow users to pay in their local currency."
price: "$2000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/cloudservices/stripe.png
  - /assets/modules/devops/vercel.png
  - /assets/modules/language/react.png
  - /assets/modules/databases/postgresql.png
---

# Overview: Multiple Currency Support Module

The **Multiple Currency Support** module is designed to enhance payment processing by enabling businesses to accept payments in multiple currencies seamlessly. This feature caters to global users, allowing them to make transactions using their local currency, thereby improving accessibility and reducing friction during checkout.

## Purpose
The primary purpose of this module is to facilitate cross-border payments and streamline the payment experience for users worldwide. By supporting multiple currencies, businesses can cater to a broader customer base and provide a more localized payment option.

## Benefits
- **Enhanced User Experience**: Users can pay in their preferred currency, making transactions more intuitive and reducing cart abandonment.
- **Reduced Payment Failures**: Currency mismatches are minimized, leading to fewer failed payments and higher transaction success rates.
- **Simplified Integration**: The module abstracts the complexities of multiple currencies, allowing developers to focus on core business logic without delving into intricate currency conversion details.
- **Global Expansion**: Businesses can easily expand to new markets by offering local payment options, increasing customer satisfaction and sales volumes.

## Usage Scenarios
1. **E-commerce Platforms**: Online retailers can offer their products in multiple regions, each with its own currency, making it easier for customers to complete purchases.
2. **Subscription Services**: Businesses offering subscriptions can bill users in their local currency, reducing payment failures and improving customer retention.
3. **Marketplaces**: Multi-vendor platforms can allow sellers and buyers to transact in their preferred currencies, enhancing the overall marketplace experience.

## Conclusion
The Multiple Currency Support module is a powerful tool for developers looking to build scalable and user-friendly payment systems. By integrating this module, businesses can provide a seamless payment experience, foster customer trust, and drive global growth.

```markdown
## Multi-Currency Support

Enables users to make payments using their local currency, enhancing accessibility and user experience globally.

---

## Dynamic Currency Conversion (DCC)

Automatically converts payment amounts in real-time based on current exchange rates, allowing transactions in the user's preferred currency.

---

## Exchange Rate Management

Manages exchange rate updates and conversion calculations, ensuring accurate and up-to-date financial processing.

---

## Payment Gateway Integration

Integrates with multiple payment gateways to support various currencies and regions, providing flexible payment options for users.

---

## Session/Cookie-Based Currency Detection

Detects the user's location using session or cookie data to set their default currency, streamlining the checkout process.
```

# Multiple Currency Support Module

This module enables users to make payments using their local currency. It provides an API endpoint for processing payments in different currencies and a React component for displaying payment forms.

## FastAPI Endpoint

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
import os

router = APIRouter()

class PaymentRequest(BaseModel):
    amount: float
    currency_code: str
    description: Optional[str] = None

@router.post("/payment")
async def process_payment(
    payment_data: PaymentRequest,
    user_id: str = Depends(get_current_user),
    api_key: str = Depends(validate_api_key)
):
    """
    Process a payment request with specified amount and currency.
    
    Args:
        payment_data: Payment details including amount, currency_code, and optional description
        user_id: ID of the authenticated user
        api_key: Valid API key for authorization
        
    Returns:
        Dict with payment confirmation details
    """
    try:
        # Get user's preferred currency from database
        user_currency = await get_user_currency(user_id)
        
        if payment_data.currency_code != user_currency:
            raise HTTPException(
                status_code=403,
                detail="Cannot use a different currency than your account's default."
            )
            
        # Check if the currency is supported
        if payment_data.currency_code not in SUPPORTED_CURRENCIES:
            raise HTTPException(
                status_code=400,
                detail=f"Currency {payment_data.currency_code} is not supported."
            )
            
        # Process the payment using the selected currency
        payment_response = await process_payment_backend(payment_data)
        
        return {
            "status": "success",
            "transaction_id": payment_response.transaction_id,
            "amount": payment_response.amount,
            "currency": payment_response.currency_code
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
```

## React UI Component

```javascript
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = ({ amount, currencyCode }) => {
    const stripe = useStripe();
    const elements = useElements();
    
    const [description, setDescription] = useState('');
    
    const supportedCurrencies = ['USD', 'EUR', 'GBP', 'JPY']; // Example list
    
    return (
        <div className="payment-form">
            <h2>Payment Details</h2>
            
            <div className="form-group">
                <label>Currency:</label>
                <select 
                    value={currencyCode}
                    onChange={(e) => setCurrencyCode(e.target.value)}
                >
                    {supportedCurrencies.map(currency => (
                        <option key={currency} value={currency}>
                            {currency}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(parseFloat(e.target.value))}
                />
            </div>

            <div className="form-group">
                <label>Description:</label>
                <textarea 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </div>

            <button type="submit">Complete Payment</button>
        </div>
    );
};

export default PaymentForm;
```

## Pydantic Data Schema

```python
from pydantic import BaseModel
from typing import Optional

class Currency(BaseModel):
    code: str
    symbol: str
    name: str
    exchange_rate: float
    
class PaymentRequest(BaseModel):
    amount: float
    currency_code: str
    description: Optional[str] = None
    
class TransactionResponse(BaseModel):
    transaction_id: str
    amount: float
    currency: str
    status: str
    payment_date: str
```

## Notes

1. The FastAPI endpoint requires authentication via API key.
2. Currency support is determined based on predefined `SUPPORTED_CURRENCIES`.
3. Integration with payment gateways like Braintree, Stripe, or PayPal is recommended for actual currency processing.
4. Implement proper error handling for invalid currencies and amounts.
5. Consider adding rate limiting and validation decorators in production.

```markdown
# Multiple Currency Support Module

## Summary
The **Multiple Currency Support** module enables users to make payments using their local currency. This feature enhances the payment experience by allowing seamless conversions and providing a localized payment option.

---

## Related Modules
- **Payment Gateway Integration**: Handles integration with various payment gateways.
- **Session Management**: Manages user sessions to determine the preferred currency.
- **Exchange Rate Management**: Provides real-time exchange rates for currency conversion.
- **User Settings**: Allows users to select and manage their preferred currencies.

---

## Use Cases

### 1. Local Currency Display
- Users see product prices in their local currency based on their geolocation or session settings.
- Payments are processed in the user's preferred currency, converted to the merchant's base currency.

### 2. Multi-Currency Merchant Support
- Merchants can offer products in multiple regions with different pricing in each region’s currency.
- The system automatically converts payments from the customer’s currency to the merchant’s base currency.

### 3. Currency Conversion Error Handling
- If a user selects a currency that is not supported, the system displays an error message and defaults to the primary currency.

---

## Integration Tips

1. **Session Management**:
   - Ensure session handling is efficient when switching currencies.
   - Use cookies or localStorage to persist the user’s preferred currency across sessions.

2. **Exchange Rate Updates**:
   - Integrate a reliable exchange rate provider (e.g., Open Exchange Rates, ECB).
   - Update exchange rates regularly (every 15 minutes) for accuracy.

3. **Payment Gateway Configuration**:
   - Ensure payment gateways support multiple currencies.
   - Test integration with at least two different currencies to verify functionality.

4. **Testing**:
   - Conduct thorough testing across different regions and time zones.
   - Verify that currency conversions are accurate and that error handling works as expected.

5. **Error Handling**:
   - Provide clear error messages if a currency is not supported or if the exchange rate is unavailable.
   - Implement fallback mechanisms to default to a primary currency in such cases.

---

## Configuration Options

| **Setting**                     | **Description**                                                                 | **Example Values**               |
|----------------------------------|---------------------------------------------------------------------------------|-----------------------------------|
| `enabled_currencies`           | List of supported currencies (ISO 4217 codes).                                  | ["USD", "EUR", "GBP"]             |
| `default_currency`              | Default currency for users without a preferred currency.                       | "USD"                            |
| `exchange_rate_provider`        | Service or API used to fetch exchange rates.                                   | "open-exchange-rates", "ecb"       |
| `session_currency_cookie`       | Name of the cookie used to store the user’s selected currency.                 | "selected-currency"              |
| `payment_gateway_behavior`      | How payment gateways handle multiple currencies (e.g., auto-convert, manual).  | "auto-convert", "manual-selection"|

---

## Conclusion
The **Multiple Currency Support** module is essential for creating a globally accessible payment system. By enabling users to pay in their local currency, businesses can provide a seamless and user-friendly experience while simplifying cross-border transactions.

```