import json
import os
import urllib.request

workspace_dir = r"c:\Users\Prateek\Desktop\NutriTrackHealthDashboard"
projects_file = r"C:\Users\Prateek\.gemini\antigravity-ide\brain\a10383b5-492c-4023-ace2-4f7a31e7f059\.system_generated\steps\11\output.txt"
screens_file = r"C:\Users\Prateek\.gemini\antigravity-ide\brain\a10383b5-492c-4023-ace2-4f7a31e7f059\.system_generated\steps\17\output.txt"

with open(projects_file, "r", encoding="utf-8") as f:
    proj_data = json.load(f)

with open(screens_file, "r", encoding="utf-8") as f:
    screens_data = json.load(f)

nutritrack_proj = None
for p in proj_data["projects"]:
    if "8964717628383086438" in p["name"]:
        nutritrack_proj = p
        break

if not nutritrack_proj:
    print("Project not found!")
    exit(1)

screens_dir = os.path.join(workspace_dir, "screens")
screenshots_dir = os.path.join(workspace_dir, "screenshots")
os.makedirs(screens_dir, exist_ok=True)
os.makedirs(screenshots_dir, exist_ok=True)

# Write design-system.md
design_md = nutritrack_proj.get("designTheme", {}).get("designMd", "")
with open(os.path.join(workspace_dir, "design-system.md"), "w", encoding="utf-8") as f:
    f.write(design_md)

# Write project-metadata.json
with open(os.path.join(workspace_dir, "project-metadata.json"), "w", encoding="utf-8") as f:
    json.dump(nutritrack_proj, f, indent=2)

print("Saved design-system.md and project-metadata.json")

def get_slug(title):
    t = title.lower()
    if "dashboard" in t or "analytics" in t:
        return ("01-dashboard", "Overview", "#overview")
    elif "logger" in t:
        return ("02-meal-logger", "Meal Logger", "#meallogger")
    elif "trend" in t:
        return ("03-trends", "7-Day Trends", "#trends")
    elif "recipe" in t:
        return ("04-recipe-studio", "Recipe Studio", "#recipestudio")
    elif "profile" in t:
        return ("05-health-profile", "Health Profile", "#profile")
    elif "setting" in t:
        return ("06-settings", "Settings", "#settings")
    else:
        return ("screen", "Screen", "#")

screens_map = []
for s in screens_data["screens"]:
    slug, label, nav_hash = get_slug(s["title"])
    screens_map.append({
        "slug": slug,
        "label": label,
        "nav_hash": nav_hash,
        "screen": s
    })

screens_map.sort(key=lambda x: x["slug"])

url_map = {
    "#overview": "01-dashboard.html",
    "#meallogger": "02-meal-logger.html",
    "#trends": "03-trends.html",
    "#recipestudio": "04-recipe-studio.html",
    "#profile": "05-health-profile.html",
    "#settings": "06-settings.html"
}

for item in screens_map:
    slug = item["slug"]
    title = item["screen"]["title"]
    print(f"Downloading {slug} ({title})...")
    
    # Download HTML
    html_url = item["screen"]["htmlCode"]["downloadUrl"]
    req = urllib.request.Request(html_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req) as resp:
        html_content = resp.read().decode("utf-8", errors="ignore")

    # Save original raw HTML
    raw_path = os.path.join(screens_dir, f"{slug}.raw.html")
    with open(raw_path, "w", encoding="utf-8") as f:
        f.write(html_content)

    # Linkify navigation
    linked_html = html_content
    for h, fname in url_map.items():
        linked_html = linked_html.replace(f'href="{h}"', f'href="{fname}"')
        linked_html = linked_html.replace(f"href='{h}'", f"href='{fname}'")

    # Save navigable HTML
    screen_path = os.path.join(screens_dir, f"{slug}.html")
    with open(screen_path, "w", encoding="utf-8") as f:
        f.write(linked_html)

    # Download Screenshot
    screenshot_url = item["screen"]["screenshot"]["downloadUrl"]
    req_img = urllib.request.Request(screenshot_url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req_img) as resp:
        img_data = resp.read()
    
    screenshot_path = os.path.join(screenshots_dir, f"{slug}.png")
    with open(screenshot_path, "wb") as f:
        f.write(img_data)

    print(f"Finished {slug}: HTML ({len(html_content)} bytes), Screenshot ({len(img_data)} bytes)")

print("All screens downloaded successfully!")
