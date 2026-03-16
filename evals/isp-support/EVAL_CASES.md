# ISP Support Agent — Evaluation Cases

100 test cases organized by symptom category. Each case specifies the customer input, relevant context, the tools that should (or should not) be called, the expected behavioral outcome, and what to measure.

---

## Scoring dimensions

Every case should be evaluated on these dimensions:

| Dimension | What it measures |
|-----------|-----------------|
| **correctness** | Is the technical advice accurate? |
| **question_quality** | Does the agent ask the right next question to narrow the diagnosis? |
| **no_false_claims** | Does the agent avoid stating live facts (outage, account, line status) it has not verified via a tool? |
| **step_order** | Are troubleshooting steps in the right priority order? |
| **escalation_accuracy** | Does the agent escalate when it should and avoid escalating when it should not? |
| **tone** | Is the customer-facing text short, calm, and jargon-free? Is the copilot text precise and actionable? |
| **mode_compliance** | Does the output match the requested mode (customer / copilot / hybrid)? |

---

## Category 1 — No Internet (cases 1-15)

### Case 1: All devices, no internet, no context
- **Input**: "My internet is not working."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask whether the issue affects all devices or just one. Do not guess at outage status.
- **Must not**: Claim there is or is not an outage.
- **Measure**: question_quality, no_false_claims

### Case 2: All devices, modem lights normal
- **Input**: "None of my devices can get online. The modem lights all look normal."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: check_outage, get_service_status
- **Expected behavior**: Call check_outage. If no outage, suggest a modem power-cycle as the first step. Internal notes should list outage-ruled-out as evidence.
- **Must not**: Skip the outage check when the tool is available.
- **Measure**: correctness, step_order, no_false_claims

### Case 3: All devices, modem online light blinking
- **Input**: "Internet is down everywhere. The online light on my modem is blinking."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: check_outage, get_service_status, get_equipment
- **Expected behavior**: Call check_outage and get_service_status. Likely cause should mention modem sync loss. If service_status shows offline, note it as evidence.
- **Must not**: Recommend factory reset as a first step.
- **Measure**: correctness, step_order, escalation_accuracy

### Case 4: Outage confirmed by tool
- **Input**: "Is there an outage in my area?"
- **Mode**: customer
- **Context**: address provided
- **Tools available**: check_outage
- **Tool result**: outage_detected=true, status=investigating, estimated_resolution=2h
- **Expected behavior**: Confirm the outage, share the estimated resolution time, and reassure the customer.
- **Must not**: Suggest troubleshooting steps that will not help during an outage.
- **Measure**: correctness, tone

### Case 5: Outage tool unavailable
- **Input**: "Is there an outage?"
- **Mode**: customer
- **Context**: address provided
- **Tools available**: check_outage
- **Tool result**: error, OUTAGE_SYSTEM_UNAVAILABLE
- **Expected behavior**: Say outage status could not be verified. Offer general troubleshooting (power-cycle) as a fallback.
- **Must not**: Say "there is no outage" or "there is an outage."
- **Measure**: no_false_claims, tone

### Case 6: Account suspended
- **Input**: "My internet stopped working this morning."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: check_outage, get_account_summary
- **Tool results**: no outage; account_status=suspended, balance_due=150.00
- **Expected behavior**: Customer response should gently suggest contacting billing. Copilot notes should flag the suspension and balance as the likely cause.
- **Must not**: Tell the customer their account is suspended in harsh terms. Must not skip account check.
- **Measure**: correctness, tone, escalation_accuracy

### Case 7: Ethernet works, Wi-Fi does not
- **Input**: "If I plug in with a cable, the internet works. But Wi-Fi doesn't connect on any device."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Identify this as a router/Wi-Fi issue, not an ISP issue. Ask if the Wi-Fi network name is visible on devices. Suggest a router reboot.
- **Must not**: Suggest calling the ISP for a line issue.
- **Measure**: correctness, question_quality, step_order

### Case 8: Wi-Fi connects but no internet
- **Input**: "My phone shows it's connected to Wi-Fi but nothing loads."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask if other devices have the same problem. If yes, likely a router/modem upstream issue. If only one device, likely a device DNS or IP issue.
- **Must not**: Jump to advanced DNS configuration without narrowing scope.
- **Measure**: question_quality, step_order

### Case 9: Power outage recovery
- **Input**: "We had a power outage and now the internet won't come back."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: check_outage
- **Expected behavior**: Check for service outage (may coincide with power outage). Suggest rebooting modem and router in the correct order (modem first, wait 2 min, then router).
- **Must not**: Assume the power outage caused permanent equipment damage without evidence.
- **Measure**: correctness, step_order

### Case 10: Internet drops when microwave runs
- **Input**: "The internet cuts out whenever I use the microwave."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Identify 2.4 GHz interference from the microwave. Suggest switching devices to 5 GHz or moving the router away from the kitchen.
- **Must not**: Suggest an ISP-side fix. This is a local interference issue.
- **Measure**: correctness, step_order

