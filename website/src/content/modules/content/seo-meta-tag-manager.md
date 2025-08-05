---
title: "SEO Meta Tag Manager"
code: "SEO"
category: "Content"
subcategory: "Silver"
summary: "Set custom titles, descriptions, and social tags for every page."
price: "$1000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/language/react.png
  - /assets/modules/tools/vscode.png
  - /assets/modules/devops/vercel.png
---

# SEO Meta Tag Manager Overview

## Purpose
The SEO Meta Tag Manager module is designed to streamline the process of managing custom titles, descriptions, and social media tags for web pages. Its primary goal is to enhance search engine optimization (SEO) and improve user engagement by providing a centralized way to set and manage meta tags effectively.

## Benefits
- **Enhanced SEO Performance**: By allowing developers to set custom titles and descriptions for each page, the module helps improve search engine rankings and click-through rates.
- **Improved User Experience**: Better meta tags result in more relevant and appealing search results, enhancing the overall user experience.
- **Efficient Management**: Centralized control over meta tags reduces the need for repetitive tasks and ensures consistency across the website.
- **Flexibility**: Supports custom configurations for different page types or sections, catering to diverse content needs.
- **Time-Saving**: Eliminates the need for hardcoding meta tags in individual files, saving development time and effort.

## Usage Scenarios
The SEO Meta Tag Manager is ideal for:
1. **E-commerce Websites**: Manage product pages with unique titles and descriptions to attract targeted traffic.
2. **Blogging Platforms**: Tailor meta tags for each blog post to improve SEO and drive organic growth.
3. **Multi-Language Sites**: Set language-specific meta tags to cater to global audiences.
4. **Social Media Sharing**: Configure Open Graph tags to enhance how content is shared on platforms like Facebook, Twitter, and LinkedIn.

This module empowers developers to optimize their websites' performance and user engagement with minimal effort, making it a valuable tool for modern web development.

# SEO Meta Tag Manager Module Documentation

## Customizable Page Titles
The SEO Meta Tag Manager allows developers to set unique page titles for each URL, enhancing search engine visibility and click-through rates. This feature ensures that each page can be optimized for specific keywords or user intents.

## SEO-Friendly Meta Descriptions
With this module, you can craft compelling meta descriptions that encourage users to click through from search results. These descriptions also play a significant role in improving your site's SEO performance by accurately reflecting the page content.

## Social Media Tags Management
Effortlessly manage Open Graph and Twitter card tags for each page. This feature ensures consistent social media sharing across platforms, enhancing your site's presence on social networks and improving engagement.

## Cross-Platform Compatibility
The module generates responsive meta tags that work seamlessly across various devices (desktops, tablets, mobile) and platforms (Google, Facebook, etc.), ensuring optimal performance regardless of how users access your content.

## Batch Updates/Deletes
Efficiently update or delete multiple meta tags in a single operation. This feature is particularly useful for large sites with numerous pages, allowing developers to streamline their workflow and maintain SEO consistency across the board.

# Technical Documentation for SEO Meta Tag Manager Module

## Overview
This module allows developers to manage custom titles, descriptions, and social media tags for web pages. The following examples demonstrate integration using FastAPI (backend) and React (frontend).

---

## 1. FastAPI Endpoint Example

```python
from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
import models.database as db

router = APIRouter(prefix="/meta-tags")

class CreateMetaTagRequest(BaseModel):
    title: str
    description: str
    social_tags: list[str]  # e.g., ["#SEO", "#WebDev"]
    published: Optional[bool] = True

@router.post("/", response_model=models.MetaTagResponse)
async def create_or_update_meta_tag(
    request_data: CreateMetaTagRequest,
    db_session: Session = Depends(db.get_db),
):
    """Create or update SEO meta tags for a page."""
    try:
        # Assume models.MetaTag exists with these fields
        meta_tag = db_session.query(models.MetaTag).filter_by(page_id=request_data.page_id).first()
        
        if not meta_tag:
            meta_tag = models.MetaTag(**request_data.dict())
            db_session.add(meta_tag)
        else:
            meta_tag.title = request_data.title
            meta_tag.description = request_data.description
            meta_tag.social_tags = request_data.social_tags
            meta_tag.published = request_data.published
        
        db_session.commit()
        return {"message": "Meta tags updated successfully", **meta_tag.dict()}

    except Exception as e:
        db_session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
```

---

## 2. React UI Snippet

