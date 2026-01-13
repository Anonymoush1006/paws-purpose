import { Dog, Cat, Fish, Bird, Rabbit } from 'lucide-react';

export type PetType = 'dog' | 'cat' | 'fish' | 'bird' | 'hamster' | 'rabbit' | 'guinea_pig' | 'turtle' | 'other';

export interface PetInfo {
  type: PetType;
  name: string;
  emoji: string;
  color: string;
  description: string;
  lifespan: string;
  careLevel: 'Easy' | 'Medium' | 'Advanced';
  spaceNeeded: string;
  dailyCare: string[];
  funFact: string;
  feedingGuide: {
    frequency: string;
    tips: string[];
  };
  grooming: {
    frequency: string;
    tips: string[];
  };
  exercise: {
    amount: string;
    activities: string[];
  };
  commonIssues: {
    title: string;
    solution: string;
  }[];
}

export const petDatabase: Record<PetType, PetInfo> = {
  dog: {
    type: 'dog',
    name: 'Dogs',
    emoji: '🐕',
    color: 'pet-dog',
    description: 'Dogs are loyal, loving companions who become part of your family. They need regular walks, playtime, and lots of love!',
    lifespan: '10-15 years',
    careLevel: 'Medium',
    spaceNeeded: 'Medium to Large (yard is helpful)',
    dailyCare: ['Feed twice daily', 'Fresh water always', 'Walk 30-60 min', 'Playtime', 'Potty breaks'],
    funFact: 'Dogs can learn over 100 words and gestures!',
    feedingGuide: {
      frequency: '2 times per day',
      tips: [
        'Use age-appropriate dog food',
        'Measure portions based on weight',
        'Avoid chocolate, grapes, and onions',
        'Keep water bowl fresh and full',
      ],
    },
    grooming: {
      frequency: 'Weekly brushing, monthly baths',
      tips: [
        'Brush coat regularly to prevent matting',
        'Trim nails every 2-4 weeks',
        'Clean ears weekly',
        'Brush teeth with dog toothpaste',
      ],
    },
    exercise: {
      amount: '30-60 minutes daily',
      activities: ['Walking', 'Playing fetch', 'Tug-of-war', 'Running', 'Swimming'],
    },
    commonIssues: [
      { title: 'Barking too much', solution: 'Train "quiet" command, ensure enough exercise and mental stimulation' },
      { title: 'Chewing furniture', solution: 'Provide appropriate chew toys, crate train when unsupervised' },
      { title: 'Jumping on people', solution: 'Ignore until calm, reward four-on-floor behavior' },
    ],
  },
  cat: {
    type: 'cat',
    name: 'Cats',
    emoji: '🐱',
    color: 'pet-cat',
    description: 'Cats are independent, curious, and affectionate pets. They groom themselves and enjoy both playtime and napping!',
    lifespan: '12-18 years',
    careLevel: 'Easy',
    spaceNeeded: 'Small to Medium (indoors)',
    dailyCare: ['Feed twice daily', 'Fresh water', 'Scoop litter box', 'Playtime', 'Brushing'],
    funFact: 'Cats spend 70% of their lives sleeping!',
    feedingGuide: {
      frequency: '2 times per day',
      tips: [
        'High-quality wet or dry cat food',
        'Avoid milk (most cats are lactose intolerant)',
        'Keep food and water away from litter box',
        'Measure portions to prevent obesity',
      ],
    },
    grooming: {
      frequency: 'Brush 2-3 times per week',
      tips: [
        'Short-haired cats need less brushing',
        'Long-haired cats may need daily brushing',
        'Trim nails every 2-3 weeks',
        'Check ears for wax buildup',
      ],
    },
    exercise: {
      amount: '15-30 minutes daily',
      activities: ['Feather toys', 'Laser pointers', 'Cat trees', 'Puzzle feeders', 'String toys'],
    },
    commonIssues: [
      { title: 'Scratching furniture', solution: 'Provide scratching posts, use deterrent sprays' },
      { title: 'Not using litter box', solution: 'Keep box clean, try different litter types, check for health issues' },
      { title: 'Biting during play', solution: 'Use toys instead of hands, stop play when biting occurs' },
    ],
  },
  fish: {
    type: 'fish',
    name: 'Fish',
    emoji: '🐟',
    color: 'pet-fish',
    description: 'Fish are peaceful pets that bring beauty and calm to your home. They require clean water and proper tank maintenance.',
    lifespan: '2-10 years (varies by species)',
    careLevel: 'Medium',
    spaceNeeded: 'Tank (5+ gallons recommended)',
    dailyCare: ['Feed once or twice', 'Check water temperature', 'Observe fish health', 'Top off water'],
    funFact: 'Goldfish can recognize their owners\' faces!',
    feedingGuide: {
      frequency: '1-2 times per day',
      tips: [
        'Feed only what they can eat in 2 minutes',
        'Use species-appropriate food',
        'Avoid overfeeding (common mistake!)',
        'Skip feeding one day per week',
      ],
    },
    grooming: {
      frequency: 'Weekly tank maintenance',
      tips: [
        'Change 25% of water weekly',
        'Clean algae from glass',
        'Rinse filter media monthly',
        'Test water parameters regularly',
      ],
    },
    exercise: {
      amount: 'Enrichment through environment',
      activities: ['Tank decorations', 'Live plants', 'Appropriate tank mates', 'Varied feeding spots'],
    },
    commonIssues: [
      { title: 'Cloudy water', solution: 'Check filter, reduce feeding, do partial water change' },
      { title: 'Fish not eating', solution: 'Check water temperature and quality, try different food' },
      { title: 'White spots on fish', solution: 'Could be ich disease - raise temperature, use treatment' },
    ],
  },
  bird: {
    type: 'bird',
    name: 'Birds',
    emoji: '🐦',
    color: 'pet-bird',
    description: 'Birds are intelligent, social pets that can learn tricks and some can even talk! They need mental stimulation and social interaction.',
    lifespan: '5-50+ years (varies greatly)',
    careLevel: 'Medium',
    spaceNeeded: 'Cage + flight time outside',
    dailyCare: ['Fresh food & water', 'Clean cage bottom', 'Social interaction', 'Out-of-cage time', 'Cover at night'],
    funFact: 'Parrots can learn hundreds of words and even use them in context!',
    feedingGuide: {
      frequency: 'Fresh food daily',
      tips: [
        'Pellets should be main diet',
        'Offer fresh fruits and vegetables',
        'Avoid avocado, chocolate, caffeine',
        'Change water multiple times daily',
      ],
    },
    grooming: {
      frequency: 'Weekly maintenance',
      tips: [
        'Provide bird bath or mist with water',
        'Wing clipping (optional, consult vet)',
        'Nail trimming as needed',
        'Perches help keep nails worn',
      ],
    },
    exercise: {
      amount: '2-4 hours outside cage daily',
      activities: ['Flying in safe room', 'Climbing toys', 'Foraging toys', 'Training sessions', 'Social interaction'],
    },
    commonIssues: [
      { title: 'Feather plucking', solution: 'Increase stimulation, check diet, consult avian vet' },
      { title: 'Screaming', solution: 'Establish routine, ignore screaming, reward quiet behavior' },
      { title: 'Biting', solution: 'Learn body language, use positive reinforcement training' },
    ],
  },
  hamster: {
    type: 'hamster',
    name: 'Hamsters',
    emoji: '🐹',
    color: 'pet-hamster',
    description: 'Hamsters are small, adorable pets that are active at night. They love running on wheels and storing food in their cheeks!',
    lifespan: '2-3 years',
    careLevel: 'Easy',
    spaceNeeded: 'Cage (minimum 450 sq inches)',
    dailyCare: ['Fresh food & water', 'Check food stash', 'Observe health', 'Handle gently', 'Empty wheel if dirty'],
    funFact: 'Hamsters can run up to 5 miles on their wheel in one night!',
    feedingGuide: {
      frequency: 'Once daily (evening)',
      tips: [
        'Commercial hamster mix as base',
        'Offer fresh veggies sparingly',
        'Avoid citrus and sugary foods',
        'They hoard food - don\'t overfill',
      ],
    },
    grooming: {
      frequency: 'Minimal - they self-groom',
      tips: [
        'Provide sand bath for cleaning',
        'Spot clean cage daily',
        'Full cage clean weekly',
        'Never bathe in water',
      ],
    },
    exercise: {
      amount: 'Active at night',
      activities: ['Exercise wheel (essential)', 'Tunnels and tubes', 'Playpen time', 'Digging substrate', 'Climbing toys'],
    },
    commonIssues: [
      { title: 'Biting', solution: 'Handle during awake hours, move slowly, wash hands before handling' },
      { title: 'Escaping', solution: 'Check cage for gaps, secure doors, ensure adequate space' },
      { title: 'Wet tail', solution: 'Serious condition - see vet immediately, keep cage clean' },
    ],
  },
  rabbit: {
    type: 'rabbit',
    name: 'Rabbits',
    emoji: '🐰',
    color: 'pet-rabbit',
    description: 'Rabbits are gentle, social pets that can be litter trained. They need space to hop and lots of hay to munch!',
    lifespan: '8-12 years',
    careLevel: 'Medium',
    spaceNeeded: 'Large enclosure + exercise area',
    dailyCare: ['Unlimited hay', 'Fresh veggies', 'Clean water', 'Litter box cleaning', 'Exercise time', 'Social time'],
    funFact: 'When rabbits are happy, they do a jump called a "binky"!',
    feedingGuide: {
      frequency: 'Hay always available, veggies daily',
      tips: [
        '80% of diet should be hay',
        'Leafy greens daily',
        'Limited pellets',
        'Avoid iceberg lettuce and carrots in excess',
      ],
    },
    grooming: {
      frequency: 'Brush weekly (daily when shedding)',
      tips: [
        'Never bathe rabbits (stressful)',
        'Trim nails monthly',
        'Check teeth regularly',
        'Long-haired breeds need more brushing',
      ],
    },
    exercise: {
      amount: '3-4 hours free-roam daily',
      activities: ['Hopping and running', 'Digging boxes', 'Tunnels', 'Tossing toys', 'Exploring bunny-proofed areas'],
    },
    commonIssues: [
      { title: 'Not eating', solution: 'Emergency - see vet immediately (GI stasis risk)' },
      { title: 'Chewing wires', solution: 'Bunny-proof the area, provide safe chew toys' },
      { title: 'Spraying/marking', solution: 'Spay or neuter (also improves health)' },
    ],
  },
  guinea_pig: {
    type: 'guinea_pig',
    name: 'Guinea Pigs',
    emoji: '🐹',
    color: 'pet-guinea-pig',
    description: 'Guinea pigs are social, vocal pets that love company. They "wheek" when excited and need a friend of their own kind!',
    lifespan: '5-7 years',
    careLevel: 'Medium',
    spaceNeeded: 'Large cage (7.5+ sq feet for one)',
    dailyCare: ['Unlimited hay', 'Fresh veggies with vitamin C', 'Clean water', 'Spot clean cage', 'Floor time', 'Social time'],
    funFact: 'Guinea pigs "popcorn" (jump with joy) when they\'re happy!',
    feedingGuide: {
      frequency: 'Hay always, veggies twice daily',
      tips: [
        'They need vitamin C daily (can\'t make their own)',
        'Bell peppers are great for vitamin C',
        'Unlimited timothy hay',
        'Limit pellets and fruits',
      ],
    },
    grooming: {
      frequency: 'Brush weekly',
      tips: [
        'Long-haired breeds need daily brushing',
        'Trim nails every 2-4 weeks',
        'Rarely need baths',
        'Check grease gland (especially in males)',
      ],
    },
    exercise: {
      amount: '1-2 hours floor time daily',
      activities: ['Running laps (zoomies)', 'Tunnels and hideys', 'Foraging for food', 'Socializing with cage mates'],
    },
    commonIssues: [
      { title: 'Vitamin C deficiency', solution: 'Add bell pepper daily, consider supplements' },
      { title: 'Respiratory issues', solution: 'Keep cage clean, avoid dusty bedding, see vet' },
      { title: 'Loneliness', solution: 'Get a same-sex companion (they\'re social animals)' },
    ],
  },
  turtle: {
    type: 'turtle',
    name: 'Turtles',
    emoji: '🐢',
    color: 'pet-turtle',
    description: 'Turtles are fascinating, long-lived pets that need proper lighting and water. They\'re fun to watch but require specific care!',
    lifespan: '20-40+ years',
    careLevel: 'Advanced',
    spaceNeeded: '10 gallons per inch of shell',
    dailyCare: ['Feed (schedule varies)', 'Check water quality', 'Ensure proper temps', 'Check basking spot', 'Observe health'],
    funFact: 'A turtle\'s shell is made of over 50 bones fused together!',
    feedingGuide: {
      frequency: 'Young: daily, Adults: every 2-3 days',
      tips: [
        'Commercial turtle pellets as base',
        'Leafy greens for aquatic turtles',
        'Occasional protein (insects, fish)',
        'Calcium supplements important',
      ],
    },
    grooming: {
      frequency: 'Tank cleaning weekly',
      tips: [
        'Strong filter is essential',
        '25-50% water change weekly',
        'Clean algae from shell gently',
        'UV-B light must be replaced every 6 months',
      ],
    },
    exercise: {
      amount: 'Swimming and basking',
      activities: ['Swimming space', 'Basking platform', 'Exploring tank', 'Hunting live food (enrichment)'],
    },
    commonIssues: [
      { title: 'Soft shell', solution: 'Calcium deficiency - add cuttlebone, check UV-B lighting' },
      { title: 'Not basking', solution: 'Check temperatures, may indicate illness' },
      { title: 'Cloudy eyes', solution: 'Vitamin A deficiency or infection - see reptile vet' },
    ],
  },
  other: {
    type: 'other',
    name: 'Other Pets',
    emoji: '🐾',
    color: 'pet-other',
    description: 'There are many wonderful pets beyond the common ones! Each has unique needs - always research thoroughly before getting a new pet.',
    lifespan: 'Varies by species',
    careLevel: 'Medium',
    spaceNeeded: 'Varies by species',
    dailyCare: ['Feed appropriately', 'Fresh water', 'Clean habitat', 'Health checks', 'Social needs vary'],
    funFact: 'There are over 500 million pet animals in the world!',
    feedingGuide: {
      frequency: 'Species-dependent',
      tips: [
        'Research your specific pet\'s needs',
        'Use appropriate commercial food when available',
        'Learn what foods are toxic for your pet',
        'Consult with a specialized vet',
      ],
    },
    grooming: {
      frequency: 'Species-dependent',
      tips: [
        'Keep habitat clean',
        'Learn species-specific grooming needs',
        'Handle according to pet\'s comfort',
        'Regular health observations',
      ],
    },
    exercise: {
      amount: 'Species-dependent',
      activities: ['Appropriate enrichment', 'Safe exploration', 'Species-appropriate toys', 'Social interaction if needed'],
    },
    commonIssues: [
      { title: 'Research gap', solution: 'Always research before getting a pet, join species-specific communities' },
      { title: 'Finding a vet', solution: 'Locate exotic pet vets before bringing pet home' },
      { title: 'Proper housing', solution: 'Invest in appropriate enclosure before purchase' },
    ],
  },
};

export const petOfTheWeekFacts = [
  { pet: 'dog', fact: 'A dog\'s nose print is unique, just like a human fingerprint!' },
  { pet: 'cat', fact: 'Cats have over 20 different vocalizations, including the meow!' },
  { pet: 'fish', fact: 'Fish can recognize their owners and get excited when they see them!' },
  { pet: 'bird', fact: 'Parrots can live to be over 80 years old!' },
  { pet: 'hamster', fact: 'Hamsters can run backwards just as fast as forwards!' },
  { pet: 'rabbit', fact: 'Rabbits can\'t vomit, so their diet is super important!' },
  { pet: 'guinea_pig', fact: 'Baby guinea pigs are born with fur and open eyes!' },
  { pet: 'turtle', fact: 'Turtles have been on Earth for over 200 million years!' },
];