### Case 11: New service, never worked
- **Input**: "I just got new internet service installed yesterday and it's never worked."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_service_status, get_equipment, get_account_summary
- **Expected behavior**: Check provisioning_status. If pending or error, note as likely cause. Check equipment. Recommend escalation to provisioning team if not properly activated.
- **Must not**: Run through standard troubleshooting without checking provisioning first.
- **Measure**: correctness, step_order, escalation_accuracy

### Case 12: Internet works on phone, not on laptop
- **Input**: "My phone works fine on Wi-Fi but my laptop says no internet."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Identify as a device-specific issue. Ask the customer to forget the network on the laptop and reconnect. Check if VPN or proxy is running.
- **Must not**: Suggest rebooting the modem first.
- **Measure**: correctness, step_order

### Case 13: All devices offline, no modem lights at all
- **Input**: "Everything is dead. No lights on the modem at all."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Check if the modem is plugged in and the outlet has power (try another device in the same outlet). Check power cable connections.
- **Must not**: Jump to outage diagnosis when the modem has no power.
- **Measure**: correctness, step_order

### Case 14: Internet works only at certain times
- **Input**: "The internet works in the morning but dies every evening around 7pm."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: get_service_status, get_account_summary
- **Expected behavior**: Consider network congestion, especially on cable. Check plan speed. Ask if speed tests during peak show lower speeds or full outage. Copilot should note time-of-day pattern.
- **Must not**: Assume ISP throttling without evidence.
- **Measure**: correctness, question_quality

### Case 15: VPN prevents internet access
- **Input**: "When I turn on my VPN, I lose all internet."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Identify as a VPN configuration issue. Ask which VPN they use. Suggest trying with VPN off to confirm. If ISP-provided, suggest split-tunnel or contacting VPN provider.
- **Must not**: Blame the ISP or suggest modem reboot.
- **Measure**: correctness, step_order

---

## Category 2 — Slow Internet (cases 16-30)

### Case 16: Slow on all devices, no context
- **Input**: "My internet is really slow."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask if the slowness is on one device or all. Ask if they have tested wired vs wireless.
- **Must not**: Immediately suggest a speed test without narrowing scope.
- **Measure**: question_quality

### Case 17: Slow Wi-Fi, fast wired
- **Input**: "Speed test on my laptop over Wi-Fi shows 30 Mbps but I'm paying for 500. Wired it's 480."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Correctly identify Wi-Fi as the bottleneck, not the ISP service. Search for Wi-Fi optimization. Suggest testing 5 GHz, checking distance, and checking for interference.
- **Must not**: Blame the ISP when wired speed is fine.
- **Measure**: correctness, no_false_claims

### Case 18: Slow everywhere, wired and wireless
- **Input**: "Everything is slow. Even my desktop plugged in with ethernet is getting 20 Mbps on a 200 plan."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_service_status, get_account_summary
- **Expected behavior**: This is likely an ISP or modem issue. Check service status for degraded line. Verify plan speed. Copilot should recommend line diagnostics or escalation.
- **Must not**: Suggest Wi-Fi fixes when the customer has established wired is also slow.
- **Measure**: correctness, step_order, escalation_accuracy

### Case 19: Slow only on one website
- **Input**: "Netflix is buffering but everything else is fast."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Identify as likely application-specific. Suggest testing other streaming services. Ask if it happens on multiple devices.
- **Must not**: Assume ISP throttling without evidence.
- **Measure**: correctness, question_quality

### Case 20: Speed test shows plan speed but feels slow
- **Input**: "Speed test says 200 Mbps but YouTube and web pages feel really sluggish."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Consider DNS latency, browser issues, or device performance. Suggest trying a different browser or clearing cache. Ask if other devices feel slow too.
- **Must not**: Say the connection is fine and stop troubleshooting.
- **Measure**: correctness, question_quality

### Case 21: Slow after upgrading plan
- **Input**: "I just upgraded from 100 to 500 Mbps but I'm still only getting around 100."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: get_account_summary, get_equipment, get_service_status
- **Expected behavior**: Verify the plan upgrade went through in account summary. Check if the modem supports the higher speed. Check provisioning status.
- **Must not**: Suggest the customer is imagining the slowness. Must verify backend.
- **Measure**: correctness, step_order

### Case 22: Slow with many devices
- **Input**: "We have about 30 devices on our Wi-Fi and everything is slow."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Explain that 30 devices on a single router can cause congestion. Suggest prioritizing bandwidth-heavy devices on 5 GHz. Consider recommending a mesh system.
- **Must not**: Blame the ISP when device count is the likely bottleneck.
- **Measure**: correctness, step_order

### Case 23: Slow on 2.4 GHz only
- **Input**: "My devices on 2.4 GHz are crawling but 5 GHz is fine."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Explain 2.4 GHz congestion and interference. Suggest checking for neighboring networks on the same channel. Recommend moving devices to 5 GHz where possible.
- **Must not**: Suggest ISP service issue.
- **Measure**: correctness

### Case 24: Speed drops at same time daily
- **Input**: "Every day at 5pm my speed drops from 200 to about 40."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_service_status, get_account_summary
- **Expected behavior**: Time-of-day pattern suggests shared-medium congestion (common on cable). Verify connection type. Copilot should note the pattern and suggest monitoring over multiple days. May warrant escalation if persistent.
- **Must not**: Guarantee the ISP can fix it without further data.
- **Measure**: correctness, escalation_accuracy

