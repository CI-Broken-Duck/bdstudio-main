---
title: "Custom Branding Controls"
code: "BRND"
category: "Admin"
subcategory: "Gold"
summary: "Set logos, favicons, themes, and titles for white-labeled instances."
price: "$2000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/language/react.png
  - /assets/modules/tools/vscode.png
  - /assets/modules/cloudservices/firebase.png
---

# Custom Branding Controls Overview

## Module Name: Custom Branding Controls  
**Category:** Admin  

## Summary  
The Custom Branding Controls module empowers administrators to seamlessly customize the visual identity and user experience of their white-labeled instances. This module allows for the effortless management of logos, favicons, themes, and titles, enabling organizations to create a unique brand presence while maintaining consistency across platforms.

## Overview

### Purpose
The Custom Branding Controls module is designed to provide administrators with full control over the visual elements that define their organization's online presence. It simplifies the process of tailoring these elements for different white-labeled instances, ensuring each instance reflects the brand identity without compromising on quality or consistency.

### Key Features
- **Comprehensive Customization:** Manage logos, favicons, themes, and titles to create a cohesive and professional visual identity.
- **Seamless Deployment:** Easily deploy custom branding elements across multiple instances with real-time updates for an immediate impact.
- **Flexible Configuration:** Tailor settings to suit both small-scale operations and large enterprises, offering scalability in customization.
- **Secure Management:** Maintain control over branding assets with secure access and versioning to ensure data integrity and security.

### Benefits
- **Enhanced Brand Identity:** Stand out by creating a unique visual identity that resonates with your brand values and attracts users effectively.
- **Improved User Experience:** Deliver a consistent and visually appealing interface, enhancing user engagement and satisfaction.
- **Increased Credibility:** A professional look fosters trust, crucial for building credibility in the market.
- **Efficient Management:** Streamline the branding process with centralized control, saving time and reducing manual effort.

### Usage Scenarios
1. **Onboarding New Clients:** Quickly configure branding elements during onboarding to meet client-specific requirements, ensuring a personalized experience from the start.
2. **Updating Branding Elements:** Effortlessly update logos, themes, or favicons across all instances when rebranding occurs, maintaining consistency without manual intervention.
3. **Maintaining Consistency:** Ensure that all instances of your white-labeled products consistently reflect your brand identity and values, even as other elements evolve.
4. **Managing Multiple Accounts:** Efficiently handle branding for diverse accounts with tailored settings, catering to the unique needs of each client while maintaining control.

### Conclusion
The Custom Branding Controls module is a powerful tool that empowers administrators to create, manage, and deploy custom branding elements effortlessly. It offers flexibility, security, and ease of use, making it an essential asset for organizations looking to enhance their online presence and user experience.

## Module Name: Custom Branding Controls  
**Category:** Admin  
**Summary:** This module allows administrators to customize branding elements such as logos, favicons, themes, and titles for white-labeled instances.  

---

## White-Labeling Support  
This feature enables the removal of default branding elements and replaces them with custom ones provided by the administrator. It ensures that the end-user sees a completely branded experience tailored to their needs.  

---

## Logo and Icon Management  
The module allows uploading and managing logos (e.g., primary logo, favicon) in various formats and sizes. This ensures consistency across different platforms and devices.  

---

## Theme Customization  
Administrators can define custom color schemes, fonts, and layout preferences for the application's theme. These settings are applied dynamically to ensure a cohesive brand experience.  

---

## Dynamic Branding Injection  
The module provides hooks and APIs to inject custom CSS/JavaScript files at runtime, enabling developers to apply advanced branding without modifying core application code.  

---

## Multi-Instance Support  
This feature allows administrators to manage multiple white-labeled instances independently, each with its own set of branding assets and configurations.  

---

## Caching and Performance Optimization  
Custom branding assets are cached for improved performance. The module also provides mechanisms to invalidate caches when new branding elements are deployed.  

---

## Audit Trail for Branding Changes  
The module tracks changes made to branding settings, including who made the change, when it was made, and what specific modifications were applied. This is useful for auditing purposes.  

---

## Fallback Mechanism for Missing Assets  
If custom branding assets fail to load, the module provides a fallback mechanism that uses default branding elements until the custom assets are restored.  

---

## Cross-Platform Consistency  
The module ensures that custom branding elements render consistently across different platforms (e.g., web, mobile, desktop) and devices.  

---

## API and Integration Capabilities  
The module includes APIs for programmatic management of branding assets, such as uploading/downloading logos, themes, and favicons, as well as checking the status of cached assets.  

This documentation provides a comprehensive overview of the features and functionalities of the Custom Branding Controls module, designed to help developers integrate and manage custom branding effectively.

# Custom Branding Controls Documentation

This module provides functionality to manage custom branding elements (logo, favicon, theme, title) for white-labeled instances. The documentation includes code samples for a FastAPI endpoint, a React UI component, and a data schema.

---

## 1. FastAPI Endpoint

The following is an example of a FastAPI endpoint that handles updating branding settings:

```python
from fastapi import APIRouter, Depends, HTTPException, status
from typing import Optional
from pydantic import BaseModel
from sqlalchemy.orm import Session
from ..auth import get_current_user, verify_admin_access
from ..models.settings import BrandingSettings

router = APIRouter(prefix="/admin/branding", tags=["admin"])

# Define the request model for branding settings
class UpdateBrandingSettings(BaseModel):
    logo_url: Optional[str] = None
    favicon_url: Optional[str] = None
    theme_color: Optional[str] = None
    title: Optional[str] = None

@router.post("/update", dependencies=[Depends(get_current_user), Depends(verify_admin_access)])
async def update_branding(
    settings: UpdateBrandingSettings,
    db: Session = Depends(),
):
    """
    Update branding settings for the white-labeled instance.
    """
    try:
        # Get existing branding settings
        branding_settings = BrandingSettings.get(db)
        if not branding_settings:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Branding settings not found."
            )

        # Update each field if provided
        if settings.logo_url:
            branding_settings.logo_url = settings.logo_url
        if settings.favicon_url:
            branding_settingsfavicon_url = settings.favicon_url
        if settings.theme_color:
            branding_settings.theme_color = settings.theme_color
        if settings.title:
            branding_settings.title = settings.title

        # Commit changes to the database
        db.commit()
        
        return {"message": "Branding settings updated successfully."}
    
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )
```

