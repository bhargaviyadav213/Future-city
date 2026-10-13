export type ConceptStatus = 'Draft' | 'Generating' | 'Completed' | 'Archived';

export type CityTheme =
  | 'Smart City'
  | 'Green City'
  | 'Eco City'
  | 'AI City'
  | 'Floating City'
  | 'Space City'
  | 'Circular City'
  | 'Solarpunk Haven'
  | 'Cyberpunk Oasis';

export type TerrainType =
  | 'Coastal & Delta'
  | 'Desert & Arid'
  | 'Archipelagic / Marine'
  | 'Alpine / Mountain'
  | 'Orbital / Low Gravity'
  | 'Subterranean'
  | 'Floating Oceanic Platform'
  | 'Forest Canopy / Boreal';

export interface SpatialNode {
  id: string;
  name: string;
  type: 'civic' | 'energy' | 'transport' | 'residential' | 'nature' | 'research';
  coordinates: { x: number; y: number }; // Percentage 0-100 on grid
  elevationMeters: number;
  description: string;
  capacityOrSize: string;
  highlightMetric: string;
}

export interface SectorBudget {
  sector: string;
  amountBillions: number;
  percentage: number;
  justification: string;
}

export interface RoadmapPhase {
  phaseNumber: number;
  title: string;
  years: string;
  focus: string;
  keyMilestones: string[];
  estimatedCostBillions: number;
}

export interface FutureCityConcept {
  id: string;
  projectId?: string;
  userId?: string;
  name: string;
  tagline: string;
  location: string;
  terrain: TerrainType | string;
  population: number;
  landAreaSqKm: number;
  targetYear: number;
  status: ConceptStatus;
  themes: (CityTheme | string)[];
  developmentGoals: string[];

  // Deep-Dive Sections
  overview: {
    summary: string;
    corePhilosophy: string;
    primaryInnovations: string[];
    climateStrategy: string;
  };

  infrastructure: {
    urbanTopology: string;
    structuralMaterials: string[];
    skybridgeNetwork: string;
    subterraneanSystems: string;
    verticalZoning: string[];
  };

  energy: {
    primarySources: {
      name: string;
      percentage: number;
      description: string;
    }[];
    storageTechnology: string;
    gridResilience: string;
    annualOutputTWh: number;
    cleanEnergyShare: number;
  };

  transportation: {
    modes: {
      name: string;
      type: string;
      speedKmh: string;
      description: string;
    }[];
    congestionManagement: string;
    pedestrianZonePercentage: number;
    evTolNetwork: string;
  };

  waterWaste: {
    waterGeneration: string;
    closedLoopRecyclingRate: number;
    wasteToEnergy: string;
    stormwaterAndFloodDefense: string;
  };

  healthcareEducationSafety: {
    healthcare: {
      triageSystem: string;
      preventiveTech: string;
      facilitiesCount: number;
    };
    education: {
      paradigm: string;
      lifelongLearningHubs: string;
    };
    civicSafety: {
      emergencyResponseMinutes: number;
      hazardMitigation: string;
      civicAiEthics: string;
    };
  };

  budgetApproximation: {
    currency: string;
    totalCapexBillions: number;
    annualOpexBillions: number;
    sectorAllocations: SectorBudget[];
    fundingMechanism: string[];
    estimatedPaybackYears: number;
    disclaimer: string;
  };

  sustainabilityStrategy: {
    netZeroYear: number;
    carbonAbsorptionTonsYr: number;
    circularEconomyIndex: number;
    biodiversityNetGainPercent: number;
    climateRiskBuffer: string;
  };

  phasedRoadmap: RoadmapPhase[];
  spatialLayout: {
    districts: SpatialNode[];
    mapStyle: 'radial' | 'linear-hyperloop' | 'hexagonal-cluster' | 'floating-modular' | 'orbital-ring';
    urbanDiameterKm: number;
  };

  // Quantitative Metric Ratings
  ecoScore: number; // 0-100
  innovationIndex: number; // 0-100
  livabilityRating: number; // 0-100
  resilienceScore: number; // 0-100

  // AI Metadata
  generationModel?: string;
  promptNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  userId?: string;
  title: string;
  description: string;
  tags: string[];
  status: 'Active' | 'Archived' | 'Draft';
  cityConceptIds?: string[];
  conceptCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  role: 'Urban Planner' | 'Architect' | 'Student' | 'Designer' | 'Municipal Lead' | 'Researcher';
  organization?: string;
  avatarUrl?: string;
  preferences?: {
    theme: 'dark' | 'light';
    units: 'metric' | 'imperial';
    autoSave: boolean;
  };
}

export interface ActivityItem {
  id: string;
  userId?: string;
  conceptId?: string;
  actionType: 'create' | 'update' | 'delete' | 'generate' | 'export' | 'compare' | 'archive';
  title: string;
  details?: string;
  timestamp: string;
}

export interface CityGenerateInput {
  cityName: string;
  location: string;
  terrain: string;
  population: number;
  landAreaSqKm: number;
  targetYear: number;
  budgetTargetBillions?: number;
  themes: string[];
  developmentGoals: string[];
  specialRequirements?: string;
  projectId?: string;
}
