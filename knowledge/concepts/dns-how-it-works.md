---
title: "How DNS Works"
device_model: ""
service_type: ""
symptom_type: ""
audience: "customer"
source_type: "concept"
region: ""
last_updated: "2026-03-16"
tags: ["dns", "domain-name-system", "website", "resolution", "nameserver"]
---

# How DNS Works

DNS (Domain Name System) translates human-readable website addresses like "google.com" into the numeric IP addresses that computers use to find each other on the internet.

## The DNS resolution process

1. **You type a website address** in your browser (e.g., example.com).
2. **Your device checks its cache** to see if it already knows the IP address from a recent visit.
3. **If not cached**, the request goes to your ISP's DNS resolver (or a public resolver like Google DNS or Cloudflare).
4. **The resolver queries DNS servers** in a hierarchy: root servers, then TLD servers (.com, .org), then the authoritative server for that domain.
5. **The IP address is returned** to your device, and your browser connects to the website.

This entire process usually takes less than 100 milliseconds.

## Common DNS problems

### Websites won't load but internet is connected

If you can ping an IP address (like 8.8.8.8) but can't load websites by name, DNS is likely the issue. Your internet connection is working, but name resolution is failing.

### Slow DNS

If websites take a long time to start loading but then transfer quickly, DNS resolution may be slow. Switching to a faster DNS provider can help.

### DNS cache issues

Sometimes your device caches an old or incorrect DNS record. Flushing the cache forces a fresh lookup.

## How to flush your DNS cache

**Windows:**
Open Command Prompt as administrator and run: `ipconfig /flushdns`

**Mac:**
Open Terminal and run: `sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`

**Chrome browser:**
Navigate to `chrome://net-internals/#dns` and click "Clear host cache".

## Changing your DNS server

You can use a public DNS server instead of your ISP's default:

| Provider | Primary | Secondary |
|----------|---------|-----------|
| Google | 8.8.8.8 | 8.8.4.4 |
| Cloudflare | 1.1.1.1 | 1.0.0.1 |
| OpenDNS | 208.67.222.222 | 208.67.220.220 |

You can change DNS settings on your router (affects all devices) or on individual devices in their network settings.

## When to suspect DNS issues

- Websites don't load but apps like Spotify or games that use direct IP connections still work.
- Some websites load but others don't.
- Adding "https://" or using a different browser changes behavior.
- The problem goes away when you manually set a DNS server like 8.8.8.8.
