export interface Concept {
  term: string;
  aliases: string[];
  definition: string;
  detail?: string;
  category: "networking" | "device" | "connection" | "metric" | "protocol";
  learnMore?: string;
}

export const CONCEPTS: Concept[] = [
  {
    term: "Modem",
    aliases: ["modem", "cable modem"],
    definition:
      "A device that connects your home to your Internet Service Provider.",
    detail:
      "Translates the signal from your ISP's network (cable, fiber, or DSL) into a form your home network can use. If your modem is offline, you have no internet even if Wi-Fi appears to be working.",
    category: "device",
    learnMore: "What's the difference between a modem and a router?",
  },
  {
    term: "Router",
    aliases: ["router", "wireless router", "Wi-Fi router", "wifi router"],
    definition:
      "A device that creates your home network and shares your internet connection.",
    detail:
      "Connects to the modem and distributes the internet connection to all your devices over Wi-Fi and Ethernet. It assigns local IP addresses and manages traffic between devices.",
    category: "device",
    learnMore: "What's the difference between a modem and a router?",
  },
  {
    term: "Gateway",
    aliases: ["gateway", "combo device", "combo unit"],
    definition:
      "A single device that combines a modem and router in one unit.",
    detail:
      "Many ISPs provide gateway devices that handle both the ISP connection and your home Wi-Fi network in one box.",
    category: "device",
  },
  {
    term: "ONT",
    aliases: ["ONT", "optical network terminal"],
    definition:
      "Optical Network Terminal - converts fiber optic light signals into electrical signals.",
    detail:
      "If you have fiber internet, the ONT is the box where the fiber line enters your home. It converts the light signal to Ethernet so your router can use it.",
    category: "device",
  },
  {
    term: "2.4 GHz",
    aliases: ["2.4 GHz", "2.4GHz", "2.4 ghz"],
    definition:
      "A Wi-Fi frequency band with longer range but slower speeds.",
    detail:
      "Covers a large home and passes through walls better. Typical speeds of 50-100 Mbps. More congested because it's shared with microwaves, baby monitors, and Bluetooth devices. Best for smart home devices and rooms far from the router.",
    category: "networking",
    learnMore:
      "Can you explain the difference between 2.4GHz and 5GHz Wi-Fi bands?",
  },
  {
    term: "5 GHz",
    aliases: ["5 GHz", "5GHz", "5 ghz"],
    definition:
      "A Wi-Fi frequency band with faster speeds but shorter range.",
    detail:
      "Speeds of 200-800+ Mbps depending on your router and device. Less congested than 2.4 GHz. Best for streaming, video calls, and gaming when you're near the router.",
    category: "networking",
    learnMore:
      "Can you explain the difference between 2.4GHz and 5GHz Wi-Fi bands?",
  },
  {
    term: "6 GHz",
    aliases: ["6 GHz", "6GHz", "6 ghz"],
    definition:
      "The newest Wi-Fi band with the fastest speeds and least congestion.",
    detail:
      "Can exceed 1 Gbps in ideal conditions. Very short range and sensitive to walls. Requires Wi-Fi 6E or Wi-Fi 7 capable devices.",
    category: "networking",
  },
  {
    term: "Wi-Fi 6E",
    aliases: ["Wi-Fi 6E", "WiFi 6E", "wifi 6e"],
    definition: "A Wi-Fi standard that adds the 6 GHz band for faster speeds.",
    detail:
      "Extends Wi-Fi 6 into the 6 GHz band, providing more channels and less interference. Requires compatible devices and a Wi-Fi 6E router.",
    category: "networking",
  },
  {
    term: "DNS",
    aliases: ["DNS", "domain name system"],
    definition:
      "Domain Name System - translates website names into IP addresses.",
    detail:
      "When you type a website address like google.com, DNS converts it to a numeric IP address so your device can connect. DNS issues can make it seem like your internet is down even when the connection is active.",
    category: "protocol",
  },
  {
    term: "Ethernet",
    aliases: ["Ethernet", "ethernet cable", "wired connection"],
    definition:
      "A wired network connection using a cable plugged directly into your device.",
    detail:
      "Provides the most reliable and fastest connection to your network. Used to test whether internet issues are caused by Wi-Fi or the actual service. Uses an RJ45 connector.",
    category: "networking",
  },
  {
    term: "Latency",
    aliases: ["latency", "ping", "ping time"],
    definition: "The delay (in milliseconds) for data to travel to a server and back.",
    detail:
      "Low latency (under 20ms) is great for gaming and video calls. High latency (over 100ms) causes noticeable lag. Measured with a ping test.",
    category: "metric",
  },
  {
    term: "Bandwidth",
    aliases: ["bandwidth"],
    definition:
      "The maximum amount of data your connection can transfer per second.",
    detail:
      "Measured in Mbps (megabits per second). Higher bandwidth means you can stream more content simultaneously. Your plan's advertised speed is your maximum bandwidth.",
    category: "metric",
  },
  {
    term: "ISP",
    aliases: ["ISP", "internet service provider"],
    definition:
      "Internet Service Provider - the company that provides your internet connection.",
    detail:
      "Your ISP owns the infrastructure (cables, fiber, towers) that connects your home to the internet. They manage your account, plan speeds, and service quality.",
    category: "networking",
  },
  {
    term: "Firmware",
    aliases: ["firmware", "firmware update"],
    definition: "Built-in software on your modem or router that controls how it operates.",
    detail:
      "Firmware updates fix bugs, improve performance, and patch security vulnerabilities. Most modern devices update automatically, but some require manual updates.",
    category: "device",
  },
  {
    term: "SSID",
    aliases: ["SSID", "network name", "Wi-Fi name", "wifi name"],
    definition: "Service Set Identifier - the name of your Wi-Fi network.",
    detail:
      "This is what you see when you scan for available networks on your device. You can change your SSID in your router's settings.",
    category: "networking",
  },
  {
    term: "Band Steering",
    aliases: ["band steering"],
    definition:
      "A router feature that automatically directs devices to the best Wi-Fi band.",
    detail:
      "Instead of separate 2.4 GHz and 5 GHz networks, band steering uses a single network name and moves devices to the optimal band based on signal strength and capability.",
    category: "networking",
  },
  {
    term: "Mesh Network",
    aliases: ["mesh network", "mesh system", "mesh Wi-Fi", "mesh wifi"],
    definition:
      "Multiple Wi-Fi access points that work together to cover your entire home.",
    detail:
      "Mesh systems use two or more nodes placed around your home to create seamless coverage. Your device automatically connects to the nearest node as you move around.",
    category: "device",
  },
  {
    term: "Speed Test",
    aliases: ["speed test", "speedtest"],
    definition:
      "A measurement of your internet connection's download speed, upload speed, and latency.",
    detail:
      "Run at fast.com or speedtest.net. For accurate results, use a wired connection, close other apps, and test at different times of day.",
    category: "metric",
  },
  {
    term: "Fiber Optic",
    aliases: ["fiber optic", "fiber", "fiber internet", "fibre"],
    definition:
      "An internet connection type that uses light signals through glass cables.",
    detail:
      "The fastest and most reliable connection type available. Offers symmetrical upload and download speeds, low latency, and is not affected by electrical interference.",
    category: "connection",
  },
  {
    term: "DSL",
    aliases: ["DSL"],
    definition:
      "Digital Subscriber Line - internet delivered over telephone lines.",
    detail:
      "Speeds typically range from 5-100 Mbps depending on your distance from the provider's equipment. Uses existing phone wiring.",
    category: "connection",
  },
  {
    term: "Coaxial Cable",
    aliases: ["coaxial cable", "coax cable", "coax", "cable internet"],
    definition:
      "A cable type used to deliver internet, TV, and phone service.",
    detail:
      "Cable internet uses the same coaxial wiring as cable TV. Speeds can reach 1 Gbps+ download but upload speeds are typically lower than fiber.",
    category: "connection",
  },
  {
    term: "IP Address",
    aliases: ["IP address", "IP"],
    definition:
      "A unique number assigned to every device on a network.",
    detail:
      "Your router has a public IP (visible to the internet) and assigns private IPs to each device in your home. IPv4 addresses look like 192.168.1.1, while IPv6 uses a longer format.",
    category: "protocol",
  },
  {
    term: "Packet Loss",
    aliases: ["packet loss"],
    definition:
      "When data packets fail to reach their destination.",
    detail:
      "Causes stuttering in video calls, lag in games, and failed page loads. Usually caused by network congestion, faulty cables, or Wi-Fi interference.",
    category: "metric",
  },
  {
    term: "Jitter",
    aliases: ["jitter"],
    definition:
      "Variation in the time it takes for data packets to arrive.",
    detail:
      "High jitter makes real-time applications (video calls, gaming) choppy even if average latency is acceptable. Ideally under 30ms for good quality.",
    category: "metric",
  },
  {
    term: "DFS Channels",
    aliases: ["DFS channels", "DFS"],
    definition:
      "Dynamic Frequency Selection - additional 5 GHz channels shared with radar.",
    detail:
      "DFS channels are less congested because fewer devices use them. Your router must detect radar signals and switch channels if needed, which can cause brief disconnections.",
    category: "networking",
  },
  {
    term: "NAT",
    aliases: ["NAT", "network address translation"],
    definition:
      "Network Address Translation - lets multiple devices share one public IP address.",
    detail:
      "Your router uses NAT to translate between private IP addresses on your home network and the single public IP assigned by your ISP. NAT also blocks unsolicited incoming traffic, which is why port forwarding is sometimes needed.",
    category: "networking",
    learnMore: "Can you explain what NAT is and when I would need port forwarding?",
  },
  {
    term: "Port Forwarding",
    aliases: ["port forwarding", "port forward"],
    definition:
      "A router setting that directs incoming internet traffic to a specific device on your network.",
    detail:
      "Used for gaming consoles, security cameras, and home servers that need to accept connections from the internet. You specify a port number and the local IP of the target device.",
    category: "networking",
    learnMore: "Can you explain what NAT is and when I would need port forwarding?",
  },
  {
    term: "DHCP",
    aliases: ["DHCP", "dynamic host configuration protocol"],
    definition:
      "A protocol that automatically assigns IP addresses to devices on your network.",
    detail:
      "When a device connects to your Wi-Fi, DHCP gives it a unique IP address, subnet mask, and gateway so it can communicate. If DHCP fails, your device may get a 169.254.x.x address and have no internet.",
    category: "protocol",
  },
  {
    term: "WPA3",
    aliases: ["WPA3"],
    definition:
      "The latest Wi-Fi security standard that protects your wireless network.",
    detail:
      "WPA3 improves on WPA2 with stronger encryption and protection against password-guessing attacks. Some older devices don't support WPA3, so many routers offer a WPA2/WPA3 mixed mode.",
    category: "protocol",
  },
  {
    term: "QoS",
    aliases: ["QoS", "quality of service"],
    definition:
      "A router feature that prioritizes certain types of network traffic.",
    detail:
      "QoS can give priority to gaming, video calls, or specific devices so they get bandwidth first, even when the network is busy. This reduces lag for time-sensitive applications.",
    category: "networking",
  },
  {
    term: "MoCA",
    aliases: ["MoCA"],
    definition:
      "Multimedia over Coax Alliance - a technology that sends network data over coaxial cable.",
    detail:
      "MoCA adapters let you create a wired network connection using the existing coaxial wiring in your home. It's a good alternative to Ethernet when running new cables isn't practical.",
    category: "connection",
  },
  {
    term: "Wi-Fi Extender",
    aliases: ["Wi-Fi extender", "wifi extender", "range extender"],
    definition:
      "A device that repeats your router's signal to extend coverage to distant areas.",
    detail:
      "Extenders rebroadcast the Wi-Fi signal, which extends range but typically halves bandwidth. For better performance, consider a mesh system instead, which uses dedicated backhaul channels.",
    category: "device",
    learnMore: "How do I set up a mesh Wi-Fi system to cover my whole home?",
  },
  {
    term: "Power Cycle",
    aliases: ["power cycle", "power cycling"],
    definition:
      "Fully turning off a device, waiting, and turning it back on to reset its state.",
    detail:
      "For modems and routers, unplug the power cable, wait at least 30 seconds, then plug back in. This clears temporary errors, refreshes the connection, and resolves many common issues.",
    category: "device",
  },
  {
    term: "Throughput",
    aliases: ["throughput"],
    definition:
      "The actual amount of data successfully transferred per second.",
    detail:
      "Throughput is your real-world speed, which is always lower than the theoretical maximum (bandwidth). Overhead from protocols, Wi-Fi contention, and network conditions all reduce throughput.",
    category: "metric",
  },
  {
    term: "MAC Address",
    aliases: ["MAC address", "MAC"],
    definition:
      "A unique hardware identifier assigned to every network device.",
    detail:
      "MAC addresses are 12-character codes (like A1:B2:C3:D4:E5:F6) burned into your device's network adapter. Routers use MAC addresses for filtering, reservations, and identifying connected devices.",
    category: "protocol",
  },
];

