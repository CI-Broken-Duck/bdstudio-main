---
title: "Multilingual Routing"
code: "MLR"
category: "Content"
subcategory: "Gold"
summary: "Serve translated versions of your site with language-based URLs."
price: "$2000"
pubDate: 2025-06-21
draft: false
icons:
  - /assets/modules/frontend/tailwind.png
  - /assets/modules/language/react.png
  - /assets/modules/devops/vercel.png
  - /assets/modules/cloudservices/segment.png
---

# Overview of Multilingual Routing Module

In today's globalized digital landscape, supporting multiple languages on your website isn't just a nice-to-have; it's a necessity. The Multilingual Routing module is designed to streamline this process, ensuring that users receive content in their preferred language through intuitive, SEO-friendly URLs.

## Purpose

The primary function of the Multilingual Routing module is to manage and serve translated content based on the user's language preferences. By utilizing language-specific URL structures, the module simplifies the delivery of localized content without complicating your site's architecture.

## Key Benefits

- **Enhanced SEO:** Language-based URLs improve search engine visibility by targeting specific regions with relevant content.
- **Improved User Experience:** Users are directed to content in their preferred language, enhancing engagement and satisfaction.
- **Simplified Implementation:** The module abstracts the complexities of multilingual routing, allowing developers to focus on other aspects of their application.

## Usage Scenarios

1. **Automatic Language Detection:** Detect and route users based on their browser language settings or regional preferences.
2. **Multiple Language Support:** Easily manage content across various languages with a single, integrated solution.
3. **Translation Service Integration:** Seamlessly integrate with translation services for dynamic content delivery.
4. **Fallback Mechanism:** Provide default language content when the user's preferred language isn't supported.

## Conclusion

The Multilingual Routing module is an essential tool for developers aiming to create inclusive and accessible websites in a multilingual environment. By leveraging its features, you can enhance both SEO performance and user satisfaction, ensuring your site resonates with a global audience effectively.

## Language-Based URLs
The Multilingual Routing module generates URLs based on the language of the content. For example, an article about "FAQ" might be served as `/about/faq` in English or `/acerca/de-faq` in Spanish. This improves SEO and user experience by making it clear what language the page is in.

## Automatic Translation
The module integrates with translation services like Google Cloud Translation to automatically translate content into multiple languages. Developers can specify supported languages, and the module handles the rest, saving time and effort in creating multilingual content.

## Language Routing Configuration
Define how each language maps to different routes using configuration files. This feature allows developers to set up custom URL structures for each language, ensuring consistency and alignment with site branding or SEO strategies.

## Fallback Languages
Specify fallback languages when a user's preferred language isn't supported. For example, if Spanish is the preferred language but not available, the module can serve content in English as a default, ensuring all users have access to content regardless of availability.

## Translation Caching
Store translated content locally to reduce translation service calls and improve performance. This caching mechanism ensures faster load times for repeated requests, enhancing user experience without sacrificing content accuracy.

## SEO Optimization
The module generates hreflang tags automatically for each language version of a page. These tags inform search engines about the language and region targeting of your pages, improving local SEO and search rankings in target regions.

## Language Detection and Redirects
Detect the user's browser language or geolocation and redirect them to the appropriate language version of the site. This feature enhances user experience by providing content in their preferred language without requiring manual selection from users.

## Regional Variants Support
Support multiple regional variants, such as different dialects or local languages, ensuring that content can be tailored specifically for various markets or regions, enhancing global reach and relevance.

### Multilingual Routing Implementation

This documentation provides code examples to implement multilingual routing using FastAPI (Python) and Node.js, along with a React UI snippet for language selection.

---

#### 1. **FastAPI Endpoint**

The following FastAPI endpoint demonstrates serving content based on the detected or specified language:

```python
# main.py
from fastapi import FastAPI, Request
from typing import Optional
import json

app = FastAPI()

@app.get("/{lang}")
async def serve_translated_page(request: Request, lang: str):
    # Simulate translation logic
    translations = {
        "en": {"greeting": "Hello", "welcome": "Welcome"},
        "es": {"greeting": "Hola", "welcome": "Bienvenido"},
        "fr": {"greeting": "Bonjour", "welcome": "Bienvenue"}
    }
    
    # Detect or use provided language
    content = translations.get(lang, translations["en"])
    return {
        "language": lang,
        "content": {
            "greeting": content["greeting"],
            "welcome": content["welcome"]
        }
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

This endpoint serves translated content based on the language parameter in the URL.

---

#### 2. **Node.js Alternative**

A Node.js implementation using Express:

```javascript
// app.js
const express = require('express');
const app = express();
const port = 3000;

app.get("/:lang", (req, res) => {
    const translations = {
        en: { greeting: "Hello", welcome: "Welcome" },
        es: { greeting: "Hola", welcome: "Bienvenido" },
        fr: { greeting: "Bonjour", welcome: "Bienvenue" }
    };

    const content = translations[req.params.lang] || translations.en;
    res.send({
        language: req.params.lang,
        content: {
            greeting: content.greeting,
            welcome: content.welcome
        }
    });
});

