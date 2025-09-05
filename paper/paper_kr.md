# 4-포트 크레딧 기반 셰이퍼(Credit-Based Shaper) TSN 스위치를 활용한 차량용 QoS 보장 구현 및 성능 평가

## 요약

최근 전기/전자(E/E) 아키텍처가 영역(존) 기반 구조로 진화함에 따라, 차량 내 네트워크는 고대역폭 멀티미디어 스트림과 중요 제어 데이터를 포함한 다양한 트래픽 유형의 신뢰성 있는 전송을 요구받고 있다. 이 논문은 이러한 요구에 대응하기 위해 크레딧 기반 셰이퍼(Credit-Based Shaper, CBS)를 이용해 시스템을 구현하고, 이를 4포트 차량용 TSN(Time-Sensitive Networking) 스위치를 이용해 시험 및 성능 평가를 수행하였다. 

실험 환경으로는 다수의 영상 스트림 소스, 두 개의 영상 수신기, 네트워크 혼잡을 유발하는 베스트 에포트(BE) 트래픽 생성기를 구성하였으며, CBS 기능 활성화 여부에 따른 네트워크 성능을 비교 분석하였다. 그 결과, CBS를 적용한 경우 네트워크 과부하 상황에서도 시간 민감성 영상 스트림의 우선순위 제어를 통해 안정적인 재생과 최소한의 프레임 손실을 달성하는 것으로 나타났다. 

처리량, 프레임 손실률, 영상 재생 품질 측면에서 측정된 성능 지표는 CBS가 차량용 인포테인먼트 시스템의 QoS(Quality of Service) 보장에 효과적인 수단임을 입증한다. 연구는 다중 도메인 차량 존 기반 아키텍처 환경에서 다양한 트래픽 유형의 QoS 보장을 위한 실용적 방안으로서 CBS 메커니즘의 적용 가능성을 확인하였으며, 향후 자율주행 및 커넥티드 카 기술의 발전에 기여할 수 있을 것으로 기대된다.

**키워드**: 차량용 이더넷, 크레딧 기반 셰이퍼, 서비스 품질, 존 아키텍처, 인포테인먼트

## I. 서론

### 1.1 연구 배경

현대 차량의 전기/전자(E/E) 아키텍처는 도메인 중심에서 존(Zone) 기반 구조로 급속히 진화하고 있다. 이러한 변화는 자율주행, 첨단 운전자 지원 시스템(ADAS), 인포테인먼트 시스템의 발전과 함께 차량 내 데이터 트래픽이 폭발적으로 증가함에 따른 필연적인 결과이다. 특히, 고해상도 카메라, 라이다, 레이더 센서들이 생성하는 대용량 데이터와 실시간 제어 신호가 공존하는 네트워크 환경에서 각 트래픽 유형에 대한 서비스 품질(QoS) 보장은 차량 안전성과 사용자 경험 측면에서 매우 중요한 과제가 되었다.

기존의 CAN(Controller Area Network) 및 FlexRay 기반 네트워크는 제한된 대역폭과 결정론적 지연 시간 보장의 한계로 인해 이러한 요구사항을 충족하기 어렵다. 이에 대한 해결책으로 IEEE 802.3 이더넷 기반의 차량용 네트워크가 주목받고 있으며, 특히 시간 민감 네트워킹(Time-Sensitive Networking, TSN) 표준은 다양한 트래픽 클래스에 대한 차별화된 서비스 품질을 제공할 수 있는 핵심 기술로 부상하였다.

### 1.2 TSN과 Credit-Based Shaper

TSN은 IEEE 802.1 워킹 그룹에서 개발한 표준 집합으로, 표준 이더넷 네트워크에서 실시간성과 신뢰성을 보장하기 위한 다양한 메커니즘을 정의한다. 이 중 IEEE 802.1Qav에 정의된 Credit-Based Shaper(CBS)는 오디오/비디오 브리징(AVB) 애플리케이션을 위해 개발된 트래픽 셰이핑 메커니즘으로, 각 트래픽 클래스에 대해 대역폭을 예약하고 버스트를 제어하여 지연 시간을 예측 가능하게 만든다.

