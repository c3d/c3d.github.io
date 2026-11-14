---
id: recorder
title: Recorder
theme: Tools & Apps
years: null
weight: 7
print: 2
related:
  - make-it-quick
videos:
  - kEnQY1zFa0Y
links:
  - label: GitHub
    url: 'https://github.com/c3d/recorder'
  - label: Presentation video
    url: 'https://www.youtube.com/watch?v=kEnQY1zFa0Y'
images:
  - /cv/media/recorder.png
topics:
  - cpp
  - opensource
  - validation
  - performance
---
## Lock-free flight recorder for C and C++

- Continuous recording with printf-like statements for performance and debug traces
- Inexpensive enough to leave on (README: &lt; 0.1 µs / record on a modern PC)
- Classify events to keep both old important and recent rapid events
- Dump on demand (signals / debugger)
- Trace categories live; export channels for visualization
