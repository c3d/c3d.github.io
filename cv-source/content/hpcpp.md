---
id: hpcpp
title: HP aC++ Compiler
theme: Languages & Compilers
years: 1998-2000
weight: 10
featured: true
print: 1
related:
  - wiess-exception-handling
  - cxx-abi
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

- Led multi-team pre-silicon cross and native bring-up, kernel and user ABI
- Front-end team lead: exceptions, templates, performance, precompiled headers
- Led the 16-team native compiler bring-up, the exception-handling project across 8 teams, and worked with HP-UX on speculation
- Initiated the common C++ ABI effort ([Itanium C++ ABI](https://itanium-cxx-abi.github.io/cxx-abi/)), proposing a shared Itanium C++ ABI with Cary Coutant and meeting engineers from many companies with Daveed Vandevoorde
- Represented HP at the C++ standards committee for a short period
- Redesigned the compiler build system to harmonise build configuration across the 16 teams working on the compiler, which all used different makefile conventions — a distant ancestor of Make-It-Quick

**Quote:** *"An exceedingly sharp engineer"* — Mark Mitchell
