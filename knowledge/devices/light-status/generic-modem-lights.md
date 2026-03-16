---
title: "Modem Light Status Guide (General)"
device_model: ""
service_type: ""
symptom_type: "lights"
audience: "both"
source_type: "device"
region: ""
last_updated: "2026-03-16"
tags: ["modem", "lights", "led", "status", "troubleshooting"]
---

# Modem Light Status Guide

Most modems have a similar set of indicator lights. While exact names and colors vary by model, here is what each light generally means.

## Power light

| State | Meaning |
|-------|---------|
| Solid (green/white) | Modem is powered on and operating normally. |
| Off | Modem has no power. Check the power cable and outlet. |
| Blinking | Modem is booting up. Wait 2-3 minutes. |

## Online / Internet light

| State | Meaning |
|-------|---------|
| Solid | Modem has a connection to the ISP. Internet should be available. |
| Blinking | Modem is trying to establish a connection. This is normal during boot but should not persist for more than 5 minutes. |
| Off | Modem cannot reach the ISP. Possible outage, line issue, or the modem needs a reboot. |

## Downstream (DS) light

| State | Meaning |
|-------|---------|
| Solid | Receiving data from the ISP successfully. |
| Blinking | Trying to lock onto a downstream channel. |
| Off | No downstream signal. Possible cable issue or service outage. |

## Upstream (US) light

| State | Meaning |
|-------|---------|
| Solid | Sending data to the ISP successfully. |
| Blinking | Trying to range or lock onto an upstream channel. |
| Off | Cannot reach the ISP upstream. May indicate a signal problem. |

## Ethernet / LAN light

| State | Meaning |
|-------|---------|
| Solid or blinking | A device is connected via Ethernet and there is activity. |
| Off | No device is connected to this Ethernet port. |

## Wi-Fi light (on gateway/combo devices)

| State | Meaning |
|-------|---------|
| Solid | Wi-Fi is enabled and broadcasting. |
| Blinking | Wi-Fi traffic is active. |
| Off | Wi-Fi is disabled. Check router settings. |

## Troubleshooting by light pattern

- **No lights at all**: power issue. Check cable, outlet, and try a different outlet.
- **Power on, online blinking for 5+ minutes**: reboot the modem. If it persists, check for outage or call support.
- **Power on, online off**: possible outage or line problem. Reboot, check cables, and verify with outage tool.
- **All lights normal but no internet**: the issue is likely downstream of the modem (router, device, or DNS).