### Case 25: Upload speed very slow
- **Input**: "My download is 300 Mbps but upload is only 5 Mbps."
- **Mode**: customer
- **Context**: account_id provided
- **Tools available**: get_account_summary
- **Expected behavior**: Check the plan's upload speed. Many cable plans have asymmetric speeds (e.g. 300 down / 10 up). If 5 Mbps is below the plan's upload, it is an issue. If 10 Mbps is the plan's upload, explain asymmetric speeds.
- **Must not**: Assume it is a problem without checking the plan.
- **Measure**: correctness, no_false_claims

### Case 26: Slow after modem reboot
- **Input**: "Internet was slow so I rebooted the modem. Now it's even slower."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: get_service_status
- **Expected behavior**: Modem may be re-negotiating speeds. Suggest waiting 10-15 minutes for bonding channels to stabilize. Check service status if available.
- **Must not**: Suggest another immediate reboot.
- **Measure**: correctness, step_order

### Case 27: Old modem limiting speed
- **Input**: "I have a DOCSIS 3.0 modem and a 1 Gbps plan."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_equipment
- **Expected behavior**: DOCSIS 3.0 maxes out around 600-700 Mbps in ideal conditions. Equipment check should confirm. Recommend upgrading to DOCSIS 3.1 modem.
- **Must not**: Suggest ISP-side fix when the modem is the limitation.
- **Measure**: correctness, step_order

### Case 28: Slow only over Wi-Fi on old laptop
- **Input**: "My old laptop gets 30 Mbps on Wi-Fi. My new phone gets 400."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Identify the laptop's Wi-Fi adapter as the bottleneck (likely 802.11n). Explain that older adapters have lower maximum speeds. Suggest a USB Wi-Fi adapter or wired connection.
- **Must not**: Suggest router or ISP-level changes.
- **Measure**: correctness

### Case 29: Speed test server matters
- **Input**: "Speedtest shows 500 Mbps to a local server but only 50 Mbps to a server across the country."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Explain that speed tests to distant servers include internet backbone latency and congestion. The local server result is more representative of the ISP connection quality.
- **Must not**: Tell the customer their internet is broken.
- **Measure**: correctness, tone

### Case 30: Slow after storm
- **Input**: "Internet has been slow ever since the big storm last week."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: check_outage, get_service_status
- **Expected behavior**: Check for degraded service status. Check for outage/maintenance in the area. Storm damage to outside lines is possible. Copilot should note the timeline correlation and suggest escalation for line inspection if signal is degraded.
- **Must not**: Dismiss the storm connection.
- **Measure**: correctness, escalation_accuracy

---

## Category 3 — Wi-Fi Coverage / Signal (cases 31-42)

### Case 31: Weak signal upstairs
- **Input**: "Wi-Fi barely works upstairs. The router is in the basement."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Explain that floors and walls degrade signal. Recommend moving the router to a central location or adding a mesh node/extender for the upstairs area.
- **Must not**: Suggest ISP speed upgrade. This is a coverage issue.
- **Measure**: correctness, step_order

### Case 32: Dead zone in one room
- **Input**: "The guest bedroom gets zero signal. Every other room is fine."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask about walls/barriers between router and room. Suggest a mesh node or access point for that area. Mention that concrete/brick walls severely attenuate Wi-Fi.
- **Must not**: Recommend a full router replacement as the first step.
- **Measure**: correctness, step_order

### Case 33: 5 GHz disappears at distance
- **Input**: "The 5 GHz network disappears when I go to the far side of the house."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Explain that 5 GHz has shorter range than 2.4 GHz. Suggest connecting to 2.4 GHz in distant rooms for more range (at lower speed), or adding a mesh node.
- **Must not**: Say the router is broken.
- **Measure**: correctness, tone

### Case 34: Neighbor interference
- **Input**: "I used a Wi-Fi analyzer app and there are 15 other networks on the same channel."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Recommend changing the Wi-Fi channel to a less congested one. For 2.4 GHz, suggest channels 1, 6, or 11. For 5 GHz, suggest DFS channels if the router supports them.
- **Must not**: Blame the neighbors. Focus on what the customer can control.
- **Measure**: correctness, step_order

### Case 35: Mesh system not roaming properly
- **Input**: "I have a mesh system but my phone stays connected to the far node even when I'm next to the main router."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Explain that roaming is controlled by the device, not the router. Suggest ensuring all mesh nodes have the same SSID and security settings. Toggling Wi-Fi on the device can force a reconnect.
- **Must not**: Blame the mesh system as defective without evidence.
- **Measure**: correctness

### Case 36: Extender causing issues
- **Input**: "I added a Wi-Fi extender and now my speed is worse than before."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Explain that extenders halve throughput by design (they receive and retransmit on the same channel). Suggest placing it halfway between router and dead zone. Consider mesh system as a better alternative.
- **Must not**: Just say "remove the extender."
- **Measure**: correctness, tone

### Case 37: Too many SSIDs
- **Input**: "I see three networks from my router: MyWiFi, MyWiFi-5G, and MyWiFi-Guest. Which should I use?"
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Explain that -5G is the 5 GHz band (faster, shorter range) and the plain one is 2.4 GHz (slower, longer range). Recommend 5 GHz when close, 2.4 GHz when far. Guest network is isolated.
- **Must not**: Use overly technical RF terminology.
- **Measure**: correctness, tone

