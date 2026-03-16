# Tool Contracts

This document specifies the backend tools the ISP support agent can call, their expected request/response shapes, failure modes, and the truthfulness rules that govern their use.

---

## General rules

1. The host application declares which tools are available in each request via an `available_tools` manifest. The agent must never call a tool not listed in that manifest.
2. Every tool returns a standard envelope:

```json
{
  "success": true,
  "data": { },
  "error": null
}
```

On failure:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "TOOL_TIMEOUT",
    "message": "The outage system did not respond within 5 seconds."
  }
}
```

3. The agent must never invent data that should come from a tool. If a tool is unavailable or fails, the agent must say it could not verify live status and fall back to general guidance.
4. Tool results are ephemeral. They reflect the state at the moment of the call and should not be cached across conversation turns unless the host explicitly provides cached results.

---

## search_knowledge

Search the knowledge base for help docs, manuals, runbooks, and policy documents.

### Request

```json
{
  "tool": "search_knowledge",
  "params": {
    "query": "string — natural-language search query (required)",
    "filters": {
      "symptom_type": "string — optional, e.g. 'no-internet'",
      "device_model": "string — optional, e.g. 'Arris SB8200'",
      "service_type": "string — optional, one of: fiber, dsl, cable, fixed-wireless, satellite",
      "audience": "string — optional, one of: customer, agent, both",
      "source_type": "string — optional, one of: concept, symptom, device, policy, flow"
    },
    "limit": "integer — optional, default 5, max 10"
  }
}
```

### Response (success)

```json
{
  "success": true,
  "data": {
    "results": [
      {
        "document_id": "string",
        "title": "string",
        "source_type": "string",
        "snippet": "string — relevant excerpt, max 500 chars",
        "score": 0.92,
        "last_updated": "2025-11-01"
      }
    ]
  },
  "error": null
}
```

### Failure modes

| Error code | Meaning | Agent behavior |
|------------|---------|----------------|
| `RETRIEVAL_UNAVAILABLE` | Search backend is down | Rely on built-in knowledge; note in diagnosis that retrieval was unavailable. |
| `NO_RESULTS` | Query returned zero matches | Broaden the query or try different filters. Do not fabricate document content. |

---

## check_outage

Determine whether a known service outage is affecting a given address or account.

### Request

```json
{
  "tool": "check_outage",
  "params": {
    "account_id": "string — optional",
    "address": "string — optional, street address or service location"
  }
}
```

At least one of `account_id` or `address` must be provided.

### Response (success)

```json
{
  "success": true,
  "data": {
    "outage_detected": true,
    "outage_id": "string",
    "affected_area": "string — description of the impacted region",
    "started_at": "ISO 8601 datetime",
    "estimated_resolution": "ISO 8601 datetime or null",
    "service_types_affected": ["fiber", "cable"],
    "status": "string — one of: investigating, identified, monitoring, resolved"
  },
  "error": null
}
```

### Failure modes

| Error code | Meaning | Agent behavior |
|------------|---------|----------------|
| `OUTAGE_SYSTEM_UNAVAILABLE` | Status system is down | Say: "I'm unable to check outage status right now." Proceed with general troubleshooting. |
| `INVALID_ADDRESS` | Address could not be matched | Ask the customer to confirm their service address. |
| `ACCOUNT_NOT_FOUND` | Account ID does not exist | Ask the customer to verify their account number. |

### Truthfulness constraint
The agent may only say "there is an outage" or "no outage is detected" if this tool returned successfully. If the tool was not called or failed, the agent must say it could not verify outage status.

---

## get_account_summary

Retrieve high-level account information.

### Request

```json
{
  "tool": "get_account_summary",
  "params": {
    "account_id": "string — required"
  }
}
```

### Response (success)

```json
{
  "success": true,
  "data": {
    "account_id": "string",
    "customer_name": "string",
    "address": "string",
    "plan_name": "string — e.g. 'Fiber 500'",
    "plan_speed_down_mbps": 500,
    "plan_speed_up_mbps": 100,
    "account_status": "string — one of: active, suspended, pending, cancelled",
    "balance_due": 0.00,
    "next_bill_date": "YYYY-MM-DD",
    "tenure_months": 24
  },
  "error": null
}
```

### Failure modes

| Error code | Meaning | Agent behavior |
|------------|---------|----------------|
| `ACCOUNT_NOT_FOUND` | ID does not match any account | Ask the customer to verify their account number. |
| `ACCOUNT_SYSTEM_UNAVAILABLE` | Backend timeout or error | Say: "I'm unable to pull up account details right now." Continue with general troubleshooting. |
| `UNAUTHORIZED` | Session lacks permission | Do not retry. Note in copilot that account lookup requires elevated access. |

### Truthfulness constraint
Never state the customer's plan speed, account status, or balance unless this tool returned the data.

---

## get_service_status

Get the live service/line status for a customer's connection.

### Request

```json
{
  "tool": "get_service_status",
  "params": {
    "account_id": "string — required"
  }
}
```

### Response (success)

```json
{
  "success": true,
  "data": {
    "account_id": "string",
    "connection_type": "string — fiber, dsl, cable, fixed-wireless",
    "line_status": "string — one of: online, offline, degraded, unknown",
    "signal_quality": "string — one of: good, marginal, poor, unknown",
    "last_seen": "ISO 8601 datetime",
    "uptime_seconds": 86400,
    "provisioning_status": "string — one of: provisioned, pending, error",
    "recent_events": [
      {
        "timestamp": "ISO 8601 datetime",
        "event": "string — e.g. 'modem rebooted', 'signal loss detected'"
      }
    ]
  },
  "error": null
}
```

### Failure modes

| Error code | Meaning | Agent behavior |
|------------|---------|----------------|
| `SERVICE_SYSTEM_UNAVAILABLE` | Monitoring system is down | Say: "I'm unable to check your line status right now." |
| `ACCOUNT_NOT_FOUND` | ID mismatch | Ask for correct account number. |
| `NO_SERVICE_RECORD` | Account exists but has no active service line | Note this in copilot. May indicate a provisioning issue. |

### Truthfulness constraint
Never say the modem is online/offline, the signal is good/poor, or the line just rebooted unless this tool confirmed it.

---

## get_equipment

List the modem, router, and ONT equipment on file for a customer.

### Request

```json
{
  "tool": "get_equipment",
  "params": {
    "account_id": "string — required"
  }
}
```

### Response (success)

```json
{
  "success": true,
  "data": {
    "account_id": "string",
    "equipment": [
      {
        "type": "string — modem, router, ont, mesh_node",
        "make": "string",
        "model": "string",
        "serial_number": "string",
        "mac_address": "string",
        "firmware_version": "string",
        "is_rented": true,
        "install_date": "YYYY-MM-DD",
        "status": "string — active, inactive, returned"
      }
    ]
  },
  "error": null
}
```

### Failure modes

| Error code | Meaning | Agent behavior |
|------------|---------|----------------|
| `ACCOUNT_NOT_FOUND` | ID mismatch | Ask for correct account number. |
| `EQUIPMENT_SYSTEM_UNAVAILABLE` | Backend error | Note that equipment records are unavailable. Ask the customer what equipment they have. |

### Usage note
When the agent knows the device model from this tool, it should use that model in `search_knowledge` filters to retrieve device-specific guides.

---

## create_support_ticket

Open a new support ticket or escalation case.

### Request

```json
{
  "tool": "create_support_ticket",
  "params": {
    "account_id": "string — required",
    "category": "string — required, one of: outage, hardware, connectivity, billing, provisioning, general",
    "priority": "string — required, one of: low, medium, high, critical",
    "summary": "string — required, one-line description of the issue",
    "details": "string — required, full troubleshooting summary including steps taken and results",
    "escalation": {
      "recommended": true,
      "reason": "string",
      "target_team": "string — optional, e.g. 'network-ops', 'field-tech', 'billing'"
    }
  }
}
```

### Response (success)

```json
{
  "success": true,
  "data": {
    "ticket_id": "string",
    "created_at": "ISO 8601 datetime",
    "status": "open",
    "estimated_response_time": "string — e.g. '4 hours', '1 business day'"
  },
  "error": null
}
```

### Failure modes

| Error code | Meaning | Agent behavior |
|------------|---------|----------------|
| `TICKET_SYSTEM_UNAVAILABLE` | Ticketing backend is down | Tell the customer that a ticket could not be created automatically and recommend they call support or that the agent should create one manually. |
| `ACCOUNT_NOT_FOUND` | ID mismatch | Verify account before retrying. |
| `DUPLICATE_TICKET` | An open ticket already exists for this issue | Inform the agent/customer of the existing ticket ID from the error payload and ask whether to update it instead. |

### Safety rule
Never create a ticket without including a troubleshooting summary in `details`. The agent must document what was tried before escalating.

---

## get_troubleshooting_history

Fetch prior troubleshooting sessions for an account. This tool is optional and may not be available in all deployments.

### Request

```json
{
  "tool": "get_troubleshooting_history",
  "params": {
    "account_id": "string — required",
    "limit": "integer — optional, default 5, max 20"
  }
}
```

### Response (success)

```json
{
  "success": true,
  "data": {
    "account_id": "string",
    "sessions": [
      {
        "session_id": "string",
        "date": "ISO 8601 datetime",
        "symptom": "string",
        "resolution": "string — or null if unresolved",
        "escalated": false,
        "ticket_id": "string — or null"
      }
    ]
  },
  "error": null
}
```

### Failure modes

| Error code | Meaning | Agent behavior |
|------------|---------|----------------|
| `HISTORY_UNAVAILABLE` | Feature not deployed or backend error | Skip silently. This tool is supplementary. |
| `ACCOUNT_NOT_FOUND` | ID mismatch | Ask for correct account number. |

### Usage note
Prior sessions help avoid re-running the same troubleshooting steps. If a recent session shows the same symptom was unresolved, the agent should note this in copilot diagnosis and consider earlier escalation.
