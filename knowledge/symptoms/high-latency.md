---
title: "High Latency / Lag"
device_model: ""
service_type: ""
symptom_type: "latency"
audience: "customer"
source_type: "symptom"
region: ""
last_updated: "2026-03-16"
tags: ["latency", "lag", "ping", "gaming", "video-call", "delay"]
---

# High Latency / Lag

Your internet speed may be fine, but everything feels delayed. Games lag, video calls have awkward pauses, and responses feel sluggish. This is a latency (ping) problem, which is different from bandwidth.

## Speed vs latency

- **Bandwidth (speed)** is how much data you can transfer per second — like the width of a pipe.
- **Latency (ping)** is how long it takes a single packet to get there and back — like the length of the pipe.

You can have high bandwidth but still experience lag if latency is high.

## Common causes

### Network-related
- **Wi-Fi instead of Ethernet**: Wi-Fi adds latency compared to a direct wired connection, especially on congested bands.
- **Network congestion**: other devices on your network streaming, downloading, or uploading eat into available capacity and increase latency.
- **ISP congestion**: during peak hours (6-10 PM), your ISP's network may be more congested.
- **Routing inefficiency**: your ISP may route traffic through more hops than necessary.

### Equipment-related
- **Old modem or router**: outdated equipment processes packets more slowly.
- **QoS not configured**: without Quality of Service settings, your router treats all traffic equally, so a large download can starve a game of bandwidth.
- **Bufferbloat**: your router buffers too much data, adding delay. This is a common and often overlooked cause.

### Distance-related
- **Far-away servers**: connecting to game servers or services across the globe adds unavoidable latency.
- **Satellite internet**: satellite connections have inherent high latency (500+ ms) due to the distance signals must travel.

## What to try

1. **Use Ethernet**: connect your gaming device or computer directly to the router with an Ethernet cable.
2. **Close competing traffic**: pause downloads, streaming, and cloud backups while gaming or on calls.
3. **Enable QoS**: check your router's admin panel for QoS or gaming priority settings. Prioritize your device or gaming traffic.
4. **Restart equipment**: reboot modem and router to clear buffers and refresh the connection.
5. **Choose closer servers**: in games and video call apps, select servers geographically close to you.
6. **Test at different times**: if latency is only bad during evenings, ISP congestion is likely the cause.
7. **Run a ping test**: open a command prompt and run `ping google.com` to measure your latency directly. Consistent high values point to a persistent issue.
