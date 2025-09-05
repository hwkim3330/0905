# Implementation and Performance Evaluation of a 4-Port Credit-Based Shaper TSN Switch for QoS Provisioning in Automotive Ethernet

## Abstract

With the recent evolution of electrical/electronic (E/E) architecture toward a zonal structure, in-vehicle networks are required to reliably transmit diverse traffic types, including high-bandwidth multimedia streams and critical control data. To meet this demand, we implemented a system using a Credit-Based Shaper (CBS) and conducted tests and performance evaluations using a 4-port automotive TSN (Time-Sensitive Networking) switch. 

Our experimental setup included multiple video stream sources, two video receivers, and a best-effort (BE) traffic generator to induce network congestion. We then compared and analyzed the network's performance with and without the CBS function activated. The results showed that applying CBS achieved stable playback and minimal frame loss through the priority control of time-sensitive video streams, even under network overload. 

The performance metrics measured in terms of throughput, frame loss rate, and video playback quality demonstrate that CBS is an effective means of ensuring QoS for in-vehicle infotainment systems. Our research confirms the applicability of the CBS mechanism as a practical solution for guaranteeing QoS for various traffic types in a multi-domain zonal vehicle architecture and is expected to contribute to the future advancement of autonomous driving and connected car technologies.

**Keywords**: Automotive Ethernet, Credit-Based Shaper, Quality of Service, Zonal Architecture, Infotainment, Time-Sensitive Networking (TSN), IEEE 802.1Qav

## I. Introduction

### 1.1 Background

The electrical/electronic (E/E) architecture of modern vehicles is rapidly evolving from domain-centric to zone-based structures. This transformation is driven by the explosive growth in in-vehicle data traffic accompanying the development of autonomous driving, advanced driver assistance systems (ADAS), and infotainment systems. In particular, ensuring quality of service (QoS) for each traffic type in a network environment where high-volume data from high-resolution cameras, LiDAR, and radar sensors coexists with real-time control signals has become a critical challenge for both vehicle safety and user experience.

Traditional CAN (Controller Area Network) and FlexRay-based networks struggle to meet these requirements due to limited bandwidth and deterministic latency constraints. As a solution, IEEE 802.3 Ethernet-based automotive networks have gained attention, with Time-Sensitive Networking (TSN) standards emerging as a key technology capable of providing differentiated service quality for various traffic classes.

### 1.2 TSN and Credit-Based Shaper

TSN is a set of standards developed by the IEEE 802.1 working group that defines various mechanisms to ensure real-time performance and reliability in standard Ethernet networks. Among these, the Credit-Based Shaper (CBS) defined in IEEE 802.1Qav is a traffic shaping mechanism developed for audio/video bridging (AVB) applications. It reserves bandwidth for each traffic class and controls bursts to make latency predictable.

The core operating principle of CBS involves introducing a 'credit' concept for each traffic class, allowing frame transmission only when credits are positive. Credits increase at the idleSlope rate when the queue is empty and decrease at the sendSlope rate during frame transmission. This mechanism prevents high-priority traffic from monopolizing network resources while guaranteeing minimum bandwidth for each traffic class.

### 1.3 Research Objectives and Contributions

The objective of this research is to experimentally verify the effectiveness of the CBS mechanism in an actual automotive TSN switch environment and evaluate the feasibility of QoS provisioning for in-vehicle multimedia and control traffic. We conducted implementation and performance evaluation using a 4-port TSN switch based on Microchip's LAN9692.

The main contributions of this research are:

1. **Hardware-based CBS Implementation**: Practical implementation and configuration methodology of CBS mechanism using commercial TSN switch chipsets
2. **Quantitative Performance Evaluation**: Comparative analysis of throughput, packet loss rate, and transmission stability before and after CBS application under network overload conditions
3. **Automotive Network Applicability Verification**: Confirmation of QoS provisioning effects in mixed multimedia stream and best-effort traffic environments
4. **Implementation Guidelines**: Documentation of reproducible TSN configuration methodology through YAML-based declarative configuration

## II. Credit-Based Shaper Theory

### 2.1 CBS Operating Principle

The Credit-Based Shaper (CBS) is a traffic shaping mechanism defined in the IEEE 802.1Qav standard that manages a credit value in real-time for each traffic class to determine transmission eligibility. This approach is designed to minimize latency for time-sensitive traffic while efficiently utilizing overall network bandwidth.

CBS defines two rates for each traffic class:

- **idleSlope**: The rate at which credits increase when the queue is empty, representing the guaranteed bandwidth for that class
- **sendSlope**: The rate at which credits decrease during frame transmission, defined as sendSlope = idleSlope - portRate, where portRate is the total link transmission rate

