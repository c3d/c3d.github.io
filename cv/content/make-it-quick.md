---
id: make-it-quick
title: Make-It-Quick Build System
theme: Tools & Apps
years: 2015-Present
weight: 7
related: [recorder]
videos: []
links:
  - label: GitHub
    url: https://github.com/c3d/make-it-quick
---

## A Quick Way to Write Makefiles

Make-It-Quick is a simple build system designed to make it easy to build C or C++ programs without lengthy makefiles or the complexity of tools like automake or cmake.

### Features

**Simple & Readable:**
- Very short and readable makefiles
- Offering all the most useful features
- Compact size (~500 lines of active makefile code)

**Fast:** Since short makefiles with few rules are quickly parsed.

**Automatic Features:**
- Incremental project configuration
- Generates `config.h` file
- Detailed build command logging in log files
- Single-pass generation of header-file dependencies

**Built-in Capabilities:**
- Product testing with `make test`
- Product installation with `make install`
- Compact, colorized progress report
- Summary of errors and warnings at end of build
- Colorization of error and warning messages

**Flexible Build Modes:**
- Rules to build various targets (optimized, debug, release, profile)
- Rule modifiers for common build options (e.g., `v-debug` for verbose debug)
- Personal preferences easily defined with environment variables

**Developer-Friendly:**
- Built-in help (`make help`)
- Pure make, allowing standard Makefile syntax and features
- Supports parallel builds
- Supports separate libraries to accelerate builds

**Portable:** Tested on Linux, macOS, and Windows platforms.

### Philosophy

Well suited for relatively small programs, though it has been used for at least one much larger program. The goal is simplicity without sacrificing power.
