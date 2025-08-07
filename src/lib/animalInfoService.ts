interface AnimalInfo {
  description: string;
  diet: string;
  size: string;
  conservationStatus: string;
  interestingFacts: string[];
  habitat: string;
  lifespan: string;
  weight: string;
  dangerousFoods: string[];
  nativeLocations: string[];
  wikipediaUrl: string;
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
    nativeLocations: ['India', 'China', 'Southeast Asia', 'Russia (Siberia)', 'Bangladesh', 'Nepal', 'Bhutan', 'Myanmar'],
    dangerousFoods: ['Chocolate', 'Onions', 'Garlic', 'Grapes', 'Processed meat', 'Dairy products', 'Any human food'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Tiger',
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
    nativeLocations: ['Kenya', 'Tanzania', 'South Africa', 'Botswana', 'Zambia', 'Zimbabwe', 'Namibia', 'India (Gir Forest)'],
    dangerousFoods: ['Chocolate', 'Onions', 'Garlic', 'Grapes', 'Processed meat', 'Dairy products', 'Cooked bones', 'Human food'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Lion',
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
    nativeLocations: ['Kenya', 'Tanzania', 'Botswana', 'Zimbabwe', 'South Africa', 'India', 'Sri Lanka', 'Thailand', 'Myanmar'],
    dangerousFoods: ['Chocolate', 'Processed foods', 'Sugary treats', 'Bread', 'Meat', 'Dairy products', 'Alcohol', 'Caffeine'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Elephant',
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
    nativeLocations: ['North America', 'Europe', 'Asia', 'Africa', 'Australia (some species)'],
    dangerousFoods: ['Chocolate', 'Caffeine', 'Avocado', 'Onions', 'Processed foods', 'Human medication', 'Bread'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Eagle',
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
    nativeLocations: ['Canada', 'Alaska', 'Russia', 'Mongolia', 'Eastern Europe', 'Scandinavia', 'Northern US'],
    dangerousFoods: ['Chocolate', 'Onions', 'Garlic', 'Grapes', 'Cooked bones', 'Human medication', 'Processed foods'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Wolf',
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
    nativeLocations: ['North America', 'Europe', 'Asia', 'Arctic (Polar Bears)', 'Scandinavia', 'Russia', 'China'],
    dangerousFoods: ['Chocolate', 'Processed foods', 'Sugary treats', 'Human food', 'Cooked bones', 'Dairy products'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Bear',
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
    nativeLocations: ['North America', 'Europe', 'Asia', 'South America', 'New Zealand', 'Australia'],
    dangerousFoods: ['Chocolate', 'Bread', 'Processed foods', 'Dairy products', 'Human snacks', 'Sugary treats'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Deer',
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
    nativeLocations: ['Europe', 'Asia', 'North America', 'Australia', 'Africa', 'Arctic regions'],
    dangerousFoods: ['Chocolate', 'Onions', 'Garlic', 'Grapes', 'Processed foods', 'Dairy products', 'Human food'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Fox',
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
    nativeLocations: ['Worldwide (all continents except Antarctica)', 'North America', 'Europe', 'Asia', 'Africa', 'Australia'],
    dangerousFoods: ['Chocolate', 'Caffeine', 'Avocado', 'Onions', 'Human medication', 'Processed foods', 'Bread'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Owl',
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
    nativeLocations: ['Worldwide (all continents except Antarctica)', 'Tropical regions', 'Temperate zones', 'Gardens globally'],
    dangerousFoods: ['Pesticides', 'Chemical fertilizers', 'Polluted water', 'Non-native plants', 'Processed sugar'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Butterfly',
    interestingFacts: [
      'Butterflies taste with their feet and smell with their antennae',
      'They can see ultraviolet, red, green, and yellow light',
      'Monarch butterflies migrate up to 4,800 km (3,000 miles)',
      'Some butterflies have eye-spots on their wings to confuse predators',
      'They are cold-blooded and need warmth to fly'
    ]
  },
  'leopard': {
    description: 'Leopards are solitary, adaptable big cats known for their spotted coat and incredible climbing abilities. They are excellent hunters that can adapt to various habitats.',
    diet: 'Carnivore - antelopes, deer, wild boar, fish, and birds',
    size: '1.0-1.9 meters (3.3-6.2 feet) in length',
    weight: '28-90 kg (62-198 lbs)',
    lifespan: '12-17 years in wild, up to 23 years in captivity',
    conservationStatus: 'Near Threatened',
    habitat: 'Rainforests, grasslands, mountains, and deserts across Africa and Asia',
    nativeLocations: ['Sub-Saharan Africa', 'India', 'China', 'Southeast Asia', 'Russia', 'Central Asia'],
    dangerousFoods: ['Chocolate', 'Onions', 'Garlic', 'Grapes', 'Processed meat', 'Dairy products', 'Human food'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Leopard',
    interestingFacts: [
      'Leopards can carry prey twice their body weight up into trees',
      'They are excellent swimmers and climbers',
      'Black panthers are actually leopards with melanism',
      'Leopards have the largest distribution of any wild land animal except humans',
      'They can leap 6 meters horizontally and 3 meters vertically'
    ]
  },
  'cheetah': {
    description: 'Cheetahs are the fastest land animals, built for speed with their lean body, long legs, and distinctive spotted coat. They hunt during the day using incredible acceleration.',
    diet: 'Carnivore - gazelles, impalas, springboks, and other small antelopes',
    size: '1.1-1.5 meters (3.6-4.9 feet) in length',
    weight: '21-72 kg (46-159 lbs)',
    lifespan: '8-12 years in wild, up to 17 years in captivity',
    conservationStatus: 'Vulnerable',
    habitat: 'African savannas, grasslands, and semi-desert regions',
    nativeLocations: ['Eastern Africa', 'Southern Africa', 'Small population in Iran'],
    dangerousFoods: ['Chocolate', 'Onions', 'Garlic', 'Grapes', 'Processed foods', 'Dairy products', 'Human food'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Cheetah',
    interestingFacts: [
      'Cheetahs can accelerate from 0 to 96 km/h (60 mph) in 3 seconds',
      'They can only maintain top speed for 30 seconds before overheating',
      'Cheetahs cannot roar - they chirp, purr, and meow like house cats',
      'Their claws are semi-retractable, providing traction while running',
      'They have distinctive "tear marks" from eyes to mouth'
    ]
  },
  'rhinoceros': {
    description: 'Rhinoceroses are large, thick-skinned herbivores known for their horns made of keratin. They are among the largest land mammals and play crucial roles in their ecosystems.',
    diet: 'Herbivore - grasses, shoots, leaves, and fruits',
    size: '2.5-4.0 meters (8.2-13.1 feet) in length',
    weight: '800-2,300 kg (1,760-5,070 lbs)',
    lifespan: '35-50 years in wild',
    conservationStatus: 'Critically Endangered to Near Threatened (varies by species)',
    habitat: 'Grasslands, savannas, tropical forests, and wetlands',
    nativeLocations: ['Africa', 'India', 'Nepal', 'Indonesia', 'Malaysia'],
    dangerousFoods: ['Processed foods', 'Chocolate', 'Human food', 'Toxic plants', 'Pesticides'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Rhinoceros',
    interestingFacts: [
      'Rhino horns are made of keratin, the same material as human fingernails',
      'They can run up to 55 km/h (34 mph) despite their size',
      'Rhinos have poor eyesight but excellent hearing and smell',
      'They wallow in mud to protect their skin from sun and insects',
      'A group of rhinos is called a crash'
    ]
  },
  'hippopotamus': {
    description: 'Hippos are large, semi-aquatic mammals that spend most of their day in water. Despite their docile appearance, they are among the most dangerous animals in Africa.',
    diet: 'Herbivore - grasses (up to 35 kg per night)',
    size: '2.9-5.05 meters (9.5-16.6 feet) in length',
    weight: '1,300-4,000 kg (2,870-8,820 lbs)',
    lifespan: '40-50 years in wild',
    conservationStatus: 'Vulnerable',
    habitat: 'Rivers, lakes, and wetlands in sub-Saharan Africa',
    nativeLocations: ['Sub-Saharan Africa', 'Nile River region', 'East Africa', 'Southern Africa'],
    dangerousFoods: ['Human food', 'Processed foods', 'Meat', 'Dairy products', 'Toxic aquatic plants'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Hippopotamus',
    interestingFacts: [
      'Hippos secrete a natural sunscreen that appears red',
      'They can hold their breath underwater for up to 5 minutes',
      'Baby hippos are born underwater and must swim to the surface to breathe',
      'Hippos can run up to 48 km/h (30 mph) on land',
      'They are responsible for more human deaths in Africa than most other animals'
    ]
  },
  'penguin': {
    description: 'Penguins are flightless seabirds adapted for life in the water. They are excellent swimmers with streamlined bodies and distinctive black and white coloring.',
    diet: 'Carnivore - fish, krill, squid, and other marine organisms',
    size: '30-120 cm (12-47 inches) in height',
    weight: '1-45 kg (2.2-99 lbs) depending on species',
    lifespan: '6-30 years depending on species',
    conservationStatus: 'Varies by species (Least Concern to Endangered)',
    habitat: 'Antarctic and sub-Antarctic regions, southern coasts',
    nativeLocations: ['Antarctica', 'Argentina', 'Chile', 'South Africa', 'Australia', 'New Zealand'],
    dangerousFoods: ['Human food', 'Bread', 'Processed foods', 'Plastic debris', 'Oil contamination'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Penguin',
    interestingFacts: [
      'Penguins can swim up to 35 km/h (22 mph)',
      'They can dive up to 500 meters deep for food',
      'Emperor penguins can hold their breath for over 20 minutes',
      'They huddle together for warmth in temperatures as low as -40°C',
      'Penguins have excellent underwater vision'
    ]
  },
  'shark': {
    description: 'Sharks are cartilaginous fish that have existed for over 400 million years. They are apex predators with keen senses and play crucial roles in marine ecosystems.',
    diet: 'Carnivore - fish, seals, squid, and marine mammals',
    size: '17 cm to 12 meters (6.7 inches to 39 feet) depending on species',
    weight: '0.15-34,000 kg (0.33-75,000 lbs) depending on species',
    lifespan: '20-150+ years depending on species',
    conservationStatus: 'Varies by species (many are threatened)',
    habitat: 'Oceans worldwide, from surface waters to deep sea',
    nativeLocations: ['All oceans worldwide', 'Some freshwater systems'],
    dangerousFoods: ['Plastic debris', 'Fishing lines', 'Chemical pollutants', 'Human interference'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Shark',
    interestingFacts: [
      'Sharks have been around longer than dinosaurs',
      'They can detect electrical fields from other animals',
      'Sharks never stop swimming - they need water flow over their gills',
      'They can detect a drop of blood in 25 gallons of water',
      'Some sharks can live for over 400 years'
    ]
  },
  'monkey': {
    description: 'Monkeys are intelligent primates with diverse species found in tropical regions. They are highly social animals with complex communication systems and tool use abilities.',
    diet: 'Omnivore - fruits, leaves, insects, seeds, and occasionally small animals',
    size: '12-100 cm (5-39 inches) in body length',
    weight: '0.15-50 kg (0.33-110 lbs) depending on species',
    lifespan: '10-50 years depending on species',
    conservationStatus: 'Varies by species (many endangered)',
    habitat: 'Tropical rainforests, savannas, and mountains',
    nativeLocations: ['Central and South America', 'Africa', 'Asia'],
    dangerousFoods: ['Chocolate', 'Onions', 'Garlic', 'Processed foods', 'Alcohol', 'Caffeine', 'Human food'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Monkey',
    interestingFacts: [
      'Some monkeys can use tools and solve complex problems',
      'They have prehensile tails that act like a fifth hand',
      'Monkeys show emotions and can form lifelong friendships',
      'They have excellent color vision and depth perception',
      'Some species have been observed teaching their young'
    ]
  },
  'kangaroo': {
    description: 'Kangaroos are large marsupials known for their powerful hind legs and hopping locomotion. They are iconic Australian animals with unique reproductive methods.',
    diet: 'Herbivore - grasses, leaves, shoots, and fruits',
    size: '0.6-1.6 meters (2-5.25 feet) in body length',
    weight: '0.5-90 kg (1.1-198 lbs) depending on species',
    lifespan: '12-25 years',
    conservationStatus: 'Least Concern to Near Threatened (varies by species)',
    habitat: 'Grasslands, forests, woodlands, and scrublands',
    nativeLocations: ['Australia', 'Tasmania', 'New Guinea'],
    dangerousFoods: ['Human food', 'Bread', 'Processed foods', 'Chocolate', 'Onions'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Kangaroo',
    interestingFacts: [
      'Kangaroos can hop at speeds up to 70 km/h (43 mph)',
      'They cannot walk backward due to their leg structure',
      'Baby kangaroos are only 2 cm long at birth',
      'They can pause their pregnancy if environmental conditions are poor',
      'Kangaroos are excellent swimmers'
    ]
  },
  'koala': {
    description: 'Koalas are arboreal marsupials known for their eucalyptus diet and sleepy nature. They spend most of their time in trees and are endemic to Australia.',
    diet: 'Herbivore - eucalyptus leaves (almost exclusively)',
    size: '60-85 cm (24-33 inches) in body length',
    weight: '4-15 kg (9-33 lbs)',
    lifespan: '12-18 years in wild',
    conservationStatus: 'Vulnerable',
    habitat: 'Eucalyptus forests and woodlands',
    nativeLocations: ['Eastern and southeastern Australia'],
    dangerousFoods: ['Human food', 'Non-eucalyptus plants', 'Processed foods', 'Bread', 'Dairy'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Koala',
    interestingFacts: [
      'Koalas sleep 18-22 hours per day',
      'They rarely drink water - they get moisture from eucalyptus leaves',
      'Baby koalas eat their mother\'s feces to obtain gut bacteria',
      'They have fingerprints very similar to humans',
      'Koalas can eat poisonous eucalyptus leaves that would kill other animals'
    ]
  },
  'panda': {
    description: 'Giant pandas are beloved bears known for their distinctive black and white coloring and bamboo diet. They are a conservation success story and symbol of wildlife protection.',
    diet: 'Herbivore - bamboo (99% of diet), occasionally fish and small animals',
    size: '1.2-1.9 meters (4-6 feet) in length',
    weight: '70-120 kg (154-264 lbs)',
    lifespan: '14-20 years in wild, up to 35 years in captivity',
    conservationStatus: 'Vulnerable',
    habitat: 'Bamboo forests in central China',
    nativeLocations: ['Central China (Sichuan, Shaanxi, Gansu provinces)'],
    dangerousFoods: ['Human food', 'Processed foods', 'Meat', 'Dairy', 'Non-bamboo plants'],
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Giant_panda',
    interestingFacts: [
      'Pandas spend 12-16 hours a day eating bamboo',
      'They have a special "thumb" for gripping bamboo',
      'Newborn pandas are pink, blind, and smaller than a mouse',
      'Pandas can only digest about 17% of the bamboo they eat',
      'They are excellent climbers despite their bulky appearance'
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
        nativeLocations: ['Information not available'],
        dangerousFoods: ['Consult wildlife experts for feeding guidelines'],
        wikipediaUrl: data.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(animalName)}`,
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
      nativeLocations: ['Location data being researched'],
      dangerousFoods: ['Consult wildlife experts for feeding guidelines', 'Never feed wild animals without professional guidance'],
      wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(animalName)}`,
      interestingFacts: [
        'This species is part of our ongoing research database',
        'More information will be available as our AI system learns',
        'Consider contributing information about this species'
      ]
    };
  }
}