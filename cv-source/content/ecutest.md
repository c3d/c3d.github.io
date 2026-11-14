---
id: ecutest
title: HP ECUTEST Real Time Test System for car electronics
theme: Systems & Virtualization
years: 1994-1998
weight: 9
print: 5
related:
  - ecu-cartoons
  - hardware-firmware
videos: []
links: []
images:
  - /cv/media/ecutest.jpg
topics:
  - realtime
  - embedded
  - system
  - validation
---
## Real-time test system for car electronics

Lyon.

- Tech lead, team of 12
- Designed HP ECUTEST for engine control unit testing and system validation
- RTICL (Real-Time Instrument Control Library): a comprehensive set of portable real-time device drivers for VXI, VME and SCPI devices — no operation was blocking; time domains varied hugely (some drivers took seconds to configure, others worked in the microsecond range)
- Sub-millisecond closed loop (250µs in some configurations)
- Hundreds of analog/digital signals in a typical setup
- Heterogeneous multiprocessing (Windows PC + real-time boards)
- Hardware-agnostic binary translator for per-cycle equations
