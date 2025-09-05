# 4-Port Credit-Based Shaper TSN Switch Research

<div align="center">

![TSN Logo](https://img.shields.io/badge/TSN-IEEE%20802.1-blue?style=for-the-badge&logo=ieee)
![Research](https://img.shields.io/badge/Research-Automotive%20Ethernet-green?style=for-the-badge)
![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)

---

## 📚 Documentation / 문서

[![English](https://img.shields.io/badge/📖_Full_Documentation-English-0066cc?style=for-the-badge)](README_EN.md)
[![Korean](https://img.shields.io/badge/📖_전체_문서-한국어-cc0000?style=for-the-badge)](README_KR.md)

## 🌐 Interactive Demo / 인터랙티브 데모

[![GitHub Pages](https://img.shields.io/badge/🚀_Live_Demo-GitHub_Pages-24292e?style=for-the-badge&logo=github)](https://hwkim3330.github.io/0905/)

---

</div>

## 🎯 Project Overview / 프로젝트 개요

This research demonstrates the implementation and performance evaluation of **Credit-Based Shaper (CBS)** mechanisms in automotive Time-Sensitive Networking (TSN) switches, focusing on Quality of Service (QoS) provisioning for next-generation vehicle networks.

이 연구는 차세대 차량 네트워크를 위한 서비스 품질(QoS) 보장에 초점을 맞춘 차량용 시간 민감형 네트워킹(TSN) 스위치에서 **크레딧 기반 셰이퍼(CBS)** 메커니즘의 구현 및 성능 평가를 보여줍니다.

## 🔬 Key Results / 주요 결과

| Metric | Without CBS | With CBS | Improvement |
|--------|-------------|----------|-------------|
| **Packet Loss** | 64.37% | 0.19% | **99.8% reduction** |
| **Max Latency** | 250 ms | 12.5 ms | **95% reduction** |
| **Jitter** | 78.2 ms | 2.1 ms | **97.3% reduction** |
| **Throughput Stability** | σ=47.2 Mbps | σ=2.1 Mbps | **95.5% variance reduction** |

## 🛠️ Technology Stack / 기술 스택

- **Hardware**: Microchip LAN9692/9662 TSN Switches
- **Standards**: IEEE 802.1Qav (CBS), IEEE 802.1AS (Time Sync)
- **Configuration**: YAML-based iPATCH framework
- **Analysis**: Interactive web visualization with Chart.js

## 📊 Quick Access / 빠른 접근

### Research Paper / 연구 논문
- 📄 **[English Version](README_EN.md)** - Complete academic paper in English
- 📄 **[Korean Version](README_KR.md)** - 한국어 완전 학술 논문

### Live Demo / 라이브 데모
- 🌐 **[Interactive Results](https://hwkim3330.github.io/0905/)** - Web-based visualization
- 📈 **Performance Charts** - Real-time data analysis
- 🔧 **Configuration Examples** - Ready-to-use YAML files

### Repository Structure / 저장소 구조
```
├── 📁 config/         # TSN configuration files
├── 📁 data/           # Experimental results
├── 📁 docs/           # GitHub Pages site
├── 📁 paper/          # Academic papers
└── 📁 scripts/        # Automation tools
```

## 🎯 Target Audience / 대상 독자

- **Automotive Engineers** developing next-generation vehicle networks
- **TSN Researchers** studying Credit-Based Shaper implementations  
- **Network Architects** designing QoS-aware Ethernet systems
- **Standards Contributors** working on IEEE 802.1 specifications

---

## 🏆 Research Achievements / 연구 성과

✅ **Hardware Implementation** - Real TSN switch deployment  
✅ **Quantitative Analysis** - Comprehensive performance metrics  
✅ **Open Source** - All configurations and data available  
✅ **Interactive Demo** - Web-based result visualization  
✅ **Industry Impact** - Practical deployment guidelines  

## 📬 Contact & Citation / 연락처 및 인용

**Research Support**: Korea Institute for Advancement of Technology (KEIT)  
**Grant**: RS-2024-00404601  

```bibtex
@techreport{cbs_tsn_2024,
  title={Implementation and Performance Evaluation of a 4-Port Credit-Based 
         Shaper TSN Switch for QoS Provisioning in Automotive Ethernet},
  author={Kim, H.W. and Research Team},
  institution={KEIT Smart Car Technology Development Project},
  year={2024},
  url={https://github.com/hwkim3330/0905}
}
```

---

<div align="center">

**🚀 [Start Reading](README_EN.md) | [한국어로 시작](README_KR.md) | [View Demo](https://hwkim3330.github.io/0905/)**

*Made with ❤️ for the automotive and networking research community*

</div>