### Case 38: Wi-Fi 6 router not faster than old one
- **Input**: "I bought a Wi-Fi 6 router but my speeds aren't any faster."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask if their devices support Wi-Fi 6. Wi-Fi 6 benefits require compatible clients. Also, if ISP speed is the bottleneck, a faster router will not help.
- **Must not**: Say Wi-Fi 6 is a scam or useless.
- **Measure**: correctness, question_quality

### Case 39: Outdoor Wi-Fi coverage
- **Input**: "I need Wi-Fi in my backyard for security cameras."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Suggest an outdoor access point or placing a mesh node near a window facing the yard. Mention weatherproofing requirements for outdoor APs.
- **Must not**: Guarantee coverage without knowing yard size and layout.
- **Measure**: correctness, step_order

### Case 40: Wi-Fi drops during video calls
- **Input**: "My Wi-Fi keeps dropping during Zoom calls."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask if on 2.4 GHz or 5 GHz. Ask distance from router. Suggest wired connection for stable calls. Copilot should note that video calls are sensitive to jitter and packet loss, not just bandwidth.
- **Must not**: Suggest increasing ISP bandwidth as the only fix.
- **Measure**: correctness, question_quality

### Case 41: Smart home devices overloading Wi-Fi
- **Input**: "I added 20 smart bulbs and now Wi-Fi is slow for everything."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Smart bulbs on 2.4 GHz can congest the channel. Suggest putting IoT devices on a separate SSID/VLAN if the router supports it. Check if the router has a device limit issue.
- **Must not**: Say smart devices do not affect Wi-Fi performance.
- **Measure**: correctness, step_order

### Case 42: Signal strength good but speed bad
- **Input**: "My phone shows full bars but internet is still slow."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Full bars means good signal strength but does not guarantee throughput. Ask about channel congestion, number of devices, and whether the slowness is on that device only or all devices.
- **Must not**: Say full bars means the Wi-Fi is working fine.
- **Measure**: correctness, question_quality

---

## Category 4 — Intermittent Drops (cases 43-52)

### Case 43: Random disconnects all day
- **Input**: "The internet randomly drops for a few minutes then comes back."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: get_service_status, check_outage
- **Expected behavior**: Check service status for recent events (reboots, signal loss). Ask how often it happens. Check if it affects all devices or just one.
- **Must not**: Immediately blame the modem without data.
- **Measure**: question_quality, step_order

### Case 44: Drops on Wi-Fi only, wired stable
- **Input**: "My desktop on ethernet never drops but Wi-Fi devices disconnect several times a day."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Isolate as a Wi-Fi issue. Ask about router age, firmware updates. Suggest checking for interference sources. Recommend rebooting the router.
- **Must not**: Suggest ISP service issue when wired is stable.
- **Measure**: correctness

### Case 45: Drops correlate with weather
- **Input**: "Internet goes out whenever it rains heavily."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_service_status
- **Expected behavior**: Weather-correlated drops often indicate water ingress in outside cabling or a loose connection at the drop. Copilot should recommend escalation for line inspection with a note about the weather pattern.
- **Must not**: Tell the customer to just wait for the rain to stop.
- **Measure**: correctness, escalation_accuracy

### Case 46: Modem rebooting itself
- **Input**: "I can see my modem restarting on its own several times a day."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: get_service_status, get_equipment
- **Expected behavior**: Check uptime in service status. Check equipment age. Frequent self-reboots suggest overheating, power supply failure, or firmware issue. Recommend checking ventilation, trying a different outlet, and escalation if it continues.
- **Must not**: Recommend factory reset as first step for a reboot-loop issue.
- **Measure**: correctness, step_order, escalation_accuracy

### Case 47: Drops during peak hours only
- **Input**: "We lose connection every evening between 6pm and 10pm."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_service_status, get_account_summary
- **Expected behavior**: Check for cable congestion. Verify plan type. Peak-hour drops on shared-medium networks are a known pattern. Copilot should note this may require node split or infrastructure upgrade, which is an ISP-side fix.
- **Must not**: Promise the ISP will fix it immediately.
- **Measure**: correctness, escalation_accuracy

### Case 48: One device keeps dropping
- **Input**: "Only my iPad keeps losing Wi-Fi. Everything else is fine."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Device-specific issue. Suggest forgetting and rejoining the network. Check for iOS updates. Try both 2.4 GHz and 5 GHz. Check if Bluetooth is causing interference.
- **Must not**: Recommend modem reboot for a single-device issue.
- **Measure**: correctness, step_order

### Case 49: Intermittent after equipment self-install
- **Input**: "I installed my own modem last week and the connection keeps dropping."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: get_service_status, get_equipment
- **Expected behavior**: Check if the modem is on the ISP's approved list. Verify signal levels if available. Common self-install issues include bad coax fittings and missing signal amplifiers. Copilot should note the recent self-install timeline.
- **Must not**: Assume the modem is defective without checking compatibility and signal.
- **Measure**: correctness, question_quality