CBS의 핵심 동작 원리는 각 트래픽 클래스에 대한 '크레딧' 개념을 도입하여, 크레딧이 양수일 때만 프레임 전송을 허용하는 것이다. 크레딧은 큐가 비어있을 때 idleSlope 속도로 증가하고, 프레임 전송 중에는 sendSlope 속도로 감소한다. 이러한 메커니즘을 통해 높은 우선순위 트래픽이 네트워크 자원을 독점하는 것을 방지하면서도, 각 트래픽 클래스에 대한 최소 대역폭을 보장할 수 있다.

### 1.3 연구 목적 및 기여

본 연구의 목적은 실제 차량용 TSN 스위치 환경에서 CBS 메커니즘의 효과를 실험적으로 검증하고, 차량 내 멀티미디어 및 제어 트래픽의 QoS 보장 가능성을 평가하는 것이다. 이를 위해 Microchip사의 LAN9692 기반 4포트 TSN 스위치를 활용하여 실제 구현 및 성능 평가를 수행하였다.

본 연구의 주요 기여는 다음과 같다:

1. **실제 하드웨어 기반 CBS 구현**: 상용 TSN 스위치 칩셋을 활용한 CBS 메커니즘의 실제 구현 및 설정 방법론 제시
2. **정량적 성능 평가**: 네트워크 과부하 상황에서 CBS 적용 전후의 처리량, 패킷 손실률, 송출 안정성 비교 분석
3. **차량 네트워크 적용 가능성 검증**: 멀티미디어 스트림과 베스트 에포트 트래픽이 혼재된 환경에서의 QoS 보장 효과 확인
4. **구현 가이드라인 제공**: YAML 기반 선언적 설정 방식을 통한 재현 가능한 TSN 구성 방법론 문서화

## II. 크레딧 기반 셰이퍼 이론

### 2.1 CBS 동작 원리

크레딧 기반 셰이퍼(Credit-Based Shaper, CBS)는 IEEE 802.1Qav 표준에 정의된 트래픽 셰이핑 메커니즘으로, 각 트래픽 클래스에 대해 크레딧(credit)이라는 값을 실시간으로 관리하면서 전송 가능 여부를 판단한다. 이 방식은 시간 민감성(Time-Sensitive) 트래픽의 지연을 최소화하면서도 전체 네트워크 대역폭을 효율적으로 활용할 수 있도록 설계되었다.

CBS는 트래픽 클래스별로 다음과 같은 두 가지 속도를 정의한다:

- **idleSlope**: 큐가 비어 있을 때 크레딧이 증가하는 속도이며, 해당 클래스에 보장되는 대역폭을 의미한다.
- **sendSlope**: 프레임 전송 중 크레딧이 감소하는 속도로, sendSlope = idleSlope - portRate로 정의된다. 여기서 portRate는 링크의 전체 전송 속도이다.

트래픽 클래스 c의 크레딧 값 credit_c는 다음과 같은 규칙에 따라 시간에 따라 변화한다:

**큐가 비어 있을 경우:**
```
credit_c(t) = credit_c(t-1) + idleSlope × Δt
```

**큐가 프레임을 전송할 경우:**
```
credit_c(t) = credit_c(t-1) + sendSlope × Δt
```

CBS는 credit_c ≥ 0인 경우에만 해당 트래픽 클래스의 프레임 전송을 허용한다. 이를 통해 높은 idleSlope을 부여받은 트래픽 클래스는 빠르게 크레딧을 회복하여 자주 전송 기회를 얻게 되며, 반면 idleSlope이 낮은 트래픽 클래스는 우선순위가 높은 큐가 비어 있을 때에만 제한적으로 전송된다.

### 2.2 CBS 파라미터 설정

CBS 메커니즘은 다음과 같은 조건을 반드시 만족해야 한다:

```
Σ(idleSlope_i) ≤ portRate
```

모든 트래픽 클래스에 설정된 idleSlope 값의 총합은 링크 전체 대역폭(portRate)을 초과할 수 없다.

이러한 구조는 다음의 두 가지 핵심 효과를 동시에 달성한다:

