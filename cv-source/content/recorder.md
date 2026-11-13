---
id: recorder
title: Recorder - Flight Recorder
theme: Tools & Apps
years: 2017-Present
weight: 7
related: [make-it-quick]
videos: []
links:
  - label: GitHub
    url: https://github.com/c3d/recorder
---

## A Lock-Free Flight Recorder for C/C++

A lock-free, real-time flight recorder for your C or C++ programs.

### Features

**Continuous Recording:** Records information about your program continuously while it's running using simple printf-like statements.

**Smart Classification:** Classify recorded data in different categories to preserve both:
- Old important events
- Recent, rapidly-firing events

**On-Demand Dumping:** Dump recorded data on demand, notably in response to signals or from debugger.

**Selective Tracing:** Trace specific categories of records (print them as they happen).

**Real-Time Visualization:** Export specific data to shared memory channels for external visualization. Includes a simple Qt5.9-based visualization tool showing content of data channels in real-time.

### Use Cases

Perfect for debugging complex, time-sensitive systems where traditional debugging would alter timing behavior:
- Real-time systems
- High-performance servers
- Embedded systems
- Multithreaded applications
- Race condition debugging

### Philosophy

Like an aircraft flight recorder, it's always running, capturing everything, so when something goes wrong, you have the data you need to understand what happened.