---

## 2. React UI Snippet

The following is a React component that provides a form to update branding settings:

```javascript
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogFooter, Form, Input } from '@headlessui/react';

type BrandingSettings = {
    logoUrl?: string;
    faviconUrl?: string;
    themeColor?: string;
    title?: string;
};

export default function BrandingControlForm() {
    const [formData, setFormData] = useState<BrandingSettings>({
        // Initialize with existing values from your backend
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/branding/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to update branding settings');
            }

            alert('Branding settings updated successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <Dialog>
            <DialogContent className="w-full max-w-2xl">
                <DialogHeader>
                    <h1 className="text-xl font-bold">Update Branding Settings</h1>
                </DialogHeader>

                <Form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium">Logo URL:</label>
                            <Input
                                type="url"
                                value={formData.logoUrl || ''}
                                onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Favicon URL:</label>
                            <Input
                                type="url"
                                value={formData.faviconUrl || ''}
                                onChange={(e) => setFormData({ ...formData, faviconUrl: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Theme Color (Hex):</label>
                            <Input
                                type="color"
                                value={formData.themeColor || '#ffffff'}
                                onChange={(e) => setFormData({ ...formData, themeColor: e.target.value })}
                                className="mt-1 block rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Title:</label>
                            <Input
                                type="text"
                                value={formData.title || ''}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                            />
                        </div>

                        <DialogFooter>
                            <button
                                type="submit"
                                className="ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                        </DialogFooter>
                    </div>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
```

---

## 3. Data Schema (Pydantic)

The following is the Pydantic schema for branding settings:

```python
from pydantic import BaseModel
from typing import Optional

class UpdateBrandingSettings(BaseModel):
    logo_url: Optional[str] = None
    favicon_url: Optional[str] = None
    theme_color: Optional[str] = None
    title: Optional[str] = None

    class Config:
        json_schema_extra = {
            "example": {
                "logo_url": "https://example.com/logo.png",
                "favicon_url": "https://example.com/favicon.ico",
                "theme_color": "#ffffff",
                "title": "Custom Brand Name"
            }
        }
```

---



## Use Cases

### 1. Brand-Specific Logos and Favicons
- **Scenario**: A company wants to deploy multiple instances of an application, each with its own logo and favicon.
- **Implementation**: Use the Custom Branding Controls module to upload logos and favicons for each instance.

### 2. Dynamic Theme Application
- **Scenario**: An application needs to switch themes based on different environments (e.g., production vs. staging).
- **Implementation**: Configure the module to apply a specific theme for each environment by setting environment variables or configuration files.

### 3. Custom Titles and Meta Tags
- **Scenario**: A white-labeled product requires dynamic titles and meta tags for SEO purposes.
- **Implementation**: Use the Custom Branding Controls module to set custom titles and ensure they are reflected in HTML headers.

## Integration Tips

1. **Environment Variables**:
   - Use environment variables to store branding configurations (e.g., `CUSTOM_LOGO_PATH`, `THEME_MODE`).
   - This allows for easy overriding of default values without modifying code.

2. **Theme Application**:
   - Apply themes using CSS pre-processing or dynamic class names.
   - Ensure that theme files are stored in a specific directory structure for easy access.

3. **Image Upload and Optimization**:
   - Provide an API endpoint to upload logos and favicons, with built-in validation for image formats and dimensions.
   - Optimize images for different device sizes (e.g., mobile, tablet, desktop).

4. **Dynamic Configuration**:
   - Use configuration management tools (e.g., Ansible, Terraform) to apply branding settings across multiple instances.
   - Implement caching mechanisms for frequently accessed branding assets.

## Configuration Options

| Parameter                  | Description                                                                 | Data Type      | Default Value  | Example Value                     |
|----------------------------|-----------------------------------------------------------------------------|----------------|---------------|-----------------------------------|
| `custom-logo-path`        | Path to the custom logo file.                                                | String         |               | `/public/images/logo.png`          |
| `theme-mode`              | Mode for theme application (e.g., light, dark, custom).                      | Enum           | `light`       | `dark`                             |
| `favicon-url`             | URL to the favicon asset.                                                    | String         |               | `/public/favicon.ico`              |
| `custom-title-prefix`     | Prefix for the page title (e.g., brand name).                                | String         |               | `"My Brand - "`                     |
| `brand-color-code`        | Hex code for primary brand color.                                           | String         | `#000000`     | `#FF0000`                          |
| `enable-branding`         | Enable or disable custom branding features.                                  | Boolean        | `true`        | `false`                            |

## Note
- Ensure that all branding assets are properly cached to improve performance.
- Test different themes and configurations in a staging environment before deploying to production.

This documentation provides a comprehensive guide for integrating and configuring the Custom Branding Controls module, enabling developers to create tailored brand experiences across multiple instances.


## Summary
The **Custom Branding Controls** module allows administrators to set up and customize branding elements such as logos, favicons, themes, and titles for white-labeled instances. This module is designed to provide flexibility in managing brand-specific configurations for different environments.
