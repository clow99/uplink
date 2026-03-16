---
title: "Slow Internet Speed Troubleshooting Flow"
device_model: ""
service_type: ""
symptom_type: "slow-speed"
audience: "both"
source_type: "flow"
region: ""
last_updated: "2026-03-16"
tags: ["slow-speed", "troubleshooting", "flow", "speed-test"]
---

# Slow Internet Speed Troubleshooting Flow

## Step 1: Isolate Wi-Fi vs service speed

Ask the customer to run a speed test using a wired (Ethernet) connection if possible.

- **Wired speed matches the plan**: the ISP connection is fine. The issue is Wi-Fi. Go to the Wi-Fi Coverage Flow.
- **Wired speed is also slow**: the issue is likely service-level. Go to Step 2.
- **Customer cannot test wired**: test Wi-Fi near the router first, then from the problem location.

## Step 2: Verify plan speed

Check the customer's plan using get_account_summary if available. Compare the plan speed to the measured speed.

- If measured speed is within 70-100% of plan on a wired connection, performance is normal.
- If measured speed is significantly below plan, proceed to Step 3.

## Step 3: Basic checks

1. Reboot modem and router (modem first, wait 2 minutes, then router).
2. Wait 5-10 minutes for the modem to re-negotiate channel speeds.
3. Run the speed test again after reboot.
4. Check if the modem supports the plan speed (e.g., DOCSIS 3.0 may not reach 1 Gbps).

## Step 4: Check for congestion and interference

- Is the slowness constant or only at certain times?
- Peak-hour slowness (evenings) on cable may indicate node congestion.
- If only one device is slow, the device's hardware or software may be the bottleneck.
- Check for background downloads, updates, or other heavy bandwidth usage.

## Step 5: When to escalate

Escalate if:
- Wired speed is consistently below 50% of plan after reboot.
- Service status shows degraded signal or line quality.
- The modem is ISP-provided and may need replacement or re-provisioning.
- Peak-hour congestion is persistent and reproducible.
