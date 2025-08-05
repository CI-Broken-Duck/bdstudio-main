import os
import shutil

# Output directory
output_dir = "output"

# Clean and recreate output folder
if os.path.exists(output_dir):
    shutil.rmtree(output_dir)
os.makedirs(output_dir)

# Ignore patterns for tree
ignore = (
    "__pycache__|.DS_Store|node_modules|.venv|.mypy_cache|.pytest_cache|dist|build|"
    ".next|__pypackages__|env|.git|.idea|.output|.history|.cache|"
    "audio_rendered|covers|exported|generated|static/audio_rendered|"
    "\\.turbo|cookies|daemon|blob-report|testdata|out|\\.lock|\\.log|\\.zst|\\.mid|\\.mp3|\\.wav|\\.pdf|\\.png|\\.jpg|\\.jpeg|\\.svg|\\.ico|\\.xml"
)

# Project overview header
master_description = """Broken Duck Studio – Website Overview

This site serves as the public-facing website for Broken Duck Studio, a Chiang Mai-based members club and production studio for YouTube creators. The website is adapted from the Broken Duck Media platform and built with Astro to showcase the studio's facilities, events, and membership information.

Key areas of the site:
- Informational pages about membership, events, and services
- Facility and amenities overview
- Member pricing and booking structure
- Contact and FAQ sections
- Blog/Resources section for updates and posts

Technologies used include Astro, Markdown, and Vanilla CSS, with performance-focused deployment strategies suitable for static hosting.

To launch locally:
```bash
cd ~/Desktop/bdstudio-main/website
npm install
npm run dev
```"""

# Output path and section definition
output_path = os.path.join(output_dir, "website-tree.txt")
print(f"🛠 Generating: {output_path}")

with open(output_path, "w") as f:
    f.write(master_description.strip() + "\n\n")
    f.write("# WEBSITE FILE STRUCTURE\n\n")

os.system(
    f"tree -a -L 1000 -I '{ignore}' --charset=ascii ../website >> {output_path}"
)

print("✅ Website structure saved to ./output/website-tree.txt")

