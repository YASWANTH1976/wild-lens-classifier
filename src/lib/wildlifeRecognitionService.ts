import { APIService } from './apiService';

interface WildlifeRecognitionResult {
  isWild: boolean;
  commonName?: string;
  scientificName?: string;
  message?: string;
  confidence?: number;
  apiSource?: string;
  suggestions?: string[];
}

// Comprehensive wild animal species database
const WILD_SPECIES_DATABASE = {
  // Big Cats
  'tiger': { common: 'Bengal Tiger', scientific: 'Panthera tigris' },
  'bengal tiger': { common: 'Bengal Tiger', scientific: 'Panthera tigris tigris' },
  'siberian tiger': { common: 'Siberian Tiger', scientific: 'Panthera tigris altaica' },
  'lion': { common: 'African Lion', scientific: 'Panthera leo' },
  'african lion': { common: 'African Lion', scientific: 'Panthera leo' },
  'leopard': { common: 'African Leopard', scientific: 'Panthera pardus' },
  'african leopard': { common: 'African Leopard', scientific: 'Panthera pardus' },
  'cheetah': { common: 'Cheetah', scientific: 'Acinonyx jubatus' },
  'jaguar': { common: 'Jaguar', scientific: 'Panthera onca' },
  'lynx': { common: 'Eurasian Lynx', scientific: 'Lynx lynx' },
  'eurasian lynx': { common: 'Eurasian Lynx', scientific: 'Lynx lynx' },
  'cougar': { common: 'Cougar', scientific: 'Puma concolor' },
  'mountain lion': { common: 'Cougar', scientific: 'Puma concolor' },
  'puma': { common: 'Cougar', scientific: 'Puma concolor' },
  'snow leopard': { common: 'Snow Leopard', scientific: 'Panthera uncia' },

  // Bears
  'bear': { common: 'American Black Bear', scientific: 'Ursus americanus' },
  'black bear': { common: 'American Black Bear', scientific: 'Ursus americanus' },
  'american black bear': { common: 'American Black Bear', scientific: 'Ursus americanus' },
  'brown bear': { common: 'Grizzly Bear', scientific: 'Ursus arctos' },
  'grizzly bear': { common: 'Grizzly Bear', scientific: 'Ursus arctos' },
  'grizzly': { common: 'Grizzly Bear', scientific: 'Ursus arctos' },
  'polar bear': { common: 'Polar Bear', scientific: 'Ursus maritimus' },
  'giant panda': { common: 'Giant Panda', scientific: 'Ailuropoda melanoleuca' },
  'panda': { common: 'Giant Panda', scientific: 'Ailuropoda melanoleuca' },

  // Canids
  'wolf': { common: 'Gray Wolf', scientific: 'Canis lupus' },
  'gray wolf': { common: 'Gray Wolf', scientific: 'Canis lupus' },
  'grey wolf': { common: 'Gray Wolf', scientific: 'Canis lupus' },
  'red fox': { common: 'Red Fox', scientific: 'Vulpes vulpes' },
  'fox': { common: 'Red Fox', scientific: 'Vulpes vulpes' },
  'arctic fox': { common: 'Arctic Fox', scientific: 'Vulpes lagopus' },
  'coyote': { common: 'Coyote', scientific: 'Canis latrans' },
  'jackal': { common: 'Golden Jackal', scientific: 'Canis aureus' },
  'golden jackal': { common: 'Golden Jackal', scientific: 'Canis aureus' },

  // Elephants and Large Herbivores
  'elephant': { common: 'African Elephant', scientific: 'Loxodonta africana' },
  'african elephant': { common: 'African Elephant', scientific: 'Loxodonta africana' },
  'asian elephant': { common: 'Asian Elephant', scientific: 'Elephas maximus' },
  'rhinoceros': { common: 'White Rhinoceros', scientific: 'Ceratotherium simum' },
  'rhino': { common: 'White Rhinoceros', scientific: 'Ceratotherium simum' },
  'white rhinoceros': { common: 'White Rhinoceros', scientific: 'Ceratotherium simum' },
  'black rhinoceros': { common: 'Black Rhinoceros', scientific: 'Diceros bicornis' },
  'hippopotamus': { common: 'Hippopotamus', scientific: 'Hippopotamus amphibius' },
  'hippo': { common: 'Hippopotamus', scientific: 'Hippopotamus amphibius' },

  // Ungulates
  'giraffe': { common: 'Northern Giraffe', scientific: 'Giraffa camelopardalis' },
  'northern giraffe': { common: 'Northern Giraffe', scientific: 'Giraffa camelopardalis' },
  'zebra': { common: 'Plains Zebra', scientific: 'Equus quagga' },
  'plains zebra': { common: 'Plains Zebra', scientific: 'Equus quagga' },
  'buffalo': { common: 'African Buffalo', scientific: 'Syncerus caffer' },
  'african buffalo': { common: 'African Buffalo', scientific: 'Syncerus caffer' },
  'cape buffalo': { common: 'African Buffalo', scientific: 'Syncerus caffer' },
  'deer': { common: 'White-tailed Deer', scientific: 'Odocoileus virginianus' },
  'white-tailed deer': { common: 'White-tailed Deer', scientific: 'Odocoileus virginianus' },
  'moose': { common: 'Moose', scientific: 'Alces alces' },
  'elk': { common: 'Elk', scientific: 'Cervus canadensis' },
  'impala': { common: 'Impala', scientific: 'Aepyceros melampus' },
  'wildebeest': { common: 'Blue Wildebeest', scientific: 'Connochaetes taurinus' },
  'blue wildebeest': { common: 'Blue Wildebeest', scientific: 'Connochaetes taurinus' },
  'gazelle': { common: "Thomson's Gazelle", scientific: 'Eudorcas thomsonii' },
  "thomson's gazelle": { common: "Thomson's Gazelle", scientific: 'Eudorcas thomsonii' },

  // Primates
  'gorilla': { common: 'Western Gorilla', scientific: 'Gorilla gorilla' },
  'western gorilla': { common: 'Western Gorilla', scientific: 'Gorilla gorilla' },
  'chimpanzee': { common: 'Common Chimpanzee', scientific: 'Pan troglodytes' },
  'common chimpanzee': { common: 'Common Chimpanzee', scientific: 'Pan troglodytes' },
  'chimp': { common: 'Common Chimpanzee', scientific: 'Pan troglodytes' },
  'orangutan': { common: 'Bornean Orangutan', scientific: 'Pongo pygmaeus' },
  'bornean orangutan': { common: 'Bornean Orangutan', scientific: 'Pongo pygmaeus' },
  'monkey': { common: 'Rhesus Macaque', scientific: 'Macaca mulatta' },
  'rhesus macaque': { common: 'Rhesus Macaque', scientific: 'Macaca mulatta' },
  'baboon': { common: 'Olive Baboon', scientific: 'Papio anubis' },
  'olive baboon': { common: 'Olive Baboon', scientific: 'Papio anubis' },
  'lemur': { common: 'Ring-tailed Lemur', scientific: 'Lemur catta' },
  'ring-tailed lemur': { common: 'Ring-tailed Lemur', scientific: 'Lemur catta' },

  // Marine Mammals
  'whale': { common: 'Blue Whale', scientific: 'Balaenoptera musculus' },
  'blue whale': { common: 'Blue Whale', scientific: 'Balaenoptera musculus' },
  'humpback whale': { common: 'Humpback Whale', scientific: 'Megaptera novaeangliae' },
  'dolphin': { common: 'Bottlenose Dolphin', scientific: 'Tursiops truncatus' },
  'bottlenose dolphin': { common: 'Bottlenose Dolphin', scientific: 'Tursiops truncatus' },
  'seal': { common: 'Harbor Seal', scientific: 'Phoca vitulina' },
  'harbor seal': { common: 'Harbor Seal', scientific: 'Phoca vitulina' },
  'sea lion': { common: 'California Sea Lion', scientific: 'Zalophus californianus' },
  'california sea lion': { common: 'California Sea Lion', scientific: 'Zalophus californianus' },
  'walrus': { common: 'Pacific Walrus', scientific: 'Odobenus rosmarus divergens' },
  'pacific walrus': { common: 'Pacific Walrus', scientific: 'Odobenus rosmarus divergens' },
  'otter': { common: 'Sea Otter', scientific: 'Enhydra lutris' },
  'sea otter': { common: 'Sea Otter', scientific: 'Enhydra lutris' },

  // Birds of Prey
  'eagle': { common: 'Bald Eagle', scientific: 'Haliaeetus leucocephalus' },
  'bald eagle': { common: 'Bald Eagle', scientific: 'Haliaeetus leucocephalus' },
  'golden eagle': { common: 'Golden Eagle', scientific: 'Aquila chrysaetos' },
  'hawk': { common: 'Red-tailed Hawk', scientific: 'Buteo jamaicensis' },
  'red-tailed hawk': { common: 'Red-tailed Hawk', scientific: 'Buteo jamaicensis' },
  'owl': { common: 'Great Horned Owl', scientific: 'Bubo virginianus' },
  'great horned owl': { common: 'Great Horned Owl', scientific: 'Bubo virginianus' },
  'falcon': { common: 'Peregrine Falcon', scientific: 'Falco peregrinus' },
  'peregrine falcon': { common: 'Peregrine Falcon', scientific: 'Falco peregrinus' },
  'vulture': { common: 'Turkey Vulture', scientific: 'Cathartes aura' },
  'turkey vulture': { common: 'Turkey Vulture', scientific: 'Cathartes aura' },

  // Other Birds
  'penguin': { common: 'King Penguin', scientific: 'Aptenodytes patagonicus' },
  'king penguin': { common: 'King Penguin', scientific: 'Aptenodytes patagonicus' },
  'emperor penguin': { common: 'Emperor Penguin', scientific: 'Aptenodytes forsteri' },
  'flamingo': { common: 'Greater Flamingo', scientific: 'Phoenicopterus roseus' },
  'greater flamingo': { common: 'Greater Flamingo', scientific: 'Phoenicopterus roseus' },
  'peacock': { common: 'Indian Peafowl', scientific: 'Pavo cristatus' },
  'peafowl': { common: 'Indian Peafowl', scientific: 'Pavo cristatus' },
  'indian peafowl': { common: 'Indian Peafowl', scientific: 'Pavo cristatus' },
  'ostrich': { common: 'Common Ostrich', scientific: 'Struthio camelus' },
  'common ostrich': { common: 'Common Ostrich', scientific: 'Struthio camelus' },
  'emu': { common: 'Emu', scientific: 'Dromaius novaehollandiae' },
  'crane': { common: 'Sandhill Crane', scientific: 'Antigone canadensis' },
  'sandhill crane': { common: 'Sandhill Crane', scientific: 'Antigone canadensis' },

  // Reptiles
  'crocodile': { common: 'Nile Crocodile', scientific: 'Crocodylus niloticus' },
  'nile crocodile': { common: 'Nile Crocodile', scientific: 'Crocodylus niloticus' },
  'alligator': { common: 'American Alligator', scientific: 'Alligator mississippiensis' },
  'american alligator': { common: 'American Alligator', scientific: 'Alligator mississippiensis' },
  'snake': { common: 'Ball Python', scientific: 'Python regius' },
  'python': { common: 'Ball Python', scientific: 'Python regius' },
  'ball python': { common: 'Ball Python', scientific: 'Python regius' },
  'lizard': { common: 'Komodo Dragon', scientific: 'Varanus komodoensis' },
  'komodo dragon': { common: 'Komodo Dragon', scientific: 'Varanus komodoensis' },
  'iguana': { common: 'Green Iguana', scientific: 'Iguana iguana' },
  'green iguana': { common: 'Green Iguana', scientific: 'Iguana iguana' },
  'turtle': { common: 'Green Sea Turtle', scientific: 'Chelonia mydas' },
  'sea turtle': { common: 'Green Sea Turtle', scientific: 'Chelonia mydas' },
  'green sea turtle': { common: 'Green Sea Turtle', scientific: 'Chelonia mydas' },
  'tortoise': { common: 'Galapagos Tortoise', scientific: 'Chelonoidis niger' },
  'galapagos tortoise': { common: 'Galapagos Tortoise', scientific: 'Chelonoidis niger' },

  // Amphibians
  'frog': { common: 'American Bullfrog', scientific: 'Lithobates catesbeianus' },
  'bullfrog': { common: 'American Bullfrog', scientific: 'Lithobates catesbeianus' },
  'american bullfrog': { common: 'American Bullfrog', scientific: 'Lithobates catesbeianus' },
  'salamander': { common: 'Spotted Salamander', scientific: 'Ambystoma maculatum' },
  'spotted salamander': { common: 'Spotted Salamander', scientific: 'Ambystoma maculatum' },
  'newt': { common: 'Eastern Newt', scientific: 'Notophthalmus viridescens' },
  'eastern newt': { common: 'Eastern Newt', scientific: 'Notophthalmus viridescens' },

  // Marine Life
  'shark': { common: 'Great White Shark', scientific: 'Carcharodon carcharias' },
  'great white shark': { common: 'Great White Shark', scientific: 'Carcharodon carcharias' },
  'white shark': { common: 'Great White Shark', scientific: 'Carcharodon carcharias' },
  'octopus': { common: 'Common Octopus', scientific: 'Octopus vulgaris' },
  'common octopus': { common: 'Common Octopus', scientific: 'Octopus vulgaris' },
  'squid': { common: 'Giant Squid', scientific: 'Architeuthis dux' },
  'giant squid': { common: 'Giant Squid', scientific: 'Architeuthis dux' },
  'jellyfish': { common: 'Moon Jellyfish', scientific: 'Aurelia aurita' },
  'moon jellyfish': { common: 'Moon Jellyfish', scientific: 'Aurelia aurita' },
  'coral': { common: 'Staghorn Coral', scientific: 'Acropora cervicornis' },
  'staghorn coral': { common: 'Staghorn Coral', scientific: 'Acropora cervicornis' },

  // Insects and Arachnids
  'butterfly': { common: 'Monarch Butterfly', scientific: 'Danaus plexippus' },
  'monarch butterfly': { common: 'Monarch Butterfly', scientific: 'Danaus plexippus' },
  'monarch': { common: 'Monarch Butterfly', scientific: 'Danaus plexippus' },
  'bee': { common: 'European Honey Bee', scientific: 'Apis mellifera' },
  'honey bee': { common: 'European Honey Bee', scientific: 'Apis mellifera' },
  'european honey bee': { common: 'European Honey Bee', scientific: 'Apis mellifera' },
  'spider': { common: 'Black Widow Spider', scientific: 'Latrodectus mactans' },
  'black widow': { common: 'Black Widow Spider', scientific: 'Latrodectus mactans' },
  'black widow spider': { common: 'Black Widow Spider', scientific: 'Latrodectus mactans' },
  'scorpion': { common: 'Arizona Bark Scorpion', scientific: 'Centruroides sculpturatus' },
  'arizona bark scorpion': { common: 'Arizona Bark Scorpion', scientific: 'Centruroides sculpturatus' },

  // Australian Wildlife
  'kangaroo': { common: 'Red Kangaroo', scientific: 'Osphranter rufus' },
  'red kangaroo': { common: 'Red Kangaroo', scientific: 'Osphranter rufus' },
  'koala': { common: 'Koala', scientific: 'Phascolarctos cinereus' },
  'wombat': { common: 'Common Wombat', scientific: 'Vombatus ursinus' },
  'common wombat': { common: 'Common Wombat', scientific: 'Vombatus ursinus' },
  'platypus': { common: 'Platypus', scientific: 'Ornithorhynchus anatinus' },
  'echidna': { common: 'Short-beaked Echidna', scientific: 'Tachyglossus aculeatus' },
  'short-beaked echidna': { common: 'Short-beaked Echidna', scientific: 'Tachyglossus aculeatus' },

  // Other Unique Animals
  'sloth': { common: 'Three-toed Sloth', scientific: 'Bradypus tridactylus' },
  'three-toed sloth': { common: 'Three-toed Sloth', scientific: 'Bradypus tridactylus' },
  'armadillo': { common: 'Nine-banded Armadillo', scientific: 'Dasypus novemcinctus' },
  'nine-banded armadillo': { common: 'Nine-banded Armadillo', scientific: 'Dasypus novemcinctus' },
  'anteater': { common: 'Giant Anteater', scientific: 'Myrmecophaga tridactyla' },
  'giant anteater': { common: 'Giant Anteater', scientific: 'Myrmecophaga tridactyla' },
  'pangolin': { common: 'Chinese Pangolin', scientific: 'Manis pentadactyla' },
  'chinese pangolin': { common: 'Chinese Pangolin', scientific: 'Manis pentadactyla' },
  'hedgehog': { common: 'European Hedgehog', scientific: 'Erinaceus europaeus' },
  'european hedgehog': { common: 'European Hedgehog', scientific: 'Erinaceus europaeus' },
  'porcupine': { common: 'North American Porcupine', scientific: 'Erethizon dorsatum' },
  'north american porcupine': { common: 'North American Porcupine', scientific: 'Erethizon dorsatum' },

  // Arctic Animals
  'arctic fox': { common: 'Arctic Fox', scientific: 'Vulpes lagopus' },
  'snowy owl': { common: 'Snowy Owl', scientific: 'Bubo scandiacus' },
  'reindeer': { common: 'Reindeer', scientific: 'Rangifer tarandus' },
  'caribou': { common: 'Caribou', scientific: 'Rangifer tarandus' },

  // Desert Animals
  'camel': { common: 'Dromedary Camel', scientific: 'Camelus dromedarius' },
  'dromedary': { common: 'Dromedary Camel', scientific: 'Camelus dromedarius' },
  'dromedary camel': { common: 'Dromedary Camel', scientific: 'Camelus dromedarius' },
  'fennec fox': { common: 'Fennec Fox', scientific: 'Vulpes zerda' },
  'fennec': { common: 'Fennec Fox', scientific: 'Vulpes zerda' },
  'meerkat': { common: 'Meerkat', scientific: 'Suricata suricatta' },
  'addax': { common: 'Addax', scientific: 'Addax nasomaculatus' }
};