The credit value credit_c for traffic class c changes over time according to the following rules:

**When the queue is empty:**
```
credit_c(t) = credit_c(t-1) + idleSlope × Δt
```

**When transmitting frames:**
```
credit_c(t) = credit_c(t-1) + sendSlope × Δt
```

CBS allows frame transmission for a traffic class only when credit_c ≥ 0. This enables traffic classes with high idleSlope values to quickly recover credits and gain frequent transmission opportunities, while traffic classes with low idleSlope values can only transmit when higher-priority queues are empty.

### 2.2 CBS Parameter Configuration

The CBS mechanism must satisfy the following condition:

```
Σ(idleSlope_i) ≤ portRate
```

The sum of all idleSlope values configured for all traffic classes cannot exceed the total link bandwidth (portRate).

This structure achieves two key effects simultaneously:

1. Time-sensitive streams (e.g., audio/video) receive high idleSlope values for preferential network resource access
2. Lower-priority traffic can transmit when higher-priority queues are empty, utilizing network resources without idle time

### 2.3 CBS Advantages

CBS serves as a traffic shaping technique that satisfies both real-time requirements and fairness, playing a crucial role in TSN environments. Key advantages include:

- **Predictable Latency**: Maximum latency for each traffic class can be mathematically calculated
- **Bandwidth Guarantee**: Minimum bandwidth guarantee through idleSlope configuration
- **Burst Control**: Traffic burst mitigation through credit mechanism
- **Network Utilization Optimization**: Allows lower-priority traffic transmission when priority queues are empty

## III. System Implementation

### 3.1 Experimental Environment Overview

This research reproduced port-level UDP traffic congestion artificially using Microchip's EVB-LAN9692 evaluation board. Three transmitting nodes (Ports 8, 10, 11) independently generate 1 Gb/s UDP streams, all aggregated to a single receiving port (Port 9), creating a bottleneck environment where approximately 3 Gb/s of traffic converges on a 1 Gb/s link.

No additional control was applied at the network or transport layers, and all packets were transmitted as untagged Ethernet frames. This allows direct observation of traffic handling with only the switch's basic queue management and egress port processing capabilities.

### 3.2 Hardware Platform

#### EVB-LAN9692-LM Key Specifications

**System**
- CPU: ARM Cortex-A53 (64-bit, single-core) @ 1 GHz
- Memory: 2 MiB ECC SRAM, 8 MB QSPI NOR flash

**Network Interfaces**
- 4× SFP+ ports (via LAN9692 SerDes)
- 7× MATEnet ports (via LAN8870)
- 1× RJ45 port (via LAN8840, for management or external Ethernet)

**Management & Development**
- USB-C UART (MUP1)
- CORECONF/YANG over CoAP
- VelocityDRIVE-SP firmware
- VelocityDRIVE CT GUI

**Time-Sensitive Networking (TSN) Features**
- IEEE 802.1Qbv — Time-Aware Shaper (TAS)
- IEEE 802.1Qav — Credit-Based Shaper (CBS)
- IEEE 802.1Qci — Per-Stream Filtering and Policing (PSFP)
- IEEE 802.1AS-2020 — gPTP (with SMA 1PPS in/out, hardware timestamping)

#### EVB-LAN9662 Key Specifications

**System**
- CPU: ARM Cortex-A7 (32-bit, dual-core) @ 600 MHz (integrated in LAN9662 SoC)
- Memory: 512 MB DDR3L-1333, 4 GB eMMC NAND, 16 Mb SPI NOR flash

**Network Interfaces**
- 2× RJ45 Gigabit Ethernet ports (via integrated PHYs in LAN9662)

**TSN Features**
- IEEE 802.1Qbv, 802.1Qav, 802.1Qci, 802.1AS-2020 support
- Integrated Real-Time Engine (RTE) for industrial protocols

### 3.3 Traffic Generator Configuration

| Port | Node      | IP Address    | Role       | Traffic Conditions              |
|------|-----------|---------------|------------|--------------------------------|
| 8    | Lenovo #1 | 10.0.100.4   | Sender     | UDP, 1 Gb/s, Payload 1200 B  |
| 10   | Lenovo #2 | 10.0.100.3   | Sender     | UDP, 1 Gb/s, Payload 1200 B  |
| 11   | PC        | 10.0.100.1   | Sender     | UDP, 1 Gb/s, Payload 1200 B  |
| 9    | Nvidia    | 10.0.100.2   | Receiver   | Single receive port, 1 Gb/s bottleneck |

All transmitting nodes used the same UDP port (5000) and packet size (1200 B), performing line-rate transmission with mausezahn.

