#!/bin/bash
#
# Traffic Generation Script for CBS Testing
# Generates UDP traffic using mausezahn
#

# Configuration
INTERFACE="eth0"  # Change to your interface
SRC_IP="10.0.100.1"
DST_IP="10.0.100.2"
UDP_PORT=5000
PAYLOAD_SIZE=1200
RATE="1000mbit"  # 1 Gbps

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if mausezahn is installed
if ! command -v mausezahn &> /dev/null; then
    print_error "mausezahn not found. Installing..."
    sudo apt-get update
    sudo apt-get install -y netsniff-ng
fi

# Check if interface exists
if ! ip link show $INTERFACE &> /dev/null; then
    print_error "Interface $INTERFACE not found"
    echo "Available interfaces:"
    ip link show | grep -E "^[0-9]+:" | cut -d: -f2
    exit 1
fi

print_status "Starting traffic generation..."
print_status "Interface: $INTERFACE"
print_status "Source IP: $SRC_IP"
print_status "Destination IP: $DST_IP"
print_status "UDP Port: $UDP_PORT"
print_status "Payload Size: $PAYLOAD_SIZE bytes"
print_status "Rate: $RATE"

# Start traffic generation
print_status "Generating traffic (press Ctrl+C to stop)..."
sudo mausezahn $INTERFACE \
    -A $SRC_IP -B $DST_IP \
    -t udp "sp=$UDP_PORT,dp=$UDP_PORT" \
    -p $PAYLOAD_SIZE \
    -c 0 \
    -d 0

print_status "Traffic generation stopped"