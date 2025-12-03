<p align="center">
  <img src="assets/banner.png" alt="Awesome OBS Studio Banner" width="100%">
</p>


[![OBS Studio](https://img.shields.io/badge/OBS%20Studio-Open%20Source-blue?style=flat-square)](https://obsproject.com/)
[![Status](https://img.shields.io/badge/Status-Active-green?style=flat-square)](https://github.com/Pralhad-Nasane/awesome-obs-collections)
[![Contributions](https://img.shields.io/badge/Contributions-Welcome-orange?style=flat-square)](https://github.com/Pralhad-Nasane/awesome-obs-collections/blob/main/contributing.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-lightgray?style=flat-square)](LICENSE)

> A curated collection of **open-source** plugins, scripts, tools, and themes for OBS Studio.

This repository focuses **exclusively** on high-quality, open-source software related to OBS Studio.


## Contents

* [Plugins](#plugins).
* [Scripts](#scripts).
* [External Tools & Utilities](#external-tools--utilities).
* [OBS Themes](#obs-themes).
* [Contributions](#contributions).

---

## Plugins

### Streaming & Production

* [Multiple RTMP Outputs](https://github.com/sorayuki/obs-multi-rtmp) - Stream to multiple platforms simultaneously. 4.5k stars. Intermediate.

* [Aitum Vertical](https://github.com/aitum/obs-vertical) - Adds a vertical canvas (9:16) for Shorts/Reels. 228 stars. Beginner. Perfect for TikTok, YouTube Shorts, Instagram Reels.

* [Aitum Multistream](https://github.com/aitum/obs-multistream) - Integrated multi-platform streaming inside OBS. 169 stars. Beginner.

* [Advanced Scene Switcher](https://github.com/WarmUpTill/SceneSwitcher) - Rule-based automated scene switching. 1.3k stars. Advanced. Powerful automation tool for complex workflows.

* [Source Dock](https://github.com/exeldro/obs-source-dock) - Pop any source out into a movable dock. Beginner.

* [Downstream Keyer](https://github.com/exeldro/obs-downstream-keyer) - Add persistent overlays across all scenes. Intermediate. Great for consistent branding across scenes.

* [Directory Watch Media](https://github.com/exeldro/obs-dir-watch) - Auto-update media source based on folder contents. Intermediate.

---

### Recording & Output

* [Source Record](https://github.com/exeldro/obs-source-record) - Record individual sources or scenes. Beginner. Record individual elements without affecting main stream.

* [Replay Source](https://github.com/exeldro/obs-replay-source) - Instant replay playback + buffer. Intermediate. Perfect for gaming and sports streams.

* [OBS WebSocket (Built-in)](https://github.com/obsproject/obs-websocket) - Remote control interface for OBS v28+. 4.2k stars. Advanced. Built-in since OBS 28.0 Essential for automation and remote control.

* [NDI (DistroAV) / OBS-NDI](https://github.com/Palakis/obs-ndi) - Send/receive video over LAN via NDI. Advanced. Network video transmission for multi-PC setups.

---

### Visual & Effects

* [Move Transition](https://github.com/exeldro/obs-move-transition) - Animated transitions for sources. 813 stars. Intermediate. Create smooth, animated scene transitions.

* [StreamFX](https://github.com/Xaymar/obs-StreamFX) - Advanced effects: 3D, blur, shaders, glow. 4.1k stars. Advanced. 🌟 Industry-standard effects plugin.

* [StreamFX FreeFX Fork](https://github.com/nicolasdeory/streamfx-freefx) - Updated community fork. Advanced. Community-maintained alternative.

* [ShaderFilter](https://github.com/exeldro/obs-shaderfilter) - Apply GLSL/HLSL shader filters to any source. 629 stars. Advanced. Custom shader programming support.

* [3D Effect](https://github.com/exeldro/obs-3d-effect) - Adds 3D rotation and perspective effects. Intermediate. 🔲 Transform sources in 3D space.

* [Freeze Filter](https://github.com/exeldro/obs-freeze-filter) - Freeze any video source on demand. Beginner. ⏸️ Instant freeze frame effect.

* [Spectralizer](https://github.com/univrsal/spectralizer) - Beautiful audio visualizer inside OBS. 611 stars. Beginner. **Archived** - Maintainer suggests "Waveform" as replacement.

* [Tuna](https://github.com/univrsal/tuna) - Real-time "Now Playing" music info from media players. Beginner. Supports Spotify, VLC, MPD, and more.

---

### Audio

* [OBS Audio Monitor](https://github.com/exeldro/obs-audio-monitor) - Monitor any source to any audio device. Beginner. Route audio to multiple devices.

* [atkAudio](https://github.com/royshilkrot/atkAudio) - ASIO, multichannel routing, VST3 plugins, MIDI input. Advanced. Professional audio production features.

* [OBS-ASIO](https://github.com/Andersama/obs-asio) - Native ASIO driver support for OBS. Advanced. Low-latency audio for musicians.

---

### Captioning & Accessibility

* [Closed Captioning (Google Speech)](https://github.com/ratwithacompiler/OBS-captions-plugin) - Cloud-based real-time captions. Intermediate. Requires internet connection Improve accessibility with live captions.

* [LocalVocal](https://github.com/royshilkrot/LocalVocal) - Offline Whisper-based subtitles & translation. Advanced. Fully offline - no cloud required Supports multiple languages.

* [OBS Color Monitor (Scopes)](https://github.com/norihiro/obs-color-monitor) - Waveform, vectorscope, parade scopes. Intermediate. Professional color grading tools.

---

## Scripts

OBS supports both **Lua** and **Python** scripting.

---

### Lua Scripts

> [!NOTE]
> **Coming Soon:** This section will be updated with enhanced metadata including platform badges, difficulty levels, star counts, and additional curated Lua scripts!

* [Libre Macros](https://github.com/upgradeQ/OBS-Libre-Macros) - Macro engine for advanced automation.

---

### Python Scripts

* [Official OBS Python Examples](https://github.com/obsproject/obs-studio/tree/master/UI/scripts) - Learn Python scripting from official examples. Beginner to Advanced. Best starting point for learning OBS Python scripting.

* [Countdown Timer](https://github.com/micahmo/obs-countdown-python) - Countdown to specific date/time with customizable text. Beginner. Counts down to specific time, customizable expired text Requirements: Python 3.6+, python-dateutil, pyperclip.

* [Countdown to Time (Duisterethomas)](https://obsproject.com/forum/resources/python-countdown-to-time.1242/) - Timer with scene switching on end. Beginner. Optional beep when timer ends (Windows only) Can switch scenes automatically.

* [Now Playing](https://obsproject.com/forum/resources/now-playing.1378/) - Display current song from Spotify, iTunes, VLC, etc. Intermediate. Supports multiple media players Requirements: Python 3.6, PyWin32.

* [Now Playing (Linux)](https://github.com/shock59/now-playing) - Spotify/media player info for Linux with artwork. Displays song title, artist, and album artwork. Uses browser source (http://localhost:4640/). Advanced. Requirements: PyGObject, PyYAML, Tornado, websockets, playerctl.

* [Clock Time & Date Display](https://github.com/search?q=obs+python+clock&type=code) - Real-time clock and date display. Beginner. Customizable date/time formats Updates in real-time.

* [Auto Scene Switcher](https://github.com/jinliu/obs-auto-scene-switcher) - Cycle through scenes automatically. Intermediate. Configurable cycle intervals Exclude specific scenes from rotation.

* [Random Scene Switcher](https://github.com/deadbraindev/obs-scene-switcher) - Randomly switch between scenes. Random scene selection at intervals. Intermediate.

* [Random Text Generator](https://github.com/revenkroz/obs-random-text) - Display random text from lists. Beginner. Hotkey support, optional sound effects Simple animations available.

* [Sequence Sources](https://github.com/Prosperelucel/obs-scripts) - Cycle through sources with random mode. Intermediate. Sequential or random source display.

* [OBS WebSocket Python Client](https://github.com/Elektordi/obs-websocket-py) - Control OBS remotely via Python. Remote OBS control via WebSocket. Create custom automation tools. Works with OBS 28.0+ built-in WebSocket. Advanced.

* [Text File Reader/Updater](https://github.com/obsproject/obs-studio/blob/master/docs/scripting.rst) - Update text sources from files. Read from JSON, TXT, CSV files. Auto-refresh on file change. Beginner.

---

## External Tools & Utilities

*(All open-source and compatible through OBS WebSocket.)*

* [OBS Blade](https://github.com/shibnev/obs-blade) - Modern touch remote control (web + mobile). Beginner. Mobile-first design.

* [Bitfocus Companion](https://github.com/bitfocus/companion) - Production automation + OBS control. Advanced. Stream Deck integration.

* [Kruiz Control](https://github.com/Kruiser8/Kruiz-Control) - Event-driven automation scripting for OBS. Intermediate. Great for Twitch integration.

* [OBS CLI](https://github.com/muesli/obs-cli) - Control OBS Studio from the terminal/automation scripts. Advanced. Command-line power users.

---

## OBS Themes

* [JustEDit Theme](https://obsproject.com/forum/resources/just-edit-theme.1659/) - Modern UI theme for OBS. Beginner. Clean and modern interface.

* [Monsteer Theme Collection](https://obsproject.com/forum/resources/authors/monsteer.173493/) - High-quality theme pack. Beginner. 📦 Multiple theme options.

* [Twitchy Theme](https://obsproject.com/forum/resources/twitchy-obs-theme.1192/) - Twitch-inspired interface theme. Beginner. Purple aesthetic for Twitch streamers.

---

## Contributions

We welcome community contributions! Help us keep this list awesome.

### How to Contribute

**Found a broken link or issue?**  
 [Report a Bug](https://github.com/Pralhad-Nasane/awesome-obs-collections/issues/new?template=bug_report.md)

**Want to add a new resource?**  
 [Suggest a Resource](https://github.com/Pralhad-Nasane/awesome-obs-collections/issues/new?template=feature_request.md)

**Ready to submit changes?**  
 [Create a Pull Request](https://github.com/Pralhad-Nasane/awesome-obs-collections/compare)

### Guidelines

Please ensure the resource:
-  Is open-source (GitHub/GitLab)
-  Is actively maintained or still useful
-  Is high quality and relevant to OBS Studio
-  Follows our format: `* [Name](url) - Description. Difficulty.`

 Read our full [Contributing Guidelines](contributing.md) for more details.

---

## Contact

Have questions or want to discuss OBS resources? Connect with me:

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/pralhadnasane)

**Pralhad Nasane** - Feel free to reach out for discussions about OBS Studio, streaming, or this collection!

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.


