---
id: recorder
title: Recorder
theme: Tools & Apps
years: 2017-Present
weight: 7
featured: true
print: 2
related:
  - make-it-quick
  - spice
videos:
  - kEnQY1zFa0Y
  - kpy4SqpunoY
links:
  - label: GitHub
    url: 'https://github.com/c3d/recorder'
  - label: Presentation video
    url: 'https://www.youtube.com/watch?v=kEnQY1zFa0Y'
  - label: 'DevConf.CZ 2019: SPICE smart streaming (shows recorder in use)'
    url: 'https://youtu.be/kpy4SqpunoY'
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
- Shown in use in the [DevConf.CZ 2019 SPICE smart streaming](https://youtu.be/kpy4SqpunoY) talk
