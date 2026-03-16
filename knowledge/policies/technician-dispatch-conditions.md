---
title: "Technician Dispatch Conditions"
device_model: ""
service_type: ""
symptom_type: ""
audience: "agent"
source_type: "policy"
region: ""
last_updated: "2026-03-16"
tags: ["dispatch", "technician", "truck-roll", "field-service", "internal"]
---

# Technician Dispatch Conditions

A technician visit (truck roll) is the most expensive support action. This document defines when dispatch is appropriate and when it should be avoided.

## Prerequisites before dispatch

All of the following must be completed before scheduling a technician:

1. **Full troubleshooting flow completed**: the relevant troubleshooting flow (no internet, slow speed, intermittent, etc.) must be followed to completion.
2. **Remote diagnostics performed**: if available, check signal levels, service status, and account status using support tools.
3. **Equipment restart confirmed**: the customer must have restarted their modem (and router, if separate) with at least a 30-second power-off.
4. **Cable check completed**: the customer has verified all cables are securely connected and undamaged.
5. **Ethernet test performed**: where possible, the customer has tested with a wired connection to isolate Wi-Fi vs service issues.

## Valid dispatch reasons

Schedule a technician if any of the following are confirmed after completing prerequisites:

| Reason | Details |
|--------|---------|
| **No signal to modem** | Modem cannot sync after full reboot cycle; all cables verified. Likely an outside plant issue. |
| **Signal levels out of spec** | Remote diagnostics show downstream or upstream power levels outside acceptable ranges. |
| **Physical damage** | Customer reports visibly damaged cables, connectors, or equipment that cannot be self-replaced. |
| **ONT/fiber issue** | Fiber customer with LOS light on (red) after verifying the fiber cable is not disconnected or bent. |
| **Repeated modem replacements** | Customer has already replaced or swapped the modem without improvement, suggesting a line issue. |
| **New installation** | New service activation requiring physical line work or equipment installation. |
| **Equipment upgrade** | ISP-initiated equipment swap that requires on-site installation. |

## Do NOT dispatch for

- **Wi-Fi coverage issues**: recommend router placement changes or mesh systems instead. Wi-Fi is the customer's equipment.
- **Single-device issues**: troubleshoot the device, not the line.
- **Speed issues resolved by Ethernet**: if wired speeds are at plan level, the issue is Wi-Fi, not the service.
- **DNS or software issues**: these are resolved remotely.
- **Customer just wants a faster plan**: process as a plan upgrade, not a dispatch.

## Scheduling guidelines

- **Standard**: next available business day in the customer's preferred time window.
- **Priority**: same-day or next-morning for medical dependency, safety concerns, or extended outages (72+ hours).
- **Time windows**: offer 8 AM-12 PM or 12 PM-5 PM blocks. Technician will call 30 minutes before arrival.
- **Customer preparation**: advise the customer to ensure an adult (18+) is present, pets are secured, and the equipment area is accessible.
