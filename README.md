# Implementation and Performance Evaluation of a 4-Port Credit-Based Shaper TSN Switch for QoS Provisioning in Automotive Ethernet

## 4-포트 크레딧 기반 셰이퍼(Credit-Based Shaper) TSN 스위치를 활용한 차량용 QoS 보장 구현 및 성능 평가

### Research Paper Repository

This repository contains the implementation details, experimental data, and results from our research on Credit-Based Shaper (CBS) mechanisms in automotive Time-Sensitive Networking (TSN) switches.

## Abstract

With the recent evolution of electrical/electronic (E/E) architecture toward a zonal structure, in-vehicle networks are required to reliably transmit diverse traffic types, including high-bandwidth multimedia streams and critical control data. To meet this demand, we implemented a system using a Credit-Based Shaper (CBS) and conducted tests and performance evaluations using a 4-port automotive TSN (Time-Sensitive Networking) switch. 

## 요약

최근 전기/전자(E/E) 아키텍처가 영역(존) 기반 구조로 진화함에 따라, 차량 내 네트워크는 고대역폭 멀티미디어 스트림과 중요 제어 데이터를 포함한 다양한 트래픽 유형의 신뢰성 있는 전송을 요구받고 있다. 이 논문은 이러한 요구에 대응하기 위해 크레딧 기반 셰이퍼(Credit-Based Shaper, CBS)를 이용해 시스템을 구현하고, 이를 4포트 차량용 TSN(Time-Sensitive Networking) 스위치를 이용해 시험 및 성능 평가를 수행하였다.

## Keywords
- Automotive Ethernet
- Credit-Based Shaper
- Quality of Service
- Zonal Architecture
- Infotainment
- Time-Sensitive Networking (TSN)
- IEEE 802.1Qav

## Repository Structure

```
0905/
├── README.md                 # This file
├── paper/                    # Full research paper
│   ├── paper_en.md          # English version
│   └── paper_kr.md          # Korean version
├── config/                   # Configuration files
│   ├── ipatch/              # iPATCH YAML configurations
│   └── scripts/             # Setup and test scripts
├── data/                     # Experimental data
│   ├── raw/                 # Raw measurement data
│   └── processed/           # Processed results
├── docs/                     # Documentation for GitHub Pages
│   ├── index.html          # Main page
│   └── assets/             # CSS, JS, images
└── images/                   # Figures and diagrams
```

## Hardware Platform

- **Main Board**: Microchip EVB-LAN9692-LM
  - CPU: ARM Cortex-A53 @ 1 GHz
  - TSN Features: IEEE 802.1Qav (CBS), IEEE 802.1Qbv (TAS), IEEE 802.1AS-2020 (gPTP)
  
- **Secondary Board**: Microchip EVB-LAN9662
  - CPU: ARM Cortex-A7 @ 600 MHz
  - 2× Gigabit Ethernet ports

## Key Results

- Successfully implemented CBS mechanism on 4-port TSN switch
- Achieved stable throughput control at configured idle-slope (100 Mbps)
- Demonstrated QoS provisioning under network overload conditions
- Reduced packet loss from 64.37% (baseline) to controlled levels with CBS

## Documentation

Full documentation is available at: https://hwkim3330.github.io/0905/

## Authors

- Research conducted as part of the Smart Car Technology Development Project
- Supported by Korea Institute for Advancement of Technology (KEIT)
- Grant No.: RS-2024-00404601

## License

This research is published under academic use license. Please cite appropriately if using this work.

## Contact

For questions or collaboration, please open an issue in this repository.