// Domestic/Non-wild animals database
const DOMESTIC_SPECIES_DATABASE = {
  // Common Pets
  'dog': true, 'puppy': true, 'canine': true,
  'cat': true, 'kitten': true, 'feline': true,
  'rabbit': true, 'bunny': true,
  'hamster': true, 'guinea pig': true, 'gerbil': true,
  'mouse': true, 'rat': true, 'ferret': true,
  
  // Livestock
  'cow': true, 'cattle': true, 'bull': true, 'calf': true,
  'pig': true, 'hog': true, 'swine': true, 'piglet': true,
  'sheep': true, 'lamb': true, 'ewe': true, 'ram': true,
  'goat': true, 'kid': true, 'billy goat': true,
  'horse': true, 'pony': true, 'stallion': true, 'mare': true, 'foal': true,
  'donkey': true, 'mule': true, 'ass': true,
  
  // Poultry
  'chicken': true, 'rooster': true, 'hen': true, 'chick': true,
  'duck': true, 'duckling': true, 'mallard duck': true,
  'goose': true, 'gosling': true,
  'turkey': true, 'turkey chick': true,
  
  // Aquarium/Pet Fish
  'goldfish': true, 'koi': true, 'betta': true, 'guppy': true,
  'angelfish': true, 'tetra': true, 'molly': true,
  
  // Pet Birds
  'parrot': true, 'parakeet': true, 'budgie': true, 'budgerigar': true,
  'canary': true, 'cockatiel': true, 'lovebird': true, 'finch': true
};