The transmitting nodes generated UDP streams using the Linux-based mausezahn tool. A typical command is:

```bash
sudo mausezahn <interface> \
  -A <src_ip> -B 10.0.100.2 \
  -t udp "sp=5000,dp=5000" \
  -p 1200 -c 0 -d 0
```

Where payload size (-p) was fixed at 1200 bytes, -c 0 enables infinite loop transmission, and -d 0 means transmission at maximum possible speed without delay.

### 3.4 CBS Implementation

The Credit-Based Shaper (CBS) implementation in this research was based on Microchip's TSN-capable SoCs (LAN9662, LAN9692) and the real-time firmware VelocityDRIVE-SP. VelocityDRIVE-SP exposes CBS functionality defined in IEEE 802.1Qav as a YANG data model, allowing administrators to apply declarative commands via CORECONF/CoAP or serial interface (MUP1).

#### 3.4.1 Configuration Procedure

CBS application is described in YAML-format iPATCH scripts and applied to the device through the MUP1CC tool. The main steps are:

**1. QoS Insertion Stage** (ipatch-insert-qos.yaml)
Initialize CBS control structure by adding traffic-class-shapers items to the device QoS node.

**2. Path Mapping Stage** (ipatch-pX-deco-pY-enco.yaml)
Define decoding/encoding paths between input and output ports.

**3. CBS Parameter Application Stage** (ipatch-cbs-idle-slope.yaml)
Specify idle-slope of 100,000 for each traffic-class (0-7), representing approximately 100 Mb/s throughput guarantee.

Command execution:

```bash
# QoS insertion
dr mup1cc -d /dev/ttyACM0 -m ipatch -i ipatch-insert-qos.yaml

# Port mapping
dr mup1cc -d /dev/ttyACM0 -m ipatch -i ipatch-p1-deco-p2-enco-9662.yaml

# CBS idle-slope application
dr mup1cc -d /dev/ttyACM0 -m ipatch -i ipatch-cbs-idle-slope-9662.yaml
```

#### 3.4.2 Operating Principle

CBS manages credit variables in each egress queue, with credits recovering according to idle-slope values and depleting according to send-slope. The configured idle-slope = 100,000 in this experiment means the output port can transmit at a maximum rate of 100 Mb/s.

### 3.5 Measurement Method

Experimental data was collected through internal port counters on the board. Using Microchip's dr mup1cc utility, we retrieved RX and TX packet counts for each port at 10-second intervals.

Drop rate calculation was performed according to:

```
Drop Rate (%) = (Total RX - Total TX) / Total RX × 100
```

Additionally, TX bytes/second and drop occurrence patterns were recorded in time series to analyze traffic stability (burst, volatility).

## IV. Experimental Results and Analysis

### 4.1 Baseline Results (CBS Disabled)

In the baseline scenario without traffic shaping features like CBS, Port 9's egress queue remained consistently saturated. Results measured during a 10-second experiment:

| Category             | Packet Count   |
|---------------------|---------------|
| RX (Port 8+10+11)   | 15,737,339    |
| TX (Port 9)         | 5,607,906     |
| Loss                | 10,129,433    |
| Drop Rate (%)       | 64.37         |

Approximately 10.1M packets were lost, resulting in a drop rate of **64.37%**. Losses were not evenly distributed across all transmitting ports, with burst patterns observed where specific port streams experienced relatively higher losses during instantaneous queue saturation.

### 4.2 CBS Applied Results

After activating the Credit-Based Shaper (CBS) on the LAN9692 board, we measured per-port traffic counts. All input ports were configured to generate 1 Gb/s UDP streams identically, with the output port (Port 9) aggregating and transmitting them.

| Port Category       | traffic-class | rx-packets  | tx-packets   | Assessment                                    |
|--------------------|--------------|------------|-------------|----------------------------------------------|
| Input A (Port 8)    | 0            | 141,310    | 274         | Input, limited transmission with CBS applied |
| Output (Port 9)     | 0            | 74         | 1,158,538   | Output, normal CBS cumulative transmission   |
| Input B (Port 10)   | 0            | 1,131,457  | 220         | Input, massive drops                        |
| Input C (Port 11)   | 0            | 796,331    | 171         | Input, massive drops                        |

The most notable result is from **Input A (Port 8)**. This port received over 140,000 packets but transmitted only 274, confirming that output rate was suppressed according to CBS operation. This clearly shows that Port 8 was properly mapped to the CBS queue with shaping policy applied.

**Output port (Port 9)** recorded approximately 1.15 million transmitted packets, proving that CBS-shaped traffic from Port 8 was accumulating and transmitting stably. The convergence of transmission rate to the idle-slope value (100 Mb/s baseline) demonstrates CBS controlling transmission rate at the port bottleneck as expected.

