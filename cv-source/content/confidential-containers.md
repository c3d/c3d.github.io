---
id: confidential-containers
title: Confidential Containers (CoCo)
theme: Systems & Virtualization
years: 2021-Present
weight: 8
print: 3
related:
  - kata-containers
  - hpvm
  - spice
  - patents
videos:
  - 3UoChFEH6jQ
  - ww6EiDsCRz4
  - 53kf4LY5YdM
  - E1NpnyVl_Go
  - lOi6XjBRtqg
  - G0SwSWKGyuM
links:
  - label: Confidential Containers
    url: 'https://confidentialcontainers.org/'
  - label: Attestation blog series (hub)
    url: 'https://www.redhat.com/en/blog/learn-about-confidential-computing-attestation'
  - label: 'What is the Confidential Containers project?'
    url: 'https://www.redhat.com/en/blog/what-confidential-containers-project'
  - label: 'FOSDEM 2024 (Janson): Proving that Cloud Sysadmins Cannot Read your Data!'
    url: 'https://archive.fosdem.org/2024/schedule/event/fosdem-2024-1991-proving-that-cloud-sysadmins-cannot-read-your-data-/'
  - label: FOSDEM 2024 video
    url: 'https://video.fosdem.org/2024/janson/fosdem-2024-1991-proving-that-cloud-sysadmins-cannot-read-your-data-.mp4'
  - label: 'KVM Forum 2022: Five Big Problems'
    url: 'https://www.youtube.com/watch?v=3UoChFEH6jQ'
  - label: 'KVM Forum 2021: Don''t Peek Into my Container!'
    url: 'https://www.youtube.com/watch?v=ww6EiDsCRz4'
  - label: 'KVM Forum 2023: Chains of trust'
    url: 'https://www.youtube.com/watch?v=53kf4LY5YdM'
  - label: 'DevConf.US 2021: Confidential containers — distrusting your VM host'
    url: 'https://devconfus2021.sched.com/event/lkiO/confidential-containers-distrusting-your-vm-host'
  - label: 'DevConf.CZ 2022: Confidential computing with Kata'
    url: 'https://devconfcz2022.sched.com/event/siGQ/confidential-computing-with-kata-containers'
  - label: 'DevConf.CZ 2023: Chains of trust'
    url: 'https://youtu.be/E1NpnyVl_Go'
  - label: 'DevConf.CZ 2023: From host to workload'
    url: 'https://youtu.be/lOi6XjBRtqg'
  - label: 'DevConf.CZ 2023: CoCo workshop'
    url: 'https://devconfcz2023.sched.com/event/1MYoy/confidential-containers-coco-workshop'
  - label: 'SophiaConf 2022: Confidential containers'
    url: 'https://www.youtube.com/watch?v=G0SwSWKGyuM'
  - label: Azur Tech Winter 2023
    url: 'https://www.telecom-valley.fr/azurtechwinter-2023/'
  - label: 'Patent US12321473B2 (on-demand encrypted image download)'
    url: 'https://patents.google.com/patent/US12321473B2/en'
  - label: 'CCS 2024: Crossing Shifted Moats'
    url: 'https://doi.org/10.1145/3658644.3670352'
images:
  - /cv/media/confidential-containers.png
topics:
  - containers
  - confidential-computing
  - virtualization
  - opensource
  - linux
---
## Confidential Containers and attestation

Focused on attestation for Confidential Containers (CoCo): wrote the Red Hat attestation blog series, and identified two major flaws in the original CoCo design — incremental / in-guest image download and the split host/tenant API — with proposed solutions.

- Six-part Red Hat blog series on confidential computing and attestation (May–June 2023), including CoCo attestation architecture; plus the September 2023 hub and co-authorship of the CoCo project overview
- FOSDEM 2024 main-stage (Janson) talk: “Proving that Cloud Sysadmins Cannot Read your Data!” — attestation for confidential VMs, containers, and clusters (not a keynote)
- Same attestation material also at KVM Forum 2023, DevConf.CZ 2023, and Azur Tech Winter 2023
- Design issues called out in DevConf.CZ 2022 and KVM Forum 2022 “Five Big Problems”; guest-side image pull / download already in KVM Forum 2021
- Co-inventor of [US12321473B2](https://patents.google.com/patent/US12321473B2/en) (on-demand encrypted container image download)
- Co-author of CCS 2024 “Crossing Shifted Moats…” (host/tenant control-plane split)
