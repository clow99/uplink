---
title: "Mesh / Extender Setup Flow"
device_model: ""
service_type: ""
symptom_type: "setup"
audience: "customer"
source_type: "flow"
region: ""
last_updated: "2026-03-16"
tags: ["mesh", "extender", "setup", "coverage", "wifi-expansion", "flow"]
---

# Mesh / Extender Setup Flow

Guide for setting up a mesh Wi-Fi system or range extender to improve whole-home coverage.

## Step 1: Determine the right solution

### Mesh system (recommended)
- Multiple nodes create a single seamless network.
- Your device automatically connects to the nearest node as you move.
- Best for: homes over 1,500 sq ft, multi-story homes, or homes with thick walls.
- Examples: Eero Pro 6E, TP-Link Deco, Netgear Orbi.

### Range extender
- A single device that repeats your router's signal.
- Creates a separate network name (e.g., "MyWiFi_EXT") unless it supports seamless roaming.
- Best for: extending coverage to one specific area, budget-conscious setups.
- Limitation: cuts effective bandwidth in half since it uses the same radio to receive and retransmit.

## Step 2: Place the main node or router

1. Position your main router (or primary mesh node) in a central, elevated location.
2. Connect it to your modem via Ethernet.
3. Make sure it's powered on and online before adding additional nodes.

## Step 3: Place additional mesh nodes

### Placement rules
- Place nodes **1-2 rooms apart** from each other and the main node. They need to be close enough to maintain a strong backhaul signal.
- **Elevated**: on a shelf, table, or counter — not on the floor.
- **Open area**: avoid closets, behind furniture, or near large metal objects.
- **Line of sight**: fewer walls between nodes means a stronger connection.

### What to avoid
- Don't place all nodes on the same floor if you have a multi-story home. Put one node per floor.
- Don't place a node directly next to the main router — this wastes coverage.
- Don't place near microwaves, baby monitors, or other 2.4 GHz devices.

## Step 4: Set up using the manufacturer's app

Most mesh systems use a companion app for setup:

1. Download the manufacturer's app (Eero app, TP-Link Deco app, Netgear Orbi app, etc.).
2. Create an account or sign in.
3. Follow the in-app instructions to add the main node, then each additional node one at a time.
4. Wait for each node to sync before adding the next one (usually 2-5 minutes per node).

## Step 5: Set up a range extender

1. Plug the extender into a power outlet halfway between your router and the dead zone.
2. Press the WPS button on your router, then the WPS button on the extender within 2 minutes.
3. If WPS is not available, connect to the extender's setup Wi-Fi network and follow the browser-based setup at the address shown in the manual.
4. Once configured, move the extender to the optimal location (where it still gets at least 50% signal from the router).

## Step 6: Test coverage

1. Walk through your home with a phone or tablet.
2. Check the Wi-Fi signal strength in previously weak areas.
3. Run a speed test in the areas that had coverage issues before.
4. If coverage is still weak in some areas, try repositioning the nearest node or adding another one.

## Troubleshooting

- **Node won't connect**: move it closer to the main node during setup. Once connected, you can move it to its final location.
- **Slow speeds on mesh**: check that the backhaul between nodes is strong (most apps show node-to-node signal quality). If weak, move nodes closer together.
- **Devices not roaming**: some older devices "stick" to one node. Forgetting and reconnecting to the network can help, or enable band steering / fast roaming (802.11r) in the mesh app settings.
- **Extender creates separate network**: this is normal for basic extenders. Some support "same name" mode — check the extender settings. For seamless roaming, a mesh system is recommended instead.
