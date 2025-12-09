# OBSverse Website

A curated collection of plugins, scripts, and tools for OBS Studio.

🌐 **Live Website**: [https://pralhad-nasane.github.io/awesome-obs-collections/](https://pralhad-nasane.github.io/awesome-obs-collections/)


## About

This website was built using **AI-powered development**:

- **AI Model**: Claude Opus 4.5 by Anthropic
- **IDE**: Google Antigravity
- **Process**: Created through natural language prompts and reference images - describing what I wanted and how I wanted it, while the AI handled the implementation



## 🚀 Quick Start

```bash
# Start local server
npx serve . -l 8002

# Open in browser
http://localhost:8002
```

## 📁 Structure

```
docs/
├── index.html          # Main HTML file
├── assets/             # Images and icons
└── src/
    ├── shared/         # Design tokens and utilities
    │   ├── config/     # CSS variables, reset
    │   ├── lib/        # JS utilities
    │   └── ui/         # Shared components (buttons, etc.)
    ├── widgets/        # Page sections
    │   ├── navbar/
    │   ├── hero-section/
    │   ├── obs-mockup/
    │   ├── resources-section/
    │   ├── resource-card/
    │   ├── contribute-section/
    │   └── footer/
    ├── features/       # Interactive features
    │   └── floating-symbols/
    └── entities/       # Data models
        └── resource/   # resources.json
```

## ✨ Features

- **OBS Mockup** - Interactive 3D mockup with animations
- **Resource Cards** - Dynamic loading from JSON
- **Scroll Progress** - Purple gradient progress bar
- **Custom Scrollbar** - Styled purple scrollbar
- **Responsive** - Mobile-friendly layout (WIP)

## 🎨 Design Tokens

All design tokens are in `src/shared/config/variables.css`:
- Colors, typography, spacing
- Shadows, borders, transitions
- Gradients

## Adding Resources

Edit `src/entities/resource/data/resources.json`:

```json
{
  "name": "Plugin Name",
  "description": "Description here",
  "category": "Plugins",
  "url": "https://github.com/...",
  "stars": 1000,
  "author": "Author Name"
}
```

## Development

No build step required - pure HTML, CSS, and vanilla JavaScript.


---

Made with ❤️ for the OBS community