export class WildlifeRecognitionService {
  private apiService = new APIService();

  async recognizeWildlife(file: File): Promise<WildlifeRecognitionResult> {
    if (!file || !file.type.startsWith('image/')) {
      throw new Error('Please upload a valid image file');
    }

    try {
      console.log('🔍 Starting enhanced wildlife recognition...');
      
      // Use enhanced API service with failover
      const classificationResult = await this.apiService.classifyWithFailover(file);
      
      console.log('📊 Classification result:', classificationResult);
      
      // Determine if this is a wild animal
      const isWild = this.isWildAnimal(classificationResult.label);
      
      if (isWild) {
        const wildInfo = this.getWildAnimalInfo(classificationResult.label);
        return {
          isWild: true,
          commonName: wildInfo.common,
          scientificName: wildInfo.scientific,
          confidence: classificationResult.confidence,
          apiSource: 'enhanced-multi-api'
        };
      } else {
        // Check if it might be a wild animal with low confidence
        if (classificationResult.confidence < 0.6) {
          const suggestions = this.generateSuggestions(classificationResult.label);
          return {
            isWild: false,
            message: "This is not a wild animal.",
            confidence: classificationResult.confidence,
            apiSource: 'enhanced-multi-api',
            suggestions: suggestions
          };
        }
        
        return {
          isWild: false,
          message: "This is not a wild animal.",
          confidence: classificationResult.confidence,
          apiSource: 'enhanced-multi-api'
        };
      }
      
    } catch (error) {
      console.error('Wildlife recognition error:', error);
      
      // Emergency fallback with suggestions
      return {
        isWild: false,
        message: "Classification temporarily unavailable. Please try again.",
        confidence: 0.1,
        apiSource: 'error-fallback',
        suggestions: [
          'Check your internet connection',
          'Try a clearer image',
          'Ensure the animal is clearly visible',
          'Try a different angle or lighting'
        ]
      };
    }
  }

