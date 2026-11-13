---
id: hpcpp
title: HP aC++ Compiler & C++ ABI
theme: Languages & Compilers
years: 1998-2001
weight: 10
related: []
videos: []
links:
  - label: C++ ABI Documentation
    url: https://itanium-cxx-abi.github.io/cxx-abi/
  - label: Exception Handling Article
    url: https://www.computer.org/csdl/magazine/co/2000/12/ry046/13rRUygBwht
---

## Industry-Wide C++ Standard Implementation

At Hewlett-Packard's Compiler and Languages Lab in Cupertino, California, I made fundamental contributions to C++ compiler technology that are still used today.

### HP aC++ Compiler Work

Working on the aC++ compiler (from Taligent codebase):
- Templates implementation and optimization
- Performance improvements
- Run-time library development
- Precompiled headers
- Exception handling
- Represented HP at C++ standards committee

### Revolutionary Exception Handling

Traditional exception handling was hostile to optimizations—a real problem for processors like Itanium where compiler optimizations were essential for performance.

Implemented a new approach designed by brilliant HP minds that:
- Allowed aggressive compiler optimizations
- Maintained full C++ exception semantics
- Became the standard approach in modern compilers
- Documented in an IEEE article

**Quote:** *"An exceedingly sharp engineer"* - Mark Mitchell

### C++ ABI - Defining the Standard

Working with Cary Coutant, Daveed Vandevoorde, and engineers from many companies, we created the first common C++ ABI (Application Binary Interface) for Itanium.

**Impact:** Though called the "Itanium C++ ABI," it was quickly adopted by GCC and other compilers for many platforms. It remains the standard to this day for new C++ revisions.

### First Native Itanium Compilers

Built the first native Itanium C and C++ compilers, coordinating work of 16 different teams with 16 different ways of writing makefiles. HP's original plan was to run PA-RISC cross compilers in a PA-RISC emulator!
