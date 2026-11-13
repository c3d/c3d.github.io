---
id: xl-tao3d
title: XL, Tao3D & ELFE
theme: Languages & Compilers
years: 1988-Present
weight: 9
related: [taodyne, 3divart]
videos:
  - GUMqT9W5BG8
links:
  - label: XL on GitHub
    url: https://github.com/c3d/xl
  - label: Tao3D
    url: https://tao3d.sourceforge.net/
  - label: ELFE
    url: https://github.com/c3d/elfe
---

## An Extensible Language Journey

A 30+ year research project in programming language design, evolving through multiple iterations to create truly extensible languages.

### LX - Language Expérimental (1988-1998)

Started during a training period at Alsys SA (Ada compilers), leading to reflections about what I liked and didn't like in Ada. Features included:
- User-accessible representation for the parse tree
- Basic garbage collection
- Advanced generics (similar to C++ templates)

### XL - From Experimental to Extensible

Following discussions with brilliant engineers like Daveed Vandevoorde, the focus changed from "experimental" to "extensible". Key evolution:
- **XL** - Advanced generics, still syntax-directed
- **XL2** - Complete rewrite with simplified parse tree (8 node types), bootstrapped compiler
- **XLR** - Extensible Language Runtime, designed as back-end for XL2, became elegant standalone

### Tao3D - 3D Interactive Programming

A programming language for interactive 3D derived from XLR, making it easy to create great visualizations and animations quickly. Powerful enough to present complex information entertainingly.

Features:
- Real-time 3D rendering
- Very short code for complex animations
- Used for talks, trade shows, museums, education
- Commercial version by Taodyne added stereoscopy support

### ELFE - Extensible Language for Everyday

The most recent evolution: a simple, small language for everyday programming, specifically tuned for IoT device configuration and control. First language to incorporate a type system based on tree shapes.

In many ways, ELFE is the best implementation of XL to date.

**Quote:** *"Advanced and revolutionary stuff"* - Raphaël Manfredi on Tao3D
