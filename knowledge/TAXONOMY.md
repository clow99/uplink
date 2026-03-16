# Knowledge Base Taxonomy

This document defines the folder structure, document format, and metadata schema used by the ISP support agent's retrieval system. All documents ingested into the knowledge base should conform to this layout so they can be filtered and ranked at query time.

## Folder structure

```
knowledge/
├── concepts/
│   ├── modem-vs-router.md
│   ├── wifi-bands.md
│   ├── latency-jitter-packet-loss.md
│   ├── dns-how-it-works.md
│   ├── nat-and-port-forwarding.md
│   └── fiber-vs-dsl-vs-cable.md
├── symptoms/
│   ├── no-internet.md
│   ├── slow-internet.md
│   ├── intermittent-drops.md
│   ├── weak-wifi.md
│   ├── one-device-not-connecting.md
│   ├── high-latency.md
│   ├── wifi-works-no-internet.md
│   └── ethernet-good-wifi-bad.md
├── devices/
│   ├── modems/
│   │   ├── arris-sb8200.md
│   │   ├── netgear-cm1200.md
│   │   └── ...
│   ├── routers/
│   │   ├── tp-link-archer-ax73.md
│   │   ├── netgear-nighthawk-rax50.md
│   │   └── ...
│   ├── onts/
│   │   ├── nokia-ont-g-010g-a.md
│   │   └── ...
│   ├── mesh-systems/
│   │   ├── eero-pro-6e.md
│   │   └── ...
│   └── light-status/
│       ├── arris-sb8200-lights.md
│       ├── nokia-ont-lights.md
│       └── ...
├── policies/
│   ├── supported-equipment.md
│   ├── escalation-rules.md
│   ├── technician-dispatch-conditions.md
│   ├── credit-and-refund-policy.md
│   ├── service-level-agreements.md
│   └── data-privacy-handling.md
└── flows/
    ├── no-internet-flow.md
    ├── slow-speed-flow.md
    ├── wifi-coverage-flow.md
    ├── gaming-latency-flow.md
    ├── outage-suspicion-flow.md
    ├── new-modem-setup-flow.md
    ├── mesh-extender-setup-flow.md
    └── firmware-update-flow.md
```

## Category definitions

### concepts/
Explainer articles that define networking terms and technologies. Used when the agent needs to educate the customer or when a support agent needs a quick refresher. These are reference material, never evidence of live system state.

### symptoms/
Symptom-centered articles that map a customer complaint to the most common causes and the recommended diagnostic path. Each article should start with the customer's language ("My internet is slow") and link to the relevant flow.

### devices/
Equipment-specific documentation organized by device type. Includes setup guides, factory reset procedures, firmware notes, and light-status interpretation. Subdirectories keep modems, routers, ONTs, and mesh systems separate. The `light-status/` subdirectory is specifically for LED indicator guides since those are frequently retrieved during troubleshooting.

### policies/
Internal process documents that govern what agents can offer, when to escalate, dispatch rules, credit policies, and data handling. These are not shown to customers directly but inform the agent's decisions and copilot recommendations.

### flows/
Step-by-step troubleshooting runbooks. Each flow corresponds to a common issue type and walks through the diagnostic sequence from symptom identification to resolution or escalation. Flows are the primary retrieval target during active troubleshooting.

## Document format

Every document in the knowledge base should be a Markdown file with YAML frontmatter containing structured metadata, followed by the article body.

### Template

```markdown
---
title: "Human-readable article title"
device_model: ""
service_type: ""
symptom_type: ""
audience: "customer | agent | both"
source_type: "concept | symptom | device | policy | flow"
region: ""
last_updated: "YYYY-MM-DD"
tags: []
---

# Article Title

Article body in Markdown.
```

## Metadata field definitions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | string | yes | Human-readable title displayed in search results and cited in evidence. |
| `device_model` | string | no | Specific device model the article applies to. Empty string if not device-specific. Examples: `"Arris SB8200"`, `"TP-Link Archer AX73"`. |
| `service_type` | string | no | The connection technology. One of: `"fiber"`, `"dsl"`, `"cable"`, `"fixed-wireless"`, `"satellite"`, or empty if universal. |
| `symptom_type` | string | no | Primary symptom category. One of: `"no-internet"`, `"slow-speed"`, `"intermittent"`, `"weak-wifi"`, `"one-device"`, `"latency"`, `"setup"`, `"lights"`, `"account"`, or empty if not symptom-oriented. |
| `audience` | string | yes | Who this article is written for. `"customer"` for customer-safe language, `"agent"` for internal-only content, `"both"` for either context. |
| `source_type` | string | yes | Must match the folder: `"concept"`, `"symptom"`, `"device"`, `"policy"`, or `"flow"`. |
| `region` | string | no | Geographic applicability if the content is region-specific. Examples: `"us-northeast"`, `"uk"`. Empty if universal. |
| `last_updated` | string | yes | ISO 8601 date of the most recent content review. Used to prefer fresher documents when multiple results match. |
| `tags` | array of strings | no | Free-form labels for additional filtering. Examples: `["2.4ghz", "5ghz", "wpa3", "mesh"]`. |

## Retrieval filtering

When the agent calls `search_knowledge(query, filters)`, the filters map directly to metadata fields:

```json
{
  "query": "slow wifi far from router",
  "filters": {
    "symptom_type": "weak-wifi",
    "service_type": "fiber",
    "audience": "customer"
  }
}
```

The retrieval service should:
1. Perform semantic search on the `query` against document bodies.
2. Apply exact-match filters on any provided metadata fields.
3. Prefer documents with a more recent `last_updated` when relevance scores are close.
4. Return the top 3-5 matching documents with their `title`, `source_type`, and a content snippet.

## Ingestion guidelines

- One topic per document. If an article covers two distinct symptoms, split it.
- Keep articles under 2000 words. Longer guides should be broken into a parent overview and linked sub-articles.
- Use consistent heading levels: H1 for the title, H2 for major sections, H3 for subsections.
- Write `customer`-audience articles at an 8th-grade reading level.
- Write `agent`-audience articles with precise technical language and explicit decision criteria.
- Review and update `last_updated` at least quarterly or whenever procedures change.
- When a device reaches end-of-life, archive its documents into a `devices/_archived/` subdirectory rather than deleting them, in case customers still use the equipment.
