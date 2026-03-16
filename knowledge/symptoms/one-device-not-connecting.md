---
title: "One Device Not Connecting to Wi-Fi"
device_model: ""
service_type: ""
symptom_type: "one-device"
audience: "customer"
source_type: "symptom"
region: ""
last_updated: "2026-03-16"
tags: ["one-device", "single-device", "cant-connect", "wifi-join", "authentication"]
---

# One Device Not Connecting to Wi-Fi

All your other devices work fine, but one device won't connect to Wi-Fi or keeps losing its connection. Since the internet and router are working for everything else, the issue is almost certainly device-specific.

## Common causes

### Device-side issues
- **Wrong password**: the Wi-Fi password may have been entered incorrectly or changed since the device last connected.
- **Saved network conflict**: the device may be trying to connect to an old or incorrect saved version of your network.
- **Airplane mode or Wi-Fi disabled**: the device's Wi-Fi may be turned off in settings or via a physical switch.
- **Software or driver issue**: outdated Wi-Fi drivers (on laptops) or OS bugs can prevent connections.
- **MAC address filtering**: if your router has MAC filtering enabled, the device may not be on the allowed list.

### Compatibility issues
- **Band incompatibility**: some older devices only support 2.4 GHz. If your router is broadcasting only on 5 GHz, these devices won't see the network.
- **Security protocol mismatch**: very old devices may not support WPA3 or WPA2. They may need the router to offer WPA2 compatibility.
- **Wi-Fi generation**: devices with very old Wi-Fi chips may have trouble with newer router protocols.

### Network-side issues
- **DHCP pool full**: if many devices are connected, the router may have run out of IP addresses to assign.
- **Device limit**: some routers have a maximum number of connected devices.

## What to try

1. **Restart the device**: turn Wi-Fi off, wait 10 seconds, turn it back on. Or fully restart the device.
2. **Forget and reconnect**: on the device, forget the Wi-Fi network, then reconnect with the password.
3. **Check airplane mode**: make sure airplane mode is off and Wi-Fi is enabled.
4. **Verify the password**: re-enter the Wi-Fi password carefully. Check for similar-looking characters (l vs 1, O vs 0).
5. **Try the other band**: if your router has separate 2.4 GHz and 5 GHz networks, try connecting to the other one.
6. **Update the device**: install any pending OS updates or Wi-Fi driver updates.
7. **Restart the router**: a router restart clears its connection table and DHCP leases.
8. **Check router settings**: verify MAC filtering is off (or the device is allowed) and that the DHCP range is large enough.
