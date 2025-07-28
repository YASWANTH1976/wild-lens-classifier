interface HabitatSuitability {
  suitable: boolean;
  confidence: number;
  factors: string[];
  recommendations: string[];
  climate: {
    temperature: string;
    humidity: string;
    precipitation: string;
  };
  geography: {
    elevation: string;
    terrain: string;
    biome: string;
  };
}

// Habitat requirements database for different animals
const habitatDatabase: Record<string, HabitatSuitability> = {
  'tiger': {
    suitable: true,
    confidence: 0.92,
    factors: [
      'Dense forest cover for hunting and shelter',
      'Adequate prey population (deer, wild boar)',
      'Access to water sources',
      'Minimal human disturbance',
      'Large territory requirement (60-100 km²)'
    ],
    recommendations: [
      'Maintain forest corridors between habitats',
      'Implement anti-poaching measures',
      'Monitor prey population levels',
      'Reduce human-wildlife conflict',
      'Establish buffer zones around protected areas'
    ],
    climate: {
      temperature: '20-30°C (68-86°F) year-round',
      humidity: '60-80% relative humidity',
      precipitation: '1000-2000mm annual rainfall'
    },
    geography: {
      elevation: 'Sea level to 2000m elevation',
      terrain: 'Dense forests, grasslands, mangrove swamps',
      biome: 'Tropical and subtropical forests'
    }
  },
  'lion': {
    suitable: true,
    confidence: 0.88,
    factors: [
      'Open savanna grasslands for hunting',
      'Abundant prey (zebras, wildebeest, buffalo)',
      'Access to water during dry seasons',
      'Suitable denning sites for cubs',
      'Large pride territory (20-400 km²)'
    ],
    recommendations: [
      'Protect wildlife corridors',
      'Manage water points during droughts',
      'Control human encroachment',
      'Monitor prey migration patterns',
      'Implement community conservation programs'
    ],
    climate: {
      temperature: '20-35°C (68-95°F)',
      humidity: '30-60% relative humidity',
      precipitation: '300-700mm annual rainfall with dry season'
    },
    geography: {
      elevation: '500-2000m above sea level',
      terrain: 'Open grasslands, light woodlands, scrublands',
      biome: 'African savanna and grassland'
    }
  },
  'elephant': {
    suitable: true,
    confidence: 0.85,
    factors: [
      'Large home range requirement (500-1000 km²)',
      'Diverse vegetation for varied diet',
      'Year-round access to water sources',
      'Migration routes and seasonal habitats',
      'Safe areas for raising young'
    ],
    recommendations: [
      'Protect migratory corridors',
      'Ensure water access during dry seasons',
      'Reduce human-elephant conflict zones',
      'Monitor vegetation health and regeneration',
      'Create community-based conservation areas'
    ],
    climate: {
      temperature: '15-35°C (59-95°F)',
      humidity: '40-80% relative humidity',
      precipitation: '500-1500mm annual rainfall'
    },
    geography: {
      elevation: 'Sea level to 3000m elevation',
      terrain: 'Savannas, forests, woodlands, grasslands',
      biome: 'African savanna, Asian tropical forests'
    }
  },
  'eagle': {
    suitable: true,
    confidence: 0.90,
    factors: [
      'High perching and nesting sites',
      'Open hunting grounds with good visibility',
      'Adequate prey population (fish, small mammals)',
      'Minimal pesticide contamination',
      'Protected nesting areas'
    ],
    recommendations: [
      'Preserve tall trees and cliff faces for nesting',
      'Maintain clean water bodies for fishing eagles',
      'Control pesticide use in agricultural areas',
      'Protect nesting sites from disturbance',
      'Monitor prey population health'
    ],
    climate: {
      temperature: '10-30°C (50-86°F)',
      humidity: '40-70% relative humidity',
      precipitation: 'Varies widely by species and region'
    },
    geography: {
      elevation: 'Sea level to 4500m elevation',
      terrain: 'Mountains, forests, wetlands, coastal areas',
      biome: 'Varied - temperate forests to alpine regions'
    }
  },
  'wolf': {
    suitable: true,
    confidence: 0.87,
    factors: [
      'Large contiguous wilderness areas',
      'Abundant prey species (elk, deer, moose)',
      'Minimal human persecution',
      'Suitable denning sites',
      'Pack territory range (80-300 km²)'
    ],
    recommendations: [
      'Establish wildlife corridors',
      'Implement livestock protection measures',
      'Educate communities about coexistence',
      'Monitor pack dynamics and health',
      'Protect denning and rendezvous sites'
    ],
    climate: {
      temperature: '-40 to 25°C (-40 to 77°F)',
      humidity: '50-80% relative humidity',
      precipitation: '300-1000mm annual rainfall/snowfall'
    },
    geography: {
      elevation: 'Sea level to 3000m elevation',
      terrain: 'Forests, tundra, grasslands, mountains',
      biome: 'Boreal forests, temperate forests, tundra'
    }
  },
  'bear': {
    suitable: true,
    confidence: 0.84,
    factors: [
      'Large home range with diverse habitats',
      'Seasonal food sources (berries, salmon, nuts)',
      'Suitable denning sites for hibernation',
      'Minimal human disturbance',
      'Access to water sources'
    ],
    recommendations: [
      'Maintain habitat connectivity',
      'Secure garbage and food sources in human areas',
      'Protect critical feeding areas',
      'Monitor salmon runs and berry production',
      'Educate public about bear safety'
    ],
    climate: {
      temperature: '-30 to 30°C (-22 to 86°F)',
      humidity: '50-80% relative humidity',
      precipitation: '400-2000mm annual rainfall/snowfall'
    },
    geography: {
      elevation: 'Sea level to 4000m elevation',
      terrain: 'Forests, mountains, tundra, coastal areas',
      biome: 'Temperate forests, boreal forests, alpine regions'
    }
  },
  'deer': {
    suitable: true,
    confidence: 0.91,
    factors: [
      'Mixed forest and grassland habitats',
      'Abundant browse vegetation',
      'Water sources within daily range',
      'Cover for protection from predators',
      'Seasonal migration routes'
    ],
    recommendations: [
      'Maintain diverse forest age classes',
      'Control hunting pressure',
      'Preserve travel corridors',
      'Manage predator populations naturally',
      'Monitor vegetation health and browse pressure'
    ],
    climate: {
      temperature: '-20 to 35°C (-4 to 95°F)',
      humidity: '40-80% relative humidity',
      precipitation: '300-1200mm annual rainfall'
    },
    geography: {
      elevation: 'Sea level to 4000m elevation',
      terrain: 'Forests, grasslands, woodland edges',
      biome: 'Temperate forests, grasslands, mixed habitats'
    }
  },
  'fox': {
    suitable: true,
    confidence: 0.89,
    factors: [
      'Diverse habitat types for hunting',
      'Abundant small prey (rodents, birds)',
      'Suitable denning sites',
      'Limited competition from larger predators',
      'Year-round territory availability'
    ],
    recommendations: [
      'Maintain habitat diversity',
      'Control rodenticide use',
      'Preserve natural denning sites',
      'Manage urban-wildlife interfaces',
      'Monitor small mammal populations'
    ],
    climate: {
      temperature: '-40 to 40°C (-40 to 104°F)',
      humidity: '30-80% relative humidity',
      precipitation: '200-1500mm annual rainfall'
    },
    geography: {
      elevation: 'Sea level to 4500m elevation',
      terrain: 'Forests, grasslands, deserts, urban areas',
      biome: 'Highly adaptable - multiple biomes'
    }
  },
  'owl': {
    suitable: true,
    confidence: 0.86,
    factors: [
      'Suitable nesting sites (tree cavities, cliffs)',
      'Abundant nocturnal prey (rodents, insects)',
      'Quiet hunting grounds',
      'Minimal light pollution',
      'Protected roosting areas'
    ],
    recommendations: [
      'Preserve old-growth trees with cavities',
      'Maintain dark sky areas',
      'Control rodenticide use',
      'Protect nesting sites during breeding season',
      'Monitor small mammal prey populations'
    ],
    climate: {
      temperature: '-30 to 40°C (-22 to 104°F)',
      humidity: '40-80% relative humidity',
      precipitation: 'Varies widely by species'
    },
    geography: {
      elevation: 'Sea level to 4000m elevation',
      terrain: 'Forests, grasslands, deserts, wetlands',
      biome: 'Nearly all terrestrial biomes'
    }
  },
  'butterfly': {
    suitable: true,
    confidence: 0.78,
    factors: [
      'Native host plants for larval development',
      'Nectar sources throughout flight season',
      'Suitable microclimate conditions',
      'Minimal pesticide exposure',
      'Overwintering habitat'
    ],
    recommendations: [
      'Plant native wildflowers and host plants',
      'Reduce pesticide use',
      'Create pollinator gardens',
      'Preserve natural habitat patches',
      'Maintain diverse flowering seasons'
    ],
    climate: {
      temperature: '15-35°C (59-95°F) during active season',
      humidity: '50-80% relative humidity',
      precipitation: '500-1200mm annual rainfall'
    },
    geography: {
      elevation: 'Sea level to 3500m elevation',
      terrain: 'Gardens, meadows, forests, grasslands',
      biome: 'Temperate and tropical regions worldwide'
    }
  }
};

