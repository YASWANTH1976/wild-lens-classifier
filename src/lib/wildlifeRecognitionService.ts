interface WildlifeRecognitionResult {
  isWild: boolean;
  commonName?: string;
  scientificName?: string;
  message?: string;
}

export class WildlifeRecognitionService {
  // Database of wild animals with their common and scientific names
  private wildAnimalsDatabase: Record<string, { commonName: string; scientificName: string }> = {
    // Big Cats
    'tiger': { commonName: 'Bengal Tiger', scientificName: 'Panthera tigris tigris' },
    'lion': { commonName: 'African Lion', scientificName: 'Panthera leo' },
    'leopard': { commonName: 'African Leopard', scientificName: 'Panthera pardus' },
    'cheetah': { commonName: 'Cheetah', scientificName: 'Acinonyx jubatus' },
    'jaguar': { commonName: 'Jaguar', scientificName: 'Panthera onca' },
    'lynx': { commonName: 'Eurasian Lynx', scientificName: 'Lynx lynx' },
    'cougar': { commonName: 'Cougar', scientificName: 'Puma concolor' },
    'snow leopard': { commonName: 'Snow Leopard', scientificName: 'Panthera uncia' },
    
    // Bears
    'bear': { commonName: 'American Black Bear', scientificName: 'Ursus americanus' },
    'grizzly bear': { commonName: 'Grizzly Bear', scientificName: 'Ursus arctos horribilis' },
    'panda': { commonName: 'Giant Panda', scientificName: 'Ailuropoda melanoleuca' },
    
    // Canids
    'wolf': { commonName: 'Gray Wolf', scientificName: 'Canis lupus' },
    'fox': { commonName: 'Red Fox', scientificName: 'Vulpes vulpes' },
    'coyote': { commonName: 'Coyote', scientificName: 'Canis latrans' },
    'jackal': { commonName: 'Golden Jackal', scientificName: 'Canis aureus' },
    
    // Elephants and Rhinos
    'elephant': { commonName: 'African Elephant', scientificName: 'Loxodonta africana' },
    'rhino': { commonName: 'White Rhinoceros', scientificName: 'Ceratotherium simum' },
    'rhinoceros': { commonName: 'White Rhinoceros', scientificName: 'Ceratotherium simum' },
    'black rhino': { commonName: 'Black Rhinoceros', scientificName: 'Diceros bicornis' },
    
    // Herbivores
    'giraffe': { commonName: 'Northern Giraffe', scientificName: 'Giraffa camelopardalis' },
    'zebra': { commonName: 'Plains Zebra', scientificName: 'Equus quagga' },
    'hippo': { commonName: 'Hippopotamus', scientificName: 'Hippopotamus amphibius' },
    'hippopotamus': { commonName: 'Hippopotamus', scientificName: 'Hippopotamus amphibius' },
    'buffalo': { commonName: 'African Buffalo', scientificName: 'Syncerus caffer' },
    'deer': { commonName: 'White-tailed Deer', scientificName: 'Odocoileus virginianus' },
    'moose': { commonName: 'Moose', scientificName: 'Alces alces' },
    'elk': { commonName: 'Elk', scientificName: 'Cervus canadensis' },
    'antelope': { commonName: 'Impala', scientificName: 'Aepyceros melampus' },
    'wildebeest': { commonName: 'Blue Wildebeest', scientificName: 'Connochaetes taurinus' },
    'gazelle': { commonName: "Thomson's Gazelle", scientificName: 'Gazella thomsonii' },
    'oryx': { commonName: 'Gemsbok', scientificName: 'Oryx gazella' },
    
    // Primates
    'gorilla': { commonName: 'Western Gorilla', scientificName: 'Gorilla gorilla' },
    'chimpanzee': { commonName: 'Common Chimpanzee', scientificName: 'Pan troglodytes' },
    'orangutan': { commonName: 'Bornean Orangutan', scientificName: 'Pongo pygmaeus' },
    'monkey': { commonName: 'Rhesus Macaque', scientificName: 'Macaca mulatta' },
    'baboon': { commonName: 'Olive Baboon', scientificName: 'Papio anubis' },
    'lemur': { commonName: 'Ring-tailed Lemur', scientificName: 'Lemur catta' },
    
    // Marine Mammals
    'whale': { commonName: 'Blue Whale', scientificName: 'Balaenoptera musculus' },
    'dolphin': { commonName: 'Bottlenose Dolphin', scientificName: 'Tursiops truncatus' },
    'seal': { commonName: 'Harbor Seal', scientificName: 'Phoca vitulina' },
    'sea lion': { commonName: 'California Sea Lion', scientificName: 'Zalophus californianus' },
    'walrus': { commonName: 'Pacific Walrus', scientificName: 'Odobenus rosmarus' },
    'otter': { commonName: 'Sea Otter', scientificName: 'Enhydra lutris' },
    
    // Birds of Prey
    'eagle': { commonName: 'Bald Eagle', scientificName: 'Haliaeetus leucocephalus' },
    'hawk': { commonName: 'Red-tailed Hawk', scientificName: 'Buteo jamaicensis' },
    'owl': { commonName: 'Great Horned Owl', scientificName: 'Bubo virginianus' },
    'falcon': { commonName: 'Peregrine Falcon', scientificName: 'Falco peregrinus' },
    'vulture': { commonName: 'Turkey Vulture', scientificName: 'Cathartes aura' },
    
    // Other Birds
    'penguin': { commonName: 'King Penguin', scientificName: 'Aptenodytes patagonicus' },
    'flamingo': { commonName: 'Greater Flamingo', scientificName: 'Phoenicopterus roseus' },
    'peacock': { commonName: 'Indian Peafowl', scientificName: 'Pavo cristatus' },
    'ostrich': { commonName: 'Common Ostrich', scientificName: 'Struthio camelus' },
    'emu': { commonName: 'Emu', scientificName: 'Dromaius novaehollandiae' },
    'crane': { commonName: 'Sandhill Crane', scientificName: 'Grus canadensis' },
    
    // Reptiles
    'crocodile': { commonName: 'Nile Crocodile', scientificName: 'Crocodylus niloticus' },
    'alligator': { commonName: 'American Alligator', scientificName: 'Alligator mississippiensis' },
    'snake': { commonName: 'Ball Python', scientificName: 'Python regius' },
    'lizard': { commonName: 'Komodo Dragon', scientificName: 'Varanus komodoensis' },
    'turtle': { commonName: 'Green Sea Turtle', scientificName: 'Chelonia mydas' },
    'tortoise': { commonName: 'Galapagos Tortoise', scientificName: 'Chelonoidis nigra' },
    
    // Amphibians
    'frog': { commonName: 'American Bullfrog', scientificName: 'Lithobates catesbeianus' },
    'salamander': { commonName: 'Spotted Salamander', scientificName: 'Ambystoma maculatum' },
    'newt': { commonName: 'Eastern Newt', scientificName: 'Notophthalmus viridescens' },
    
    // Marine Life
    'shark': { commonName: 'Great White Shark', scientificName: 'Carcharodon carcharias' },
    'octopus': { commonName: 'Common Octopus', scientificName: 'Octopus vulgaris' },
    'squid': { commonName: 'Giant Squid', scientificName: 'Architeuthis dux' },
    'jellyfish': { commonName: 'Moon Jellyfish', scientificName: 'Aurelia aurita' },
    'coral': { commonName: 'Staghorn Coral', scientificName: 'Acropora cervicornis' },
    
    // Insects and Arachnids
    'butterfly': { commonName: 'Monarch Butterfly', scientificName: 'Danaus plexippus' },
    'bee': { commonName: 'European Honey Bee', scientificName: 'Apis mellifera' },
    'spider': { commonName: 'Black Widow Spider', scientificName: 'Latrodectus mactans' },
    'scorpion': { commonName: 'Arizona Bark Scorpion', scientificName: 'Centruroides sculpturatus' },
    
    // Australian Wildlife
    'kangaroo': { commonName: 'Red Kangaroo', scientificName: 'Osphranter rufus' },
    'koala': { commonName: 'Koala', scientificName: 'Phascolarctos cinereus' },
    'wombat': { commonName: 'Common Wombat', scientificName: 'Vombatus ursinus' },
    'platypus': { commonName: 'Platypus', scientificName: 'Ornithorhynchus anatinus' },
    'echidna': { commonName: 'Short-beaked Echidna', scientificName: 'Tachyglossus aculeatus' },
    
    // Other Unique Animals
    'sloth': { commonName: 'Three-toed Sloth', scientificName: 'Bradypus tridactylus' },
    'armadillo': { commonName: 'Nine-banded Armadillo', scientificName: 'Dasypus novemcinctus' },
    'anteater': { commonName: 'Giant Anteater', scientificName: 'Myrmecophaga tridactyla' },
    'pangolin': { commonName: 'Chinese Pangolin', scientificName: 'Manis pentadactyla' },
    'hedgehog': { commonName: 'European Hedgehog', scientificName: 'Erinaceus europaeus' },
    'porcupine': { commonName: 'North American Porcupine', scientificName: 'Erethizon dorsatum' },
    
    // Arctic Animals
    'polar bear': { commonName: 'Polar Bear', scientificName: 'Ursus maritimus' },
    'arctic fox': { commonName: 'Arctic Fox', scientificName: 'Vulpes lagopus' },
    'snowy owl': { commonName: 'Snowy Owl', scientificName: 'Bubo scandiacus' },
    'reindeer': { commonName: 'Reindeer', scientificName: 'Rangifer tarandus' },
    'caribou': { commonName: 'Caribou', scientificName: 'Rangifer tarandus' },
    
    // Desert Animals
    'camel': { commonName: 'Dromedary Camel', scientificName: 'Camelus dromedarius' },
    'fennec fox': { commonName: 'Fennec Fox', scientificName: 'Vulpes zerda' },
    'meerkat': { commonName: 'Meerkat', scientificName: 'Suricata suricatta' },
    'addax': { commonName: 'Addax', scientificName: 'Addax nasomaculatus' }
  };

