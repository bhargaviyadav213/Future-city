import { GoogleGenAI } from '@google/genai';

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

export default async function handler(req: any, res: any) {
  const url = req.url || '';

  // Status check
  if (url.includes('/api/status')) {
    const hasGeminiKey = Boolean(apiKey && apiKey !== 'MY_GEMINI_API_KEY');
    const hasSupabaseUrl = Boolean(process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL);
    const hasSupabaseKey = Boolean(process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY);

    return res.status(200).json({
      status: 'online',
      version: '3.8.0',
      runtime: 'vercel-serverless',
      gemini: {
        active: hasGeminiKey,
        model: 'gemini-3.8-flash',
        mode: hasGeminiKey ? 'live' : 'simulation-fallback'
      },
      supabase: {
        configured: hasSupabaseUrl && hasSupabaseKey,
        mode: hasSupabaseUrl && hasSupabaseKey ? 'cloud' : 'local-storage'
      }
    });
  }

  // Generate Concept with Gemini 3.8 Flash
  if (url.includes('/api/generate-concept') && req.method === 'POST') {
    const input = req.body || {};

    if (!input.cityName || !input.location) {
      return res.status(400).json({ success: false, error: 'City name and location required.' });
    }

    if (ai && apiKey && apiKey !== 'MY_GEMINI_API_KEY') {
      try {
        const prompt = `You are a world-leading futuristic urban planner, architect, and sustainability scientist.
Generate an extensive, highly innovative, and rigorous future city concept blueprint based on:
- City Name: ${input.cityName}
- Location: ${input.location}
- Terrain: ${input.terrain}
- Target Population: ${input.population}
- Land Area (sq km): ${input.landAreaSqKm}
- Target Year: ${input.targetYear}
- Projected Budget (Billions USD): ${input.budgetTargetBillions || 'Calculate optimal'}
- Themes: ${(input.themes || []).join(', ')}
- Urban Development Goals: ${(input.developmentGoals || []).join(', ')}
- Special Requirements: ${input.specialRequirements || 'None'}

Return valid, parseable JSON conforming precisely to this schema without markdown fences:
{
  "name": "${input.cityName}",
  "tagline": "A compelling 1-sentence tagline",
  "location": "${input.location}",
  "terrain": "${input.terrain}",
  "population": ${input.population},
  "landAreaSqKm": ${input.landAreaSqKm},
  "targetYear": ${input.targetYear},
  "status": "Completed",
  "themes": ${JSON.stringify(input.themes || ['Smart City'])},
  "developmentGoals": ${JSON.stringify(input.developmentGoals || ['100% Clean Energy'])},
  "overview": {
    "summary": "Detailed visionary summary of the city",
    "corePhilosophy": "Core architectural and ecological philosophy",
    "primaryInnovations": ["Innovation 1", "Innovation 2", "Innovation 3"],
    "climateStrategy": "Climate adaptation and risk buffer"
  },
  "infrastructure": {
    "urbanTopology": "Hexagonal or radial spatial layout",
    "structuralMaterials": ["Material 1", "Material 2", "Material 3"],
    "skybridgeNetwork": "Skywalks and pod guideways",
    "subterraneanSystems": "Subterranean automated conduits",
    "verticalZoning": ["Zone 1", "Zone 2", "Zone 3"]
  },
  "energy": {
    "primarySources": [
      {"name": "Source 1", "percentage": 45, "description": "Details"},
      {"name": "Source 2", "percentage": 35, "description": "Details"},
      {"name": "Source 3", "percentage": 20, "description": "Details"}
    ],
    "storageTechnology": "Gravity / solid-state battery banks",
    "gridResilience": "Microgrid routing and failure mitigation",
    "annualOutputTWh": 7.5,
    "cleanEnergyShare": 100
  },
  "transportation": {
    "modes": [
      {"name": "Mode 1", "type": "Rail/Pod", "speedKmh": "150 km/h", "description": "Details"},
      {"name": "Mode 2", "type": "Micro-transit", "speedKmh": "25 km/h", "description": "Details"},
      {"name": "Mode 3", "type": "Freight", "speedKmh": "80 km/h", "description": "Details"}
    ],
    "congestionManagement": "Autonomous scheduling",
    "pedestrianZonePercentage": 85,
    "evTolNetwork": "Vertiports network"
  },
  "waterWaste": {
    "waterGeneration": "Closed-loop atmospheric or desalination",
    "closedLoopRecyclingRate": 98.5,
    "wasteToEnergy": "Plasma pyrolysis or bio-gasification",
    "stormwaterAndFloodDefense": "Sponge swales and deep retention"
  },
  "healthcareEducationSafety": {
    "healthcare": {
      "triageSystem": "Continuous non-invasive home ambient monitoring",
      "preventiveTech": "Cellular repair clinics",
      "facilitiesCount": 35
    },
    "education": {
      "paradigm": "Adaptive experiential academies",
      "lifelongLearningHubs": "Civic learning pavilions"
    },
    "civicSafety": {
      "emergencyResponseMinutes": 2.0,
      "hazardMitigation": "Seismic dampers and fireproof facades",
      "civicAiEthics": "Decentralized privacy-preserving data charter"
    }
  },
  "budgetApproximation": {
    "currency": "USD",
    "totalCapexBillions": 120.0,
    "annualOpexBillions": 3.5,
    "sectorAllocations": [
      {"sector": "Energy & Power", "amountBillions": 35.0, "percentage": 29, "justification": "Details"},
      {"sector": "Transit & Mobility", "amountBillions": 28.0, "percentage": 23, "justification": "Details"},
      {"sector": "Housing & Architecture", "amountBillions": 32.0, "percentage": 27, "justification": "Details"},
      {"sector": "Water & Circular Waste", "amountBillions": 15.0, "percentage": 13, "justification": "Details"},
      {"sector": "Civic Tech & Healthcare", "amountBillions": 10.0, "percentage": 8, "justification": "Details"}
    ],
    "fundingMechanism": ["Green Bonds", "Sovereign Wealth Funds"],
    "estimatedPaybackYears": 18,
    "disclaimer": "DISCLAIMER: All budget figures and economic models are AI-generated approximations created for conceptual urban feasibility studies."
  },
  "sustainabilityStrategy": {
    "netZeroYear": 2060,
    "carbonAbsorptionTonsYr": 350000,
    "circularEconomyIndex": 95,
    "biodiversityNetGainPercent": 130,
    "climateRiskBuffer": "Immune to category 5 extreme weather events"
  },
  "phasedRoadmap": [
    {
      "phaseNumber": 1,
      "title": "Subterranean & Energy Spine",
      "years": "Years 1 - 4",
      "focus": "Core foundation and transit tubes",
      "keyMilestones": ["Complete primary boring", "Establish 100% clean power"],
      "estimatedCostBillions": 30.0
    },
    {
      "phaseNumber": 2,
      "title": "Core Urban Towers & Maglev",
      "years": "Years 5 - 10",
      "focus": "Central spires and rapid transit network",
      "keyMilestones": ["Inaugurate Maglev ring", "Onboard first 30% population"],
      "estimatedCostBillions": 50.0
    },
    {
      "phaseNumber": 3,
      "title": "Residential Expansion & Living Systems",
      "years": "Years 11 - 18",
      "focus": "Modular housing and vertical agriculture",
      "keyMilestones": ["Integrate all living rings", "Attain 98% water recycling"],
      "estimatedCostBillions": 30.0
    },
    {
      "phaseNumber": 4,
      "title": "Ecological Climax & Regional Export",
      "years": "Years 19+",
      "focus": "Net-negative carbon export and mature circular metabolism",
      "keyMilestones": ["Attain net-negative carbon balance"],
      "estimatedCostBillions": 10.0
    }
  ],
  "spatialLayout": {
    "mapStyle": "radial",
    "urbanDiameterKm": 16.0,
    "districts": [
      {"id": "node-1", "name": "Central Agora Spire", "type": "civic", "coordinates": {"x": 50, "y": 50}, "elevationMeters": 350, "description": "Central governance and cultural amphitheaters", "capacityOrSize": "100k capacity", "highlightMetric": "100% Timber"},
      {"id": "node-2", "name": "Clean Energy Bastion", "type": "energy", "coordinates": {"x": 25, "y": 28}, "elevationMeters": 60, "description": "Clean baseload power and flow batteries", "capacityOrSize": "2.5 GW", "highlightMetric": "Zero Carbon"},
      {"id": "node-3", "name": "Rapid Maglev Hub", "type": "transport", "coordinates": {"x": 75, "y": 30}, "elevationMeters": 40, "description": "Intermodal passenger and freight gateway", "capacityOrSize": "40k/hr", "highlightMetric": "Sub-minute dispatch"},
      {"id": "node-4", "name": "Ecological Sponge Park", "type": "nature", "coordinates": {"x": 30, "y": 72}, "elevationMeters": 10, "description": "Wetland buffers and urban agroforestry", "capacityOrSize": "25 sq km", "highlightMetric": "+150% Flora"},
      {"id": "node-5", "name": "Modular Residential Arcades", "type": "residential", "coordinates": {"x": 72, "y": 72}, "elevationMeters": 120, "description": "Biophilic housing cells with community sky decks", "capacityOrSize": "400k citizens", "highlightMetric": "Clean Air"},
      {"id": "node-6", "name": "Science & Innovation Spire", "type": "research", "coordinates": {"x": 50, "y": 85}, "elevationMeters": 280, "description": "Synthetic biology and AI computational nodes", "capacityOrSize": "15k labs", "highlightMetric": "Open Source"}
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
        const cleaned = rawText.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim();
        const parsed = JSON.parse(cleaned);

        return res.status(200).json({
          success: true,
          mode: 'gemini-live',
          data: {
            ...parsed,
            id: `concept-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
            projectId: input.projectId,
            generationModel: 'gemini-3.8-flash (Vercel Serverless)',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        });
      } catch (err: any) {
        console.error('Gemini call error on Vercel:', err);
      }
    }

    // Fallback simulation if key unavailable
    const fallbackConcept = {
      id: `concept-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      projectId: input.projectId,
      name: input.cityName,
      tagline: `Visionary ${input.themes?.[0] || 'Smart City'} engineered for hyper-resilient living in ${input.targetYear || 2075}.`,
      location: input.location,
      terrain: input.terrain || 'Coastal & Delta',
      population: Number(input.population) || 500000,
      landAreaSqKm: Number(input.landAreaSqKm) || 120,
      targetYear: Number(input.targetYear) || 2075,
      status: 'Completed',
      themes: input.themes || ['Smart City', 'Green City'],
      developmentGoals: input.developmentGoals || ['100% Clean Energy'],
      overview: {
        summary: `${input.cityName} represents a breakthrough urban prototype in ${input.location}, uniting biophilic architectural paradigms with adaptive machine intelligence and circular resource streams.`,
        corePhilosophy: 'Biophilic symbiosis: technology exists unseen to amplify natural ecological cycles.',
        primaryInnovations: [
          'Genetically engineered moss air-scrubbing facades',
          'Kinetic pavement energy capture across pedestrian sanctuaries',
          'Decentralized autonomous neighborhood commons (Machiya-DAO)'
        ],
        climateStrategy: 'Zero-emission thermal chimneys paired with sub-river aquifer cooling loops.'
      },
      infrastructure: {
        urbanTopology: 'Hexagonal terraced valley clusters linked via suspended timber sky-viaducts.',
        structuralMaterials: ['Cross-Laminated Timber (CLT)', 'Basalt-fiber geopolymers', 'Photovoltaic aerogel'],
        skybridgeNetwork: 'Three-tiered aerial canopy bridges for light electric pods and pollinator paths.',
        subterraneanSystems: 'Automated pneumatic waste distribution and subterranean freight conduits.',
        verticalZoning: ['Tier 1: Riverfront Wetlands', 'Tier 2: Civic Arcades', 'Tier 3: Modular Living Rings']
      },
      energy: {
        primarySources: [
          { name: 'Micro-Hydro Valley Channels', percentage: 35, description: 'Run-of-the-river vortex turbines.' },
          { name: 'Perovskite Building Skins', percentage: 45, description: 'Every building surface generates electricity.' },
          { name: 'Deep Geo-Thermal Wells', percentage: 20, description: 'Sub-volcanic closed-loop heat exchangers.' }
        ],
        storageTechnology: 'Underground gravity flywheels and flow-battery reservoirs.',
        gridResilience: 'Self-healing fractal microgrids.',
        annualOutputTWh: 8.4,
        cleanEnergyShare: 100
      },
      transportation: {
        modes: [
          { name: 'Aerogel Magnetic Pods', type: 'Maglev Light Rail', speedKmh: '180 km/h', description: 'Quiet magnetic capsules on elevated tracks.' },
          { name: 'Autonomous Water Barges', type: 'Zero-Emission River Transit', speedKmh: '25 km/h', description: 'Solar-electric freight and passenger barges.' },
          { name: 'Canopy Cycleways', type: 'Active Mobility', speedKmh: '25 km/h', description: 'Tree-level bike and electric scooter freeways.' }
        ],
        congestionManagement: '100% private combustion vehicle ban; shared autonomous pods.',
        pedestrianZonePercentage: 85,
        evTolNetwork: 'Restricted perimeter skyports.'
      },
      waterWaste: {
        waterGeneration: 'Condensation moisture catchers installed along mountain crests.',
        closedLoopRecyclingRate: 98.4,
        wasteToEnergy: 'Enzymatic bioreactors decomposing organic matter into compost.',
        stormwaterAndFloodDefense: 'Sponge-city soil buffers capable of absorbing 1,000mm/day rainfall.'
      },
      healthcareEducationSafety: {
        healthcare: {
          triageSystem: 'Ambient biometrics monitor resting vitals with non-invasive sensors.',
          preventiveTech: 'Preventive cellular regeneration clinics embedded in every neighborhood hub.',
          facilitiesCount: 48
        },
        education: {
          paradigm: 'Experiential apprentice guild system merging AI tutors with agroforestry.',
          lifelongLearningHubs: 'Decentralized open pavilions in botanical conservatories.'
        },
        civicSafety: {
          emergencyResponseMinutes: 2.1,
          hazardMitigation: 'Seismic tuned mass dampers integrated as pagoda towers.',
          civicAiEthics: 'Open-source, locally hosted algorithmic consensus.'
        }
      },
      budgetApproximation: {
        currency: 'USD',
        totalCapexBillions: Number(input.budgetTargetBillions) || 120.0,
        annualOpexBillions: 3.5,
        sectorAllocations: [
          { sector: 'Energy & Power Infrastructure', amountBillions: 35.0, percentage: 29, justification: 'Clean baseload boring' },
          { sector: 'Transit & Mobility Networks', amountBillions: 28.0, percentage: 23, justification: 'Maglev guideways' },
          { sector: 'Housing & Architecture', amountBillions: 32.0, percentage: 27, justification: 'CLT timber megastructures' },
          { sector: 'Water & Circular Waste', amountBillions: 15.0, percentage: 13, justification: 'Closed loop systems' },
          { sector: 'Civic Tech & Healthcare', amountBillions: 10.0, percentage: 8, justification: 'Decentralized triage clinics' }
        ],
        fundingMechanism: ['Green Municipal Bonds', 'Sovereign Wealth Funds'],
        estimatedPaybackYears: 18,
        disclaimer: 'DISCLAIMER: All budget figures and economic models are AI-generated approximations created for conceptual urban feasibility studies.'
      },
      sustainabilityStrategy: {
        netZeroYear: 2060,
        carbonAbsorptionTonsYr: 420000,
        circularEconomyIndex: 96,
        biodiversityNetGainPercent: 145,
        climateRiskBuffer: 'Category 5 storm survivability'
      },
      phasedRoadmap: [
        {
          phaseNumber: 1,
          title: 'Foundation & Subterranean Spine',
          years: 'Years 1 - 5',
          focus: 'Geothermal boring and pneumatic arterial conduits.',
          keyMilestones: ['Complete deep shafts', 'Establish protected boundary'],
          estimatedCostBillions: 34.0
        },
        {
          phaseNumber: 2,
          title: 'Timber Framework & Transit Spine',
          years: 'Years 6 - 12',
          focus: 'Maglev canopy and modular living rings.',
          keyMilestones: ['Launch primary Maglev loop', 'First 400,000 residents onboarded'],
          estimatedCostBillions: 56.5
        },
        {
          phaseNumber: 3,
          title: 'Full Circular Integration',
          years: 'Years 13 - 20',
          focus: '100% closed-loop waste transition and vertical farm saturation.',
          keyMilestones: ['Attain 98% water recycling', 'Reach full capacity'],
          estimatedCostBillions: 38.0
        },
        {
          phaseNumber: 4,
          title: 'Regional Maturation & Export',
          years: 'Years 21+',
          focus: 'Surplus clean energy export to national grid.',
          keyMilestones: ['Achieve net-negative carbon balance'],
          estimatedCostBillions: 14.0
        }
      ],
      spatialLayout: {
        mapStyle: 'hexagonal-cluster',
        urbanDiameterKm: 18.5,
        districts: [
          { id: 'node-1', name: 'Central Solar Spire & Civic Commons', type: 'civic', coordinates: { x: 50, y: 48 }, elevationMeters: 420, description: 'Central governance and cultural amphitheaters.', capacityOrSize: '150,000 daily capacity', highlightMetric: '100% Timber Facade' },
          { id: 'node-2', name: 'Riverine Hydro Valley & Wetlands', type: 'nature', coordinates: { x: 28, y: 72 }, elevationMeters: 45, description: 'Daylighted river system with micro-vortex generators.', capacityOrSize: '45 sq km wetland', highlightMetric: '+220% Biodiversity' },
          { id: 'node-3', name: 'East Timber Living Terraces', type: 'residential', coordinates: { x: 74, y: 35 }, elevationMeters: 180, description: 'Interlocking CLT residential neighborhoods.', capacityOrSize: '480,000 citizens', highlightMetric: 'Zero Concrete' },
          { id: 'node-4', name: 'Deep Geo-Thermal Energy Bastion', type: 'energy', coordinates: { x: 22, y: 25 }, elevationMeters: 310, description: 'Subterranean volcanic heat recovery center.', capacityOrSize: '3.2 GW baseload', highlightMetric: '99.999% Uptime' },
          { id: 'node-5', name: 'North Maglev & eVTOL Nexus', type: 'transport', coordinates: { x: 52, y: 18 }, elevationMeters: 120, description: 'Multi-modal transit gateway linking regional supersonic lines.', capacityOrSize: '25,000 p/hour throughput', highlightMetric: '<2 min transfers' },
          { id: 'node-6', name: 'Agroforestry & Molecular Biotech Spire', type: 'research', coordinates: { x: 80, y: 68 }, elevationMeters: 290, description: 'Vertical vertical crop towers and bio-scrubbers.', capacityOrSize: '12,000 researchers', highlightMetric: '4,000 tons/yr food' }
        ]
      },
      ecoScore: 97,
      innovationIndex: 94,
      livabilityRating: 98,
      resilienceScore: 95,
      generationModel: 'gemini-3.8-flash (Simulated)',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    return res.status(200).json({
      success: true,
      mode: 'simulation-fallback',
      data: fallbackConcept
    });
  }

  return res.status(404).json({ error: 'Endpoint not found' });
}