app.listen(port, () => {
    console.log(`App running at http://localhost:${port}`);
});
```

---

#### 3. **React UI Snippet**

A React component for language selection:

```javascript
// LanguageSelector.js
import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSelector() {
    const [t] = useTranslation();
    const [currentLang, setCurrentLang] = React.useState('en');

    const languages = ['en', 'es', 'fr'];

    const handleLanguageChange = (lang) => {
        setCurrentLang(lang);
        i18n.changeLanguage(lang);
    };

    return (
        <div>
            <h2>{t('select_language')}</h2>
            <ul>
                {languages.map((lang) => (
                    <li key={lang}>
                        <button
                            onClick={() => handleLanguageChange(lang)}
                            style={{ backgroundColor: currentLang === lang ? '#4CAF50' : 'white' }}
                        >
                            {t(`language.${lang}`)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default LanguageSelector;
```

---

#### 4. **Data Schema (Pydantic)**

Define a Pydantic model for translation data:

```python
# models.py
from pydantic import BaseModel

class Translation(BaseModel):
    source_language: str
    target_language: str
    text: str
    translated_text: str
    
    class Config:
        json_schema_extra = {
            "example": {
                "source_language": "en",
                "target_language": "es",
                "text": "Hello",
                "translated_text": "Hola"
            }
        }
```

---

### Summary

- **FastAPI Endpoint**: Serves translated content based on the language parameter.
- **Node.js Alternative**: Offers a similar functionality using Express.
- **React UI**: Provides language selection with i18next for internationalization.
- **Data Schema**: Uses Pydantic to validate translation data.

These examples provide a foundation for implementing multilingual routing in your application.

# Multilingual Routing Module Documentation

## Module Overview
The **Multilingual Routing** module enables developers to serve translated versions of their web applications based on language-specific URLs. This allows users to access content in their preferred language by appending a language code (e.g., `/en/`, `/es/`) to the URL.

---

## Related Modules
Here are some modules that complement the **Multilingual Routing** module:

1. **Translation Management**
   - Manages translations for all supported languages.
   - Integrates with translation APIs and local files.
   - Example: `@example/translation-management`.

2. **Content Delivery**
   - Delivers content dynamically based on language and region.
   - Works seamlessly with routing systems.
   - Example: `@example/content-delivery`.

3. **Language Detection**
   - Detects the user's language using cookies, headers, or URLs.
   - Triggers automatic language redirects.
   - Example: `@example/language-detection`.

4. **SEO Optimization**
   - Ensures SEO-friendly URL structures for multilingual sites.
   - Handles canonical URLs and language alternation tags.
   - Example: `@example/seo-optimization`.

5. **Analytics**
   - Tracks user behavior across different languages and regions.
   - Provides insights into popular languages and content usage.
   - Example: `@example/analytics`.

---

## Use Cases

1. **Simple Multilingual Website**
   - A website that serves translated pages based on the language code in the URL.
   - Example:
     ```
     /en/home
     /es/casa
     ```

2. **Dynamic Content with APIs**
   - Integrates with external translation APIs to fetch and display content dynamically.
   - Example:
     ```
     /fr/api-driven-content
     ```

3. **Fallback Languages**
   - If a page is not available in the user's language, it redirects to a fallback language (e.g., English).
   - Example:
     ```
     /de/404 -> /en/404
     ```

4. **Language Negotiation**
   - Uses language negotiation to determine the best-matching language for the user.
   - Example:
     ```
     Accept-Language: de,fr;q=0.8,en;q=0.7
     ```

5. **SEO and Canonicalization**
   - Ensures that each language version of a page has proper canonical URLs and hreflang tags.
   - Example:
     ```
     <link rel="canonical" href="/en/home">
     <link rel="alternate" hreflang="es" href="/es/casa">
     ```

---

## Integration Tips

- **URL Structure**: Define consistent URL patterns for language codes (e.g., `/en/`, `en/`).
- **Fallback Handling**: Always provide a fallback language to handle missing translations.
- **Caching**: Implement caching strategies to improve performance, especially for frequently accessed pages.
- **Testing**: Test all language routes and redirects thoroughly to avoid broken links or 404 errors.

---

## Configuration Options

Below is a table of configuration options for the **Multilingual Routing** module:

| **Parameter**          | **Description**                                                                 | **Default Value**       |
|-------------------------|---------------------------------------------------------------------------------|-------------------------|
| `enabled`              | Enables multilingual routing.                                                    | `true`                  |
| `default_language`     | Sets the default language for the application.                                  | `en`                    |
| `supported_languages`  | Lists all supported languages (e.g., `['en', 'es', 'fr']`).                   | `[]`                    |
| `route_prefix_format`   | Defines the format for language prefixes in URLs (e.g., `/lang/`, `lang/`).     | `/lang/`                |
| `fallback_language`    | Sets the fallback language when a translation is missing.                       | `en`                    |
| `seo_duplicates`       | Enables or disables SEO duplicate content handling.                              | `true`                  |
| `cache_duration`       | Specifies the cache duration for translated routes (in seconds).                 | `3600` (1 hour)         |

---

## Conclusion

The **Multilingual Routing** module is a powerful tool for developers looking to create multilingual web applications. By leveraging language-based URLs, it enhances user experience and SEO while ensuring seamless integration with other modules in your stack.