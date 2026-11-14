---
id: db48x-tests
title: DB48X automated test suite
theme: Languages & Compilers
years: 2022-Present
weight: 7
print: 2
related:
  - db48x
videos: []
links:
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

- Built-in simulator suite in src/tests.cc / src/tests.h (3 412 named step checks; F12 / -Tall)
- ~20 370 lines of suite code on the db48x `stable` branch tip used for this CV update
- Run from the Qt simulator with F12 or `-Tall` (see SIMULATOR.md / BUILD.md)

