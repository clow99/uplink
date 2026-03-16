---
title: "Gaming Latency Troubleshooting Flow"
device_model: ""
service_type: ""
symptom_type: "latency"
audience: "both"
source_type: "flow"
region: ""
last_updated: "2026-03-16"
tags: ["gaming", "latency", "lag", "ping", "troubleshooting", "flow"]
---

# Gaming Latency Troubleshooting Flow

## Step 1: Confirm it's latency, not speed

Ask the customer to run a speed test at speedtest.net and report their ping (latency) value.

- **Ping under 50 ms and speed at plan level**: latency is acceptable. The issue may be server-side or related to the game. Ask which game and server region they use.
- **Ping over 50 ms**: proceed to Step 2.
- **Speed well below plan level**: follow the Slow Speed Troubleshooting Flow instead — low bandwidth can increase perceived lag.

## Step 2: Test with Ethernet

Ask the customer to connect their gaming device directly to the router with an Ethernet cable and run the speed test again.

- **Ping drops significantly on Ethernet**: the issue is Wi-Fi. Go to Step 3.
- **Ping remains high on Ethernet**: the issue is upstream of the router. Go to Step 4.

## Step 3: Optimize Wi-Fi for gaming

1. Recommend connecting the gaming device via Ethernet permanently, if possible.
2. If Ethernet is not possible, recommend connecting to the 5 GHz band (lower latency than 2.4 GHz).
3. Suggest enabling QoS (Quality of Service) on the router and prioritizing the gaming device.
4. Advise pausing large downloads and streams on other devices during gaming sessions.
5. If the gaming device is far from the router, recommend a mesh node or powerline Ethernet adapter in the gaming area.

## Step 4: Check for network congestion

1. Ask if the issue happens at all times or only during peak hours (6-10 PM).
2. Ask if other people in the household are streaming, downloading, or video calling at the same time.
3. If congestion is the cause, recommend QoS settings and scheduling large downloads for off-peak hours.

## Step 5: Check upstream (modem and ISP)

1. Restart the modem — unplug for 30 seconds, wait 5 minutes after plugging back in.
2. Check for outages using the check_outage tool if available.
3. Check service status using get_service_status if available. Look for elevated latency or packet loss in line diagnostics.
4. If the modem is a DOCSIS 3.0 model, it may not handle modern traffic well. Recommend a DOCSIS 3.1 upgrade.

## Step 6: Game server considerations

1. Ask the customer which game and server region they're using.
2. Recommend choosing the geographically closest server region.
3. Some latency is unavoidable if the server is far away (e.g., playing on EU servers from the US adds 80-120 ms minimum).
4. Check if the game has known server issues — this is outside ISP control.

## Step 7: When to escalate

Escalate if:
- Latency is consistently above 80 ms on a wired connection with no local congestion.
- Packet loss exceeds 1% on a wired connection.
- Service status shows line issues or elevated latency from the ISP side.
- The issue has persisted for multiple days after equipment restart.