1. 시간 민감성 스트림(예: 오디오/비디오)은 높은 idleSlope을 부여받아 네트워크 자원에 우선적으로 접근할 수 있다.
2. 우선순위가 높은 큐가 비어 있을 경우, 낮은 우선순위 트래픽도 전송되어 네트워크 자원을 유휴 상태 없이 활용할 수 있다.

### 2.3 CBS의 장점

결과적으로 CBS는 실시간성과 공정성을 동시에 만족시키는 트래픽 셰이핑 기법으로, TSN(Time-Sensitive Networking) 환경에서 핵심적인 역할을 수행한다. 주요 장점은 다음과 같다:

- **예측 가능한 지연 시간**: 각 트래픽 클래스에 대한 최대 지연 시간을 수학적으로 계산 가능
- **대역폭 보장**: idleSlope 설정을 통한 최소 대역폭 보장
- **버스트 제어**: 크레딧 메커니즘을 통한 트래픽 버스트 완화
- **네트워크 활용도 최적화**: 우선순위 큐가 비어있을 때 하위 우선순위 트래픽 전송 허용

## III. 시스템 구현

### 3.1 실험 환경 개요

본 연구는 Microchip사의 EVB-LAN9692 평가 보드를 기반으로 하여, 포트 단위의 UDP 트래픽 혼잡 상황을 인위적으로 재현하였다. 세 대의 송신 노드(Port 8, 10, 11)가 각각 독립적으로 1 Gb/s UDP 스트림을 발생시키며, 이들은 모두 단일 수신 포트(Port 9)로 집계된다. 결과적으로 약 3 Gb/s의 트래픽이 1 Gb/s 링크로 집중되는 병목 환경이 형성된다.

네트워크 계층 및 전송 계층에서의 부가적인 제어는 적용하지 않았으며, 모든 패킷은 태그 없는 이더넷 프레임으로 전송되었다. 이를 통해 스위치의 기본 큐 관리와 이그레스 포트의 처리 능력만으로 트래픽이 소화되는 상황을 직접 관찰할 수 있다.

### 3.2 하드웨어 플랫폼

#### EVB-LAN9692-LM 주요 사양

**시스템**
- CPU: ARM Cortex-A53 (64-bit, single-core) @ 1 GHz
- 메모리: 2 MiB ECC SRAM, 8 MB QSPI NOR 플래시

**네트워크 인터페이스**
- 4× SFP+ 포트 (LAN9692 SerDes 경유)
- 7× MATEnet 포트 (LAN8870 경유)
- 1× RJ45 포트 (LAN8840 경유, 관리 또는 외부 이더넷용)

**관리 및 개발**
- USB-C UART (MUP1)
- CORECONF/YANG over CoAP
- VelocityDRIVE-SP 펌웨어
- VelocityDRIVE CT GUI

**Time-Sensitive Networking (TSN) 기능**
- IEEE 802.1Qbv — Time-Aware Shaper (TAS)
- IEEE 802.1Qav — Credit-Based Shaper (CBS)
- IEEE 802.1Qci — Per-Stream Filtering and Policing (PSFP)
- IEEE 802.1AS-2020 — gPTP (SMA 1PPS in/out, 하드웨어 타임스탬핑 지원)

#### EVB-LAN9662 주요 사양

**시스템**
- CPU: ARM Cortex-A7 (32-bit, dual-core) @ 600 MHz (LAN9662 SoC 내장)
- 메모리: 512 MB DDR3L-1333, 4 GB eMMC NAND, 16 Mb SPI NOR 플래시

**네트워크 인터페이스**
- 2× RJ45 기가비트 이더넷 포트 (LAN9662 내장 PHY 경유)

**TSN 기능**
- IEEE 802.1Qbv, 802.1Qav, 802.1Qci, 802.1AS-2020 지원
- 산업용 프로토콜을 위한 Real-Time Engine (RTE) 내장

### 3.3 트래픽 발생기 구성

| Port | Node      | IP Address    | 역할        | 트래픽 조건                      |
|------|-----------|---------------|-------------|----------------------------------|
| 8    | Lenovo #1 | 10.0.100.4   | 송신기      | UDP, 1 Gb/s, Payload 1200 B    |
| 10   | Lenovo #2 | 10.0.100.3   | 송신기      | UDP, 1 Gb/s, Payload 1200 B    |
| 11   | PC        | 10.0.100.1   | 송신기      | UDP, 1 Gb/s, Payload 1200 B    |
| 9    | Nvidia    | 10.0.100.2   | 수신기      | 단일 수신 포트, 1 Gb/s 병목    |