### Case 50: Drops when multiple people stream
- **Input**: "Internet drops when three of us are streaming at the same time."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Could be bandwidth limitation or router overload. Ask about plan speed. 3 HD streams need roughly 15-25 Mbps. If plan covers it, the router may be the bottleneck. Suggest wired connections for streaming devices.
- **Must not**: Assume the ISP plan is too slow without asking about it.
- **Measure**: correctness, question_quality

### Case 51: Gaming disconnects
- **Input**: "I keep getting disconnected from my online game but web browsing works fine."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Gaming is sensitive to packet loss and jitter. Ask if they are on Wi-Fi or wired. Recommend wired connection. Suggest checking for background downloads or other devices consuming bandwidth.
- **Must not**: Suggest increasing bandwidth when the issue is likely latency/jitter.
- **Measure**: correctness

### Case 52: Repeated intermittent, prior tickets unresolved
- **Input**: "This is the third time I'm calling about random drops. Nothing has fixed it."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_troubleshooting_history, get_service_status, get_equipment
- **Expected behavior**: Pull troubleshooting history. Note what was already tried. Check equipment age and signal. This case should strongly recommend escalation with a full history summary for the next team.
- **Must not**: Re-suggest basic troubleshooting that has already been attempted.
- **Measure**: step_order, escalation_accuracy

---

## Category 5 — Device-Specific Issues (cases 53-62)

### Case 53: Smart TV cannot find network
- **Input**: "My smart TV doesn't see my Wi-Fi network at all."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask if the TV supports 5 GHz. If the SSID is 5 GHz only, the TV may not see it. Suggest checking for hidden SSID. Try connecting manually by entering the SSID.
- **Must not**: Recommend factory resetting the router.
- **Measure**: correctness, question_quality

### Case 54: Smart thermostat on 5 GHz
- **Input**: "My Nest thermostat won't connect to Wi-Fi."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Many smart thermostats only support 2.4 GHz. Ask if the customer has a separate 2.4 GHz SSID. If using band-steering, suggest temporarily disabling it or creating a 2.4 GHz-only SSID for the thermostat.
- **Must not**: Assume the router is broken.
- **Measure**: correctness

### Case 55: Game console NAT type strict
- **Input**: "My Xbox says NAT type is strict and I can't join multiplayer."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Explain NAT types briefly. Suggest enabling UPnP on the router. If that does not work, try port forwarding for the console. Ask if the console is behind a double-NAT (modem + router both doing NAT).
- **Must not**: Recommend calling the ISP for a NAT issue that is router-level.
- **Measure**: correctness, step_order

### Case 56: Printer cannot connect
- **Input**: "My wireless printer won't connect to the network anymore."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask if the printer is on 2.4 GHz. Ask if the Wi-Fi password was recently changed. Suggest re-running the printer's Wi-Fi setup. Check if the printer is too far from the router.
- **Must not**: Suggest modem reboot.
- **Measure**: correctness, step_order

### Case 57: Ring doorbell offline
- **Input**: "My Ring doorbell keeps going offline."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ring doorbells require 2.4 GHz and good signal strength at the door. Ask about signal strength at the door location. Suggest a Wi-Fi extender near the door or a Ring chime pro for signal boosting.
- **Must not**: Blame the ISP.
- **Measure**: correctness

### Case 58: Apple device DNS issues
- **Input**: "My iPhone loads some websites but gets errors on others."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Likely DNS issue. Suggest switching DNS to 8.8.8.8 or 1.1.1.1 in Wi-Fi settings. Alternatively, suggest flushing DNS or resetting network settings on the iPhone.
- **Must not**: Suggest factory resetting the iPhone.
- **Measure**: correctness, step_order

### Case 59: Work VPN slow on home Wi-Fi
- **Input**: "My work VPN is unusably slow but regular internet is fast."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: VPN adds overhead. Ask if they are on Wi-Fi or wired. Suggest wired for VPN. Note that VPN speed depends on the VPN server and encryption overhead, not just ISP speed.
- **Must not**: Blame the ISP or suggest speed upgrade as the fix.
- **Measure**: correctness

### Case 60: Baby monitor interfering with Wi-Fi
- **Input**: "Ever since we set up the baby monitor, Wi-Fi has been terrible."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Some baby monitors operate on 2.4 GHz and interfere with Wi-Fi. Suggest moving the monitor farther from the router or switching Wi-Fi devices to 5 GHz.
- **Must not**: Suggest replacing the router.
- **Measure**: correctness

### Case 61: Guest cannot connect
- **Input**: "My friend's phone connects to the Wi-Fi but cannot get internet."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Check if connected to the guest network (may have isolation or captive portal). Ask if the friend's phone works on other Wi-Fi networks. Try forgetting and reconnecting, or try the main network.
- **Must not**: Reboot the modem for a single-guest issue.
- **Measure**: correctness, question_quality

### Case 62: Device connects to wrong band
- **Input**: "My laptop always connects to 2.4 GHz even though 5 GHz is available."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Suggest setting 5 GHz as preferred network, or forgetting the 2.4 GHz SSID if they are separate. If using a single SSID with band-steering, check that band-steering is enabled on the router.
- **Must not**: Suggest ISP-level changes.
- **Measure**: correctness

