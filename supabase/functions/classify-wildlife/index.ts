import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ClassificationResult {
  label: string;
  confidence: number;
  scientificName?: string;
  taxonomy?: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
}

// Enhanced wildlife species database with scientific names
const wildlifeDatabase: Record<string, {
  scientificName: string;
  taxonomy: {
    kingdom: string;
    phylum: string;
    class: string;
    order: string;
    family: string;
    genus: string;
    species: string;
  };
}> = {
  'tiger': {
    scientificName: 'Panthera tigris',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Panthera', species: 'P. tigris' }
  },
  'lion': {
    scientificName: 'Panthera leo',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Panthera', species: 'P. leo' }
  },
  'elephant': {
    scientificName: 'Loxodonta africana',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Proboscidea', family: 'Elephantidae', genus: 'Loxodonta', species: 'L. africana' }
  },
  'giraffe': {
    scientificName: 'Giraffa camelopardalis',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Artiodactyla', family: 'Giraffidae', genus: 'Giraffa', species: 'G. camelopardalis' }
  },
  'zebra': {
    scientificName: 'Equus zebra',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Perissodactyla', family: 'Equidae', genus: 'Equus', species: 'E. zebra' }
  },
  'leopard': {
    scientificName: 'Panthera pardus',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Panthera', species: 'P. pardus' }
  },
  'cheetah': {
    scientificName: 'Acinonyx jubatus',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Felidae', genus: 'Acinonyx', species: 'A. jubatus' }
  },
  'rhinoceros': {
    scientificName: 'Diceros bicornis',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Perissodactyla', family: 'Rhinocerotidae', genus: 'Diceros', species: 'D. bicornis' }
  },
  'bear': {
    scientificName: 'Ursus arctos',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Ursidae', genus: 'Ursus', species: 'U. arctos' }
  },
  'panda': {
    scientificName: 'Ailuropoda melanoleuca',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Ursidae', genus: 'Ailuropoda', species: 'A. melanoleuca' }
  },
  'wolf': {
    scientificName: 'Canis lupus',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Carnivora', family: 'Canidae', genus: 'Canis', species: 'C. lupus' }
  },
  'deer': {
    scientificName: 'Odocoileus virginianus',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Mammalia', order: 'Artiodactyla', family: 'Cervidae', genus: 'Odocoileus', species: 'O. virginianus' }
  },
  'eagle': {
    scientificName: 'Aquila chrysaetos',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Aves', order: 'Accipitriformes', family: 'Accipitridae', genus: 'Aquila', species: 'A. chrysaetos' }
  },
  'owl': {
    scientificName: 'Bubo bubo',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Aves', order: 'Strigiformes', family: 'Strigidae', genus: 'Bubo', species: 'B. bubo' }
  },
  'penguin': {
    scientificName: 'Aptenodytes forsteri',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Aves', order: 'Sphenisciformes', family: 'Spheniscidae', genus: 'Aptenodytes', species: 'A. forsteri' }
  },
  'snake': {
    scientificName: 'Python reticulatus',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Squamata', family: 'Pythonidae', genus: 'Python', species: 'P. reticulatus' }
  },
  'crocodile': {
    scientificName: 'Crocodylus niloticus',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Crocodilia', family: 'Crocodylidae', genus: 'Crocodylus', species: 'C. niloticus' }
  },
  'turtle': {
    scientificName: 'Chelonia mydas',
    taxonomy: { kingdom: 'Animalia', phylum: 'Chordata', class: 'Reptilia', order: 'Testudines', family: 'Cheloniidae', genus: 'Chelonia', species: 'C. mydas' }
  },
  'butterfly': {
    scientificName: 'Danaus plexippus',
    taxonomy: { kingdom: 'Animalia', phylum: 'Arthropoda', class: 'Insecta', order: 'Lepidoptera', family: 'Nymphalidae', genus: 'Danaus', species: 'D. plexippus' }
  },
  'bee': {
    scientificName: 'Apis mellifera',
    taxonomy: { kingdom: 'Animalia', phylum: 'Arthropoda', class: 'Insecta', order: 'Hymenoptera', family: 'Apidae', genus: 'Apis', species: 'A. mellifera' }
  }
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Get the API key from Supabase secrets
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const apiKey = Deno.env.get('GOOGLE_VISION_API_KEY')
    if (!apiKey) {
      throw new Error('Google Vision API key not configured')
    }

    const { imageData } = await req.json()
    
    if (!imageData) {
      throw new Error('No image data provided')
    }

    console.log('🔍 Analyzing image with Google Vision AI...')

    // Call Google Vision API
    const visionResponse = await fetch(`https://vision.googleapis.com/v1/images:annotate?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: imageData
            },
            features: [
              {
                type: 'LABEL_DETECTION',
                maxResults: 20
              },
              {
                type: 'OBJECT_LOCALIZATION',
                maxResults: 10
              }
            ]
          }
        ]
      })
    })

    if (!visionResponse.ok) {
      const errorText = await visionResponse.text()
      console.error('Google Vision API error:', errorText)
      throw new Error(`Google Vision API error: ${visionResponse.status}`)
    }

    const visionData = await visionResponse.json()
    const annotations = visionData.responses[0]
    
    if (!annotations || (!annotations.labelAnnotations && !annotations.localizedObjectAnnotations)) {
      throw new Error('No animals detected in image')
    }

    // Process results to find wildlife
    const results = []
    
    // Process label annotations
    if (annotations.labelAnnotations) {
      for (const label of annotations.labelAnnotations) {
        if (isWildlifeLabel(label.description)) {
          results.push({
            label: label.description.toLowerCase(),
            confidence: label.score,
            source: 'label'
          })
        }
      }
    }

    // Process object annotations
    if (annotations.localizedObjectAnnotations) {
      for (const obj of annotations.localizedObjectAnnotations) {
        if (isWildlifeLabel(obj.name)) {
          results.push({
            label: obj.name.toLowerCase(),
            confidence: obj.score,
            source: 'object'
          })
        }
      }
    }

    // Find best wildlife match
    const bestMatch = findBestWildlifeMatch(results)
    
    if (bestMatch) {
      console.log(`✅ Identified: ${bestMatch.label} (${(bestMatch.confidence * 100).toFixed(1)}%)`)
      
      return new Response(
        JSON.stringify(bestMatch),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    } else {
      // Return uncertain result with suggestions
      const suggestions = results.slice(0, 3).map(r => r.label).join(', ')
      
      const uncertainResult: ClassificationResult = {
        label: 'Species uncertain',
        confidence: 0.35,
        scientificName: suggestions ? `Possible: ${suggestions}` : 'Unable to identify with confidence'
      }
      
      return new Response(
        JSON.stringify(uncertainResult),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      )
    }

  } catch (error) {
    console.error('Classification error:', error)
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        label: 'Classification failed',
        confidence: 0.1,
        scientificName: 'Please try uploading a different image'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

function isWildlifeLabel(label: string): boolean {
  const lowerLabel = label.toLowerCase()
  
  // Wildlife keywords
  const wildlifeKeywords = [
    'animal', 'mammal', 'bird', 'reptile', 'amphibian', 'insect', 'wildlife',
    'tiger', 'lion', 'elephant', 'bear', 'wolf', 'deer', 'eagle', 'owl',
    'snake', 'crocodile', 'turtle', 'butterfly', 'bee', 'leopard', 'cheetah',
    'giraffe', 'zebra', 'rhinoceros', 'panda', 'penguin', 'fox', 'rabbit',
    'squirrel', 'chipmunk', 'raccoon', 'skunk', 'otter', 'seal', 'whale',
    'dolphin', 'shark', 'fish', 'frog', 'toad', 'lizard', 'gecko', 'iguana',
    'spider', 'ant', 'beetle', 'dragonfly', 'moth', 'wasp', 'hornet'
  ]
  
  // Exclude domestic animals unless specified as wild
  const domesticKeywords = ['dog', 'cat', 'cow', 'horse', 'pig', 'sheep', 'chicken', 'duck', 'goose']
  
  const hasWildlife = wildlifeKeywords.some(keyword => lowerLabel.includes(keyword))
  const hasDomestic = domesticKeywords.some(keyword => lowerLabel.includes(keyword))
  
  return hasWildlife && !hasDomestic
}

function findBestWildlifeMatch(results: any[]): ClassificationResult | null {
  if (results.length === 0) return null
  
  // Sort by confidence
  results.sort((a, b) => b.confidence - a.confidence)
  
  // Find best match in our database
  for (const result of results) {
    const match = findSpeciesMatch(result.label)
    if (match && result.confidence >= 0.6) {
      return {
        label: capitalizeFirst(match.key),
        confidence: result.confidence,
        scientificName: match.data.scientificName,
        taxonomy: match.data.taxonomy
      }
    }
  }
  
  // If no good match, return the highest confidence result
  const best = results[0]
  if (best.confidence >= 0.5) {
    return {
      label: capitalizeFirst(best.label),
      confidence: best.confidence,
      scientificName: `Unverified ${best.label}`
    }
  }
  
  return null
}

function findSpeciesMatch(label: string): { key: string, data: any } | null {
  const normalized = label.toLowerCase()
  
  // Direct match
  if (wildlifeDatabase[normalized]) {
    return { key: normalized, data: wildlifeDatabase[normalized] }
  }
  
  // Partial match
  for (const [key, data] of Object.entries(wildlifeDatabase)) {
    if (normalized.includes(key) || key.includes(normalized)) {
      return { key, data }
    }
  }
  
  return null
}

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}