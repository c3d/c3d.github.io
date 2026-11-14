---
id: db48x-tests
title: DB48X automated test suite
theme: Languages & Compilers
years: 2022-Present
weight: 7
related:
  - db48x
  - recorder
videos:
  - jPoXadNIdUM
links:
  - label: 'DB48x tests with Flight Recorder tracing memory usage'
    url: 'https://www.youtube.com/watch?v=jPoXadNIdUM'
  - label: 'DB48X v0.6.2+ Full Test Suite Run'
    url: 'https://www.youtube.com/watch?v=aHW2GcX5S6o'
  - label: tests.cc
    url: 'https://github.com/c3d/db48x/blob/stable/src/tests.cc'
  - label: tests.h
    url: 'https://github.com/c3d/db48x/blob/stable/src/tests.h'
  - label: Simulator docs
    url: 'https://github.com/c3d/db48x/blob/stable/SIMULATOR.md'
topics:
  - validation
  - calculators
  - opensource
  - arm
---

## Built-in automated test suite for DB48X

Keystroke-driven validation inside the DB48X simulator (F12 / `-Tall`).

- Built-in simulator test suite covering more than 8000 individual tests
- ~20 370 lines of suite code on the db48x `stable` branch tip used for this CV update
- Run from the Qt simulator with F12 or `-Tall` (see SIMULATOR.md / BUILD.md)