---

## Category 6 — Router/Modem Lights and Hardware (cases 63-72)

### Case 63: All modem lights off
- **Input**: "No lights on my modem at all."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Check power cable, outlet, and try a different outlet. If still no power, modem may be dead.
- **Must not**: Suggest firmware update on a dead modem.
- **Measure**: correctness, step_order

### Case 64: Modem DS light blinking
- **Input**: "The DS light on my Arris modem keeps blinking."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: search_knowledge, get_service_status
- **Expected behavior**: DS (downstream) blinking means the modem is trying to acquire a downstream channel. Search for the specific modem's light guide. Check service status. Could be a signal issue. Suggest reboot then escalation if it persists.
- **Must not**: Guess what the light means without checking the device guide.
- **Measure**: correctness, step_order

### Case 65: ONT power light red
- **Input**: "The power light on my ONT box is red."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_equipment, get_service_status, search_knowledge
- **Expected behavior**: Red power light on most ONTs indicates a hardware fault. Identify the ONT model from equipment. Search for the specific light status guide. This likely requires a technician. Recommend escalation.
- **Must not**: Suggest the customer open or reset the ONT.
- **Measure**: correctness, escalation_accuracy

### Case 66: Router login credentials unknown
- **Input**: "I need to change my Wi-Fi password but don't know how to log into my router."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Ask for the router make and model. Provide default login URL (usually 192.168.1.1 or 192.168.0.1) and default credentials. Suggest checking the sticker on the router.
- **Must not**: Suggest factory reset as the first option.
- **Measure**: correctness, step_order

### Case 67: Modem overheating
- **Input**: "My modem feels really hot to the touch."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: get_equipment
- **Expected behavior**: Check equipment age. Overheating can cause drops and reboots. Suggest ensuring ventilation (not in a closed cabinet, not stacked on router). If old equipment, may need replacement.
- **Must not**: Say overheating is normal.
- **Measure**: correctness

### Case 68: Firmware update broke connection
- **Input**: "My router updated its firmware last night and now nothing works."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Suggest a router reboot first. If that does not help, check if factory reset is needed (with warning about losing settings). Search for known firmware issues with the model.
- **Must not**: Immediately suggest factory reset without trying reboot first.
- **Measure**: correctness, step_order

### Case 69: How to reboot modem and router
- **Input**: "How do I properly reboot my modem and router?"
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Provide clear step-by-step: unplug modem first, wait 30 seconds, plug it back in, wait for all lights to stabilize (2-3 minutes), then power on router and wait 1-2 minutes.
- **Must not**: Say "just unplug it and plug it back in" without the proper sequence and timing.
- **Measure**: correctness, tone

### Case 70: How to factory reset modem
- **Input**: "I want to factory reset my modem."
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Warn that factory reset will erase all custom settings including Wi-Fi name and password. Ask if they have tried a regular reboot first. If they still want to proceed, provide instructions specific to their model if known.
- **Must not**: Encourage factory reset without warning about consequences.
- **Measure**: correctness, tone

### Case 71: Customer wants to buy own modem
- **Input**: "I want to return the rented modem and use my own. What do I need?"
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: get_account_summary, search_knowledge
- **Expected behavior**: Check the customer's plan and connection type. Search for the approved equipment list. Explain DOCSIS version requirements for cable. Note that they need to call to register the new modem's MAC address.
- **Must not**: Guarantee any specific modem will work without checking.
- **Measure**: correctness

### Case 72: Blinking lights during setup
- **Input**: "I'm setting up my new modem and the lights keep blinking. Is that normal?"
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: During initial setup, blinking is normal as the modem acquires channels. It can take 5-20 minutes. Describe what a stable state looks like (solid online light). Tell them when to be concerned.
- **Must not**: Alarm the customer about normal setup behavior.
- **Measure**: correctness, tone

---

## Category 7 — Latency, Gaming, and Packet Loss (cases 73-80)

### Case 73: High ping in games
- **Input**: "My ping is 150ms in Fortnite. It should be around 30."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Ask if wired or wireless. Ask if other devices are downloading. Suggest wired connection and closing background apps. 150ms may also indicate routing to a distant game server.
- **Must not**: Suggest upgrading ISP speed when the issue is latency.
- **Measure**: correctness, question_quality

### Case 74: Jitter causing voice quality issues
- **Input**: "My VoIP calls sound choppy and robotic."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Jitter and packet loss cause VoIP degradation. Ask if on Wi-Fi or wired. Suggest QoS settings on the router to prioritize VoIP traffic. Recommend wired connection for the VoIP device.
- **Must not**: Suggest increasing bandwidth without checking for jitter/packet-loss causes.
- **Measure**: correctness, step_order

### Case 75: Bufferbloat
- **Input**: "Speed test shows 200 Mbps but when someone else starts downloading, my ping goes from 20ms to 500ms."
- **Mode**: copilot
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Classic bufferbloat. Copilot should identify the pattern. Suggest enabling SQM (Smart Queue Management) or fq_codel on the router if supported. Search for router-specific QoS guide.
- **Must not**: Say "just get faster internet."
- **Measure**: correctness

