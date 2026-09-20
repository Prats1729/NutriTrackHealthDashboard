# NutriTrack Health Dashboard - Stitch Design Import

This repository contains the imported assets, high-fidelity responsive HTML templates, design tokens, and screenshots for the **NutriTrack Health Dashboard** from Google Stitch (Project ID: `8964717628383086438`).

---

## 🚀 Quick Start

Open [`index.html`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/index.html) in your browser to launch the **Interactive Design Hub**. 

You can preview all screens in real-time, toggle between fluid/desktop/tablet/mobile viewports, and launch each standalone screen directly.

Alternatively, you can open any screen directly:
1. **Overview / Health Analytics & Dashboard:** [`screens/01-dashboard.html`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/screens/01-dashboard.html)
2. **Meal Logger:** [`screens/02-meal-logger.html`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/screens/02-meal-logger.html)
3. **7-Day Trends:** [`screens/03-trends.html`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/screens/03-trends.html)
4. **Recipe Studio (AI):** [`screens/04-recipe-studio.html`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/screens/04-recipe-studio.html)
5. **Health Profile:** [`screens/05-health-profile.html`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/screens/05-health-profile.html)
6. **Settings & Wearables:** [`screens/06-settings.html`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/screens/06-settings.html)

---

## 🎨 Design System: Nutritional Intelligence

- **Color Mode:** Light
- **Typography:** Geist (Display, Headlines, Body, Numbers), Material Symbols Outlined
- **Core Palette:**
  - **Primary Action (`#4F46E5` / Deep Indigo):** Primary buttons, active tabs, system focus states.
  - **Secondary (`#059669` / Emerald):** Target achievements, positive calorie balance, macro completion.
  - **Tertiary (`#D97706` / Warm Amber):** Warning thresholds, micronutrient anomalies, attention badges.
  - **Critical (`#DC2626` / Crimson):** Calorie / macro overages, biometric risk boundaries.
  - **Background / Surfaces:** `#F8FAFC` base, `#F1F5F9` panels, `#FFFFFF` cards with subtle hairline borders (`#E2E8F0`).
- **Complete Specification:** See [`design-system.md`](file:///c:/Users/Prateek/Desktop/NutriTrackHealthDashboard/design-system.md)

---

## 📁 Repository Structure

```
NutriTrackHealthDashboard/
├── index.html                   # Interactive Hub & Viewport previewer
├── design-system.md             # Complete design tokens, components & layout rules
├── project-metadata.json        # Stitch project metadata & screen instance mappings
├── screens/                     # High-fidelity standalone HTML screens
│   ├── 01-dashboard.html        # Overview & Health Analytics
│   ├── 02-meal-logger.html      # Meal Logger & Barcode Scanning
│   ├── 03-trends.html           # 7-Day Macro & Caloric Trends
│   ├── 04-recipe-studio.html    # AI Recipe Studio & Macro Customizer
│   ├── 05-health-profile.html   # Health Profile & Biometrics
│   ├── 06-settings.html         # Settings & Wearables
│   └── *.raw.html               # Original untouched HTML files from Stitch
└── screenshots/                 # High-resolution visual screenshots
    ├── 01-dashboard.png
    ├── 02-meal-logger.png
    ├── 03-trends.png
    ├── 04-recipe-studio.png
    ├── 05-health-profile.png
    └── 06-settings.png
```
