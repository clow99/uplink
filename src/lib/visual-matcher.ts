export type VisualId =
  | "modem-lights"
  | "network-topology"
  | "wifi-bands"
  | "cable-types"
  | "modem-vs-router"
  | "router-placement"
  | "reboot-steps"
  | "speed-test"
  | "dns-flow"
  | "fiber-vs-dsl-vs-cable"
  | "mesh-network"
  | "ont-lights"
  | "ethernet-vs-wifi"
  | "intermittent-drops"
  | "device-wifi-fix"
  | "nat-port-forwarding"
  | "latency-jitter-packet-loss"
  | "signal-strength"
  | "outage-map"
  | "wifi-security";

interface VisualRule {
  id: VisualId;
  patterns: RegExp[];
  priority: number;
}

const RULES: VisualRule[] = [
  {
    id: "modem-lights",
    patterns: [
      /modem light/i,
      /indicator light/i,
      /LED.*(status|indicator|meaning)/i,
      /light.*(blinking|flashing|solid|off)/i,
      /power light/i,
      /online light/i,
      /upstream.*light|downstream.*light/i,
      /DS\/US|DS.*US/i,
      /what.*light.*mean/i,
      /modem.*LED/i,
    ],
    priority: 10,
  },
  {
    id: "reboot-steps",
    patterns: [
      /restart.*(modem|router)/i,
      /reboot.*(modem|router)/i,
      /unplug.*(modem|router)/i,
      /power\s*cycl/i,
      /wait.*30\s*second/i,
      /plug.*(back|it)\s*in/i,
      /power.*off.*on/i,
      /turn.*off.*turn.*on/i,
    ],
    priority: 9,
  },
  {
    id: "wifi-bands",
    patterns: [
      /2\.4\s*GHz.*5\s*GHz|5\s*GHz.*2\.4\s*GHz/i,
      /which\s*(wi-?fi\s*)?band/i,
      /frequency\s*band/i,
      /band\s*steering/i,
      /2\.4.*range.*5|5.*faster.*2\.4/i,
      /switch.*(to|between)\s*(2\.4|5)\s*GHz/i,
      /slow.*wi-?fi.*switch/i,
      /dual.?band/i,
    ],
    priority: 8,
  },
  {
    id: "modem-vs-router",
    patterns: [
      /modem.*(vs|versus|or|and|differ).*router/i,
      /router.*(vs|versus|or|and|differ).*modem/i,
      /what\s*(is|'s)\s*(a\s*)?(modem|router)/i,
      /gateway.*combo/i,
      /modem.*router.*same/i,
      /need.*both.*modem.*router/i,
    ],
    priority: 7,
  },
  {
    id: "speed-test",
    patterns: [
      /speed\s*test/i,
      /test.*(your|my|the)\s*(internet\s*)?speed/i,
      /fast\.com|speedtest\.net/i,
      /run\s*a\s*test/i,
      /check.*(your|my)\s*speed/i,
      /download.*speed.*upload|upload.*speed.*download/i,
      /how\s*fast\s*(is|are)/i,
      /measure.*speed/i,
      /speed.*result/i,
    ],
    priority: 6,
  },
  {
    id: "network-topology",
    patterns: [
      /how.*(home\s*)?network\s*work/i,
      /network.*setup|setup.*network/i,
      /modem.*connect.*router|router.*connect.*modem/i,
      /ISP.*modem.*router/i,
      /wired.*wireless.*device/i,
      /network.*diagram|diagram.*network/i,
      /home.*network.*layout/i,
    ],
    priority: 5,
  },
  {
    id: "router-placement",
    patterns: [
      /router\s*placement/i,
      /where.*(put|place|position).*router/i,
      /router.*(location|position)/i,
      /wi-?fi.*coverage.*improve/i,
      /signal.*weak.*(room|area|far)/i,
      /dead\s*zone/i,
      /center\s*of.*(home|house)/i,
      /move.*router/i,
      /best.*place.*router/i,
    ],
    priority: 4,
  },
  {
    id: "cable-types",
    patterns: [
      /coax(ial)?\s*cable/i,
      /ethernet\s*cable/i,
      /fiber\s*(optic\s*)?cable/i,
      /which\s*cable/i,
      /type\s*of\s*cable/i,
      /RJ45|RJ11/i,
      /check.*(your|the)\s*cable/i,
      /cable.*connect/i,
      /what.*cable.*look/i,
    ],
    priority: 3,
  },
  {
    id: "dns-flow",
    patterns: [
      /DNS/i,
      /domain\s*name/i,
      /website.*not\s*(load|resolv)/i,
      /can.*browse.*but.*not/i,
      /flush.*dns|dns.*flush/i,
      /name\s*server/i,
      /8\.8\.8\.8|1\.1\.1\.1/i,
      /change.*dns/i,
      /dns.*server/i,
    ],
    priority: 7,
  },
  {
    id: "fiber-vs-dsl-vs-cable",
    patterns: [
      /fiber.*(vs|versus|or|compared|differ).*cable/i,
      /cable.*(vs|versus|or|compared|differ).*fiber/i,
      /dsl.*(vs|versus|or|compared|differ).*(cable|fiber)/i,
      /type.*of.*(internet|connection|service)/i,
      /fiber.*dsl|dsl.*fiber/i,
      /which.*connection.*type/i,
      /what.*type.*internet/i,
      /cable.*internet.*fiber/i,
    ],
    priority: 5,
  },
  {
    id: "mesh-network",
    patterns: [
      /mesh\s*(network|system|wi-?fi|node)/i,
      /eero|orbi|deco|velop/i,
      /extend.*(coverage|wi-?fi|range)/i,
      /wi-?fi\s*extender/i,
      /add.*(node|access\s*point)/i,
      /whole\s*home\s*(wi-?fi|coverage)/i,
      /range\s*extender/i,
      /repeater/i,
    ],
    priority: 6,
  },
  {
    id: "ont-lights",
    patterns: [
      /ONT\s*light/i,
      /fiber\s*(box|terminal|device)\s*light/i,
      /PON\s*light/i,
      /LOS\s*light/i,
      /optical.*network.*terminal/i,
      /fiber.*LED/i,
      /ONT.*(status|indicator)/i,
      /fiber.*box.*blinking/i,
    ],
    priority: 10,
  },
  {
    id: "ethernet-vs-wifi",
    patterns: [
      /ethernet.*(vs|versus|or|better|compared).*wi-?fi/i,
      /wi-?fi.*(vs|versus|or|better|compared).*ethernet/i,
      /wired.*(vs|versus|or|better|compared).*wireless/i,
      /should\s*I\s*(use|try)\s*(wired|ethernet)/i,
      /wired.*test|test.*wired/i,
      /try.*ethernet/i,
      /plug.*in.*ethernet/i,
    ],
    priority: 4,
  },
  {
    id: "nat-port-forwarding",
    patterns: [
      /NAT\b/,
      /network\s*address\s*translation/i,
      /port\s*forward/i,
      /forward.*port/i,
      /public\s*IP.*private|private\s*IP.*public/i,
      /open.*port/i,
      /incoming.*traffic.*device/i,
      /double\s*NAT/i,
      /UPnP/i,
      /open\s*NAT|strict\s*NAT|moderate\s*NAT/i,
    ],
    priority: 8,
  },
  {
    id: "device-wifi-fix",
    patterns: [
      /device.*(?:can.?t|won.?t|unable|not)\s*connect/i,
      /(?:can.?t|won.?t|unable|not)\s*connect.*wi-?fi/i,
      /forget.*(?:network|wi-?fi)/i,
      /(?:network|wi-?fi).*forget/i,
      /rejoin.*(?:network|wi-?fi)/i,
      /(?:one|single|this)\s*device.*(?:not|won.?t|can.?t)/i,
      /restart.*(?:your|the|this)\s*device/i,
      /(?:phone|laptop|tablet|computer).*(?:can.?t|won.?t|not)\s*connect/i,
      /reconnect.*wi-?fi|wi-?fi.*reconnect/i,
    ],
    priority: 9,
  },
  {
    id: "intermittent-drops",
    patterns: [
      /intermittent/i,
      /keep.*disconnect/i,
      /drop.*out/i,
      /connect.*then.*disconnect/i,
      /on\s*and\s*off/i,
      /randomly\s*(drop|disconnect|cut)/i,
      /unstable\s*(connection|internet)/i,
      /keeps?\s*(going|cutting)\s*(out|off)/i,
      /internet.*comes?\s*and\s*goes/i,
      /connection.*up.*down/i,
    ],
    priority: 8,
  },
  {
    id: "latency-jitter-packet-loss",
    patterns: [
      /latency/i,
      /jitter/i,
      /packet\s*loss/i,
      /ping\s*(time|is|spike|high)/i,
      /high\s*ping/i,
      /lag(gy|ging)?\s*(in|while|when|game|video)/i,
      /game.*lag|lag.*game/i,
      /video\s*call.*(choppy|stutter|buffer)/i,
      /buffer(ing)?\s*(video|stream|call)/i,
      /ms\s*(ping|latency)/i,
    ],
    priority: 7,
  },
  {
    id: "signal-strength",
    patterns: [
      /signal\s*strength/i,
      /wi-?fi\s*signal/i,
      /dBm/i,
      /weak\s*signal/i,
      /signal.*bars?/i,
      /rssi/i,
      /how\s*strong.*signal/i,
      /signal.*level/i,
      /low\s*signal/i,
      /poor\s*signal/i,
    ],
    priority: 5,
  },
  {
    id: "outage-map",
    patterns: [
      /outage/i,
      /is.*(the\s*)?(internet|service)\s*(down|out)/i,
      /area.*down|down.*area/i,
      /service\s*(disruption|interruption)/i,
      /everyone.*affected/i,
      /neighbor.*also/i,
      /whole\s*(street|block|area|neighborhood)/i,
      /check.*outage/i,
      /report.*outage/i,
    ],
    priority: 9,
  },
  {
    id: "wifi-security",
    patterns: [
      /WPA2|WPA3|WEP\b/i,
      /wi-?fi.*security/i,
      /wi-?fi.*password.*change/i,
      /network.*encrypt/i,
      /security\s*(protocol|type|setting)/i,
      /open\s*network.*secure/i,
      /hack.*wi-?fi|wi-?fi.*hack/i,
      /secure.*wi-?fi|wi-?fi.*secure/i,
      /someone.*using.*wi-?fi/i,
    ],
    priority: 6,
  },
];

export function matchVisuals(text: string, maxResults = 3): VisualId[] {
  const matched: { id: VisualId; priority: number }[] = [];

  for (const rule of RULES) {
    if (rule.patterns.some((p) => p.test(text))) {
      matched.push({ id: rule.id, priority: rule.priority });
    }
  }

  matched.sort((a, b) => b.priority - a.priority);

  const seen = new Set<VisualId>();
  const result: VisualId[] = [];
  for (const m of matched) {
    if (!seen.has(m.id) && result.length < maxResults) {
      seen.add(m.id);
      result.push(m.id);
    }
  }

  return result;
}