### Case 76: Packet loss detected
- **Input**: "I ran a ping test and I'm getting 10% packet loss."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_service_status
- **Expected behavior**: 10% packet loss is severe. Check service status for signal quality. Copilot should recommend line diagnostics. Ask if wired or wireless — if wireless, test wired first to isolate.
- **Must not**: Dismiss 10% packet loss as normal.
- **Measure**: correctness, escalation_accuracy

### Case 77: Latency spikes at specific times
- **Input**: "My ping is fine most of the day but spikes to 300ms every evening."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Time-of-day pattern. Similar to speed drops at peak hours. Ask about wired vs wireless. Check for household bandwidth competition. Could be ISP congestion on shared networks.
- **Must not**: Guarantee the ISP will resolve congestion.
- **Measure**: correctness, question_quality

### Case 78: Streaming works but gaming doesn't
- **Input**: "Netflix streams in 4K fine but games are unplayable."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Streaming buffers ahead and tolerates latency. Gaming requires low latency and low jitter. Suggest wired connection, check for other traffic, and consider QoS settings.
- **Must not**: Say the internet is fine because streaming works.
- **Measure**: correctness

### Case 79: Traceroute shows high hop
- **Input**: "I ran a traceroute and hop 4 has 200ms latency."
- **Mode**: copilot
- **Context**: none
- **Tools available**: none
- **Expected behavior**: A high-latency hop in the middle of a traceroute may be a congested ISP node or could be ICMP deprioritization (not real latency). Check if the final destination latency is also high. If yes, note the problematic hop and recommend ISP investigation.
- **Must not**: Guarantee that the hop is the problem without checking end-to-end latency.
- **Measure**: correctness

### Case 80: Latency on satellite internet
- **Input**: "I have satellite internet and my ping is 600ms. Can you fix it?"
- **Mode**: customer
- **Context**: account_id provided
- **Tools available**: get_account_summary
- **Expected behavior**: Check that the service type is satellite. Explain that geostationary satellite inherently has ~500-700ms latency due to distance. Set expectations honestly. Mention LEO satellite alternatives if available.
- **Must not**: Promise latency improvements that are physically impossible.
- **Measure**: correctness, tone

---

## Category 8 — Account and Service (cases 81-88)

### Case 81: What plan am I on?
- **Input**: "What internet plan do I have?"
- **Mode**: customer
- **Context**: account_id provided
- **Tools available**: get_account_summary
- **Expected behavior**: Call get_account_summary and relay the plan name and speeds.
- **Must not**: Guess the plan without calling the tool.
- **Measure**: no_false_claims

### Case 82: Account tools unavailable
- **Input**: "What plan am I on?"
- **Mode**: customer
- **Context**: account_id provided
- **Tools available**: get_account_summary
- **Tool result**: error, ACCOUNT_SYSTEM_UNAVAILABLE
- **Expected behavior**: Say account details could not be retrieved right now. Suggest the customer check their most recent bill or log into their online account portal.
- **Must not**: Make up a plan name.
- **Measure**: no_false_claims, tone

### Case 83: Billing question
- **Input**: "Why is my bill higher this month?"
- **Mode**: customer
- **Context**: account_id provided
- **Tools available**: get_account_summary
- **Expected behavior**: Pull account summary for balance info. Note that specific billing details require the billing team. Recommend the customer contact billing support for detailed charge breakdown.
- **Must not**: Speculate about charges without data.
- **Measure**: no_false_claims, escalation_accuracy

### Case 84: Requesting a technician
- **Input**: "I want a technician to come out."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: create_support_ticket, get_troubleshooting_history
- **Expected behavior**: Check if basic troubleshooting has been done. If not, explain that trying a few quick steps first may resolve it faster. If troubleshooting is exhausted, create a ticket with dispatch recommendation.
- **Must not**: Create a ticket without summarizing troubleshooting in the details.
- **Measure**: step_order, escalation_accuracy

### Case 85: Cancel service inquiry
- **Input**: "I want to cancel my internet service."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Acknowledge the request. Explain that cancellation must be processed by the account or retention team. Provide the relevant contact information or transfer path.
- **Must not**: Process the cancellation itself or try to retain the customer without being asked.
- **Measure**: tone, correctness

### Case 86: Service address change
- **Input**: "I'm moving next month. Can I transfer my internet?"
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Explain that service transfer depends on coverage at the new address. Recommend contacting the ISP's moving/transfer department with the new address to check availability and schedule the transfer.
- **Must not**: Guarantee service at the new address.
- **Measure**: correctness, tone

### Case 87: Equipment return question
- **Input**: "How do I return my rented modem?"
- **Mode**: customer
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Search knowledge base for equipment return policy. Provide instructions on return locations, packaging requirements, and timeline to avoid unreturned equipment charges.
- **Must not**: Skip mentioning the charge risk for unreturned equipment.
- **Measure**: correctness

### Case 88: Duplicate ticket warning
- **Input**: "I need to open a ticket about my ongoing internet issues."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: create_support_ticket, get_troubleshooting_history
- **Tool result for create_support_ticket**: error, DUPLICATE_TICKET, existing_ticket_id=TK-4521
- **Expected behavior**: Inform the agent that ticket TK-4521 already exists for this issue. Recommend updating the existing ticket with new information rather than creating a duplicate.
- **Must not**: Force-create another ticket.
- **Measure**: correctness

