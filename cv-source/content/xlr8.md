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
  - label: RISC-V
    url: 'https://riscv.org'
topics:
  - compilers
  - opensource
---
## Super-fast VM for XL

- XLR8 is a super-fast VM with interpreted and JIT modes
- In interpreted mode, it runs 40% faster than Lua and 8× faster than Python for similar microbenchmarks
- In JIT mode, it runs within 20% of C/C++ on most tests
- XLR8 includes its own from-scratch JIT, targeting x86, ARM and RISC-V in 32- and 64-bit modes
- A full LLVM target generating XLR8 bytecode runs many C and C++ programs
- XLR8 has a unique feature where bytecode can be evaluated during bytecode evaluation, so that the bytecode runtime is itself extensible
- XLR8 is intended as the next runtime for XL
