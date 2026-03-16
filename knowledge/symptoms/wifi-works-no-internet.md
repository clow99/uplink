---
title: "Connected to Wi-Fi but No Internet"
device_model: ""
service_type: ""
symptom_type: "no-internet"
audience: "customer"
source_type: "symptom"
region: ""
last_updated: "2026-03-16"
tags: ["wifi-connected", "no-internet", "connected-no-access", "exclamation-mark"]
---

# Connected to Wi-Fi but No Internet

Your device shows it's connected to Wi-Fi (signal bars are present), but websites won't load and apps say "No internet connection." You may see a yellow exclamation mark or "No Internet" next to your network name.

## Why this happens

Being connected to Wi-Fi only means your device is talking to your router. It does not guarantee the router can reach the internet. The problem is somewhere between your router and the outside world.

## Common causes

### Modem or ISP issues
- **Modem is offline**: the modem lost its connection to the ISP. Wi-Fi still works locally, but there's no path to the internet.
- **Service outage**: your ISP may be experiencing an outage in your area.
- **Account issue**: your service may be suspended due to a billing issue or planned maintenance.

### Router issues
- **Router hasn't obtained an IP from the modem**: the router's WAN interface shows no IP or a self-assigned 169.254.x.x address.
- **DNS misconfiguration**: the router can reach the internet, but DNS settings are broken so names can't be resolved.

### Device issues
- **Stale IP lease**: your device's IP address lease expired or conflicts with another device.
- **Incorrect DNS**: your device may have custom DNS settings that are no longer valid.
- **Proxy or VPN**: a VPN that's disconnected or a proxy setting that's misconfigured can block internet access.

## What to try

1. **Check other devices**: if only one device is affected, the issue is device-specific. If all devices have no internet, the problem is your modem, router, or ISP.
2. **Look at modem lights**: check if the Online/Internet light is solid. If it's off or blinking, the modem has lost its ISP connection.
3. **Restart modem first, then router**: unplug modem for 30 seconds, plug back in, wait 5 minutes for it to fully reconnect. Then restart the router.
4. **Try pinging an IP directly**: open a command prompt and type `ping 8.8.8.8`. If this works but websites don't load, it's a DNS problem — try changing DNS to 8.8.8.8.
5. **Forget and rejoin Wi-Fi**: on the affected device, forget the network and reconnect to get a fresh IP address.
6. **Disable VPN or proxy**: if you have a VPN or proxy configured, try disabling it.
7. **Check for outages**: visit your ISP's status page (from a phone on cellular data) or contact support to check for outages.
