---
title: "Latency, Jitter, and Packet Loss Explained"
device_model: ""
service_type: ""
symptom_type: ""
audience: "customer"
source_type: "concept"
region: ""
last_updated: "2026-03-16"
tags: ["latency", "jitter", "packet-loss", "ping", "gaming", "video-calls"]
---

# Latency, Jitter, and Packet Loss

These three metrics determine how responsive and smooth your internet feels, especially during real-time activities like gaming, video calls, and VoIP.

## Latency (Ping)

Latency is the time it takes for data to travel from your device to a server and back, measured in milliseconds (ms).

- **Under 20 ms**: excellent — great for competitive gaming and video calls.
- **20-50 ms**: good — most activities feel smooth.
- **50-100 ms**: noticeable — slight delay in games and calls.
- **Over 100 ms**: problematic — obvious lag, choppy calls, and delayed responses.

### What causes high latency?

- Long physical distance to the server
- Network congestion (too many users on the same connection)
- Using Wi-Fi instead of Ethernet
- ISP routing issues
- Old or overloaded modem/router

## Jitter

Jitter is the variation in latency over time. Even if your average latency is low, high jitter means some packets arrive quickly and others arrive late.

- **Under 10 ms**: excellent
- **10-30 ms**: acceptable for most uses
- **Over 30 ms**: video calls may stutter, games may feel inconsistent

### What causes jitter?

- Wi-Fi interference
- Network congestion
- Multiple devices competing for bandwidth
- Poor-quality cables or connections

## Packet Loss

Packet loss happens when data packets fail to reach their destination. It is measured as a percentage.

- **0%**: ideal
- **1-2%**: may notice minor issues in real-time applications
- **Over 2%**: video calls freeze, games stutter, web pages load partially

### What causes packet loss?

- Faulty or loose cables
- Wi-Fi signal interference
- Overloaded network equipment
- ISP-side congestion or line issues

## How to test

1. Run a speed test at speedtest.net (it shows ping and sometimes jitter).
2. For a detailed test, open a command prompt and type: `ping google.com -n 20` (Windows) or `ping -c 20 google.com` (Mac/Linux). Look at the average time and variation.
3. For the most accurate results, test over Ethernet with other devices idle.

## What to try if these metrics are poor

1. Switch to a wired Ethernet connection to eliminate Wi-Fi variables.
2. Restart your modem and router.
3. Close bandwidth-heavy applications (streaming, large downloads).
4. Check for and install firmware updates on your router.
5. If the issue persists on a wired connection with no other traffic, contact support — the problem may be on the ISP side.
