---
title: "Custom Domain Routing"
code: "CDN"
category: "Admin"
subcategory: "Silver"
summary: "Map and serve content through personalized domains or subdomains."
price: "$1000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/devops/vercel.png
  - /assets/modules/cloudservices/cloudflare.png
  - /assets/modules/tools/vscode.png
---

# Custom Domain Routing Module

The **Custom Domain Routing** module empowers users to map content through personalized domains or subdomains, offering flexibility and control over how their application is presented online. Designed for developers and system administrators, this module enhances branding, SEO, and user trust by allowing custom domain configurations.

### Purpose
- **Purpose:** The module's primary goal is to provide a flexible routing mechanism that allows users to serve content through personalized domains or subdomains, catering to specific branding needs and enhancing the overall user experience.

### Benefits
- **Branding:** Enables users to showcase their application under their own domain, aligning it with existing branding efforts for a professional look.
- **SEO Optimization:** Custom domains can improve search engine rankings compared to generic URLs, aiding in better visibility.
- **Enhanced Control:** Admins gain control over routing policies, DNS settings, and SSL certificates, allowing for optimized performance and security tailored to their needs.

### Usage Scenarios
1. **Personalized Websites:** Each user can have a unique subdomain (e.g., client1.mysaas.com) or domain, providing a tailored experience.
2. **Marketing Campaigns:** Different domains can be used for various regions or languages, enhancing localization efforts.
3. **Technical Configurations:** Admins can set up DNS records (CNAME/A) and SSL certificates to ensure seamless integration with custom domains.

This module is essential for developers seeking to enhance their application's online presence through flexible and secure domain management.

## Key Features of Custom Domain Routing Module

### 1. **Domain Mapping**
   - **Description**: Enables users to map their custom domains or subdomains to specific applications or routes within your system.
   - **Explanation**: Users can input their domain name and associate it with a particular application or route, allowing content to be served through the specified domain.

### 2. **DNS Record Management**
   - **Description**: Assists in setting up DNS records (A, CNAME) for custom domains to point to your system's IP address.
   - **Explanation**: Provides guidance or automated tools to help users create the necessary DNS records, ensuring their domain resolves correctly to the intended service.

### 3. **Domain Validation**
   - **Description**: Verifies that a custom domain has been properly configured and is ready for use.
   - **Explanation**: Includes checks such as DNS record validation or HTTP header verification to ensure the domain is correctly set up before activation.

### 4. **Wildcard Subdomain Support**
   - **Description**: Allows users to route all subdomains of a custom domain to specific routes or applications.
   - **Explanation**: Useful for creating dynamic routing setups, where any subdomain (e.g., *.example.com) automatically maps to predefined routes within the system.

### 5. **SSL/TLS Certificate Management**
   - **Description**: Manages SSL/TLS certificates for custom domains to ensure secure connections over HTTPS.
   - **Explanation**: Automatically generates and deploys SSL certificates, eliminating the need for manual certificate management by users.

### 6. **Custom Domain Cleanup**
   - **Description**: Provides an option to remove unused or unwanted custom domains from your system.
   - **Explanation**: Allows admins to delete domain mappings and related configurations, keeping the system clean and efficient.

### 7. **Rate Limiting for Custom Domains**
   - **Description**: Implements rate limiting on requests made through custom domains to prevent abuse or overuse of resources.
   - **Explanation**: Helps control traffic volume by restricting the number of requests a domain can make within a specific timeframe, ensuring fair usage and system stability.

### 8. **Caching for Optimized Performance**
   - **Description**: Implements caching mechanisms to improve performance for frequently accessed routes under custom domains.
   - **Explanation**: Reduces latency by storing responses of frequently accessed routes, making subsequent requests faster and more efficient.

### 9. **Logging and Monitoring**
   - **Description**: Logs traffic and errors related to custom domains, providing insights into domain usage and health.
   - **Explanation**: Offers monitoring capabilities to track traffic patterns, detect issues, and ensure that custom domains are functioning as expected.

These features collectively provide a robust and flexible solution for managing custom domains, ensuring security, performance, and ease of use.



## Usage Examples
1. **Add a Custom Domain**:
```bash
curl -X POST http://admin-panel/api/custom-domains \
  -H "Content-Type: application/json" \
  -d '{"domain": "example.com", "subdomain": "blog"}'
```

2. **Update an Existing Domain**:
```bash
curl -X PUT http://admin-panel/api/custom-domains/123 \
  -H "Content-Type: application/json" \
  -d '{"domain": "newdomain.com", "subdomain": "api"}'
```

---

## Code Samples

### 1. FastAPI Endpoint (Python)
```python
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from pydantic import BaseModel

router = APIRouter(prefix="/api/custom-domains")

class CustomDomain(BaseModel):
    id: str
    domain: str
    subdomain: str
    is_active: bool = True
    created_at: str

# Mock database (replace with your DB)
custom_domains = []

@router.get("/", response_model=list[CustomDomain])
def get_custom_domains():
    return custom_domains

@router.post("/", response_model=CustomDomain)
def add_custom_domain(domain_data: CustomDomain):
    new_entry = domain_data.dict()
    custom_domains.append(new_entry)
    return new_entry

@router.put("/{domain_id}", response_model=CustomDomain)
def update_custom_domain(domain_id: str, domain_data: CustomDomain):
    for entry in custom_domains:
        if entry["id"] == domain_id:
            updated_entry = domain_data.dict()
            index = custom_domains.index(entry)
            custom_domains[index] = updated_entry
            return updated_entry
    raise HTTPException(status_code=404, detail="Custom Domain not found")
```