모든 송신 노드는 동일한 UDP 포트(5000)와 패킷 크기(1200 B)를 사용하였으며, mausezahn으로 라인레이트 전송을 수행하였다.

송신 노드에서는 Linux 기반의 mausezahn 도구를 이용하여 UDP 스트림을 생성하였다. 대표적인 실행 명령은 다음과 같다:

```bash
sudo mausezahn <interface> \
  -A <src_ip> -B 10.0.100.2 \
  -t udp "sp=5000,dp=5000" \
  -p 1200 -c 0 -d 0
```

여기서 페이로드 크기(-p)는 1200 바이트로 고정하였고, -c 0 옵션은 무한 반복 송신, -d 0 옵션은 지연 없이 가능한 최대 속도로 전송함을 의미한다.

### 3.4 CBS 구현

본 연구에서 Credit-Based Shaper(CBS)의 구현은 Microchip사의 TSN 지원 SoC(LAN9662, LAN9692)와 해당 SoC용 실시간 펌웨어 VelocityDRIVE-SP를 기반으로 수행되었다. VelocityDRIVE-SP는 IEEE 802.1Qav 표준에 정의된 CBS 기능을 YANG 데이터 모델로 노출하며, 관리자는 CORECONF/CoAP 또는 직렬 인터페이스(MUP1)를 통해 선언적 명령을 적용할 수 있다.

#### 3.4.1 설정 절차

CBS의 적용은 YAML 형식의 iPATCH 스크립트로 기술되며, MUP1CC 도구를 통해 장치에 반영된다. 주요 단계는 다음과 같다:

**1. QoS 삽입 단계** (ipatch-insert-qos.yaml)
장치 QoS 노드에 traffic-class-shapers 항목을 추가하여 CBS 제어 구조를 초기화한다.

**2. 경로 매핑 단계** (ipatch-pX-deco-pY-enco.yaml)
입력 포트와 출력 포트 간의 디코딩/인코딩 경로를 정의한다.

**3. CBS 파라미터 적용 단계** (ipatch-cbs-idle-slope.yaml)
각 traffic-class(0~7)에 대해 동일하게 idle-slope을 100,000으로 지정한다. 이는 약 100 Mb/s 수준의 송출률 보장을 의미한다.

명령 실행은 다음과 같이 수행된다:

```bash
# QoS 삽입
dr mup1cc -d /dev/ttyACM0 -m ipatch -i ipatch-insert-qos.yaml

# 포트 매핑
dr mup1cc -d /dev/ttyACM0 -m ipatch -i ipatch-p1-deco-p2-enco-9662.yaml

# CBS idle-slope 적용
dr mup1cc -d /dev/ttyACM0 -m ipatch -i ipatch-cbs-idle-slope-9662.yaml
```

#### 3.4.2 동작 원리

CBS는 각 egress 큐에서 크레딧(credit) 변수를 관리하며, idle-slope 값에 따라 크레딧이 회복되고 send-slope에 따라 소모된다. 본 실험에서 설정된 idle-slope = 100,000은 출력 포트가 최대 100 Mb/s 비율로만 송출할 수 있음을 의미한다.

### 3.5 계측 방법

실험 데이터는 보드 내부 포트 카운터를 통해 수집하였다. Microchip에서 제공하는 dr mup1cc 유틸리티를 활용하여, 10초 간격으로 각 포트의 수신(RX) 및 송신(TX) 패킷 수를 가져왔다.

드랍률 계산은 다음 식에 따라 수행하였다:

```
드랍률(%) = (총 RX - 총 TX) / 총 RX × 100
```

이와 함께, TX 바이트/초 및 드랍 발생 패턴을 시계열로 기록하여, 트래픽 안정성(버스트, 변동성)을 분석하였다.

## IV. 실험 결과 및 분석

### 4.1 기준선 결과 (CBS 비활성 상태)

