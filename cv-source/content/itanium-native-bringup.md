---
id: itanium-native-bringup
title: Native Itanium C++ compiler bring-up
theme: Languages & Compilers
years: 1998-2000
weight: 8
print: 2
related:
  - hpcpp
  - itanium-cxx-abi
videos: []
links:
  - label: aC++
    url: 'http://www.hp.com/go/aCC'
  - label: Ski simulator
    url: 'https://github.com/linux-ia64/ski/tree/hp-sim-for-linux'
topics:
  - pre-silicon
  - soc
  - system
  - cpp
  - compilers
---

## First native Itanium C++ compiler (pre-silicon on [Ski](https://github.com/linux-ia64/ski/tree/hp-sim-for-linux))

- Wrote the first native Itanium C++ compiler before silicon existed; ran it on [Ski](https://github.com/linux-ia64/ski/tree/hp-sim-for-linux), HP’s functional Itanium simulator (a second simulator also modelled performance details)
- HP’s plan at the time was to ship an Itanium cross-compiler running on PA-RISC, and to run that compiler on Itanium systems through Aries, a PA-RISC to Itanium binary translator
- Linked from the HP aC++ / California Language Lab entry