  private isWildAnimal(label: string): boolean {
    const normalizedLabel = label.toLowerCase().trim();
    
    // Check if it's explicitly a domestic animal
    for (const domesticKey of Object.keys(DOMESTIC_SPECIES_DATABASE)) {
      if (normalizedLabel.includes(domesticKey) || domesticKey.includes(normalizedLabel)) {
        console.log(`🏠 Identified as domestic: ${domesticKey}`);
        return false;
      }
    }
    
    // Check if it's a known wild animal
    for (const wildKey of Object.keys(WILD_SPECIES_DATABASE)) {
      if (normalizedLabel.includes(wildKey) || wildKey.includes(normalizedLabel)) {
        console.log(`🦁 Identified as wild: ${wildKey}`);
        return true;
      }
    }
    
    // Additional heuristics for wild animals
    const wildIndicators = [
      'wild', 'safari', 'jungle', 'forest', 'savanna', 'arctic', 'marine',
      'predator', 'prey', 'endangered', 'conservation', 'habitat', 'species'
    ];
    
    const domesticIndicators = [
      'pet', 'domestic', 'farm', 'livestock', 'house', 'home', 'bred',
      'trained', 'tame', 'companion', 'breed'
    ];
    
    const hasWildIndicators = wildIndicators.some(indicator => 
      normalizedLabel.includes(indicator)
    );
    
    const hasDomesticIndicators = domesticIndicators.some(indicator => 
      normalizedLabel.includes(indicator)
    );
    
    if (hasDomesticIndicators && !hasWildIndicators) {
      console.log(`🏠 Domestic indicators found: ${normalizedLabel}`);
      return false;
    }
    
    if (hasWildIndicators && !hasDomesticIndicators) {
      console.log(`🌿 Wild indicators found: ${normalizedLabel}`);
      return true;
    }
    
    // For ambiguous cases, check if it contains animal-related terms
    const animalTerms = ['animal', 'mammal', 'bird', 'reptile', 'amphibian', 'insect'];
    const hasAnimalTerms = animalTerms.some(term => normalizedLabel.includes(term));
    
    if (hasAnimalTerms) {
      console.log(`❓ Ambiguous animal classification, defaulting to wild: ${normalizedLabel}`);
      return true;
    }
    
    // Default to not wild for non-animal classifications
    console.log(`❌ Not classified as animal: ${normalizedLabel}`);
    return false;
  }