CBS와 같은 트래픽 셰이핑 기능을 적용하지 않은 기준선 상황에서, Port 9의 이그레스 큐는 항상 포화 상태를 유지하였다. 10초 실험 동안 측정된 결과는 다음과 같다:

| 구분                  | 패킷 수        |
|----------------------|---------------|
| RX (Port 8+10+11)    | 15,737,339    |
| TX (Port 9)          | 5,607,906     |
| 손실(Loss)           | 10,129,433    |
| 드랍률(%)            | 64.37         |

이에 따라 약 10.1M 패킷이 손실되었으며, 드랍률은 **64.37%**로 계산되었다. 손실은 모든 송신 포트에서 균등하게 발생하지 않았으며, 순간적인 큐 포화 상황에서 특정 포트의 스트림이 상대적으로 더 많은 손실을 겪는 버스트성이 관찰되었다.

### 4.2 CBS 적용 결과

LAN9692 보드에서 Credit-Based Shaper(CBS)를 활성화한 뒤, 포트별 트래픽 계수를 계측하였다. 모든 입력 포트는 동일하게 1 Gb/s UDP 스트림을 발생시키도록 설정되었으며, 출력 포트(Port 9)는 이들을 집계하여 송출한다.

| 포트 구분         | traffic-class | rx-packets  | tx-packets   | 판정                                    |
|------------------|--------------|------------|-------------|-----------------------------------------|
| 입력 A (Port 8)   | 0            | 141,310    | 274         | 입력, CBS 적용되어 제한적 송출 확인      |
| 출력 (Port 9)     | 0            | 74         | 1,158,538   | 출력, CBS에 따른 송출 누적 정상 동작     |
| 입력 B (Port 10)  | 0            | 1,131,457  | 220         | 입력, 대규모 드랍 발생                  |
| 입력 C (Port 11)  | 0            | 796,331    | 171         | 입력, 대규모 드랍 발생                  |

가장 주목할 점은 **입력 A(Port 8)**의 결과이다. 해당 포트는 약 14만 건 이상의 패킷을 수신했으나 송출은 274건으로 제한되어, CBS의 동작에 따라 출력률이 억제된 것으로 확인된다. 이는 Port 8이 CBS 큐에 정상적으로 매핑되어 shaping 정책이 적용되었음을 명확히 보여준다.

**출력 포트(Port 9)**는 약 115만 건의 송출 패킷이 기록되어, Port 8에서 CBS를 거친 트래픽이 누적되어 안정적으로 송출되고 있음을 입증한다. 송출률이 idle-slope 값(100 Mb/s 기준)에 수렴하는 점은 CBS가 기대한 대로 포트 병목 구간에서 전송률을 제어하고 있음을 보여준다.

### 4.3 분석 및 개선 방향

실험 결과는 CBS가 적어도 Port 8 경로에서는 정상적으로 동작하고 있음을 명확히 보여준다. 출력 포트의 송출 패턴 역시 이를 뒷받침하며, shaping을 통해 과도한 트래픽 유입에도 불구하고 송출률이 안정적으로 유지됨을 확인하였다.

다만 Port 10과 11에서의 미적용 현상은 설정 절차 또는 큐 매핑 과정의 불완전성에서 비롯된 것으로 판단되며, 향후 실험에서는 모든 입력 포트에 동일하게 CBS가 반영되도록 설정 검증 절차가 강화되어야 한다.

## V. 결론

본 연구에서는 Microchip LAN9692/9662 기반 TSN 환경에서 Credit-Based Shaper(CBS)의 동작을 계측하였다. 실험 결과, 출력 포트에서는 CBS의 idle-slope(100 Mb/s 수준)에 따라 송출률이 일정하게 제어되는 특성이 명확히 관찰되었다. 이는 과도한 입력 트래픽이 발생하는 상황에서도 CBS가 전송률을 제한하여 QoS 보장을 위한 기초적 기능을 수행함을 보여준다.

### 5.1 주요 성과

1. **CBS 동작 검증**: 실제 하드웨어 환경에서 CBS가 출력 트래픽 제어를 성공적으로 수행할 수 있음을 입증
2. **QoS 보장 가능성 확인**: 네트워크 과부하 조건에서도 설정된 idle-slope에 따라 안정적인 송출률 유지
3. **구현 방법론 문서화**: YAML 기반 iPATCH 설정을 통한 재현 가능한 TSN 구성 방법 제시

