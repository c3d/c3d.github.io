---
id: hpvm
title: HPVM - Enterprise-grade Itanium virtualization
theme: Systems & Virtualization
years: 2000-2010
weight: 10
print: 1
related:
  - kata-containers
  - confidential-containers
  - hpvm-presilicon
videos: []
links:
  - label: HPVM on Wikipedia
    url: 'https://en.wikipedia.org/wiki/HP_Integrity_Virtual_Machines'
  - label: Ski simulator
    url: 'https://github.com/linux-ia64/ski/tree/hp-sim-for-linux'
images:
  - /cv/media/hpvm.jpg
topics:
  - virtualization
  - firmware
  - system
  - pre-silicon
---
## Enterprise-grade virtualization for high-end Itanium servers

- From first line of code and pre-silicon bring up all the way to 7 digits of revenue per quarter
- Early HPVM boot entirely on [Ski](https://github.com/linux-ia64/ski/tree/hp-sim-for-linux) (pre-silicon); later A-step silicon bring-up
- Started the HP Integrity Virtual Machines project in late 2000
- Early bring-up with Todd Kjos and Jonathan Ross (4-way HP-UX guests)
- Contributions across interrupt handling, binary translation, memory, I/O, scheduling
- Firmware-level VMM / platform software for Integrity servers
- Features including para-virtualized I/O and on-line guest migration
- Longest single professional project (~10 years)

**Quote:** *"At HP he was sought after as one of the top strategic visionaries"* — Dale Morris
