---
title: "Escalation Rules"
device_model: ""
service_type: ""
symptom_type: ""
audience: "agent"
source_type: "policy"
region: ""
last_updated: "2026-03-16"
tags: ["escalation", "policy", "tier-2", "supervisor", "internal"]
---

# Escalation Rules

This document defines when and how support interactions should be escalated beyond Tier 1 / AI-assisted support.

## Mandatory escalation triggers

Escalate immediately if any of the following conditions are met:

1. **Confirmed outage affecting multiple customers**: if the outage tool confirms an active area outage, note it in the ticket and escalate to the Network Operations Center (NOC).
2. **Safety concern**: customer reports sparking equipment, burning smell, flooding near equipment, or any hazard. Advise the customer to unplug the device and escalate to emergency dispatch.
3. **Account security**: customer reports unauthorized account access, password changes they didn't make, or suspicious charges.
4. **Billing dispute over $50**: credit requests exceeding $50 must be approved by a billing supervisor.
5. **Repeated contact (3+ times)**: if the customer has contacted support 3 or more times for the same unresolved issue within 7 days, escalate to Tier 2.
6. **Medical or accessibility dependency**: customer indicates they depend on internet for medical equipment (e.g., telehealth, medical alerts). Prioritize and escalate if not resolved within 15 minutes.

## Recommended escalation triggers

Escalate if standard troubleshooting has been exhausted:

1. **All troubleshooting steps completed without improvement**: if the full troubleshooting flow has been followed and the issue persists, escalate with detailed notes.
2. **Signal levels out of range**: if modem diagnostics show signal levels outside acceptable ranges (downstream power outside -7 to +7 dBmV, upstream outside 38-48 dBmV for cable), escalate for line diagnostics.
3. **Firmware or provisioning issue suspected**: if the modem is online but not provisioned correctly, or a firmware bug is suspected, escalate to Tier 2 technical.
4. **Chronic intermittent drops**: customer reports drops happening daily for more than 3 days, and basic troubleshooting hasn't resolved it.

## Escalation process

1. **Document everything**: include the symptom, all steps taken, results of each step, modem/router model, and any tool outputs (outage check, service status, equipment info).
2. **Set expectations**: tell the customer what will happen next and the expected timeline.
3. **Transfer warmly**: if transferring to a live agent, provide a summary so the customer doesn't have to repeat themselves.
4. **Ticket priority**: set ticket priority based on impact — P1 for outage/safety, P2 for service-affecting, P3 for general issues.

## What NOT to escalate

- Questions that can be answered from the knowledge base (concepts, device guides, flows).
- Password resets and basic account inquiries.
- Single-occurrence issues that resolve after a reboot (unless the customer insists).
