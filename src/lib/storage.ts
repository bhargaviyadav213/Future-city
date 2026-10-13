import { FutureCityConcept, Project, ActivityItem, UserProfile } from '../types';

export const STORAGE_KEYS = {
  CONCEPTS: 'future_city_concepts_v1',
  PROJECTS: 'future_city_projects_v1',
  ACTIVITY: 'future_city_activity_v1',
  PROFILE: 'future_city_profile_v1',
  COMPARISONS: 'future_city_comparisons_v1',
  PREFERENCES: 'future_city_preferences_v1',
};

// Initial Architectural Seed Concepts
export const INITIAL_CONCEPTS: FutureCityConcept[] = [
  {
    id: 'concept-solarpunk-kyoto-2075',
    name: 'Neo-Kyoto Biomimetic Hub',
    tagline: 'Harmonizing sacred ecology with quantum energy grids',
    location: 'Kansai Valley, Japan',
    terrain: 'Alpine & River Basin',
    population: 1450000,
    landAreaSqKm: 180,
    targetYear: 2075,
    status: 'Completed',
    themes: ['Solarpunk Haven', 'Green City', 'Circular City'],
    developmentGoals: ['100% Closed-Loop Biomaterials', 'Zero Fossil Logistics', 'Ambient Elder Care', 'Urban Agroforestry'],
    overview: {
      summary: 'Neo-Kyoto reimagines traditional Japanese spatial philosophy (Machiya and Engawa) into super-insulated timber megastructures interwoven with vertical bioluminescent canopy forests and distributed geothermal energy.',
      corePhilosophy: 'Biophilic symbiosis: technology exists unseen to amplify natural ecological processes.',
      primaryInnovations: [
        'Genetically engineered moss air-scrubbing facades',
        'Kinetic pavement energy capture across pedestrian sanctuaries',
        'Decentralized autonomous neighborhood commons (Machiya-DAO)'
      ],
      climateStrategy: 'Zero-emission thermal chimneys paired with sub-river aquifer cooling loops, resilient to severe typhoons and heatwaves.'
    },
    infrastructure: {
      urbanTopology: 'Hexagonal terraced valley clusters linked via suspended timber sky-viaducts.',
      structuralMaterials: ['Engineered Cross-Laminated Timber (CLT)', 'Mycelium structural composites', 'Photovoltaic glass shingles'],
      skybridgeNetwork: 'Three-tiered aerial canopy bridges for light electric pods, bicycles, and pollinator corridors.',
      subterraneanSystems: 'Automated pneumatic waste distribution and subterranean autonomous freight conduits.',
      verticalZoning: ['Tier 1: Riverfront Wetland Commons', 'Tier 2: Civic & Commercial Arcades', 'Tier 3: Modular Living Cells & Sky Gardens']
    },
    energy: {
      primarySources: [
        { name: 'Micro-Hydro Valley Channels', percentage: 35, description: 'Run-of-the-river vortex turbines that protect aquatic biodiversity.' },
        { name: 'Perovskite Building Skins', percentage: 45, description: 'Every building surface generates electricity from sunlight and ambient indoor radiation.' },
        { name: 'Deep Geo-Thermal Wells', percentage: 20, description: 'Sub-volcanic closed-loop heat exchangers providing steady baseload.' }
      ],
      storageTechnology: 'Underground gravity flywheels and localized flow-battery neighborhood reservoirs.',
      gridResilience: 'Self-healing fractal microgrids capable of islanding within 4 milliseconds during seismic events.',
      annualOutputTWh: 8.4,
      cleanEnergyShare: 100
    },
    transportation: {
      modes: [
        { name: 'Aerogel Magnetic Pods', type: 'Maglev Light Rail', speedKmh: '180 km/h', description: 'Whisper-quiet magnetic capsules on elevated timber tracks.' },
        { name: 'Autonomous Water Barges', type: 'Zero-Emission River Transit', speedKmh: '25 km/h', description: 'Solar-electric freight and passenger barges across restored river arteries.' },
        { name: 'Canopy Cycleways', type: 'Active Mobility', speedKmh: '25 km/h', description: 'Weather-sheltered, tree-level bike and electric scooter freeways.' }
      ],
      congestionManagement: '100% private combustion vehicle ban; dynamic AI scheduling for shared pods with average wait time < 45 seconds.',
      pedestrianZonePercentage: 82,
      evTolNetwork: 'Restricted perimeter skyports with strict acoustic damping for inter-city regional medical evacuation.'
    },
    waterWaste: {
      waterGeneration: 'Condensation moisture catchers installed along mountain crests coupled with river sediment filtration.',
      closedLoopRecyclingRate: 98.4,
      wasteToEnergy: 'Enzymatic bioreactors decomposing organic matter into agricultural compost and biomethane.',
      stormwaterAndFloodDefense: 'Absorbent sponge-city soil buffers capable of absorbing 1,000mm/day rainfall events.'
    },
    healthcareEducationSafety: {
      healthcare: {
        triageSystem: 'Ambient biometrics monitor resting vitals with non-invasive home acoustic and optical sensors.',
        preventiveTech: 'Preventive cellular regeneration clinics embedded in every 5-minute neighborhood hub.',
        facilitiesCount: 48
      },
      education: {
        paradigm: 'Experiential apprentice guild system merging AI tutors with hands-on agroforestry and robotics craftsmanship.',
        lifelongLearningHubs: 'Decentralized open pavilions integrated directly into botanical conservatories.'
      },
      civicSafety: {
        emergencyResponseMinutes: 2.1,
        hazardMitigation: 'Seismic tuned mass dampers integrated as community meditation bells inside pagoda towers.',
        civicAiEthics: 'Open-source, locally hosted algorithmic consensus with complete civilian audit trails.'
      }
    },
    budgetApproximation: {
      currency: 'USD',
      totalCapexBillions: 142.5,
      annualOpexBillions: 3.8,
      sectorAllocations: [
        { sector: 'Renewable Energy & Microgrids', amountBillions: 38.5, percentage: 27, justification: 'Perovskite facade retrofit and deep geothermal boring.' },
        { sector: 'Timber Megastructures & Housing', amountBillions: 48.0, percentage: 34, justification: 'Sustainable forestry development and modular cross-laminated timber.' },
        { sector: 'Pneumatic & Maglev Transit', amountBillions: 26.0, percentage: 18, justification: 'Elevated timber guideways and autonomous pod rolling stock.' },
        { sector: 'Ecological Restoration & Water Systems', amountBillions: 19.5, percentage: 14, justification: 'River daylighting, wetlands, and mountain moisture capture.' },
        { sector: 'Civic AI & Distributed Healthcare', amountBillions: 10.5, percentage: 7, justification: 'Decentralized edge servers and community triage pavilions.' }
      ],
      fundingMechanism: ['Sovereign Green Transition Bonds', 'Ecological Impact Venture Concessions', 'Municipal Carbon Offset Royalties'],
      estimatedPaybackYears: 18,
      disclaimer: 'DISCLAIMER: All budget figures and economic models are AI-generated approximations created for conceptual urban feasibility studies. Actual capital expenditures require professional municipal engineering surveys.'
    },
    sustainabilityStrategy: {
      netZeroYear: 2060,
      carbonAbsorptionTonsYr: 420000,
      circularEconomyIndex: 96,
      biodiversityNetGainPercent: 145,
      climateRiskBuffer: 'Maximum Category 5 typhoon and 9.0 magnitude seismic survivability rating.'
    },
    phasedRoadmap: [
      {
        phaseNumber: 1,
        title: 'Ecological Restoration & Subterranean Spine',
        years: 'Years 1 - 5',
        focus: 'Geothermal boring, river daylighting, and pneumatic arterial conduits.',
        keyMilestones: ['Complete deep geothermal shafts', 'Establish 50 sq km protected agroforestry boundary', 'Deploy automated construction 3D printers'],
        estimatedCostBillions: 34.0
      },
      {
        phaseNumber: 2,
        title: 'Timber Framework & Transit Spine',
        years: 'Years 6 - 12',
        focus: 'Maglev canopy construction, modular CLT living rings, and micro-hydro cascades.',
        keyMilestones: ['Launch primary Maglev loop connecting 12 districts', 'Erect central Biomimetic Civic Spire', 'First 400,000 residents move in'],
        estimatedCostBillions: 56.5
      },
      {
        phaseNumber: 3,
        title: 'Full Circular Integration & Biome Colonization',
        years: 'Years 13 - 20',
        focus: '100% closed-loop waste transition, vertical farm saturation, and decentralized governance network.',
        keyMilestones: ['Attain 98% water recycling', 'Full roll-out of Machiya-DAO civic interface', 'Reach 1.45M population capacity'],
        estimatedCostBillions: 38.0
      },
      {
        phaseNumber: 4,
        title: 'Regional Maturation & Exportable Model',
        years: 'Years 21+',
        focus: 'Surplus clean energy export to national grid and carbon-negative steady state.',
        keyMilestones: ['Achieve net-negative carbon balance', 'Establish Global Biomimetic Urban Institute'],
        estimatedCostBillions: 14.0
      }
    ],
    spatialLayout: {
      mapStyle: 'hexagonal-cluster',
      urbanDiameterKm: 18.5,
      districts: [
        { id: 'node-1', name: 'Kansai Solar Spire & Civic Commons', type: 'civic', coordinates: { x: 50, y: 48 }, elevationMeters: 420, description: 'Central governance, cultural amphitheaters, and harmonic community bell towers.', capacityOrSize: '150,000 daily capacity', highlightMetric: '100% Timber Facade' },
        { id: 'node-2', name: 'Riverine Hydro Valley & Wetlands', type: 'nature', coordinates: { x: 28, y: 72 }, elevationMeters: 45, description: 'Daylighted river system with micro-vortex generators and public boardwalks.', capacityOrSize: '45 sq km wetland', highlightMetric: '+220% Biodiversity' },
        { id: 'node-3', name: 'East Timber Living Terraces', type: 'residential', coordinates: { x: 74, y: 35 }, elevationMeters: 180, description: 'Interlocking CLT residential neighborhoods with shared communal sky kitchens.', capacityOrSize: '480,000 citizens', highlightMetric: 'Zero Concrete' },
        { id: 'node-4', name: 'Deep Geo-Thermal Energy Bastion', type: 'energy', coordinates: { x: 22, y: 25 }, elevationMeters: 310, description: 'Subterranean volcanic heat recovery center and liquid-metal battery vaults.', capacityOrSize: '3.2 GW baseload', highlightMetric: '99.999% Uptime' },
        { id: 'node-5', name: 'North Maglev & eVTOL Nexus', type: 'transport', coordinates: { x: 52, y: 18 }, elevationMeters: 120, description: 'Multi-modal transit gateway linking regional supersonic lines to internal pods.', capacityOrSize: '25,000 p/hour throughput', highlightMetric: '<2 min transfers' },
        { id: 'node-6', name: 'Agroforestry & Molecular Biotech Spire', type: 'research', coordinates: { x: 80, y: 68 }, elevationMeters: 290, description: 'Vertical vertical crop towers, myco-materials development, and bio-scrubbers.', capacityOrSize: '12,000 researchers', highlightMetric: '4,000 tons/yr food' }
      ]
    },
    ecoScore: 97,
    innovationIndex: 94,
    livabilityRating: 98,
    resilienceScore: 95,
    generationModel: 'gemini-3.8-flash',
    createdAt: new Date(Date.now() - 3600000 * 24 * 3).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'concept-oceanic-aegis-2085',
    name: 'Aegis Oceanic Megapolis',
    tagline: 'Self-stabilizing pelagic metropolis with OTEC energy and desalted coral ecosystems',
    location: 'Pacific Equatorial Trench, International Waters',
    terrain: 'Floating Oceanic Platform',
    population: 850000,
    landAreaSqKm: 95,
    targetYear: 2085,
    status: 'Completed',
    themes: ['Floating City', 'Eco City', 'AI City'],
    developmentGoals: ['Ocean Thermal Energy Conversion (OTEC)', 'Artificial Coral Seeding', 'Storm-Proof Wave Attenuation', 'Universal Saltwater Agriculture'],
    overview: {
      summary: 'A modular, hexagonal floating city anchored to deep-ocean tether stations, designed to rise with ocean swell and thrive in open marine conditions.',
      corePhilosophy: 'Pelagic autonomy: harnessing oceanic thermal gradients, prevailing trade winds, and deep sea nutrients.',
      primaryInnovations: [
        'Dynamic submerged ballast stabilizers that neutralize wave roll',
        'Ocean Thermal Energy Conversion (OTEC) generating 24/7 baseload electricity and fresh water',
        'Submerged halophyte aquaculture spires providing complete caloric autonomy'
      ],
      climateStrategy: 'Autonomous floating breakwaters dampen extreme Category 5 hurricane waves by 85%.'
    },
    infrastructure: {
      urbanTopology: 'Flexible interlocking hexagonal pontoon modules with articulated elastomer shock joints.',
      structuralMaterials: ['Basalt-fiber reinforced geopolymers', 'Titanium marine alloys', 'Self-healing bio-concrete'],
      skybridgeNetwork: 'Aerodynamic high-speed catenary tubes linking floating district clusters.',
      subterraneanSystems: 'Deep submarine tether trunks descending 1,200m for cold water intake and structural anchoring.',
      verticalZoning: ['Atmospheric Level: Wind turbines & observation spires', 'Deck Level: Residential arcades & parks', 'Sub-Surface Level: Hyperbaric laboratories & kelp farms']
    },
    energy: {
      primarySources: [
        { name: 'Ocean Thermal Energy (OTEC)', percentage: 55, description: 'Exploits temperature difference between warm surface and 4°C deep ocean water.' },
        { name: 'Floating Offshore Vertical-Axis Wind', percentage: 30, description: 'Omni-directional marine turbines resistant to corrosive salt spray.' },
        { name: 'Wave Surge Resonators', percentage: 15, description: 'Subsurface articulated oscillating water column pistons.' }
      ],
      storageTechnology: 'Deep-ocean compressed air energy storage (CAES) at 100 atmospheres pressure.',
      gridResilience: 'Modular microgrids per hexagonal cell with autonomous disconnect during maintenance.',
      annualOutputTWh: 6.2,
      cleanEnergyShare: 100
    },
    transportation: {
      modes: [
        { name: 'Hydrofoil Autonomous Shuttles', type: 'Marine High-Speed', speedKmh: '90 km/h', description: 'Zero-wake electric hydrofoils connecting district rings.' },
        { name: 'Deck Autonomous Buggies', type: 'Micro-transit', speedKmh: '20 km/h', description: 'Small electric passenger buggies across covered pedestrian promenades.' },
        { name: 'Submerged Hyperloop Pods', type: 'Tubed Transit', speedKmh: '350 km/h', description: 'Neutral-buoyancy submerged tubes for fast inter-ring transit.' }
      ],
      congestionManagement: 'All surface transit is pedestrian or lightweight micro-mobility; heavy freight moves via submerged tube rails.',
      pedestrianZonePercentage: 90,
      evTolNetwork: 'Floating perimeter landing pads for regional oceanic flights.'
    },
    waterWaste: {
      waterGeneration: 'Condensation byproduct from OTEC flash evaporation delivers 450M liters of pristine water daily.',
      closedLoopRecyclingRate: 99.2,
      wasteToEnergy: 'Plasma pyrolysis converters decompose all solid city waste into syngas and vitreous mineral aggregate.',
      stormwaterAndFloodDefense: 'Perimeter active wave dampers with counter-phase ballast pumping.'
    },
    healthcareEducationSafety: {
      healthcare: {
        triageSystem: 'Hyperbaric wellness suites and automated telemedicine chambers in each residential node.',
        preventiveTech: 'Continuous marine bio-active aerosol therapy for respiratory vitality.',
        facilitiesCount: 32
      },
      education: {
        paradigm: 'Global Oceanic Institute focusing on marine biology, ocean climate restoration, and space colonization techniques.',
        lifelongLearningHubs: 'Submerged panoramic underwater lecture amphitheaters.'
      },
      civicSafety: {
        emergencyResponseMinutes: 1.8,
        hazardMitigation: 'Emergency dive capsules and compartmentalized buoyancy bulkheads capable of floating independently.',
        civicAiEthics: 'Maritime decentralized consensus charter registered under International Maritime Law.'
      }
    },
    budgetApproximation: {
      currency: 'USD',
      totalCapexBillions: 185.0,
      annualOpexBillions: 4.5,
      sectorAllocations: [
        { sector: 'Floating Platform & Ballast Engineering', amountBillions: 72.0, percentage: 39, justification: 'Basalt pontoon casting, dampeners, and deep ocean tethering.' },
        { sector: 'OTEC & Renewable Power Generation', amountBillions: 42.5, percentage: 23, justification: 'Deep cold-water pipes and heat exchanger infrastructure.' },
        { sector: 'Submerged Hyperloop & Hydrofoils', amountBillions: 28.0, percentage: 15, justification: 'Underwater tube conduits and electric hydrofoil fleet.' },
        { sector: 'Desalination & Marine Food Spires', amountBillions: 24.5, percentage: 13, justification: 'Deep kelp and spirulina vertical bioreactors.' },
        { sector: 'Civic Infrastructure & Life Support', amountBillions: 18.0, percentage: 10, justification: 'Autonomous safety systems, clinics, and education centers.' }
      ],
      fundingMechanism: ['Blue Economy Global Sovereign Wealth Funds', 'International Oceanographic Consortiums', 'Maritime Freedom Enterprise Bonds'],
      estimatedPaybackYears: 22,
      disclaimer: 'DISCLAIMER: All budget figures and economic models are AI-generated approximations created for conceptual urban feasibility studies. Actual capital expenditures require professional marine engineering surveys.'
    },
    sustainabilityStrategy: {
      netZeroYear: 2070,
      carbonAbsorptionTonsYr: 950000,
      circularEconomyIndex: 99,
      biodiversityNetGainPercent: 210,
      climateRiskBuffer: 'Immune to sea-level rise; certified against Category 5 cyclones and tsunamis in open ocean.'
    },
    phasedRoadmap: [
      {
        phaseNumber: 1,
        title: 'Deep Ocean Anchor & Core OTEC Hub',
        years: 'Years 1 - 4',
        focus: 'Deploying the central 1,200m cold-water pipe and primary power generator platform.',
        keyMilestones: ['Complete deep anchor tethering', 'Commission first 500MW OTEC circuit', 'Produce first 100M gallons of desalted water'],
        estimatedCostBillions: 48.0
      },
      {
        phaseNumber: 2,
        title: 'Hexagonal District Cluster Expansion',
        years: 'Years 5 - 10',
        focus: 'Fabricating and docking 48 residential and commercial floating hexagons.',
        keyMilestones: ['Establish internal submerged tube transit', 'Welcome first 250,000 ocean settlers', 'Integrate active wave dampeners'],
        estimatedCostBillions: 75.0
      },
      {
        phaseNumber: 3,
        title: 'Full Pelagic Autonomy',
        years: 'Years 11 - 16',
        focus: 'Achieving food, power, and water self-sufficiency through deep marine farming.',
        keyMilestones: ['Reach 850,000 population capacity', 'Deploy global marine research campus', 'Commence commercial green hydrogen export'],
        estimatedCostBillions: 44.0
      },
      {
        phaseNumber: 4,
        title: 'Networked Pelagic Federation',
        years: 'Years 17+',
        focus: 'Spawning auxiliary oceanic platform settlements across equatorial waters.',
        keyMilestones: ['Interconnect with 3 neighboring floating hubs', 'Attain total circularity certification'],
        estimatedCostBillions: 18.0
      }
    ],
    spatialLayout: {
      mapStyle: 'floating-modular',
      urbanDiameterKm: 12.0,
      districts: [
        { id: 'node-ocean-1', name: 'Central OTEC Energy Spire', type: 'energy', coordinates: { x: 50, y: 50 }, elevationMeters: 280, description: 'Core thermal power generation, desalination plant, and main harbor control.', capacityOrSize: '1.2 GW capacity', highlightMetric: 'Zero Carbon Baseload' },
        { id: 'node-ocean-2', name: 'Coral Genesis Atoll', type: 'nature', coordinates: { x: 30, y: 32 }, elevationMeters: 5, description: 'Bio-rock stimulated artificial coral reef and marine biodiversity sanctuary.', capacityOrSize: '18 sq km sanctuary', highlightMetric: '4,000+ Marine Species' },
        { id: 'node-ocean-3', name: 'North Living Ring', type: 'residential', coordinates: { x: 50, y: 20 }, elevationMeters: 65, description: 'Modular floating villas, rooftop hydroponics, and schools with sea views.', capacityOrSize: '320,000 residents', highlightMetric: '100% Sea-Facing' },
        { id: 'node-ocean-4', name: 'South Living Ring', type: 'residential', coordinates: { x: 50, y: 80 }, elevationMeters: 65, description: 'Family residential modules, botanical decks, and community cultural centers.', capacityOrSize: '350,000 residents', highlightMetric: 'Quiet Zero-Emission' },
        { id: 'node-ocean-5', name: 'Deep Sea Hydrofoil Port', type: 'transport', coordinates: { x: 80, y: 50 }, elevationMeters: 15, description: 'Subsurface hyperloop station and high-speed electric hydrofoil slips.', capacityOrSize: '40,000 passengers/day', highlightMetric: '90 km/h Clean Transit' },
        { id: 'node-ocean-6', name: 'Submerged Bio-Farm Spire', type: 'research', coordinates: { x: 20, y: 65 }, elevationMeters: -120, description: 'Vertical macro-algae, spirulina, and halophyte vertical agriculture down to -120m.', capacityOrSize: '65,000 tons food/yr', highlightMetric: 'Negative Freshwater Footprint' }
      ]
    },
    ecoScore: 99,
    innovationIndex: 98,
    livabilityRating: 92,
    resilienceScore: 96,
    generationModel: 'gemini-3.8-flash',
    createdAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Post-Carbon Megacities 2075',
    description: 'Explorations in biophilic architecture, zero-fossil logistics, and circular metabolism for metropolitan regions.',
    tags: ['Solarpunk', 'Biomimicry', 'Decarbonization'],
    status: 'Active',
    conceptCount: 1,
    createdAt: new Date(Date.now() - 3600000 * 24 * 10).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString()
  },
  {
    id: 'proj-2',
    title: 'Pelagic & Oceanic Habitats',
    description: 'Resilient oceanic floating infrastructure responding to sea-level shifts and deep sea resource stewardship.',
    tags: ['Floating Cities', 'OTEC', 'Marine Habitats'],
    status: 'Active',
    conceptCount: 1,
    createdAt: new Date(Date.now() - 3600000 * 24 * 14).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString()
  }
];

