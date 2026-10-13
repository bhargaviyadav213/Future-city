import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import { FutureCityConcept, CityGenerateInput } from './src/types/index.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '10mb' }));

// Initial Gemini AI setup
const apiKey = process.env.GEMINI_API_KEY;
const ai = apiKey
  ? new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    })
  : null;

// Initial Mock / Seed Data
const sampleConcepts: FutureCityConcept[] = [
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
      subterraneanSystems: 'Automated pneumatic pneumatic waste distribution and subterranean autonomous freight conduits.',
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

let conceptsStore: FutureCityConcept[] = [...sampleConcepts];

let projectsStore = [
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

let activityStore = [
  {
    id: 'act-1',
    conceptId: 'concept-solarpunk-kyoto-2075',
    actionType: 'generate',
    title: 'Generated Concept: Neo-Kyoto Biomimetic Hub',
    details: 'Gemini 3.8 Flash structured multi-domain generation with spatial layout and budget approximations.',
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

// Helper fallback generator if Gemini API key is missing or quota limited
function generateFallbackConcept(input: CityGenerateInput): FutureCityConcept {
  const population = Number(input.population) || 750000;
  const landArea = Number(input.landAreaSqKm) || 120;
  const targetYear = Number(input.targetYear) || 2075;
  const budget = Number(input.budgetTargetBillions) || Math.round(population * 0.00012);
  const primaryTheme = input.themes[0] || 'Smart City';

  const conceptId = `concept-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const cleanEnergyPercent = Math.min(100, Math.max(90, Math.floor(92 + Math.random() * 8)));

  return {
    id: conceptId,
    projectId: input.projectId,
    name: input.cityName || 'Aethelgard Prime',
    tagline: `Next-generation ${primaryTheme.toLowerCase()} engineered for hyper-resilient living in ${targetYear}.`,
    location: input.location || 'Global Equatorial Corridor',
    terrain: input.terrain || 'Coastal & Delta',
    population,
    landAreaSqKm: landArea,
    targetYear,
    status: 'Completed',
    themes: input.themes.length > 0 ? input.themes : ['Smart City', 'Green City', 'AI City'],
    developmentGoals: input.developmentGoals.length > 0 ? input.developmentGoals : [
      '100% Clean Energy Grid',
      'Circular Materials Lifecycle',
      'Sub-3-Minute Emergency Triage',
      'Autonomous Low-Emissions Transit'
    ],
    overview: {
      summary: `${input.cityName} represents a breakthrough urban prototype in ${input.location}, uniting ${primaryTheme.toLowerCase()} architectural paradigms with adaptive machine intelligence, hyper-efficient circular resource streams, and climate-positive regenerative planning.`,
      corePhilosophy: 'Adaptive urban equilibrium: infrastructure synchronizes with human vitality and environmental restoration.',
      primaryInnovations: [
        'Distributed quantum sensor mesh optimizing microclimates and energy routing in real-time',
        'Self-healing geopolymer composite superstructures with embedded carbon-capture minerals',
        'Autonomous underground logistics and pneumatic pneumatic material redistribution'
      ],
      climateStrategy: `Comprehensive defense against extreme regional weather risks characteristic of ${input.terrain}, incorporating multi-layer redundancy and flood/storm absorption biomes.`
    },
    infrastructure: {
      urbanTopology: 'Modular concentric cluster nodes interconnected through elevated sky-viaducts and subterranean high-speed arteries.',
      structuralMaterials: ['Basalt-fiber reinforced geopolymers', 'Cross-laminated timber composites', 'Photovoltaic aerogel insulation'],
      skybridgeNetwork: 'Three-dimensional pedestrian and micro-mobility skywalk network linking towers every 10 floors.',
      subterraneanSystems: 'Deep utility subterranean tunnels housing automated waste logistics, greywater recycling, and emergency shelters.',
      verticalZoning: [
        'Ground Level: Public parks, stormwater sponges, and pedestrian marketplaces',
        'Mid Level: High-density modular living units and civic learning pods',
        'Upper Level: Aeroponic farms, solar sky-roofs, and micro-wind harvesting crowns'
      ]
    },
    energy: {
      primarySources: [
        { name: 'Perovskite Photovoltaic Skin', percentage: 40, description: 'High-efficiency nano-coatings on all vertical and horizontal surfaces.' },
        { name: 'Modular Clean Baseload (Fusion / Deep Geothermal)', percentage: 35, description: 'Zero-emission stable baseload generation ensuring 24/7 reliability.' },
        { name: 'Kinetic & Micro-Turbine Capture', percentage: 25, description: 'Captures kinetic footfall and convective wind tunnels within architectural canyons.' }
      ],
      storageTechnology: 'Underground compressed-air thermal reservoirs and solid-state distributed battery banks.',
      gridResilience: 'Autonomous self-healing microgrids with zero-interruption islanding capability.',
      annualOutputTWh: Number((population * 0.000005 + 2.5).toFixed(1)),
      cleanEnergyShare: cleanEnergyPercent
    },
    transportation: {
      modes: [
        { name: 'Autonomous Maglev Transit', type: 'Rapid Rail', speedKmh: '220 km/h', description: 'Zero-friction elevated pods linking all primary districts.' },
        { name: 'Pedestrian Sky-Canopies', type: 'Active Mobility', speedKmh: '15 km/h', description: 'Climate-controlled, tree-lined walking and e-bike paths.' },
        { name: 'Automated Electric Cargo Tubes', type: 'Freight', speedKmh: '120 km/h', description: 'Underground pneumatic freight systems that eliminate heavy trucks from street level.' }
      ],
      congestionManagement: 'Zero private combustion vehicles. AI-dispatched autonomous electric pods ensure average pickup times under 60 seconds.',
      pedestrianZonePercentage: 88,
      evTolNetwork: 'Automated regional air-ambulance and cargo vertiports located at perimeter transit hubs.'
    },
    waterWaste: {
      waterGeneration: 'Atmospheric water harvesting arrays combined with advanced nanofiltration and aquifer recharge.',
      closedLoopRecyclingRate: 97.8,
      wasteToEnergy: 'Plasma gasification turning non-recyclable solid waste into clean syngas and inert construction aggregate.',
      stormwaterAndFloodDefense: 'Sponge city swales, permeable pavers, and deep underground storm overflow detention cisterns.'
    },
    healthcareEducationSafety: {
      healthcare: {
        triageSystem: 'Continuous ambient non-invasive biometrics with predictive health anomaly warnings.',
        preventiveTech: 'Neighborhood cellular wellness clinics and robotic rapid-response paramedic drones.',
        facilitiesCount: Math.max(12, Math.round(population / 30000))
      },
      education: {
        paradigm: 'AI-personalized adaptive learning hubs integrated directly into municipal research laboratories.',
        lifelongLearningHubs: 'Decentralized public learning pavilions in every 10-minute neighborhood.'
      },
      civicSafety: {
        emergencyResponseMinutes: 1.9,
        hazardMitigation: 'Active seismic dampers, fireproof exterior skins, and automated flood barriers.',
        civicAiEthics: 'Privacy-first, zero-surveillance cryptographic data enclaves ensuring citizen autonomy.'
      }
    },
    budgetApproximation: {
      currency: 'USD',
      totalCapexBillions: budget,
      annualOpexBillions: Number((budget * 0.028).toFixed(1)),
      sectorAllocations: [
        { sector: 'Energy & Power Infrastructure', amountBillions: Number((budget * 0.28).toFixed(1)), percentage: 28, justification: 'Perovskite installation and clean baseload reactor boring.' },
        { sector: 'Transit & Mobility Networks', amountBillions: Number((budget * 0.24).toFixed(1)), percentage: 24, justification: 'Maglev guideways, subterranean cargo tubes, and autonomous fleet.' },
        { sector: 'Modular Architecture & Housing', amountBillions: Number((budget * 0.26).toFixed(1)), percentage: 26, justification: 'Geopolymer composite construction and civic sky-parks.' },
        { sector: 'Water, Waste & Circular Systems', amountBillions: Number((budget * 0.14).toFixed(1)), percentage: 14, justification: 'Closed-loop plasma converters and sponge infrastructure.' },
        { sector: 'Civic AI & Healthcare Hubs', amountBillions: Number((budget * 0.08).toFixed(1)), percentage: 8, justification: 'Decentralized compute grids and preventive care clinics.' }
      ],
      fundingMechanism: ['Green Municipal Transition Bonds', 'Global Tech & Sustainability Consortiums', 'Carbon Credit Export Royalties'],
      estimatedPaybackYears: 19,
      disclaimer: 'DISCLAIMER: All budget figures and economic models are AI-generated approximations created for conceptual urban feasibility studies. Actual capital expenditures require professional municipal engineering surveys.'
    },
    sustainabilityStrategy: {
      netZeroYear: Math.min(targetYear - 5, 2065),
      carbonAbsorptionTonsYr: Math.round(population * 0.35 * 1000),
      circularEconomyIndex: 94,
      biodiversityNetGainPercent: 120,
      climateRiskBuffer: 'Engineered to withstand 100-year storm and heat anomalies with zero structural downtime.'
    },
    phasedRoadmap: [
      {
        phaseNumber: 1,
        title: 'Geotechnical Foundation & Underground Spine',
        years: 'Years 1 - 4',
        focus: 'Subterranean tunnels, deep energy boring, water cisterns, and autonomous fabrication staging.',
        keyMilestones: ['Complete primary subterranean conduits', 'Establish 100% clean power substation', 'Begin 3D printing of structural foundations'],
        estimatedCostBillions: Number((budget * 0.25).toFixed(1))
      },
      {
        phaseNumber: 2,
        title: 'Core Urban Towers & Maglev Artery',
        years: 'Years 5 - 10',
        focus: 'Erecting central civic spires, launching initial maglev lines, and onboarding first 30% residents.',
        keyMilestones: ['Commission primary Maglev ring', 'Complete Central Civic Agora', 'Inaugurate first water reclamation facility'],
        estimatedCostBillions: Number((budget * 0.42).toFixed(1))
      },
      {
        phaseNumber: 3,
        title: 'Modular Expansion & Circular Saturation',
        years: 'Years 11 - 18',
        focus: 'Deploying skybridge networks, expanding neighborhood living clusters, and achieving 95%+ recycling.',
        keyMilestones: ['Integrate all residential zones', 'Reach target population density', 'Activate full AI grid balancing'],
        estimatedCostBillions: Number((budget * 0.25).toFixed(1))
      },
      {
        phaseNumber: 4,
        title: 'Steady-State Maturation & Regional Export',
        years: 'Years 19+',
        focus: 'Net-negative carbon export, ecological canopy maturation, and continuous modular upgrades.',
        keyMilestones: ['Attain net-negative carbon balance', 'Export excess clean energy to neighboring regions'],
        estimatedCostBillions: Number((budget * 0.08).toFixed(1))
      }
    ],
    spatialLayout: {
      mapStyle: 'radial',
      urbanDiameterKm: Number(Math.sqrt((landArea * 4) / Math.PI).toFixed(1)),
      districts: [
        { id: `node-${Date.now()}-1`, name: `${input.cityName} Central Agora`, type: 'civic', coordinates: { x: 50, y: 50 }, elevationMeters: 380, description: 'Core civic governance, public amphitheater, and community cultural spire.', capacityOrSize: '120,000 capacity', highlightMetric: '100% Pedestrian' },
        { id: `node-${Date.now()}-2`, name: 'Clean Energy & Grid Nexus', type: 'energy', coordinates: { x: 25, y: 30 }, elevationMeters: 80, description: 'Clean baseload power conditioning, flow batteries, and microgrid routing center.', capacityOrSize: '2.5 GW output', highlightMetric: 'Zero Emissions' },
        { id: `node-${Date.now()}-3`, name: 'Transit & Logistics Core', type: 'transport', coordinates: { x: 75, y: 30 }, elevationMeters: 45, description: 'Central maglev junction, automated cargo distribution center, and skyport.', capacityOrSize: '50,000 trips/hr', highlightMetric: '<45s wait time' },
        { id: `node-${Date.now()}-4`, name: 'Bio-Sponge Park & Wetlands', type: 'nature', coordinates: { x: 30, y: 75 }, elevationMeters: 10, description: 'Continuous ecological parkland absorbing stormwater and cooling the city.', capacityOrSize: '35 sq km area', highlightMetric: '+140% Biodiversity' },
        { id: `node-${Date.now()}-5`, name: 'Terraced Modular Living Ring', type: 'residential', coordinates: { x: 70, y: 75 }, elevationMeters: 150, description: 'Interlocking residential towers with sky gardens and neighborhood daycare hubs.', capacityOrSize: `${Math.round(population * 0.6).toLocaleString()} residents`, highlightMetric: 'Biophilic Living' },
        { id: `node-${Date.now()}-6`, name: 'Quantum Innovation & Agro-Tech Spire', type: 'research', coordinates: { x: 50, y: 88 }, elevationMeters: 290, description: 'Vertical farms, material science laboratories, and open civic AI think tanks.', capacityOrSize: '25,000 research staff', highlightMetric: 'Closed-loop R&D' }
      ]
    },
    ecoScore: Math.floor(88 + Math.random() * 10),
    innovationIndex: Math.floor(90 + Math.random() * 9),
    livabilityRating: Math.floor(87 + Math.random() * 11),
    resilienceScore: Math.floor(89 + Math.random() * 9),
    generationModel: 'gemini-3.8-flash (Simulated Engine)',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
}

// ----------------------------------------------------
// REST API ROUTES
// ----------------------------------------------------

// System Status and Credentials Verification
app.get('/api/status', (req: Request, res: Response) => {
  const hasGeminiKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'MY_GEMINI_API_KEY');
  const hasSupabaseUrl = Boolean(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
  const hasSupabaseKey = Boolean(process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY);

  res.json({
    status: 'online',
    version: '1.0.0',
    gemini: {
      active: hasGeminiKey,
      model: 'gemini-3.8-flash',
      mode: hasGeminiKey ? 'live' : 'fallback-simulation'
    },
    supabase: {
      configured: hasSupabaseUrl && hasSupabaseKey,
      urlConfigured: hasSupabaseUrl,
      mode: hasSupabaseUrl && hasSupabaseKey ? 'cloud' : 'local-persistent'
    },
    stats: {
      totalConcepts: conceptsStore.length,
      totalProjects: projectsStore.length,
      recentActivityCount: activityStore.length
    }
  });
});

// Concepts List
app.get('/api/concepts', (req: Request, res: Response) => {
  const { status, theme, search, projectId } = req.query;
  let filtered = [...conceptsStore];

  if (projectId) {
    filtered = filtered.filter(c => c.projectId === projectId);
  }
  if (status && status !== 'all') {
    filtered = filtered.filter(c => c.status.toLowerCase() === (status as string).toLowerCase());
  }
  if (theme && theme !== 'all') {
    filtered = filtered.filter(c => c.themes.some(t => t.toLowerCase() === (theme as string).toLowerCase()));
  }
  if (search) {
    const q = (search as string).toLowerCase();
    filtered = filtered.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.location.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q)
    );
  }

  res.json({
    success: true,
    count: filtered.length,
    data: filtered
  });
});

// Single Concept Get
app.get('/api/concepts/:id', (req: Request, res: Response) => {
  const concept = conceptsStore.find(c => c.id === req.params.id);
  if (!concept) {
    res.status(404).json({ success: false, error: 'Concept not found' });
    return;
  }
  res.json({ success: true, data: concept });
});

// Create Concept Manually
app.post('/api/concepts', (req: Request, res: Response) => {
  const newConcept: FutureCityConcept = {
    ...req.body,
    id: req.body.id || `concept-${Date.now()}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  conceptsStore.unshift(newConcept);
  activityStore.unshift({
    id: `act-${Date.now()}`,
    conceptId: newConcept.id,
    actionType: 'create',
    title: `Created Concept: ${newConcept.name}`,
    details: `Added new city concept with target year ${newConcept.targetYear}.`,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({ success: true, data: newConcept });
});

// Update Concept
app.put('/api/concepts/:id', (req: Request, res: Response) => {
  const index = conceptsStore.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Concept not found' });
    return;
  }

  conceptsStore[index] = {
    ...conceptsStore[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  activityStore.unshift({
    id: `act-${Date.now()}`,
    conceptId: req.params.id,
    actionType: 'update',
    title: `Updated Concept: ${conceptsStore[index].name}`,
    details: 'Modified specifications and project details.',
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, data: conceptsStore[index] });
});

// Delete Concept
app.delete('/api/concepts/:id', (req: Request, res: Response) => {
  const index = conceptsStore.findIndex(c => c.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Concept not found' });
    return;
  }

  const deleted = conceptsStore.splice(index, 1)[0];
  activityStore.unshift({
    id: `act-${Date.now()}`,
    conceptId: deleted.id,
    actionType: 'delete',
    title: `Deleted Concept: ${deleted.name}`,
    details: 'Removed from local database.',
    timestamp: new Date().toISOString()
  });

  res.json({ success: true, data: deleted });
});

// Projects CRUD
app.get('/api/projects', (req: Request, res: Response) => {
  const projectsWithCounts = projectsStore.map(p => ({
    ...p,
    conceptCount: conceptsStore.filter(c => c.projectId === p.id).length
  }));
  res.json({ success: true, data: projectsWithCounts });
});

app.post('/api/projects', (req: Request, res: Response) => {
  const newProj = {
    id: `proj-${Date.now()}`,
    title: req.body.title || 'Untitled Project',
    description: req.body.description || '',
    tags: req.body.tags || [],
    status: req.body.status || 'Active',
    conceptCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  projectsStore.unshift(newProj);
  res.status(201).json({ success: true, data: newProj });
});

app.delete('/api/projects/:id', (req: Request, res: Response) => {
  const index = projectsStore.findIndex(p => p.id === req.params.id);
  if (index === -1) {
    res.status(404).json({ success: false, error: 'Project not found' });
    return;
  }
  const deleted = projectsStore.splice(index, 1)[0];
  res.json({ success: true, data: deleted });
});

// Activity Stream
app.get('/api/activity', (req: Request, res: Response) => {
  res.json({ success: true, data: activityStore.slice(0, 30) });
});

// Reset / Seed Data
app.post('/api/reset-data', (req: Request, res: Response) => {
  conceptsStore = [...sampleConcepts];
  res.json({ success: true, message: 'Sample concepts restored successfully' });
});

// ----------------------------------------------------
// GEMINI SERVER-SIDE GENERATION ENDPOINT
// ----------------------------------------------------
app.post('/api/generate-concept', async (req: Request, res: Response) => {
  const input: CityGenerateInput = req.body;

  if (!input.cityName || !input.location) {
    res.status(400).json({ success: false, error: 'City name and location are required.' });
    return;
  }

  // If Gemini API is available and key is configured, invoke gemini-3.8-flash
  if (ai && apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
    try {
      const prompt = `You are a world-leading futuristic urban planner, architect, and sustainability scientist.
Generate an extensive, highly innovative, and rigorous future city concept blueprint based on the following parameters:
- City Name: ${input.cityName}
- Location: ${input.location}
- Terrain / Context: ${input.terrain}
- Target Population: ${input.population}
- Land Area (sq km): ${input.landAreaSqKm}
- Target Year: ${input.targetYear}
- Projected Budget (Billions USD): ${input.budgetTargetBillions || 'Calculate optimal'}
- Themes: ${input.themes.join(', ')}
- Urban Development Goals: ${input.developmentGoals.join(', ')}
- Special Requirements: ${input.specialRequirements || 'None specified'}

Output ONLY valid, pristine JSON conforming precisely to this schema structure (no code fences, no extra text):
{
  "name": "${input.cityName}",
  "tagline": "A compelling, visionary 1-sentence tagline",
  "location": "${input.location}",
  "terrain": "${input.terrain}",
  "population": ${input.population},
  "landAreaSqKm": ${input.landAreaSqKm},
  "targetYear": ${input.targetYear},
  "status": "Completed",
  "themes": ${JSON.stringify(input.themes)},
  "developmentGoals": ${JSON.stringify(input.developmentGoals)},
  "overview": {
    "summary": "Detailed 2-3 paragraph visionary summary of the city",
    "corePhilosophy": "Guiding architectural and ecological philosophy",
    "primaryInnovations": ["Innovation 1", "Innovation 2", "Innovation 3"],
    "climateStrategy": "Detailed climate adaptation and hazard mitigation strategy"
  },
  "infrastructure": {
    "urbanTopology": "Spatial form (e.g. Hexagonal, Terraced Ring, Linear)",
    "structuralMaterials": ["Material 1", "Material 2", "Material 3"],
    "skybridgeNetwork": "Pedestrian and pod skybridges description",
    "subterraneanSystems": "Subterranean conduits, automated logistics, and utilities",
    "verticalZoning": ["Zone 1", "Zone 2", "Zone 3"]
  },
  "energy": {
    "primarySources": [
      {"name": "Source 1", "percentage": 45, "description": "Specific tech details"},
      {"name": "Source 2", "percentage": 35, "description": "Specific tech details"},
      {"name": "Source 3", "percentage": 20, "description": "Specific tech details"}
    ],
    "storageTechnology": "Battery / kinetic / compressed storage details",
    "gridResilience": "Microgrid routing and failure mitigation",
    "annualOutputTWh": 7.5,
    "cleanEnergyShare": 100
  },
  "transportation": {
    "modes": [
      {"name": "Mode 1", "type": "Rail/Pod/Aero", "speedKmh": "150 km/h", "description": "Details"},
      {"name": "Mode 2", "type": "Micro-mobility", "speedKmh": "25 km/h", "description": "Details"},
      {"name": "Mode 3", "type": "Freight", "speedKmh": "80 km/h", "description": "Details"}
    ],
    "congestionManagement": "AI dispatch and private car policy",
    "pedestrianZonePercentage": 85,
    "evTolNetwork": "Vertiports and eVTOL airspace policy"
  },
  "waterWaste": {
    "waterGeneration": "Desalination, atmospheric harvesting, or closed water loop",
    "closedLoopRecyclingRate": 98.5,
    "wasteToEnergy": "Plasma pyrolysis or biochemical reactors",
    "stormwaterAndFloodDefense": "Sponge infrastructure and flood mitigation"
  },
  "healthcareEducationSafety": {
    "healthcare": {
      "triageSystem": "Continuous non-invasive home ambient monitoring",
      "preventiveTech": "Cellular repair clinics and robotic paramedics",
      "facilitiesCount": 35
    },
    "education": {
      "paradigm": "Adaptive experiential AI academies",
      "lifelongLearningHubs": "Civic learning pavilions"
    },
    "civicSafety": {
      "emergencyResponseMinutes": 2.0,
      "hazardMitigation": "Seismic dampers and fireproof facades",
      "civicAiEthics": "Decentralized privacy-preserving data policy"
    }
  },
  "budgetApproximation": {
    "currency": "USD",
    "totalCapexBillions": 120.0,
    "annualOpexBillions": 3.5,
    "sectorAllocations": [
      {"sector": "Energy & Power", "amountBillions": 35.0, "percentage": 29, "justification": "Why this allocation"},
      {"sector": "Transit & Mobility", "amountBillions": 28.0, "percentage": 23, "justification": "Why this allocation"},
      {"sector": "Housing & Architecture", "amountBillions": 32.0, "percentage": 27, "justification": "Why this allocation"},
      {"sector": "Water & Circular Waste", "amountBillions": 15.0, "percentage": 13, "justification": "Why this allocation"},
      {"sector": "Civic Tech & Healthcare", "amountBillions": 10.0, "percentage": 8, "justification": "Why this allocation"}
    ],
    "fundingMechanism": ["Green Bonds", "Sovereign Funds", "Private-Public Partnerships"],
    "estimatedPaybackYears": 17,
    "disclaimer": "DISCLAIMER: All budget figures and economic models are AI-generated approximations created for conceptual urban feasibility studies. Actual capital expenditures require professional municipal engineering surveys."
  },
  "sustainabilityStrategy": {
    "netZeroYear": 2060,
    "carbonAbsorptionTonsYr": 350000,
    "circularEconomyIndex": 95,
    "biodiversityNetGainPercent: 130,
    "climateRiskBuffer": "Resilience rating against extreme weather"
  },
  "phasedRoadmap": [
    {
      "phaseNumber": 1,
      "title": "Subterranean & Site Preparation",
      "years": "Years 1 - 4",
      "focus": "Core foundation, energy boring, and transit tubes",
      "keyMilestones": ["Milestone A", "Milestone B"],
      "estimatedCostBillions": 30.0
    },
    {
      "phaseNumber": 2,
      "title": "Transit Grid & Core Towers",
      "years": "Years 5 - 10",
      "focus": "Erecting primary spires and rapid transit network",
      "keyMilestones": ["Milestone C", "Milestone D"],
      "estimatedCostBillions": 50.0
    },
    {
      "phaseNumber": 3,
      "title": "Residential Expansion & Living Systems",
      "years": "Years 11 - 18",
      "focus": "Modular housing, vertical agriculture, and civic hubs",
      "keyMilestones": ["Milestone E", "Milestone F"],
      "estimatedCostBillions": 30.0
    },
    {
      "phaseNumber": 4,
      "title": "Ecological Climax & Regional Integration",
      "years": "Years 19+",
      "focus": "Mature circular metabolism and clean energy export",
      "keyMilestones": ["Milestone G", "Milestone H"],
      "estimatedCostBillions": 10.0
    }
  ],
  "spatialLayout": {
    "mapStyle": "radial",
    "urbanDiameterKm": 16.0,
    "districts": [
      {"id": "node-1", "name": "Civic Spire & Public Forum", "type": "civic", "coordinates": {"x": 50, "y": 50}, "elevationMeters": 350, "description": "Central governance and cultural amphitheaters", "capacityOrSize": "100k capacity", "highlightMetric": "100% Timber"},
      {"id": "node-2", "name": "Clean Energy Bastion", "type": "energy", "coordinates": {"x": 25, "y": 28}, "elevationMeters: 60, "description": "Perovskite distribution and microgrid substations", "capacityOrSize": "2.2 GW", "highlightMetric": "Zero Carbon"},
      {"id": "node-3", "name": "Rapid Maglev Hub", "type": "transport", "coordinates": {"x": 75, "y": 30}, "elevationMeters": 40, "description": "Intermodal passenger and freight gateway", "capacityOrSize": "40k/hr", "highlightMetric": "Sub-minute dispatch"},
      {"id": "node-4", "name": "Ecological Sponge Park", "type": "nature", "coordinates": {"x": 30, "y": 72}, elevationMeters: 10, "description": "Wetland buffers and urban agroforestry", "capacityOrSize": "25 sq km", "highlightMetric": "+150% Flora"},
      {"id": "node-5", "name": "Modular Residential Arcades", "type": "residential", "coordinates": {"x": 72, "y": 72}, elevationMeters: 120, "description": "Biophilic housing cells with community sky decks", "capacityOrSize": "400k citizens", "highlightMetric": "Clean Air"},
      {"id": "node-6", "name": "Science & Innovation Spire", "type": "research", "coordinates": {"x": 50, "y": 85}, elevationMeters: 280, "description": "Synthetic biology and AI computational nodes", "capacityOrSize": "15k labs", "highlightMetric": "Open Source"}
    ]
  },
  "ecoScore": 95,
  "innovationIndex": 96,
  "livabilityRating": 93,
  "resilienceScore": 94
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const rawText = response.text || '';
      let parsedConcept: any = null;

      try {
        // Clean potential markdown wrappers
        const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        parsedConcept = JSON.parse(cleaned);
      } catch (jsonErr) {
        console.warn('Failed to parse Gemini JSON directly, falling back to regex extraction', jsonErr);
        const match = rawText.match(/\{[\s\S]*\}/);
        if (match) {
          parsedConcept = JSON.parse(match[0]);
        }
      }

      if (parsedConcept && parsedConcept.name) {
        const finalConcept: FutureCityConcept = {
          ...parsedConcept,
          id: `concept-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          projectId: input.projectId,
          status: 'Completed',
          generationModel: 'gemini-3.8-flash (Live Model)',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        conceptsStore.unshift(finalConcept);

        activityStore.unshift({
          id: `act-${Date.now()}`,
          conceptId: finalConcept.id,
          actionType: 'generate',
          title: `Generated Concept: ${finalConcept.name}`,
          details: `Generated via Google Gemini 3.8 Flash for target year ${finalConcept.targetYear}.`,
          timestamp: new Date().toISOString()
        });

        res.status(201).json({
          success: true,
          mode: 'gemini-live',
          data: finalConcept
        });
        return;
      }
    } catch (apiError: any) {
      console.error('Gemini API call failed, using graceful simulation fallback:', apiError?.message || apiError);
    }
  }

  // Graceful fallback simulation
  const simulatedConcept = generateFallbackConcept(input);
  conceptsStore.unshift(simulatedConcept);

  activityStore.unshift({
    id: `act-${Date.now()}`,
    conceptId: simulatedConcept.id,
    actionType: 'generate',
    title: `Generated Concept: ${simulatedConcept.name}`,
    details: `Generated via Urban Planning Architecture Engine for target year ${simulatedConcept.targetYear}.`,
    timestamp: new Date().toISOString()
  });

  res.status(201).json({
    success: true,
    mode: 'simulation-fallback',
    data: simulatedConcept
  });
});

// ----------------------------------------------------
// VITE DEV MIDDLEWARE OR PRODUCTION STATIC SERVING
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Future City Concept Generator server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