export class HabitatAnalysisService {
  async analyzeHabitat(animalName: string): Promise<HabitatSuitability> {
    // Simulate analysis delay
    await new Promise(resolve => setTimeout(resolve, 1200));
    
    const lowerName = animalName.toLowerCase();
    
    // Check direct match
    if (habitatDatabase[lowerName]) {
      return habitatDatabase[lowerName];
    }
    
    // Check for partial matches
    for (const [key, habitat] of Object.entries(habitatDatabase)) {
      if (lowerName.includes(key) || key.includes(lowerName)) {
        return habitat;
      }
    }
    
    // Generate generic habitat analysis
    return this.generateGenericHabitat(animalName);
  }

  private generateGenericHabitat(animalName: string): HabitatSuitability {
    // Generate realistic but generic habitat analysis
    const isLikelyWildlife = !['cat', 'dog', 'cow', 'pig', 'chicken', 'horse'].some(
      domestic => animalName.toLowerCase().includes(domestic)
    );
    
    const confidence = 0.60 + Math.random() * 0.25; // 60-85% confidence
    
    if (isLikelyWildlife) {
      return {
        suitable: true,
        confidence: confidence,
        factors: [
          'Requires natural habitat with minimal human disturbance',
          'Needs appropriate prey/food sources',
          'Access to shelter and breeding sites',
          'Suitable climate conditions',
          'Territory requirements vary by species'
        ],
        recommendations: [
          'Conduct detailed habitat assessment',
          'Monitor local environmental conditions',
          'Assess human impact on the area',
          'Study species-specific requirements',
          'Implement conservation measures as needed'
        ],
        climate: {
          temperature: 'Species-dependent temperature range',
          humidity: 'Varies by natural habitat',
          precipitation: 'Seasonal precipitation requirements'
        },
        geography: {
          elevation: 'Elevation range varies by species',
          terrain: 'Natural terrain preferred',
          biome: 'Species-specific biome requirements'
        }
      };
    } else {
      return {
        suitable: false,
        confidence: confidence,
        factors: [
          'Domestic species adapted to human environments',
          'May struggle in wild conditions',
          'Dependent on human care and shelter',
          'Lack natural survival instincts',
          'May disrupt local ecosystems if released'
        ],
        recommendations: [
          'Keep in appropriate domestic environment',
          'Provide proper care and nutrition',
          'Ensure veterinary care access',
          'Do not release into wild habitats',
          'Consider animal welfare requirements'
        ],
        climate: {
          temperature: 'Controlled environment preferred',
          humidity: 'Indoor climate control beneficial',
          precipitation: 'Shelter from weather required'
        },
        geography: {
          elevation: 'Any elevation with proper shelter',
          terrain: 'Human-modified environments',
          biome: 'Domestic/agricultural settings'
        }
      };
    }
  }

  async getConservationStatus(animalName: string): Promise<string> {
    // Simulate API call to IUCN Red List
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const conservationStatuses = [
      'Least Concern',
      'Near Threatened', 
      'Vulnerable',
      'Endangered',
      'Critically Endangered'
    ];
    
    // Some animals have known conservation issues
    const knownStatuses: Record<string, string> = {
      'tiger': 'Endangered',
      'elephant': 'Endangered',
      'rhinoceros': 'Critically Endangered',
      'panda': 'Vulnerable',
      'lion': 'Vulnerable',
      'cheetah': 'Vulnerable',
      'polar bear': 'Vulnerable',
      'whale': 'Endangered',
      'eagle': 'Least Concern',
      'wolf': 'Least Concern',
      'bear': 'Least Concern',
      'deer': 'Least Concern',
      'fox': 'Least Concern'
    };
    
    const lowerName = animalName.toLowerCase();
    
    // Check for known status
    for (const [animal, status] of Object.entries(knownStatuses)) {
      if (lowerName.includes(animal)) {
        return status;
      }
    }
    
    // Return random status for unknown animals
    return conservationStatuses[Math.floor(Math.random() * conservationStatuses.length)];
  }
}