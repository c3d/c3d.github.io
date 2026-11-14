---
id: hpcpp
title: HP aC++ Compiler
theme: Languages & Compilers
years: 1998-2000
weight: 10
print: 1
related:
  - wiess-exception-handling
  - make-it-quick
videos: []
links:
  - label: aC++
    url: 'http://www.hp.com/go/aCC'
  - label: Ski simulator
    url: 'https://github.com/linux-ia64/ski/tree/hp-sim-for-linux'
  - label: Itanium C++ ABI
    url: 'https://itanium-cxx-abi.github.io/cxx-abi/'
  - label: WIESS 2000 paper (PDF)
    url: 'https://www.usenix.org/legacy/events/wiess2000/full_papers/dinechin/dinechin.pdf'
  - label: Aries PA-RISC to Itanium
    url: 'https://www.princeton.edu/~rblee/ELE572Papers/PARISCtoIA64.htm'
images:
  - /cv/media/hpcpp.png
topics:
  - cpp
  - compilers
  - performance
  - validation
  - pre-silicon
  - research
  - build-systems
  - kernel
  - soc
  - system
---
## C++ compiler for Itanium

Cupertino, Hewlett-Packard California Language Lab (CLL), 1998–2000.

- Wrote the first native Itanium C++ compiler, pre-silicon testing on [ski](https://github.com/linux-ia64/ski/tree/hp-sim-for-linux), overriding HP's plans to ship a PA-RISC to Itanium cross-compiler running in the [Aries PA-RISC to Itanium dynamic translator](https://www.princeton.edu/~rblee/ELE572Papers/PARISCtoIA64.htm)
- Initiated the common C++ ABI effort ([Itanium C++ ABI](https://itanium-cxx-abi.github.io/cxx-abi/)), proposing a shared Itanium C++ ABI with Cary Coutant and meeting engineers from many companies with Daveed Vandevoorde
- Represented HP at the C++ standards committee for a short period
- Improved template handling, notably to support the STL
- Built high-performance, zero-cost C++ exception handling that became the reference implementation and, documented in the [WIESS 2000](https://www.usenix.org/legacy/events/wiess2000/full_papers/dinechin/dinechin.pdf) paper, motivated the common ABI work above
- Compiler performance improvements, including redesigning the symbol table for scalability
- Redesigned the compiler build system to harmonise build configuration across the 16 teams working on the compiler, which all used different makefile conventions — a distant ancestor of Make-It-Quick
- Compiler and OS interaction for Itanium control speculation: recovery/retry for failed speculation needed low-level OS interrupt handlers and compiler-generated code to cooperate; native bring-up uncovered an obscure corner-case speculation bug that made memcpy misbehave and that all earlier testing had missed
- Contributed to precompiled headers, another compile-time performance improvement

**Quote:** *"An exceedingly sharp engineer"* — Mark Mitchell