  private getWildAnimalInfo(label: string): { common: string; scientific: string } {
    const normalizedLabel = label.toLowerCase().trim();
    
    // Find exact or partial match in wild species database
    for (const [key, info] of Object.entries(WILD_SPECIES_DATABASE)) {
      if (normalizedLabel.includes(key) || key.includes(normalizedLabel)) {
        return info;
      }
    }
    
    // If no match found, create generic wild animal info
    const capitalizedLabel = label.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
    
    return {
      common: capitalizedLabel,
      scientific: `${capitalizedLabel.split(' ')[0]} species`
    };
  }

  private generateSuggestions(label: string): string[] {
    const suggestions = [
      'Try uploading a clearer image',
      'Ensure the animal is the main subject',
      'Check lighting and image quality',
      'Try a different angle or closer shot'
    ];

    // Add specific suggestions based on classification
    if (label.toLowerCase().includes('blur') || label.toLowerCase().includes('unclear')) {
      suggestions.unshift('Image appears blurry - try a sharper photo');
    }

    if (label.toLowerCase().includes('dark') || label.toLowerCase().includes('shadow')) {
      suggestions.unshift('Image appears too dark - try better lighting');
    }

    return suggestions.slice(0, 4); // Return top 4 suggestions
  }

  getSupportedWildSpeciesCount(): number {
    return Object.keys(WILD_SPECIES_DATABASE).length;
  }

  getSupportedDomesticSpeciesCount(): number {
    return Object.keys(DOMESTIC_SPECIES_DATABASE).length;
  }

  // Get all supported wild species for testing
  getAllWildSpecies(): string[] {
    return Object.keys(WILD_SPECIES_DATABASE);
  }

  // Get all supported domestic species for testing
  getAllDomesticSpecies(): string[] {
    return Object.keys(DOMESTIC_SPECIES_DATABASE);
  }

  // Get API metrics
  getAPIMetrics() {
    return this.apiService.getAPIMetrics();
  }

  // Reset failed APIs
  resetFailedAPIs() {
    this.apiService.resetFailedAPIs();
  }
}