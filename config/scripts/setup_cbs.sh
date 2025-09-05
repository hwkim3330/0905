#!/bin/bash
#
# CBS Setup Script for LAN9692/9662 TSN Switch
# This script configures Credit-Based Shaper on the TSN switch
#

# Configuration Variables
DEVICE="/dev/ttyACM0"
MUP1CC="dr mup1cc"
CONFIG_DIR="../ipatch"

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

# Check if device exists
if [ ! -e "$DEVICE" ]; then
    print_error "Device $DEVICE not found. Please check connection."
    exit 1
fi

# Check if mup1cc tool exists
if ! command -v dr &> /dev/null; then
    print_error "dr command not found. Please install Microchip tools."
    exit 1
fi

print_status "Starting CBS configuration on TSN switch..."

# Step 1: Initialize QoS
print_status "Step 1: Initializing QoS structure..."
if $MUP1CC -d $DEVICE -m ipatch -i $CONFIG_DIR/ipatch-insert-qos.yaml; then
    print_status "QoS structure initialized successfully"
else
    print_error "Failed to initialize QoS structure"
    exit 1
fi

sleep 2

# Step 2: Configure port mappings
print_status "Step 2: Configuring port mappings..."
for mapping in p8-deco-p9-enco p10-deco-p9-enco p11-deco-p9-enco; do
    if [ -f "$CONFIG_DIR/ipatch-${mapping}.yaml" ]; then
        print_status "Applying mapping: ${mapping}"
        if $MUP1CC -d $DEVICE -m ipatch -i $CONFIG_DIR/ipatch-${mapping}.yaml; then
            print_status "Mapping ${mapping} applied successfully"
        else
            print_warning "Failed to apply mapping ${mapping}"
        fi
    fi
done

sleep 2

# Step 3: Apply CBS idle-slope configuration
print_status "Step 3: Applying CBS idle-slope configuration..."
if $MUP1CC -d $DEVICE -m ipatch -i $CONFIG_DIR/ipatch-cbs-idle-slope.yaml; then
    print_status "CBS idle-slope configuration applied successfully"
else
    print_error "Failed to apply CBS idle-slope configuration"
    exit 1
fi

sleep 2

# Step 4: Verify configuration
print_status "Step 4: Verifying configuration..."
print_status "Fetching bridge configuration..."
$MUP1CC -d $DEVICE -m fetch -p "/ieee802-dot1q-bridge:bridges"

print_status "Fetching CBS configuration..."
$MUP1CC -d $DEVICE -m fetch -p "/ietf-interfaces:interfaces/interface/ieee802-dot1q-bridge:bridge-port/ieee802-dot1q-sched-bridge:traffic-class-table"

print_status "CBS configuration completed successfully!"
print_status "You can now start traffic generation to test CBS functionality."