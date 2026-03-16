---
title: "No Internet Troubleshooting Flow"
device_model: ""
service_type: ""
symptom_type: "no-internet"
audience: "both"
source_type: "flow"
region: ""
last_updated: "2026-03-16"
tags: ["no-internet", "troubleshooting", "flow"]
---

# No Internet Troubleshooting Flow

## Step 1: Confirm the scope

Ask whether all devices are affected or only one.

- **All devices**: likely a modem, service, or outage issue. Go to Step 2.
- **One device**: likely a device-specific issue. See the one-device-not-connecting symptom guide.

## Step 2: Check modem and router lights

Ask the customer to describe the lights on their modem (and router, if separate).

- **No lights at all**: check power cable and outlet. Try a different outlet. If still no power, the modem may need replacement.
- **Power on, online light off or blinking**: the modem cannot reach the ISP network. Go to Step 3.
- **All lights normal**: the modem has a connection. Go to Step 4.

## Step 3: Modem cannot connect

1. Unplug the modem power cable. Wait 30 seconds. Plug it back in.
2. Wait 3-5 minutes for all lights to stabilize.
3. If the online light is still off or blinking after 5 minutes, check all coax or fiber cable connections.
4. If cabling looks secure and the light is still abnormal, check for an outage (use check_outage tool if available).
5. If no outage is found and the problem persists, escalate for line diagnostics.

## Step 4: Modem connected but no internet on devices

1. If using a separate router, reboot it after the modem is fully online.
2. Test with a wired (Ethernet) connection directly to the modem or router.
3. If wired works but Wi-Fi does not, the issue is the router or Wi-Fi configuration, not the ISP service.
4. If wired also fails, check the service status (use get_service_status if available).
5. Try releasing and renewing the device's IP address, or reboot the device.

## Step 5: When to escalate

Escalate if:
- Modem lights remain abnormal after reboot and cable check.
- Outage tool confirms an active outage.
- Service status shows the line is offline or degraded.
- The account status is suspended or pending.
- All troubleshooting steps have been completed without improvement.
