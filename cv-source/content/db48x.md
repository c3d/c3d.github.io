---
id: db48x
title: DB48X - Modern RPL Calculator
theme: Languages & Compilers
years: 2022-Present
weight: 9
print: 2
related:
  - hp48-games
  - hpds
videos:
  - jNOA39HnkcM
  - WU5Dg1mPkl8
  - 34pPycq8ia8
links:
  - label: GitHub
    url: 'https://github.com/c3d/db48x'
  - label: Try it
    url: 'https://c3d.github.io/db48x/'
  - label: 'DB48X - Reviving the spirit of HP calculators'
    url: 'https://www.youtube.com/watch?v=jNOA39HnkcM'
  - label: FOSDEM 2024
    url: 'https://www.youtube.com/watch?v=WU5Dg1mPkl8'
  - label: FOSDEM 2023
    url: 'https://www.youtube.com/watch?v=34pPycq8ia8'
  - label: ARM Cortex-M33
    url: 'https://www.arm.com/products/silicon-ip-cpu/cortex-m/cortex-m33'
  - label: ARM Cortex-M4
    url: 'https://www.arm.com/products/silicon-ip-cpu/cortex-m/cortex-m4'
  - label: STM32U575 (DM32)
    url: 'https://www.st.com/en/microcontrollers-microprocessors/stm32u575.html'
  - label: STM32L476 (DM42)
    url: 'https://www.st.com/en/microcontrollers-microprocessors/stm32l476zg.html'
topics:
  - calculators
  - lisp
  - opensource
  - linux
  - macos
  - arm
  - soc
  - firmware
  - system
---

## A modern recreation of Hewlett-Packard Reverse Polish Lisp (RPL)

Free software for physical calculators or phone apps.

- Best scientific calculator today, a modern rebuild of high-end HP-48 and HP-50 calculators
- Ships as firmware for real hardware calculators including SwissMicros DM32 and DM42 with low-power ARM SoC
- DM32: [ARM Cortex-M33](https://www.arm.com/products/silicon-ip-cpu/cortex-m/cortex-m33) ([STM32U575](https://www.st.com/en/microcontrollers-microprocessors/stm32u575.html)); DM42: [ARM Cortex-M4](https://www.arm.com/products/silicon-ip-cpu/cortex-m/cortex-m4) ([STM32L476](https://www.st.com/en/microcontrollers-microprocessors/stm32l476zg.html))
- Rich RPL data types and built-in functions with Lisp-level programming power
- Targets SwissMicros DM42 and DM32 calculator SoCs (DMCP platform)
- Firmware-style RPL runtime on ARM microcontroller hardware
- Simulator tested on macOS and Linux
- Long-term ports envisioned for ARM HP50/HP49/HP48Gii and HP Prime G1
- Presented at FOSDEM 2023 with an update in 2024