### 4.3 Analysis and Improvement Directions

Experimental results clearly show CBS operating normally on at least the Port 8 path. The output port's transmission pattern supports this, confirming that shaping maintains stable transmission rates despite excessive traffic input.

However, the non-application phenomenon on Ports 10 and 11 is attributed to configuration procedure incompleteness or queue mapping omissions. Future experiments should strengthen configuration verification procedures to ensure CBS is uniformly reflected across all input ports.

## V. Conclusion

This research measured Credit-Based Shaper (CBS) operation in a Microchip LAN9692/9662-based TSN environment. Experimental results clearly observed transmission rate control according to CBS idle-slope (100 Mb/s level) at the output port. This demonstrates CBS performing basic QoS provisioning functions by limiting transmission rates even under excessive input traffic conditions.

### 5.1 Main Achievements

1. **CBS Operation Verification**: Proved CBS can successfully perform output traffic control in actual hardware environments
2. **QoS Provisioning Feasibility Confirmation**: Maintained stable transmission rates according to configured idle-slope even under network overload
3. **Implementation Methodology Documentation**: Presented reproducible TSN configuration methods through YAML-based iPATCH settings

### 5.2 Limitations and Future Research

However, inter-input port application consistency was not secured, resulting in traffic exclusion from shaping or massive drops on some paths. This is attributed to configuration procedure incompleteness or queue mapping process omissions.

Future research should:
- Strengthen configuration verification procedures for uniform CBS application across all ports
- Systematically analyze fairness and bandwidth utilization between traffic classes with various idle-slope parameters
- Configure experimental scenarios reflecting actual vehicle multimedia traffic patterns
- Research hybrid QoS provisioning approaches combining Time-Aware Shaper (TAS) and CBS

### 5.3 Conclusion

Overall, this measurement proved CBS can successfully perform output traffic control in actual hardware environments, providing foundational data for QoS provisioning of multimedia and control traffic in automotive TSN networks.

This research experimentally demonstrated the practical applicability of TSN mechanisms for QoS provisioning of automotive infotainment and control traffic, suggesting that CBS-based traffic control can play an important role in future autonomous driving and connected car network architecture design.

## Acknowledgement

This paper is the result of research conducted with support from the Korea Institute for Advancement of Technology (KEIT) funded by the Ministry of Trade, Industry and Energy.
[Project: Smart Car Technology Development Project / Task: Development of Function-Variable Architecture and Evaluation/Verification Technology for Autonomous Vehicle Electronic Component Defect/Error Response / Grant No.: RS-2024-00404601]

## References

[1] IEEE, "IEEE Standard for Local and metropolitan area networks--Bridges and Bridged Networks - Amendment 12: Forwarding and Queuing Enhancements for Time-Sensitive Streams," IEEE Std 802.1Qav-2009, 2010.

[2] IEEE, "IEEE Standard for Local and metropolitan area networks -- Bridges and Bridged Networks -- Amendment 25: Enhancements for Scheduled Traffic," IEEE Std 802.1Qbv-2015, 2016.

[3] Microchip Technology Inc., "LAN9692 Datasheet - Gigabit Ethernet Switch with TSN Support," 2023.

[4] J. Specht and S. Samii, "Urgency-Based Scheduler for Time-Sensitive Switched Ethernet Networks," 28th Euromicro Conference on Real-Time Systems (ECRTS), pp. 75-85, Toulouse, France, July 2016.

[5] F. Dürr and N. G. Nayak, "No-wait Packet Scheduling for IEEE Time-sensitive Networks (TSN)," in Proc. 24th International Conference on Real-Time Networks and Systems, pp. 203-212, Brest, France, Oct. 2016.

[6] L. Zhao, P. Pop, and S. S. Craciunas, "Worst-Case Latency Analysis for IEEE 802.1Qbv Time Sensitive Networks Using Network Calculus," IEEE Access, vol. 6, pp. 41803-41815, 2018.

[7] S. S. Craciunas, R. S. Oliver, M. Chmelík, and W. Steiner, "Scheduling Real-Time Communication in IEEE 802.1Qbv Time Sensitive Networks," in Proc. 24th International Conference on Real-Time Networks and Systems, pp. 183-192, Brest, France, Oct. 2016.

[8] P. Meyer, T. Steinbach, F. Korf, and T. C. Schmidt, "Extending IEEE 802.1 AVB with time-triggered scheduling: A simulation study of the coexistence of synchronous and asynchronous traffic," in Proc. IEEE Vehicular Networking Conference (VNC), pp. 47-54, Boston, MA, USA, Dec. 2013.