```javascript
import { useState } from 'react';

interface MetaTagFormValues {
    title: string;
    description: string;
    socialTags: string[];
}

export const MetaTagEditor = ({ pageId }: { pageId: string }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [socialTags, setSocialTags] = useState([""]);
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            await fetch('/api/meta-tags/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    page_id: pageId,
                    title,
                    description,
                    social_tags: socialTags.filter(t => t.trim()),
                    published: true
                }),
            });
            
            // Handle success
        } catch (error) {
            console.error('Error saving meta tags:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="meta-tag-form">
            <div>
                <label htmlFor="title">Page Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={3}
                    required
                />
            </div>

            <div>
                <label>socialTags</label>
                <input
                    type="text"
                    placeholder="#tag1 #tag2..."
                    value={socialTags.join(' ')}
                    onChange={(e) => {
                        const newTags = e.target.value.split(/[\s]+/).filter(t => t);
                        setSocialTags(newTags);
                    }}
                />
            </div>

            <button type="submit">Save Changes</button>
        </form>
    );
};
```

---

## 3. Pydantic Data Schema

```python
from pydantic import BaseModel, Field
from typing import List, Optional

class CreateMetaTagRequest(BaseModel):
    """Schema for creating or updating meta tags."""
    title: str = Field(..., description="Page title", max_length=256)
    description: str = Field(
        ..., 
        description="SEO-friendly page description",
        max_length=1024
    )
    social_tags: List[str] = Field(
        ...,
        description="List of social media tags (e.g., #SEO, #WebDev)",
        max_length=20
    )
    published: Optional[bool] = Field(
        True,
        description="Whether the meta tags should be used in production"
    )

class MetaTagResponse(BaseModel):
    """Schema for response after saving meta tags."""
    id: str
    page_id: str
    title: str
    description: str
    social_tags: List[str]
    published: bool
    created_at: str
    updated_at: str
```

---

## Notes

- **FastAPI Endpoint**: Manages the creation and updating of meta tags. It uses Pydantic models for request validation.
- **React UI**: A form component that allows developers to input and submit meta tag data via a REST API call.
- **Pydantic Schema**: Defines the structure of requests and responses, ensuring type safety and validation.

This module integrates seamlessly with both backend (FastAPI) and frontend (React) technologies, providing a robust solution for managing SEO meta tags.

```markdown
# SEO Meta Tag Manager Module

## Summary
The SEO Meta Tag Manager module allows you to set custom titles, meta descriptions, social tags, and other SEO-related metadata for your web pages. This module is designed to enhance your site's search engine optimization (SEO) and social media sharing capabilities.

## Related Modules
- [Head](https://example.com/modules/head): Manages the `<head>` section of your pages.
- [Social Media Links](https://example.com/modules/social-media-links): Enhances social media integration.
- [Canonical URL Generator](https://example.com/modules/canonical-url-generator): Ensures proper canonical URLs for SEO.
- [Analytics Integrator](https://example.com/modules/analytics-integrator): Integrates various analytics tools.

## Use Cases
1. **Custom Meta Tags Configuration**: Configure global or route-specific meta tags directly from the admin interface.
2. **Dynamic Content Optimization**: Automatically adjust meta tags based on content, such as blog posts or product pages.
3. **Social Media Sharing**: Customize social media sharing options with Open Graph and Twitter cards for better engagement.

## Integration Tips
- **Install and Configure**: Install the module via your package manager and configure it in your `config.php` file.
- **Theme Integration**: Ensure your theme includes the necessary meta tag placeholders in the `<head>` section.
- **Dynamic Content Handling**: Use hooks or event listeners to dynamically set meta tags based on content.

## Configuration Options
| Option Name              | Description                                      | Default Value               |
|--------------------------|--------------------------------------------------|----------------------------|
| `seo_title_format`       | Format for page titles.                         | `{title} - {site_name}`     |
| `seo_description_format` | Format for meta descriptions.                    | `{description}`             |
| `social_image_url`       | Default URL for social sharing images.          | `/images/default-image.jpg`|
| `og_type`                | Open Graph type (e.g., article, website).      | `website`                  |
| `twitter_card_type`     | Twitter card type (e.g., summary_large_image).  | `summary`                  |
| `default_author`         | Default author for meta tags.                   | `Your Site Name`           |
| `default_publisher`      | Default publisher for meta tags.                | `@your_site_handle`        |

## Notes
For support or contributions, please visit our [GitHub repository](https://github.com/your-org/seo-meta-tag-manager).
```