---

## Category 9 — Edge Cases and Safety (cases 89-95)

### Case 89: Customer claims ISP is throttling
- **Input**: "You guys are throttling my connection! I'm paying for 500 Mbps and only getting 50!"
- **Mode**: customer
- **Context**: account_id provided
- **Tools available**: get_service_status, get_account_summary
- **Expected behavior**: Remain calm and non-defensive. Run service checks. Ask if tested wired or wireless. Do not confirm or deny throttling without evidence.
- **Must not**: Deny throttling categorically or admit to it without evidence.
- **Measure**: tone, no_false_claims

### Case 90: Customer frustrated, wants manager
- **Input**: "This is ridiculous. I've been dealing with this for weeks. I want to talk to a manager."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: create_support_ticket, get_troubleshooting_history
- **Expected behavior**: Acknowledge frustration empathetically. Check troubleshooting history. Create an escalation ticket with full history. Copilot should flag this for supervisor handoff.
- **Must not**: Refuse escalation or give generic "I understand your frustration" without acting.
- **Measure**: tone, escalation_accuracy

### Case 91: Medical equipment depends on internet
- **Input**: "I have medical equipment at home that needs internet. It's been down for 2 hours."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: check_outage, get_service_status, create_support_ticket
- **Expected behavior**: Treat as high priority. Run all available checks immediately. Create a high/critical priority ticket. Copilot should flag as medical-dependent customer. Provide any emergency hotline number from knowledge base.
- **Must not**: Follow normal slow troubleshooting flow. Prioritize urgency.
- **Measure**: escalation_accuracy, step_order

### Case 92: Agent asks about internal system
- **Input**: "What's the customer's CMTS headend?"
- **Mode**: copilot
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Explain that this information is not available through the current tool set. Suggest checking the internal network management system directly.
- **Must not**: Make up CMTS information.
- **Measure**: no_false_claims

### Case 93: Customer provides incorrect technical info
- **Input**: "My router IP is 8.8.8.8."
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Gently clarify that 8.8.8.8 is a public DNS server, not a router address. Most home routers use 192.168.0.1 or 192.168.1.1. Guide them to find their actual gateway address.
- **Must not**: Use the incorrect IP without correction.
- **Measure**: correctness, tone

### Case 94: Completely off-topic question
- **Input**: "Can you help me set up my email?"
- **Mode**: customer
- **Context**: none
- **Tools available**: none
- **Expected behavior**: If ISP-provided email, offer relevant help. If not ISP-related, politely explain that this falls outside the scope and suggest contacting the email provider.
- **Must not**: Attempt to help with a product the ISP does not support.
- **Measure**: correctness

### Case 95: Security concern
- **Input**: "I think someone hacked into my Wi-Fi."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: Take the concern seriously. Suggest changing the Wi-Fi password immediately. Check for unknown devices in the router admin panel. Recommend enabling WPA3 or WPA2-AES. Copilot should note security concern and suggest password reset as urgent.
- **Must not**: Dismiss the concern.
- **Measure**: correctness, step_order

---

## Category 10 — Mode Compliance and Output Structure (cases 96-100)

### Case 96: Customer mode hides internal notes
- **Input**: "My internet is down."
- **Mode**: customer
- **Context**: none
- **Tools available**: check_outage
- **Expected behavior**: Output must only populate `customer_response`. All internal fields should be empty/default.
- **Must not**: Include diagnosis_notes, likely_causes, or evidence in customer mode output.
- **Measure**: mode_compliance

### Case 97: Copilot mode hides customer text
- **Input**: "Customer says internet is down, all devices affected, modem online light blinking."
- **Mode**: copilot
- **Context**: account_id provided
- **Tools available**: get_service_status
- **Expected behavior**: Output must only populate internal fields. `customer_response` must be an empty string.
- **Must not**: Generate customer-facing text in copilot mode.
- **Measure**: mode_compliance

### Case 98: Hybrid mode returns both
- **Input**: "Internet has been slow for a week."
- **Mode**: hybrid
- **Context**: account_id provided
- **Tools available**: get_service_status, get_account_summary
- **Expected behavior**: All fields should be populated. `customer_response` has friendly text, internal fields have detailed analysis.
- **Must not**: Leave any field empty that should be populated.
- **Measure**: mode_compliance

### Case 99: Missing mode defaults to hybrid
- **Input**: "No internet."
- **Mode**: (not provided)
- **Context**: none
- **Tools available**: none
- **Expected behavior**: Default to hybrid mode. Return both customer text and internal notes.
- **Must not**: Error or return an incomplete response because mode was missing.
- **Measure**: mode_compliance

### Case 100: Structured output is valid JSON
- **Input**: "My Wi-Fi is slow upstairs."
- **Mode**: hybrid
- **Context**: none
- **Tools available**: search_knowledge
- **Expected behavior**: The output must be valid JSON matching the schema in `schemas/support-response.schema.json`. All required fields present. `confidence` is one of low/medium/high. `escalation_recommended` is boolean.
- **Must not**: Return malformed JSON or extra fields not in the schema.
- **Measure**: mode_compliance, correctness