### 2. React UI Snippet (JavaScript/JSX)
```javascript
import React, { useState } from 'react';

interface CustomDomainForm {
  id?: string;
  domain: string;
  subdomain: string;
}

export const CustomDomainManager = () => {
  const [domains, setDomains] = useState<CustomDomain[]>([]);
  const [newDomain, setNewDomain] = useState<CustomDomainForm>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDomain.id) {
      // Update existing domain
      setDomains(domains.map(domain =>
        domain.id === newDomain.id ? { ...domain, ...newDomain } : domain
      ));
    } else {
      // Add new domain
      setDomains([...domains, { ...newDomain, id: Date.now().toString(), created_at: new Date().toISOString() }]);
    }
    setNewDomain({});
  };

  return (
    <div>
      <h1>Custom Domain Routing</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter domain (e.g., example.com)"
          value={newDomain.domain || ""}
          onChange={(e) => setNewDomain({ ...newDomain, domain: e.target.value })}
        />
        <input
          type="text"
          placeholder="Enter subdomain (e.g., blog)"
          value={newDomain.subdomain || ""}
          onChange={(e) => setNewDomain({ ...newDomain, subdomain: e.target.value })}
        />
        <button type="submit">Add Domain</button>
      </form>
      <div>
        {domains.map(domain => (
          <div key={domain.id}>
            <h3>{domain.domain}</h3>
            <p>Subdomain: {domain.subdomain}</p>
            <p>Status: {domain.is_active ? 'Active' : 'Inactive'}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
```

### 3. Pydantic Data Schema
```python
from pydantic import BaseModel, Field
from typing import Optional

class BaseDomain(BaseModel):
    domain: str = Field(..., description="Primary domain name")
    subdomain: str = Field(..., description="Subdomain prefix")

class CustomDomain(BaseDomain):
    id: str = Field(..., description="Unique identifier for the custom domain")
    is_active: bool = Field(True, description="Indicates if the domain is active")
    created_at: str = Field(..., description="Timestamp when the domain was created")
    notes: Optional[str] = Field(None, description="Optional notes about the domain configuration")
```

---



## Related Modules
- **Auth & Authentication**: Integrates with authentication mechanisms to enforce domain-specific user sessions.
- **Caching Layer**: Enhances performance by caching domain-specific content efficiently.
- **Logging & Monitoring**: Tracks domain routing activities for monitoring and troubleshooting.
- **Request Processing**: Handles and routes requests based on configured domains.
- **CDN Integration**: Optimizes content delivery through CDN with domain specificity.

## Use Cases
1. **Multi-Regional Support**  
   - Route traffic from eu.example.com to European servers and asia.example.com to Asian servers, ensuring localized content delivery.

2. **Custom Domain Portals**  
   - Allow users to set up portals like user123.example.com for personalized experiences.

3. **Path-Based Routing**  
   - Map /blog requests to blog.example.com, allowing subdomains for specific site sections.

4. **Wildcard Subdomains**  
   - Use *.example.com for various purposes, such as testing environments or customer-specific domains.

## Integration Tips
- **Combine with Auth & Caching**: Leverage authentication and caching for enhanced domain management.
- **Scalability Considerations**: Optimize configurations for high traffic by fine-tuning routing rules and using efficient DNS setups.
- **Performance Optimization**: Use CDNs to reduce latency and improve content delivery speed.
- **Security Measures**: Enforce HTTPS across all domains to ensure secure communication.

## Configuration Options

| **Option**              | **Description**                                                                 |
|--------------------------|---------------------------------------------------------------------------------|
| Domain Patterns          | Regular expressions or exact strings to match domains.                         |
| Subdomain Support       | Enable/disable subdomains for specific routes.                                 |
| Routing Rules            | Define rules based on paths (e.g., /blog) or hostnames (e.g., eu.example.com).|
| SSL Settings             | Enforce HTTPS, enable SNI, configure certificates.                             |
| Session Affinity         | Control session cookies to maintain user context across domains.                |
| Caching Behavior         | Specify caching strategies for domain-specific content.                        |

## Examples
- **Multi-Regional Setup**: Configure eu.example.com and asia.example.com with region-specific routing rules.
- **Custom Portal Example**: Set up user123.example.com by adding a custom domain pattern and corresponding route.
- **Path-Based Routing**: Map requests to blog.example.com using path-based domain patterns.

This documentation provides a structured approach to integrating and managing custom domains, ensuring efficient and secure content delivery.

## Conclusion
The Custom Domain Routing module provides developers with robust tools to manage domain configurations. By leveraging FastAPI for backend routing and React for frontend management, you can efficiently map and serve content through personalized domains or subdomains.

