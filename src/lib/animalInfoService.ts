interface AnimalInfo {
  description: string;
  diet: string;
  size: string;
  conservationStatus: string;
  interestingFacts: string[];
  habitat: string;
  lifespan: string;
  weight: string;
}

// Comprehensive animal database
const animalDatabase: Record<string, AnimalInfo> = {
  'tiger': {
    description: 'Tigers are the largest wild cats in the world and one of the most iconic predators. Known for their distinctive orange coat with black stripes, tigers are solitary hunters that primarily hunt at dawn and dusk.',
    diet: 'Carnivore - primarily large ungulates such as deer, wild boar, and water buffalo',
    size: '2.5-3.9 meters (8.2-12.8 feet) in length',
    weight: '65-306 kg (143-675 lbs)',
    lifespan: '10-15 years in wild, up to 26 years in captivity',
    conservationStatus: 'Endangered',
    habitat: 'Tropical forests, grasslands, and mangrove swamps across Asia',
    interestingFacts: [
      'Each tiger has a unique stripe pattern, like human fingerprints',
      'Tigers can leap up to 10 meters horizontally',
      'They are excellent swimmers and enjoy cooling off in water',
      'A tiger\'s roar can be heard up to 3 kilometers away',
      'Tigers have night vision that is six times better than humans'
    ]
  },
  'lion': {
    description: 'Lions are social big cats known as the "king of the jungle," though they primarily inhabit savannas and grasslands. They live in groups called prides and are the only cats that hunt cooperatively.',
    diet: 'Carnivore - zebras, wildebeest, buffalo, and other large herbivores',
    size: '1.7-2.5 meters (5.6-8.2 feet) in length',
    weight: '120-250 kg (265-550 lbs)',
    lifespan: '10-14 years in wild, up to 20 years in captivity',
    conservationStatus: 'Vulnerable',
    habitat: 'African savannas, grasslands, and open woodlands',
    interestingFacts: [
      'Male lions can sleep up to 20 hours per day',
      'A lion\'s mane indicates age and health - darker manes mean stronger lions',
      'Lions can run up to 80 km/h (50 mph) in short bursts',
      'Female lions do most of the hunting for the pride',
      'Lions have been symbols of courage and strength for thousands of years'
    ]
  },
  'elephant': {
    description: 'Elephants are the largest land mammals on Earth, known for their intelligence, memory, and complex social structures. They play crucial roles in their ecosystems as keystone species.',
    diet: 'Herbivore - grasses, fruits, bark, and roots (up to 300kg per day)',
    size: '2.5-4 meters (8.2-13.1 feet) tall at shoulder',
    weight: '2,700-6,000 kg (6,000-13,200 lbs)',
    lifespan: '60-70 years in wild',
    conservationStatus: 'Endangered',
    habitat: 'African savannas, forests, and Asian tropical forests',
    interestingFacts: [
      'Elephants can recognize themselves in mirrors, showing self-awareness',
      'They mourn their dead and have been observed holding "vigils"',
      'An elephant\'s trunk contains over 40,000 muscles',
      'They can communicate through infrasonic rumbles over long distances',
      'Elephants are afraid of bees and farmers use this to protect crops'
    ]
  },
  'eagle': {
    description: 'Eagles are powerful birds of prey known for their keen eyesight, soaring flight, and impressive hunting abilities. They are symbols of freedom and strength in many cultures.',
    diet: 'Carnivore - fish, small mammals, birds, and carrion',
    size: 'Wingspan: 1.8-2.8 meters (6-9 feet)',
    weight: '3-7 kg (6.6-15.4 lbs)',
    lifespan: '20-30 years in wild',
    conservationStatus: 'Varies by species (Least Concern to Critically Endangered)',
    habitat: 'Mountains, forests, wetlands, and coastal areas worldwide',
    interestingFacts: [
      'Eagles can see up to 8 times farther than humans',
      'They can dive at speeds over 160 km/h (100 mph)',
      'Eagles mate for life and return to the same nest each year',
      'Their nests can weigh over 1 ton and be used for decades',
      'Baby eagles are called eaglets and take 4-5 years to develop adult plumage'
    ]
  },
  'wolf': {
    description: 'Wolves are highly social predators that live and hunt in packs. They are the ancestors of domestic dogs and play crucial roles in maintaining ecosystem balance.',
    diet: 'Carnivore - elk, deer, moose, smaller mammals, and occasionally fish',
    size: '1.05-1.6 meters (3.4-5.2 feet) in length',
    weight: '20-80 kg (44-176 lbs)',
    lifespan: '6-8 years in wild, up to 13 years in captivity',
    conservationStatus: 'Least Concern (varies by region)',
    habitat: 'Forests, tundra, grasslands, and mountains across the Northern Hemisphere',
    interestingFacts: [
      'Wolves have an incredible sense of smell, 100 times stronger than humans',
      'A wolf pack can travel 20-30 km (12-19 miles) per day',
      'They communicate through howls that can be heard 10 km away',
      'Wolves have a complex social hierarchy led by alpha pair',
      'They can exert pressure of 1,500 pounds per square inch with their bite'
    ]
  },
  'bear': {
    description: 'Bears are large, powerful omnivores found across various habitats. They are intelligent animals with excellent memories and problem-solving abilities.',
    diet: 'Omnivore - fish, berries, nuts, honey, small mammals, and vegetation',
    size: '1.3-3 meters (4.3-9.8 feet) in length',
    weight: '60-680 kg (130-1,500 lbs)',
    lifespan: '20-30 years in wild',
    conservationStatus: 'Varies by species (Least Concern to Critically Endangered)',
    habitat: 'Forests, mountains, tundra, and coastal areas across North America, Europe, and Asia',
    interestingFacts: [
      'Bears can run up to 60 km/h (37 mph) despite their size',
      'They have an excellent sense of smell, 7 times better than bloodhounds',
      'Bears can climb trees and are surprisingly good swimmers',
      'They hibernate for up to 7 months in colder regions',
      'Polar bears are the largest land predators on Earth'
    ]
  },
  'deer': {
    description: 'Deer are graceful herbivores known for their agility and alertness. Male deer grow antlers annually, which they shed and regrow each year.',
    diet: 'Herbivore - leaves, twigs, fruits, and grasses',
    size: '0.85-2.1 meters (2.8-6.9 feet) in length',
    weight: '30-300 kg (66-660 lbs)',
    lifespan: '10-20 years in wild',
    conservationStatus: 'Mostly Least Concern',
    habitat: 'Forests, grasslands, and woodland edges worldwide',
    interestingFacts: [
      'Deer can jump up to 3 meters (10 feet) high and 9 meters (30 feet) long',
      'Male deer antlers can grow up to 2.5 cm (1 inch) per day',
      'They have a four-chambered stomach like cows',
      'Deer can run up to 65 km/h (40 mph)',
      'Baby deer are called fawns and are born with white spots for camouflage'
    ]
  },
  'fox': {
    description: 'Foxes are intelligent, adaptable canids known for their cunning nature and bushy tails. They are solitary hunters with excellent hearing and night vision.',
    diet: 'Omnivore - small mammals, birds, insects, fruits, and vegetables',
    size: '45-90 cm (18-35 inches) in body length',
    weight: '2.2-14 kg (5-31 lbs)',
    lifespan: '2-5 years in wild, up to 14 years in captivity',
    conservationStatus: 'Least Concern',
    habitat: 'Forests, grasslands, mountains, and urban areas across the Northern Hemisphere',
    interestingFacts: [
      'Foxes can hear low-frequency sounds and rodents digging underground',
      'They use Earth\'s magnetic field to hunt, like a living compass',
      'A group of foxes is called a skulk or leash',
      'Foxes have excellent night vision with eyes that glow in the dark',
      'They make over 40 different sounds to communicate'
    ]
  },
  'owl': {
    description: 'Owls are nocturnal birds of prey with exceptional hearing and silent flight. Their large eyes and facial discs help them hunt effectively in darkness.',
    diet: 'Carnivore - rodents, small mammals, birds, insects, and fish',
    size: '13-71 cm (5-28 inches) in length',
    weight: '40g-4.2kg (1.4oz-9.3lbs)',
    lifespan: '9-10 years in wild, up to 28 years in captivity',
    conservationStatus: 'Varies by species',
    habitat: 'Forests, deserts, wetlands, and grasslands worldwide',
    interestingFacts: [
      'Owls can rotate their heads 270 degrees',
      'They fly almost silently due to special feather adaptations',
      'Owls have asymmetrical ear openings for precise sound location',
      'They cannot move their eyes in their sockets - they must turn their heads',
      'Some owls can hunt in complete darkness using hearing alone'
    ]
  },
  'butterfly': {
    description: 'Butterflies are colorful insects known for their complete metamorphosis from caterpillars. They are important pollinators and symbols of transformation.',
    diet: 'Herbivore - nectar from flowers, rotting fruit, and minerals from soil',
    size: '1.3-28 cm (0.5-11 inches) wingspan',
    weight: '0.003-3 grams',
    lifespan: '2 weeks to 8 months (most species)',
    conservationStatus: 'Varies by species',
    habitat: 'Gardens, meadows, forests, and tropical regions worldwide',
    interestingFacts: [
      'Butterflies taste with their feet and smell with their antennae',
      'They can see ultraviolet, red, green, and yellow light',
      'Monarch butterflies migrate up to 4,800 km (3,000 miles)',
      'Some butterflies have eye-spots on their wings to confuse predators',
      'They are cold-blooded and need warmth to fly'
    ]
  }
};