  // Database of domestic/non-wild animals
  private domesticAnimals: Set<string> = new Set([
    'dog', 'cat', 'horse', 'cow', 'pig', 'sheep', 'goat', 'chicken', 'duck', 'turkey',
    'rabbit', 'hamster', 'guinea pig', 'gerbil', 'mouse', 'rat', 'ferret', 'parrot',
    'canary', 'budgie', 'goldfish', 'koi', 'tropical fish', 'guinea fowl', 'pigeon',
    'dove', 'geese', 'goose', 'swan', 'llama', 'alpaca', 'donkey', 'mule', 'yak',
    'bison', 'buffalo', 'ox', 'bull', 'calf', 'kitten', 'puppy', 'foal', 'piglet',
    'lamb', 'kid', 'chick', 'duckling', 'gosling', 'cygnet', 'calf', 'fawn', 'cub',
    'kitten', 'puppy', 'foal', 'piglet', 'lamb', 'kid', 'chick', 'duckling', 'gosling',
    'cygnet', 'calf', 'fawn', 'cub', 'kitten', 'puppy', 'foal', 'piglet', 'lamb',
    'kid', 'chick', 'duckling', 'gosling', 'cygnet', 'calf', 'fawn', 'cub'
  ]);

  async recognizeWildlife(imageFile: File): Promise<WildlifeRecognitionResult> {
    try {
      // Use the existing classification service to get the initial result
      const { HuggingFaceService } = await import('./huggingFaceService');
      const huggingFaceService = new HuggingFaceService();
      
      const classificationResult = await huggingFaceService.classifyAnimal(imageFile);
      const animalLabel = classificationResult.label.toLowerCase();
      
      // Check if it's a domestic animal
      if (this.isDomesticAnimal(animalLabel)) {
        return {
          isWild: false,
          message: 'This is not a wild animal.'
        };
      }
      
      // Check if it's a wild animal
      const wildAnimalInfo = this.getWildAnimalInfo(animalLabel);
      if (wildAnimalInfo) {
        return {
          isWild: true,
          commonName: wildAnimalInfo.commonName,
          scientificName: wildAnimalInfo.scientificName
        };
      }
      
      // If not found in either database, assume it's not a wild animal
      return {
        isWild: false,
        message: 'This is not a wild animal.'
      };
      
    } catch (error) {
      console.error('Wildlife recognition error:', error);
      return {
        isWild: false,
        message: 'This is not a wild animal.'
      };
    }
  }

  private isDomesticAnimal(animalLabel: string): boolean {
    // Check exact matches
    if (this.domesticAnimals.has(animalLabel)) {
      return true;
    }
    
    // Check partial matches
    for (const domesticAnimal of this.domesticAnimals) {
      if (animalLabel.includes(domesticAnimal) || domesticAnimal.includes(animalLabel)) {
        return true;
      }
    }
    
    return false;
  }

  private getWildAnimalInfo(animalLabel: string): { commonName: string; scientificName: string } | null {
    // Check exact matches first
    if (this.wildAnimalsDatabase[animalLabel]) {
      return this.wildAnimalsDatabase[animalLabel];
    }
    
    // Check partial matches
    for (const [key, value] of Object.entries(this.wildAnimalsDatabase)) {
      if (animalLabel.includes(key) || key.includes(animalLabel)) {
        return value;
      }
    }
    
    return null;
  }

  getSupportedWildSpeciesCount(): number {
    return Object.keys(this.wildAnimalsDatabase).length;
  }
}