# akshita.

My personal website: an illustrated, interactive room where each object opens a section of the site.

Built with plain HTML, CSS, and vanilla JavaScript. No frameworks, no build step.

## Run it locally

1. Open this folder in VS Code.
2. Right-click `index.html` → **Open with Live Server**.

## Update the content

All text and project data lives in [`js/content.js`](js/content.js). That's the only file to edit when I finish a project or change my bio.

## Structure

```
index.html      page structure
css/tokens.css  colors, fonts, spacing (CSS custom properties)
css/base.css    resets, typography, buttons, focus styles
css/room.css    the room illustration
css/panel.css   the content panel
js/content.js   all site text and project data
js/panel.js     renders sections into the panel
js/room.js      room clicks and the lights toggle
js/main.js      wires everything together, URL hash
assets/         resume.pdf and other files
```

See [PLAN.md](PLAN.md) for the full build plan.
