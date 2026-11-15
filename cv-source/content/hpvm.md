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
  - patents
videos: []
links:
  - label: Video (YouTube)
    url: 'https://www.youtube.com/watch?v=Yi8P56ACNOI'
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

I grew this project from initial concept, pre-silicon boot on Ski simulator, A-step silicon bring-up, all the way through production and multiple releases bringing 7-digit quarterly revenue.

- Initial design, business plan and prototyping
- With two other engineers, booted 4-way HP-UX and Linux guests.
- Asked for 15 kernel engineers, got the best of the Tru64 kernel team, leading about 60 engineers over time
- Centerpiece of the HP Virtual Server Environment ecosystem, hundreds of engineers
- Responsibilities included: binary translator, assembly language interrupt handlers, I/O emulation, low-level memory management, context switching.
- Several patents for this work ([Justia](https://patents.justia.com/inventor/christophe-de-dinechin): US 8,694,819, US 8,505,020, US 8,091,090, US 7,996,833, US 7,765,238, US 7,613,847, US 7,577,944, US 7,478,394, US 7,330,942, US 7,213,125, US 6,895,491)
- Emulated firmware and platform:
  - UEFI (born on Itanium) running inside the VM
  - ACPI tables
  - simulated boot loader and guest boot loaders such as GRUB
  - PCI/PCIe configuration space
  - MMIO
  - DMA
  - a virtual BMC
  - MCA (Itanium machine-check architecture)
  - NUMA topologies (core / die / package coherence and performance domains)
  - power-management hints critical to performance
- Later features including para-virtualized I/O and on-line guest migration
- Ran on 128-way Superdome servers with 1TB of memory
- Ran guests up to 16 virtual CPUs, but my testing ran with 64-way Windows guests I used as my primary virtual desktop, eating my own dogfood
- Ran HP-UX, Linux, Windows and OpenVMS as guests
- Longest single professional project (~10 years)

## April Fools

I implemented several key features as April Fools commits. In particular, `hpvmtunes` was a pun on iTunes, advertising music playback. In reality, it was an entire performance monitoring infrastructure, one of the possible outputs being audio. That let me do performance tuning by ear, literally listening to HPVM running.

**Quote:** *"At HP he was sought after as one of the top strategic visionaries"* — Dale Morris