export const INITIAL_ACTIVITY: ActivityItem[] = [
  {
    id: 'act-1',
    conceptId: 'concept-solarpunk-kyoto-2075',
    actionType: 'generate',
    title: 'Generated Concept: Neo-Kyoto Biomimetic Hub',
    details: 'Structured multi-domain urban synthesis saved in local storage.',
    timestamp: new Date(Date.now() - 3600000 * 4).toISOString()
  },
  {
    id: 'act-2',
    conceptId: 'concept-oceanic-aegis-2085',
    actionType: 'export',
    title: 'Exported Concept Blueprint: Aegis Oceanic Megapolis',
    details: 'Exported comprehensive urban planning brief in PDF and JSON formats.',
    timestamp: new Date(Date.now() - 3600000 * 12).toISOString()
  }
];

// Helper safe JSON parse
function safeGet<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch (e) {
    console.warn(`Failed to read localStorage key: ${key}`, e);
    return fallback;
  }
}

function safeSet<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to write to localStorage key: ${key}`, e);
  }
}

// ----------------------------------------------------
// CONCEPTS STORAGE API
// ----------------------------------------------------
export function getStoredConcepts(): FutureCityConcept[] {
  const existing = safeGet<FutureCityConcept[] | null>(STORAGE_KEYS.CONCEPTS, null);
  if (!existing || !Array.isArray(existing) || existing.length === 0) {
    // Initialize with default seeds
    safeSet(STORAGE_KEYS.CONCEPTS, INITIAL_CONCEPTS);
    return INITIAL_CONCEPTS;
  }
  return existing;
}

export function saveStoredConcepts(concepts: FutureCityConcept[]): void {
  safeSet(STORAGE_KEYS.CONCEPTS, concepts);
}

export function addStoredConcept(concept: FutureCityConcept): void {
  const current = getStoredConcepts();
  const updated = [concept, ...current.filter((c) => c.id !== concept.id)];
  saveStoredConcepts(updated);
  addStoredActivity({
    conceptId: concept.id,
    actionType: 'create',
    title: `Created Concept: ${concept.name}`,
    details: `Added new futuristic city blueprint for target year ${concept.targetYear}.`,
  });
}

export function updateStoredConcept(concept: FutureCityConcept): void {
  const current = getStoredConcepts();
  const updated = current.map((c) => (c.id === concept.id ? { ...concept, updatedAt: new Date().toISOString() } : c));
  saveStoredConcepts(updated);
  addStoredActivity({
    conceptId: concept.id,
    actionType: 'update',
    title: `Updated Concept: ${concept.name}`,
    details: `Modified specifications and architectural metrics.`,
  });
}

export function deleteStoredConcept(id: string): void {
  const current = getStoredConcepts();
  const target = current.find((c) => c.id === id);
  const updated = current.filter((c) => c.id !== id);
  saveStoredConcepts(updated);
  if (target) {
    addStoredActivity({
      conceptId: id,
      actionType: 'delete',
      title: `Deleted Concept: ${target.name}`,
      details: `Removed from local storage.`,
    });
  }
}

// ----------------------------------------------------
// PROJECTS STORAGE API
// ----------------------------------------------------
export function getStoredProjects(): Project[] {
  const existing = safeGet<Project[] | null>(STORAGE_KEYS.PROJECTS, null);
  if (!existing || !Array.isArray(existing) || existing.length === 0) {
    safeSet(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
    return INITIAL_PROJECTS;
  }
  return existing;
}

export function saveStoredProjects(projects: Project[]): void {
  safeSet(STORAGE_KEYS.PROJECTS, projects);
}

export function addStoredProject(project: Project): void {
  const current = getStoredProjects();
  const updated = [project, ...current];
  saveStoredProjects(updated);
}

export function deleteStoredProject(id: string): void {
  const current = getStoredProjects();
  const updated = current.filter((p) => p.id !== id);
  saveStoredProjects(updated);
}

// ----------------------------------------------------
// ACTIVITY LOG STORAGE API
// ----------------------------------------------------
export function getStoredActivity(): ActivityItem[] {
  const existing = safeGet<ActivityItem[] | null>(STORAGE_KEYS.ACTIVITY, null);
  if (!existing || !Array.isArray(existing) || existing.length === 0) {
    safeSet(STORAGE_KEYS.ACTIVITY, INITIAL_ACTIVITY);
    return INITIAL_ACTIVITY;
  }
  return existing;
}

export function addStoredActivity(item: Omit<ActivityItem, 'id' | 'timestamp'>): void {
  const current = getStoredActivity();
  const newItem: ActivityItem = {
    ...item,
    id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
  };
  const updated = [newItem, ...current].slice(0, 50); // keep recent 50
  safeSet(STORAGE_KEYS.ACTIVITY, updated);
}

// ----------------------------------------------------
// USER PROFILE & PREFERENCES API
// ----------------------------------------------------
export function getStoredProfile(): UserProfile {
  return safeGet<UserProfile>(STORAGE_KEYS.PROFILE, {
    id: 'user-local-1',
    email: 'planner@futurecity.local',
    fullName: 'Alex Vance',
    role: 'Urban Planner',
  });
}

export function saveStoredProfile(profile: UserProfile): void {
  safeSet(STORAGE_KEYS.PROFILE, profile);
}

// ----------------------------------------------------
// COMPARISON IDS API
// ----------------------------------------------------
export function getStoredComparisonIds(): string[] {
  return safeGet<string[]>(STORAGE_KEYS.COMPARISONS, []);
}

export function saveStoredComparisonIds(ids: string[]): void {
  safeSet(STORAGE_KEYS.COMPARISONS, ids);
}

// ----------------------------------------------------
// UTILITIES: RESET, BACKUP, STATS
// ----------------------------------------------------
export function resetToDefaultSeeds(): {
  concepts: FutureCityConcept[];
  projects: Project[];
  activities: ActivityItem[];
} {
  safeSet(STORAGE_KEYS.CONCEPTS, INITIAL_CONCEPTS);
  safeSet(STORAGE_KEYS.PROJECTS, INITIAL_PROJECTS);
  safeSet(STORAGE_KEYS.ACTIVITY, INITIAL_ACTIVITY);
  safeSet(STORAGE_KEYS.COMPARISONS, []);
  return {
    concepts: INITIAL_CONCEPTS,
    projects: INITIAL_PROJECTS,
    activities: INITIAL_ACTIVITY,
  };
}

export function exportFullBackup(): string {
  const data = {
    version: '1.0',
    exportedAt: new Date().toISOString(),
    concepts: getStoredConcepts(),
    projects: getStoredProjects(),
    activity: getStoredActivity(),
    profile: getStoredProfile(),
  };
  return JSON.stringify(data, null, 2);
}

export function importFullBackup(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.concepts && Array.isArray(data.concepts)) {
      saveStoredConcepts(data.concepts);
    }
    if (data.projects && Array.isArray(data.projects)) {
      saveStoredProjects(data.projects);
    }
    if (data.activity && Array.isArray(data.activity)) {
      safeSet(STORAGE_KEYS.ACTIVITY, data.activity);
    }
    if (data.profile) {
      saveStoredProfile(data.profile);
    }
    return true;
  } catch (e) {
    console.error('Invalid backup JSON:', e);
    return false;
  }
}

export function getStorageStats() {
  if (typeof window === 'undefined') return { totalKb: 0, conceptsCount: 0 };
  let totalChars = 0;
  for (const key of Object.values(STORAGE_KEYS)) {
    const val = localStorage.getItem(key);
    if (val) totalChars += val.length;
  }
  return {
    totalKb: (totalChars * 2 / 1024).toFixed(1), // approx UTF-16 in KB
    conceptsCount: getStoredConcepts().length,
    projectsCount: getStoredProjects().length,
  };
}
