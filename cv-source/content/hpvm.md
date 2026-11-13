---
id: hpvm
title: HPVM - Enterprise Virtualization
theme: Systems & Virtualization
years: 2000-2010
weight: 10
related: [kata-containers, spice]
videos: []
links:
  - label: HPVM on Wikipedia
    url: https://en.wikipedia.org/wiki/HP_Integrity_Virtual_Machines
---

## Enterprise-Grade Virtualization for Itanium

HP Integrity Virtual Machines (HPVM) is a virtualization solution for Itanium-based servers. This was the longest project of my professional life (10 years) and the most complex—an enterprise-grade virtualization solution for Itanium processors.

### Early Days

Started the project in late 2000 with the early help of two HP system software gurus:
- **Todd Kjos**
- **Jonathan Ross**

The three of us got the software to boot 4-way HP-UX guests. Then we got a much larger team of remarkably bright people, mostly former Tru64 and OpenVMS wizards.

### Technical Contributions

I contributed to many facets of the product:
- Low-level interrupt handlers
- Binary translation
- Memory management
- Interrupt handling and emulation
- Context switching (called "transmogrification" or Xmog - a Calvin and Hobbes reference)
- Networking and disk I/O
- Debugging tools
- Scheduling and scalability
- Testing
- User-space management tools

### Advanced Features

HPVM offered capabilities that are just starting to show up in open-source tools:
- Para-virtualized I/Os
- On-line guest migration
- On-line addition/removal of devices, RAM, and CPUs
- Cluster integration
- Remarkable I/O capabilities inherited from HP-UX

### Team Excellence

The team consisted of remarkably bright people, some who had been working on operating systems like TOPS-10, TOPS-20, or OpenVMS long before I knew what a calculator was. Special mention to:
- **Karen Noel** - On-line guest migration, OpenVMS support, attempted to improve my OpenVMS and English skills
- **Scott Rhine** - Scheduling work that gave HPVM excellent scalability

**Quote:** *"At HP he was sought after as one of their top visionaries"* - Dale Morris
