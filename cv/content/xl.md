---
id: xl
title: XL
theme: Languages & Compilers
years: 1992-Present
weight: 9
print: 3
related:
  - tao3d
  - elfe
  - lx
  - mozart
  - moka
videos: []
links:
  - label: XL
    url: 'https://github.com/c3d/xl'
images:
  - /cv/media/xl.png
topics:
  - compilers
  - opensource
---
## Extensible language designed to evolve

- Renamed from LX after discussions notably with Daveed Vandevoorde; focus shifted from experimental to extensible
- Re-implemented on Mozart (itself largely reusing LX code)
- Inherited advanced generics from LX
- XL2 — re-implementation with a simplified parse tree (8 node types), still used in XLR, Tao3D, and ELFE; meta-programming friendly
- XL2 was bootstrapped in three stages (first stage in C++)
- XLR — Extensible Language Runtime; initially an LLVM-backed dynamic back-end for XL2; became a language of its own

**Quote:** *"Advanced and revolutionary stuff"* — Raphaël Manfredi