export class AnimalInfoService {
  async getAnimalInfo(animalName: string): Promise<AnimalInfo> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const lowerName = animalName.toLowerCase();
    
    // Check direct match first
    if (animalDatabase[lowerName]) {
      return animalDatabase[lowerName];
    }
    
    // Check for partial matches
    for (const [key, info] of Object.entries(animalDatabase)) {
      if (lowerName.includes(key) || key.includes(lowerName)) {
        return info;
      }
    }
    
    // If no match found, try to fetch from Wikipedia API
    try {
      const wikipediaInfo = await this.fetchFromWikipedia(animalName);
      if (wikipediaInfo) {
        return wikipediaInfo;
      }
    } catch (error) {
      console.warn('Wikipedia API failed:', error);
    }
    
    // Return generic info if no match found
    return this.getGenericInfo(animalName);
  }

  private async fetchFromWikipedia(animalName: string): Promise<AnimalInfo | null> {
    try {
      const searchUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(animalName)}`;
      const response = await fetch(searchUrl);
      
      if (!response.ok) {
        throw new Error('Wikipedia API request failed');
      }
      
      const data = await response.json();
      
      return {
        description: data.extract || 'No description available from Wikipedia.',
        diet: 'Information not available',
        size: 'Information not available', 
        weight: 'Information not available',
        lifespan: 'Information not available',
        conservationStatus: 'Information not available',
        habitat: 'Information not available',
        interestingFacts: ['More information available on Wikipedia']
      };
    } catch (error) {
      console.error('Wikipedia fetch error:', error);
      return null;
    }
  }

  private getGenericInfo(animalName: string): AnimalInfo {
    return {
      description: `${animalName} is a fascinating species that plays an important role in its ecosystem. More detailed information is being gathered from our database and external sources.`,
      diet: 'Diet information not available',
      size: 'Size information not available',
      weight: 'Weight information not available', 
      lifespan: 'Lifespan information not available',
      conservationStatus: 'Conservation status being assessed',
      habitat: 'Habitat information not available',
      interestingFacts: [
        'This species is part of our ongoing research database',
        'More information will be available as our AI system learns',
        'Consider contributing information about this species'
      ]
    };
  }
}