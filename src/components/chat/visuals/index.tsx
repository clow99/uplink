"use client";

import type { VisualId } from "@/lib/visual-matcher";
import { ModemLightsDiagram } from "./modem-lights-diagram";
import { NetworkTopology } from "./network-topology";
import { WifiBandsVisual } from "./wifi-bands-visual";
import { CableTypesGuide } from "./cable-types-guide";
import { ModemVsRouter } from "./modem-vs-router";
import { RouterPlacement } from "./router-placement";
import { RebootSteps } from "./reboot-steps";
import { SpeedTestGuide } from "./speed-test-guide";
import { DnsFlow } from "./dns-flow";
import { FiberVsDslVsCable } from "./fiber-vs-dsl-vs-cable";
import { MeshNetwork } from "./mesh-network";
import { OntLights } from "./ont-lights";
import { EthernetVsWifi } from "./ethernet-vs-wifi";
import { IntermittentDrops } from "./intermittent-drops";
import { DeviceWifiFix } from "./device-wifi-fix";
import { NatPortForwarding } from "./nat-port-forwarding";
import { LatencyVisual } from "./latency-visual";
import { SignalStrength } from "./signal-strength";
import { OutageCheck } from "./outage-check";
import { WifiSecurity } from "./wifi-security";

const VISUAL_MAP: Record<VisualId, React.ComponentType> = {
  "modem-lights": ModemLightsDiagram,
  "network-topology": NetworkTopology,
  "wifi-bands": WifiBandsVisual,
  "cable-types": CableTypesGuide,
  "modem-vs-router": ModemVsRouter,
  "router-placement": RouterPlacement,
  "reboot-steps": RebootSteps,
  "speed-test": SpeedTestGuide,
  "dns-flow": DnsFlow,
  "fiber-vs-dsl-vs-cable": FiberVsDslVsCable,
  "mesh-network": MeshNetwork,
  "ont-lights": OntLights,
  "ethernet-vs-wifi": EthernetVsWifi,
  "intermittent-drops": IntermittentDrops,
  "device-wifi-fix": DeviceWifiFix,
  "nat-port-forwarding": NatPortForwarding,
  "latency-jitter-packet-loss": LatencyVisual,
  "signal-strength": SignalStrength,
  "outage-map": OutageCheck,
  "wifi-security": WifiSecurity,
};

interface ChatVisualProps {
  visualId: VisualId;
}

export function ChatVisual({ visualId }: ChatVisualProps) {
  const Component = VISUAL_MAP[visualId];
  if (!Component) return null;
  return <Component />;
}