const CATEGORY_META: Record<
  Concept["category"],
  { label: string; color: string }
> = {
  networking: { label: "Networking", color: "bg-primary/10 text-primary" },
  device: { label: "Device", color: "bg-success/10 text-success" },
  connection: { label: "Connection", color: "bg-warning/10 text-warning" },
  metric: { label: "Metric", color: "bg-purple-100 text-purple-700" },
  protocol: { label: "Protocol", color: "bg-orange-100 text-orange-700" },
};

export function getCategoryMeta(category: Concept["category"]) {
  return CATEGORY_META[category];
}

interface MatchedConcept {
  concept: Concept;
  index: number;
  length: number;
  matchedText: string;
}

export function findConceptsInText(text: string): MatchedConcept[] {
  const matches: MatchedConcept[] = [];

  const allPatterns: { pattern: string; concept: Concept }[] = [];
  for (const concept of CONCEPTS) {
    for (const alias of concept.aliases) {
      allPatterns.push({ pattern: alias, concept });
    }
  }
  allPatterns.sort((a, b) => b.pattern.length - a.pattern.length);

  const used = new Set<number>();

  for (const { pattern, concept } of allPatterns) {
    const escaped = pattern.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "gi");
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      const start = match.index;
      const end = start + match[0].length;

      let overlaps = false;
      for (let i = start; i < end; i++) {
        if (used.has(i)) {
          overlaps = true;
          break;
        }
      }
      if (overlaps) continue;

      for (let i = start; i < end; i++) used.add(i);

      matches.push({
        concept,
        index: start,
        length: match[0].length,
        matchedText: match[0],
      });
    }
  }

  matches.sort((a, b) => a.index - b.index);
  return matches;
}