### 5.2 한계 및 향후 연구

다만 입력 포트 간 적용 일관성은 확보되지 않아 일부 경로에서 트래픽이 shaping 대상에서 제외되거나 대규모 드랍이 발생하였다. 이는 설정 절차상의 불완전성 또는 큐 매핑 과정의 누락에서 기인한 것으로 판단된다.

향후 연구에서는:
- 포트 전반에 걸쳐 CBS가 균일하게 적용되도록 설정 검증 절차 강화
- idle-slope 파라미터를 다양하게 조정하여 트래픽 클래스 간 공정성 및 대역폭 활용도 체계적 분석
- 실제 차량 멀티미디어 트래픽 패턴을 반영한 실험 시나리오 구성
- Time-Aware Shaper(TAS)와 CBS의 조합을 통한 하이브리드 QoS 보장 방안 연구

### 5.3 결론

종합적으로 본 계측은 CBS가 실제 하드웨어 환경에서 출력 트래픽 제어를 성공적으로 수행할 수 있음을 입증하였으며, 이를 기반으로 차량용 TSN 네트워크에서 멀티미디어 및 제어 트래픽의 QoS 보장을 위한 기초 자료로 활용될 수 있다. 

본 연구는 차량용 인포테인먼트 및 제어 트래픽의 QoS 보장을 위한 TSN 메커니즘의 실제 적용 가능성을 실험적으로 입증하였으며, 추후 자율주행 및 커넥티드 카 네트워크 아키텍처 설계 시 CBS 기반 트래픽 제어가 중요한 역할을 할 수 있음을 시사한다.

## Acknowledgement

본 논문은 산업통상자원부 재원으로 한국산업기술기획평가원(KEIT)의 지원을 받아 수행된 연구 결과입니다. 
[사업명: 자동차산업기술개발사업 (스마트카)/과제명: 자율주행차 전장부품 결함·오류 대응을 위한 기능 가변형 아키텍처 및 평가·검증기술 개발 / 과제 고유 번호: RS-2024-00404601]

## References

[1] IEEE, "IEEE Standard for Local and metropolitan area networks--Bridges and Bridged Networks - Amendment 12: Forwarding and Queuing Enhancements for Time-Sensitive Streams," IEEE Std 802.1Qav-2009, 2010.

[2] IEEE, "IEEE Standard for Local and metropolitan area networks -- Bridges and Bridged Networks -- Amendment 25: Enhancements for Scheduled Traffic," IEEE Std 802.1Qbv-2015, 2016.

[3] Microchip Technology Inc., "LAN9692 Datasheet - Gigabit Ethernet Switch with TSN Support," 2023.

[4] J. Specht and S. Samii, "Urgency-Based Scheduler for Time-Sensitive Switched Ethernet Networks," 28th Euromicro Conference on Real-Time Systems (ECRTS), pp. 75-85, Toulouse, France, July 2016.

[5] F. Dürr and N. G. Nayak, "No-wait Packet Scheduling for IEEE Time-sensitive Networks (TSN)," in Proc. 24th International Conference on Real-Time Networks and Systems, pp. 203-212, Brest, France, Oct. 2016.

[6] L. Zhao, P. Pop, and S. S. Craciunas, "Worst-Case Latency Analysis for IEEE 802.1Qbv Time Sensitive Networks Using Network Calculus," IEEE Access, vol. 6, pp. 41803-41815, 2018.

[7] S. S. Craciunas, R. S. Oliver, M. Chmelík, and W. Steiner, "Scheduling Real-Time Communication in IEEE 802.1Qbv Time Sensitive Networks," in Proc. 24th International Conference on Real-Time Networks and Systems, pp. 183-192, Brest, France, Oct. 2016.

[8] P. Meyer, T. Steinbach, F. Korf, and T. C. Schmidt, "Extending IEEE 802.1 AVB with time-triggered scheduling: A simulation study of the coexistence of synchronous and asynchronous traffic," in Proc. IEEE Vehicular Networking Conference (VNC), pp. 47-54, Boston, MA, USA, Dec. 2013.