---
id: dxo-one
title: DxO ONE Connected Camera
theme: Systems & Virtualization
years: 2015-2016
weight: 10
print: 4
related:
  - make-it-quick
  - recorder
  - hardware-firmware
videos:
  - k9KXqVCYPoo
videoAspect: '9:16'
links:
  - label: DxO
    url: 'https://www.dxo.com/'
images:
  - src: /cv/media/dxo-one.jpg
    credit:
      author: Wilmot Yeh
      license: CC BY-SA 4.0
      licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/'
      via: Wikimedia Commons
      viaUrl: 'https://commons.wikimedia.org/wiki/File:DxO_ONE_connected_to_iPhone_6.jpg'
topics:
  - embedded
  - arm
  - realtime
  - imaging
  - asm
---
## Software quality for a diminutive connected camera

Paris.

- Dual-core ARM + ISP real-time system
- Camera randomly took pink pictures: components built by hand, structs sized differently under inconsistent `#ifdef`s — redesigned the build system to fix it (ancestor of [make-it-quick](#make-it-quick))
- Introduced version control, CI, modularity, and testing practices where almost none existed
- Left behind a wall of test boxes: each Raspberry Pi flashed firmware into a DxO ONE and shot reference pictures under controlled lighting
- Asserts used to lock up and drain the battery in a spin loop; serial debug spam slowed the camera — replaced with a printf-compatible circular buffer dumped only on failure (ancestor of the [recorder](#recorder)); boot time from 2–5 s to under 1 s
- Proposed the black-and-white viewfinder UI idea during the interview (others implemented it)
- Also implemented real-time HDR for iPhone/iPad
