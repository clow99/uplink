---
title: "Outage Suspicion Troubleshooting Flow"
device_model: ""
service_type: ""
symptom_type: "no-internet"
audience: "both"
source_type: "flow"
region: ""
last_updated: "2026-03-16"
tags: ["outage", "down", "area-outage", "service-disruption", "flow"]
---

# Outage Suspicion Troubleshooting Flow

Use this flow when a customer reports complete loss of service and suspects an outage in their area.

## Step 1: Confirm total service loss

Ask the customer to verify:

- **All devices affected**: if only one device is down, this is not an outage. Follow the one-device-not-connecting guide.
- **Modem lights**: are the modem lights abnormal (online light off or blinking)?
- **Recent changes**: did anything change (new equipment, construction nearby, power outage)?

If all devices are down and modem lights are abnormal, proceed to Step 2.

## Step 2: Check for known outages

Use the `check_outage` tool if available, providing the customer's address or account.

- **Active outage confirmed**: inform the customer of the outage, provide the estimated restoration time if available, and document the interaction.
- **No outage found**: proceed to Step 3.

## Step 3: Basic equipment check

Even without a confirmed outage, rule out local issues:

1. Verify all cables are securely connected (power, coax/fiber, Ethernet).
2. Unplug the modem power cable. Wait 30 seconds. Plug back in.
3. Wait 5 minutes for the modem to fully restart.
4. Check modem lights again.

- **Modem comes back online**: the issue was local, not an outage. Monitor for recurrence.
- **Modem still can't connect**: proceed to Step 4.

## Step 4: Check service status

Use the `get_service_status` tool if available.

- **Service shows offline or degraded**: this confirms a service issue. Note the status and escalate.
- **Service shows active but customer has no connection**: there may be a localized issue not yet flagged as an outage. Proceed to Step 5.

## Step 5: Gather evidence for escalation

Collect the following before escalating:

1. Customer's address and account number.
2. Time the outage started (as reported by the customer).
3. Modem model and light status.
4. Results of the outage check tool.
5. Results of the service status tool.
6. Whether neighbors are also affected (if the customer knows).

## Step 6: Escalate and set expectations

1. Escalate to the Network Operations Center (NOC) with all gathered evidence.
2. Inform the customer:
   - An investigation has been opened.
   - If it's a widespread outage, crews are being dispatched.
   - Provide an estimated timeline if one is available, or state that updates will be provided.
3. Offer to add the customer's contact info for proactive notification when service is restored.
4. If the customer has a medical or critical dependency on internet, flag the ticket as Priority 1.
