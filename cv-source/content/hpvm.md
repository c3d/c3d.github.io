---
id: hpvm
title: HPVM - Enterprise-grade Itanium virtualization
theme: Systems & Virtualization
years: 2000-2010
weight: 10
featured: true
print: 1
related:
  - kata-containers
  - confidential-containers
  - hpvm-presilicon
  - hardware-firmware
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
  - asm
---
## Enterprise-grade virtualization for high-end Itanium servers

- Started the project; pre-silicon boot on [Ski](https://github.com/linux-ia64/ski/tree/hp-sim-for-linux), then A-step silicon bring-up, through production (7-digit quarterly revenue)
- Firmware-level VMM for Integrity servers
- Grew the team from the first 4-way boot achieved with 3 engineers to leading about 60 kernel engineers: after that boot he asked his general manager for 15 kernel engineers to productize, and was handed “the keys” to the Tru64 kernel team
- Program grew to hundreds of engineers (order of magnitude)
- Emulated firmware and platform: UEFI (born on Itanium) running inside the VM, ACPI tables, simulated boot loader and guest boot loaders such as GRUB, PCI/PCIe configuration space, MMIO, DMA, a virtual BMC, MCA (Itanium machine-check architecture), NUMA topologies (core / die / package coherence and performance domains), power-management hints critical to performance
- Features including para-virtualized I/O and on-line guest migration
- Longest single professional project (~10 years)

**Quote:** *"At HP he was sought after as one of the top strategic visionaries"* — Dale Morris
