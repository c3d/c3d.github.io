---
id: ecutest
title: HP ECUTEST Real-Time System
theme: Systems & Virtualization
years: 1994-1998
weight: 9
related: []
videos: []
links: []
---

## Real-Time Automotive Testing

HP ECUTEST was a real-time test system for car electronics, particularly engine control units (ECU).

### Capabilities

- Generated or monitored several hundred signals (~400 typical)
- Wide variety of analog and digital devices
- Sub-millisecond closed loop (250µs in some configurations)
- Continuous data logging with multiple time bases
- Some based on time, some based on engine rotation

### Operating System Design

The ECUTEST operating system featured:
- **Heterogeneous multiprocessing**: x86 Windows PC + real-time boards
- **Real-time boards**: 68040 running pSOS or PA-RISC with HP-RT
- **Distributed device driver model**:
  - Configuration by controlling PC
  - Real-time measurements on 68040/PA-RISC
  - Disk I/O for data logging on PC
- VME or VXI devices with their own CPUs (68040 or 68332)

### Hardware-Agnostic Binary Translator

Included a unique feature: customers could specify equations computed every cycle, independent of the underlying hardware architecture.

### Scale Evolution

**ECUTEST Lite:** Half the size of the original (which was refrigerator-sized), most of the testing capabilities, using VME instead of the more expensive VXI.

**Manufacturing Release:** A major milestone celebrated with team cartoons capturing the journey of wild optimism, tight hardware fits, union workers at demos, ever-changing product structure, and the memorable "Yes, it's a bit slow to start" moment when we went to lunch waiting for the software to launch!
