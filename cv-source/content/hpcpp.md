---
id: hpcpp
title: HP aC++ Compiler
theme: Languages & Compilers
years: 1998-2000
weight: 10
print: 1
related:
  - itanium-cxx-abi
  - itanium-native-bringup
videos: []
links:
  - label: aC++
    url: 'http://www.hp.com/go/aCC'
images:
  - /cv/media/hpcpp.png
topics:
  - cpp
  - compilers
  - pre-silicon
  - soc
  - system
---
## C++ compiler for Itanium

Cupertino, Hewlett-Packard California Language Lab (CLL).

- Wrote the first native Itanium C++ compiler before silicon; ran it on Ski (HP’s functional Itanium simulator); HP’s plan was a PA-RISC cross-compiler via Aries
- Joined HP CLL in 1998 to work on HP aC++ (code base from Taligent)
- Did the compiler bring-up on Ski before silicon existed (a second HP simulator also modelled performance details)
- HP’s plan at the time was to ship an Itanium cross-compiler running on PA-RISC, and to run that compiler on Itanium systems through Aries, a PA-RISC to Itanium binary translator
- Early work on templates, performance, the run-time library, and precompiled headers
- Implemented exception handling
- One of the initiators of the common C++ ABI effort
- Represented HP at the C++ standards committee for a short period
- Built the first native Itanium C and C++ compilers (coordinating 16 teams)

**Quote:** *"An exceedingly sharp engineer"* — Mark Mitchell
