---
id: kata-containers
title: Kata Containers
theme: Systems & Virtualization
years: 2019-Present
weight: 9
print: 2
related:
  - confidential-containers
  - hpvm
  - spice
  - patents
videos:
  - SK4Tk9rv3H0
  - bRcF2GoVhZk
links:
  - label: Kata Containers
    url: 'https://katacontainers.io/'
  - label: Fedora review (kata-runtime)
    url: 'https://bugzilla.redhat.com/show_bug.cgi?id=1761451'
  - label: OpenShift sandboxed containers
    url: 'https://docs.redhat.com/en/documentation/openshift_container_platform/4.8/html/sandboxed_containers_support_for_openshift/understanding-sandboxed-containers'
  - label: 'DevConf.CZ 2020: Kata and qemu-mini'
    url: 'https://youtu.be/SK4Tk9rv3H0'
  - label: 'DevConf.CZ 2021: Honey, I shrunk the pods'
    url: 'https://youtu.be/bRcF2GoVhZk'
  - label: 'DevConf.CZ 2021: Kata Containers will impact you'
    url: 'http://devconfcz2021.sched.com/event/gmJb/kata-containers-will-impact-you-yes-you'
  - label: SophiaConf 2020
    url: 'https://www.telecom-valley.fr/29-30-juin-2020-sophiaconf-100-numerique/'
images:
  - /cv/media/kata-containers.png
topics:
  - containers
  - virtualization
  - opensource
  - linux
---
## OpenShift Sandboxed Containers

Brought Kata Containers into the Red Hat stack and created the first RPMs and packaging (Fedora 31, October 2019), which became OpenShift Sandboxed Containers.

- Packaged Kata for Fedora as five RPMs (`kata-runtime`, `kata-osbuilder` / agent, `kata-proxy`, `kata-shim`, `kata-ksm-throttler`); `kata-runtime` 1.8.2 landed in Fedora 31 stable on 31 October 2019
- Presented packaging and a size-optimized QEMU (“qemu-mini”) at DevConf.CZ 2020 and SophiaConf 2020
- Later talks on Kata footprint and adoption (DevConf.CZ 2021)
