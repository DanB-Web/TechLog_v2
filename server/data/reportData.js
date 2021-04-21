const reports = [
  {
    title: "Kystdesign Survey Output Decoder",
    user: null,
    company: null,
    tags: ["kystdesign", "survey", "serial"],
    shortDesc: "The Kystdesign systems have special software to output a serial survey string",
    longDesc: "The Kystdesign PXI broadcasts a UDP (similar to TCP) packet containing current vehicle position data (depth, heading etc) - the overlay decoder software converts this UDP packet to a serial (RS232) string for others to use (such as NaviPac)",
    steps: ["Load config", "Start software on PC", "Output from Port 1"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  },
  {
    title: "Long term preservation electro motor",
    user: null,
    company: null,
    tags: ["motor", "electrical", "hpu"],
    shortDesc: "Electro motors have to be tested and preserved annually",
    longDesc: "Looooooong description",
    steps: ["Empty residual oil", "Insulation test leads to chassis", "Refill with clean oil"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  },
  {
    title: "PXI Software Backup",
    user: null,
    company: null,
    tags: ["kystdesign", "pxi"],
    shortDesc: "Take a backup of the current PXI configuration",
    longDesc: "Part of the six monthly maintenance is to take a complete backup of the current PXI config for each system and send a zipped copy to the system admin",
    steps: ["Copy files", "Add to stick", "Send to sysAdmin"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  },
  {
    title: "Lost telemetry Schilling PDU",
    user: null,
    company: null,
    tags: ["schilling", "pdu", "plc"],
    shortDesc: "Comms failure to Schilling PDU from control stations",
    longDesc: "Lost comms to the Schilling PDU even though we had a network connection. Discovered we had to reset the PLC CPU by removing and reinstalling the external battery power",
    steps: ["Remove external battery connection", "Reconnect external battery connection"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  },
  {
    title: "Rexroth Pump Setup",
    user: null,
    company: null,
    tags: ["pump", "hydraulic", "hpu", "kystdesign", "rexroth"],
    shortDesc: "Initial set up of main / aux pump pressure",
    longDesc: "When changing the pump, you have to calibrate it to make sure it delivers the required system flow",
    steps: ["Remove previous pump", "Install new pump", "Set main pressure to 200bar"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  },
  {
    title: "PXI Software Backup",
    user: null,
    company: null,
    tags: ["kystdesign", "pxi"],
    shortDesc: "Take a backup of the current PXI configuration",
    longDesc: "Part of the six monthly maintenance is to take a complete backup of the current PXI config for each system and send a zipped copy to the system admin",
    steps: ["Copy files", "Add to stick", "Send to sysAdmin"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  },
  {
    title: "Long term preservation electro motor",
    user: null,
    company: null,
    tags: ["motor", "electrical", "hpu"],
    shortDesc: "Electro motors have to be tested and preserved annually",
    longDesc: "Looooooong description",
    steps: ["Empty residual oil", "Insulation test leads to chassis", "Refill with clean oil"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  },
  {
    title: "Rexroth Pump Setup",
    user: null,
    company: null,
    tags: ["pump", "hydraulic", "hpu", "kystdesign", "rexroth"],
    shortDesc: "Initial set up of main / aux pump pressure",
    longDesc: "When changing the pump, you have to calibrate it to make sure it delivers the required system flow",
    steps: ["Remove previous pump", "Install new pump", "Set main pressure to 200bar"],
    images: [],
    comments: [],
    approved: false,
    approvedBy: null
  }
]

export default reports;