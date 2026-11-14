---
id: xlr8
title: XLR8
theme: Languages & Compilers
years: 2026-Present
weight: 8
print: 4
related:
  - xl
  - tao3d
  - elfe
videos: []
links:
  - label: XL
    url: 'https://github.com/c3d/xl'
  - label: LLVM
    url: 'https://llvm.org'
  - label: Lua
    url: 'https://www.lua.org'
  - label: Python
    url: 'https://www.python.org'
  - label: RISC-V
    url: 'https://riscv.org'
topics:
  - compilers
  - opensource
  - asm
---
## Super-fast VM for XL

- XLR8 is a super-fast VM with interpreted and JIT modes
- Significantly faster than Lua or Python VMs on a sample of micro-benchmarks
- In JIT mode, it runs within 20% of C/C++ on most tests
- XLR8 includes its own from-scratch JIT, targeting x86, ARM and RISC-V in 32- and 64-bit modes
- A full LLVM target generating XLR8 bytecode runs many C and C++ programs
- Bytecode can be evaluated while bytecode is running, so the runtime itself is extensible
- XLR8 is intended as the next runtime for XL
