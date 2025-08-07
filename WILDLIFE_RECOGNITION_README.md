# Wildlife Recognition System

## Overview

This is an expert wildlife recognition system that correctly classifies animals as wild or non-wild, providing specific information based on the classification.

## Features

### For Wild Animals
- **Common Name**: Returns the common name of the wild animal (e.g., "Bengal Tiger")
- **Scientific Name**: Returns the scientific name (e.g., "Panthera tigris tigris")

### For Non-Wild Animals
- **Message**: Returns "This is not a wild animal."

## How It Works

1. **Upload Image**: Users upload an image of an animal
2. **AI Analysis**: The system analyzes the image using AI models
3. **Classification**: Determines if the animal is wild or domestic/non-wild
4. **Results**: Returns only the required information based on classification

## Supported Wild Animals

The system recognizes 639+ wild animal species including:

### Big Cats
- Bengal Tiger, African Lion, African Leopard, Cheetah, Jaguar, Eurasian Lynx, Cougar, Snow Leopard

### Bears
- American Black Bear, Grizzly Bear, Giant Panda

### Canids
- Gray Wolf, Red Fox, Coyote, Golden Jackal

### Elephants and Rhinos
- African Elephant, White Rhinoceros, Black Rhinoceros

### Herbivores
- Northern Giraffe, Plains Zebra, Hippopotamus, African Buffalo, White-tailed Deer, Moose, Elk, Impala, Blue Wildebeest, Thomson's Gazelle

### Primates
- Western Gorilla, Common Chimpanzee, Bornean Orangutan, Rhesus Macaque, Olive Baboon, Ring-tailed Lemur

### Marine Mammals
- Blue Whale, Bottlenose Dolphin, Harbor Seal, California Sea Lion, Pacific Walrus, Sea Otter

### Birds of Prey
- Bald Eagle, Red-tailed Hawk, Great Horned Owl, Peregrine Falcon, Turkey Vulture

### Other Birds
- King Penguin, Greater Flamingo, Indian Peafowl, Common Ostrich, Emu, Sandhill Crane

### Reptiles
- Nile Crocodile, American Alligator, Ball Python, Komodo Dragon, Green Sea Turtle, Galapagos Tortoise

### Amphibians
- American Bullfrog, Spotted Salamander, Eastern Newt

### Marine Life
- Great White Shark, Common Octopus, Giant Squid, Moon Jellyfish, Staghorn Coral

### Insects and Arachnids
- Monarch Butterfly, European Honey Bee, Black Widow Spider, Arizona Bark Scorpion

### Australian Wildlife
- Red Kangaroo, Koala, Common Wombat, Platypus, Short-beaked Echidna

### Other Unique Animals
- Three-toed Sloth, Nine-banded Armadillo, Giant Anteater, Chinese Pangolin, European Hedgehog, North American Porcupine

### Arctic Animals
- Arctic Fox, Snowy Owl, Reindeer, Caribou

### Desert Animals
- Dromedary Camel, Fennec Fox, Meerkat, Addax

## Domestic/Non-Wild Animals

The system correctly identifies domestic animals such as:
- Dogs, Cats, Horses, Cows, Pigs, Sheep, Goats
- Chickens, Ducks, Turkeys, Rabbits, Hamsters
- Guinea Pigs, Gerbils, Mice, Rats, Ferrets
- Parrots, Canaries, Budgies, Goldfish, Koi
- And many other domestic animals

## Technical Implementation

### Components
- `WildlifeRecognitionClassifier`: Main UI component for image upload and results display
- `WildlifeRecognitionService`: Service that handles the classification logic

### Services
- Uses existing `HuggingFaceService` for initial image classification
- Implements custom logic to distinguish between wild and domestic animals
- Returns only the required information based on the classification

### Database
- Comprehensive database of 639+ wild animal species with common and scientific names
- Database of domestic animals for accurate classification

## Usage

1. Navigate to the application
2. Click "Start Recognition" or scroll to the classifier section
3. Upload an image of an animal
4. Click "Recognize Wildlife"
5. View the results:
   - For wild animals: Common Name and Scientific Name
   - For non-wild animals: "This is not a wild animal."

## Requirements Met

✅ **Wild Animal Recognition**: Returns Common Name and Scientific Name only
✅ **Non-Wild Animal Recognition**: Returns "This is not a wild animal." only
✅ **No Extra Information**: No descriptions, features, habitat, diet, or extra text
✅ **Accurate Classification**: Distinguishes between wild and domestic animals
✅ **Clean Interface**: Simple, focused UI for wildlife recognition

## Technology Stack

- React with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Hugging Face AI models for image classification
- Custom wildlife recognition logic