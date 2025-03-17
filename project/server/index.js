import express from 'express';
import cors from 'cors';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory database for messages (in a real app, you'd use a proper database)
const conversations = {};

// Complete Bhagavad Gita verses database
const gitaVerses = [
  // Chapter 1 - Arjuna's Dilemma
  {
    verse: "I see adverse omens, O Keshava. I do not see any good in killing my own people in battle.",
    chapter: 1,
    verseNumber: 31,
    explanation: "Arjuna expresses his reluctance to fight against his own relatives and teachers, showing his compassion and moral dilemma."
  },
  {
    verse: "How can we be happy after killing our own relatives? Even though they, with minds overcome by greed, do not see the evil in destroying the family.",
    chapter: 1,
    verseNumber: 38,
    explanation: "Arjuna questions how happiness can come from violence against one's own family, even if they are blinded by greed."
  },
  
  // Chapter 2 - Transcendental Knowledge
  {
    verse: "For the soul there is never birth nor death. Nor, having once been, does he ever cease to be. He is unborn, eternal, ever-existing, undying and primeval.",
    chapter: 2,
    verseNumber: 20,
    explanation: "This verse describes the immortal nature of the soul (Atman), which exists beyond physical birth and death."
  },
  {
    verse: "The soul can never be cut into pieces by any weapon, nor can it be burned by fire, nor moistened by water, nor withered by the wind.",
    chapter: 2,
    verseNumber: 23,
    explanation: "This verse emphasizes the indestructible nature of the soul, which transcends all physical elements and cannot be harmed by material forces."
  },
  {
    verse: "You have a right to perform your prescribed duties, but you are not entitled to the fruits of your actions. Never consider yourself to be the cause of the results of your activities, nor be attached to inaction.",
    chapter: 2,
    verseNumber: 47,
    explanation: "This is the essence of Karma Yoga - performing one's duty without attachment to results, focusing on the action rather than the outcome."
  },
  {
    verse: "Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called yoga.",
    chapter: 2,
    verseNumber: 48,
    explanation: "Krishna advises Arjuna to maintain mental balance regardless of outcomes, defining this equanimity as true yoga."
  },
  
  // Chapter 3 - Karma Yoga
  {
    verse: "It is better to engage in one's own occupation, even though one may perform it imperfectly, than to accept another's occupation and perform it perfectly.",
    chapter: 3,
    verseNumber: 35,
    explanation: "This verse emphasizes the importance of following one's own dharma (duty/path) rather than imitating others, even if done imperfectly."
  },
  {
    verse: "The wise engage in action, without attachment, for the welfare of the world.",
    chapter: 3,
    verseNumber: 25,
    explanation: "This teaches that enlightened individuals act selflessly for the benefit of all beings, without personal attachment to their actions."
  },
  
  // Chapter 4 - Transcendental Knowledge
  {
    verse: "Whenever dharma declines and the purpose of life is forgotten, I manifest myself on earth. I am born in every age to protect the good, to destroy evil, and to reestablish dharma.",
    chapter: 4,
    verseNumber: 7,
    explanation: "Krishna explains his divine purpose of incarnating in the world whenever righteousness declines, to restore balance and protect the virtuous."
  },
  {
    verse: "The one who sees inaction in action, and action in inaction, is wise among men.",
    chapter: 4,
    verseNumber: 18,
    explanation: "This paradoxical teaching points to the deeper understanding that true action is performed without ego-attachment, while apparent inaction can perpetuate karmic bondage."
  },
  
  // Chapter 5 - Karma Yoga - Action in Krishna Consciousness
  {
    verse: "The wise see the same in all – whether it be a Brahmin endowed with learning and humility, a cow, an elephant, a dog or a dog-eater.",
    chapter: 5,
    verseNumber: 18,
    explanation: "This verse teaches the equality of all beings in the eyes of the enlightened, who see the same divine essence in all creatures regardless of external form."
  },
  {
    verse: "One who is not disturbed by happiness and distress and is steady in both is certainly eligible for liberation.",
    chapter: 5,
    verseNumber: 3,
    explanation: "This describes the equanimity of one who has transcended dualities, remaining unaffected by both pleasure and pain."
  },
  
  // Chapter 6 - Dhyana Yoga
  {
    verse: "The mind acts like an enemy for those who do not control it.",
    chapter: 6,
    verseNumber: 6,
    explanation: "This highlights the importance of mental discipline and self-control in spiritual practice."
  },
  {
    verse: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.",
    chapter: 6,
    verseNumber: 19,
    explanation: "This describes the state of perfect meditation, where the mind becomes steady and undisturbed by external influences."
  },
  {
    verse: "No one who does good work will ever come to a bad end, either here or in the world to come.",
    chapter: 6,
    verseNumber: 40,
    explanation: "This verse reassures that righteous actions always lead to positive outcomes, even if not immediately apparent."
  },
  
  // Chapter 7 - Knowledge of the Absolute
  {
    verse: "Among thousands of men, one may endeavor for perfection; and among those who achieve perfection, hardly one knows Me in truth.",
    chapter: 7,
    verseNumber: 3,
    explanation: "Krishna explains the rarity of true spiritual knowledge, indicating that complete understanding of the divine is achieved by very few."
  },
  {
    verse: "I am the taste in water, the light in the moon and the sun, the syllable Om in the Vedic mantras; I am the sound in ether and ability in man.",
    chapter: 7,
    verseNumber: 8,
    explanation: "Krishna describes his omnipresence as the essential quality in all elements and beings."
  },
  
  // Chapter 8 - Attaining the Supreme
  {
    verse: "At the time of death, one who leaves the body thinking of Me alone, without doubt reaches Me.",
    chapter: 8,
    verseNumber: 5,
    explanation: "This verse emphasizes the importance of one's consciousness at the time of death, teaching that remembrance of the divine leads to union with the divine."
  },
  {
    verse: "Whatever state of being one remembers when quitting the body, that state one will attain without fail.",
    chapter: 8,
    verseNumber: 6,
    explanation: "This teaches that our predominant thoughts and attachments during life, especially at death, determine our future state of existence."
  },
  
  // Chapter 9 - The Most Confidential Knowledge
  {
    verse: "Those who worship Me with devotion, they are in Me and I am in them.",
    chapter: 9,
    verseNumber: 29,
    explanation: "Krishna describes the intimate relationship between the devotee and the divine, emphasizing the reciprocal nature of devotion."
  },
  {
    verse: "Even if a person of the most abominable character worships Me with undivided devotion, he is to be considered righteous because he has rightly resolved.",
    chapter: 9,
    verseNumber: 30,
    explanation: "This verse teaches the transformative power of devotion, which can redeem even those with negative past actions."
  },
  
  // Chapter 10 - The Opulence of the Absolute
  {
    verse: "I am the source of all spiritual and material worlds. Everything emanates from Me.",
    chapter: 10,
    verseNumber: 8,
    explanation: "Lord Krishna reveals his divine nature as the ultimate source of all existence."
  },
  {
    verse: "I am the beginning, the middle and the end of all beings.",
    chapter: 10,
    verseNumber: 20,
    explanation: "Krishna describes himself as the origin, sustenance, and dissolution of all creation."
  },
  
  // Chapter 11 - The Universal Form
  {
    verse: "If hundreds of thousands of suns were to rise at once into the sky, their radiance might resemble the effulgence of the Supreme Person in that universal form.",
    chapter: 11,
    verseNumber: 12,
    explanation: "Arjuna describes the overwhelming brilliance of Krishna's universal form, which is beyond ordinary human comprehension."
  },
  {
    verse: "Time I am, the great destroyer of the worlds.",
    chapter: 11,
    verseNumber: 32,
    explanation: "Krishna reveals himself as time, the ultimate force that consumes all things in the universe."
  },
  
  // Chapter 12 - Devotional Service
  {
    verse: "Those who fix their minds on Me and always engage in My devotion with great faith are considered by Me to be the most perfect.",
    chapter: 12,
    verseNumber: 2,
    explanation: "Krishna explains that those who worship with unwavering devotion achieve the highest spiritual perfection."
  },
  {
    verse: "One who is equal to friends and enemies, who is equipoised in honor and dishonor, heat and cold, happiness and distress, fame and infamy... such a person is very dear to Me.",
    chapter: 12,
    verseNumber: 18,
    explanation: "This describes the qualities of a true devotee who has transcended dualities and remains balanced in all circumstances."
  },
  
  // Chapter 13 - Nature, the Enjoyer, and Consciousness
  {
    verse: "The Supreme Truth exists both internally and externally, in the moving and nonmoving. He is beyond the power of the material senses to see or to know.",
    chapter: 13,
    verseNumber: 16,
    explanation: "This verse describes the all-pervading yet subtle nature of the Supreme, which transcends ordinary perception."
  },
  {
    verse: "One who sees the Supersoul accompanying the individual soul in all bodies, and who understands that neither the soul nor the Supersoul is ever destroyed, actually sees.",
    chapter: 13,
    verseNumber: 28,
    explanation: "This teaches the simultaneous presence of both the individual soul and the Supreme Soul in all beings, and their eternal nature."
  },
  
  // Chapter 14 - The Three Modes of Material Nature
  {
    verse: "Goodness, passion and ignorance – these three qualities born of material nature bind the imperishable soul to the body.",
    chapter: 14,
    verseNumber: 5,
    explanation: "Krishna explains how the three gunas (qualities of nature) influence and bind the soul to material existence."
  },
  {
    verse: "When one rises above the three modes of material nature that originate in the body, one becomes free from birth, death, old age and their distresses and can enjoy nectar even in this life.",
    chapter: 14,
    verseNumber: 20,
    explanation: "This verse describes liberation as transcendence of the three gunas, resulting in freedom from the cycle of birth and death."
  },
  
  // Chapter 15 - The Yoga of the Supreme Person
  {
    verse: "The splendor of the sun, which dissipates the darkness of this whole world, comes from Me. And the splendor of the moon and the splendor of fire are also from Me.",
    chapter: 15,
    verseNumber: 12,
    explanation: "Krishna identifies himself as the source of all light and energy in the universe."
  },
  {
    verse: "There are two beings in this world: the perishable and the imperishable. All created beings are perishable, and the unchanging is imperishable.",
    chapter: 15,
    verseNumber: 16,
    explanation: "This verse distinguishes between the temporary material manifestations and the eternal spiritual reality."
  },
  
  // Chapter 16 - The Divine and Demoniac Natures
  {
    verse: "Fearlessness, purity of heart, knowledge, charity, self-control, sacrifice, study of the scriptures, austerity and simplicity... these are the qualities of those endowed with divine nature.",
    chapter: 16,
    verseNumber: 1,
    explanation: "Krishna enumerates the virtuous qualities that characterize those with divine tendencies."
  },
  {
    verse: "There are three gates leading to hell – lust, anger, and greed. Every sane man should give these up, for they lead to the degradation of the soul.",
    chapter: 16,
    verseNumber: 21,
    explanation: "This identifies the three primary vices that lead to spiritual downfall, encouraging their abandonment."
  },
  
  // Chapter 17 - The Divisions of Faith
  {
    verse: "The faith of each is in accordance with his nature. A person is what his faith is.",
    chapter: 17,
    verseNumber: 3,
    explanation: "This verse explains how one's inherent nature determines the type of faith one develops, which in turn shapes one's character."
  },
  {
    verse: "Austerity of speech consists in speaking words that are truthful, pleasing, beneficial, and not agitating to others, and also in regularly reciting Vedic literature.",
    chapter: 17,
    verseNumber: 15,
    explanation: "Krishna describes the qualities of purified speech, emphasizing truth, kindness, and beneficial communication."
  },
  
  // Chapter 18 - Conclusion - The Perfection of Renunciation
  {
    verse: "Whatever you do, whatever you eat, whatever you offer or give away, and whatever austerities you perform – do that as an offering to Me.",
    chapter: 18,
    verseNumber: 9,
    explanation: "This verse teaches the practice of offering all actions to the divine, transforming ordinary activities into spiritual practice."
  },
  {
    verse: "Abandon all varieties of dharmas and simply surrender unto Me alone. I shall deliver you from all sinful reactions; do not fear.",
    chapter: 18,
    verseNumber: 66,
    explanation: "In this most famous verse, Krishna gives his ultimate instruction to surrender completely to the divine, promising protection and liberation."
  },
  {
    verse: "Wherever there is Krishna, the master of all mystics, and wherever there is Arjuna, the supreme archer, there will certainly be opulence, victory, extraordinary power, and morality.",
    chapter: 18,
    verseNumber: 78,
    explanation: "The concluding verse of the Gita, spoken by Sanjaya, affirms that divine presence and righteous action together ensure success and prosperity."
  }
];

// Helper function to find relevant verse based on query
function findRelevantVerse(query) {
  // Comprehensive keyword matching
  const keywords = {
    // Chapter 1 - Arjuna's Dilemma
    'dilemma': [0, 1],
    'conflict': [0, 1],
    'family': [1],
    'relatives': [0, 1],
    'war': [0, 1],
    'battle': [0],
    
    // Chapter 2 - Transcendental Knowledge
    'soul': [2, 3],
    'atman': [2, 3],
    'immortal': [2, 3],
    'eternal': [2, 3],
    'duty': [4, 5],
    'karma': [4, 5],
    'action': [4, 5],
    'equanimity': [5],
    'balance': [5],
    
    // Chapter 3 - Karma Yoga
    'dharma': [6, 7],
    'occupation': [6],
    'welfare': [7],
    'selfless': [7],
    
    // Chapter 4 - Transcendental Knowledge
    'avatar': [8],
    'incarnation': [8],
    'manifest': [8],
    'wisdom': [9],
    'inaction': [9],
    
    // Chapter 5 - Karma Yoga
    'equality': [10],
    'same': [10],
    'liberation': [11],
    'distress': [11],
    'happiness': [11],
    
    // Chapter 6 - Dhyana Yoga
    'mind': [12, 13],
    'control': [12],
    'meditation': [13],
    'good': [14],
    
    // Chapter 7 - Knowledge of the Absolute
    'perfection': [15],
    'rare': [15],
    'omnipresent': [16],
    'elements': [16],
    
    // Chapter 8 - Attaining the Supreme
    'death': [17, 18],
    'remember': [17, 18],
    'consciousness': [17, 18],
    
    // Chapter 9 - The Most Confidential Knowledge
    'devotion': [19, 20],
    'worship': [19, 20],
    'transformation': [20],
    'redemption': [20],
    
    // Chapter 10 - The Opulence of the Absolute
    'source': [21, 22],
    'origin': [21, 22],
    'creation': [21, 22],
    
    // Chapter 11 - The Universal Form
    'universal': [23, 24],
    'form': [23],
    'time': [24],
    'destroyer': [24],
    
    // Chapter 12 - Devotional Service
    'devotee': [25, 26],
    'faith': [25],
    'dear': [26],
    'friend': [26],
    'enemy': [26],
    
    // Chapter 13 - Nature, the Enjoyer, and Consciousness
    'truth': [27],
    'supersoul': [28],
    'body': [28],
    
    // Chapter 14 - The Three Modes of Material Nature
    'gunas': [29, 30],
    'modes': [29, 30],
    'goodness': [29],
    'passion': [29],
    'ignorance': [29],
    
    // Chapter 15 - The Yoga of the Supreme Person
    'light': [31],
    'energy': [31],
    'perishable': [32],
    'imperishable': [32],
    
    // Chapter 16 - The Divine and Demoniac Natures
    'divine': [33, 34],
    'virtues': [33],
    'hell': [34],
    'lust': [34],
    'anger': [34],
    'greed': [34],
    
    // Chapter 17 - The Divisions of Faith
    'nature': [35],
    'speech': [36],
    'truthful': [36],
    
    // Chapter 18 - Conclusion
    'offering': [37],
    'surrender': [38],
    'victory': [39],
    'success': [39],
    'morality': [39]
  };
  
  // Convert query to lowercase for matching
  const lowercaseQuery = query.toLowerCase();
  
  // Check for keyword matches
  let matchedIndices = [];
  
  for (const [keyword, indices] of Object.entries(keywords)) {
    if (lowercaseQuery.includes(keyword)) {
      matchedIndices = [...matchedIndices, ...indices];
    }
  }
  
  // If we have matches, return a random verse from the matches
  if (matchedIndices.length > 0) {
    const randomIndex = matchedIndices[Math.floor(Math.random() * matchedIndices.length)];
    return gitaVerses[randomIndex];
  }
  
  // If no specific match, return a random verse
  return gitaVerses[Math.floor(Math.random() * gitaVerses.length)];
}

// API Routes
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Bhagavad Gita API is running' });
});

// Get conversation history
app.get('/api/conversations/:conversationId', (req, res) => {
  const { conversationId } = req.params;
  
  if (!conversations[conversationId]) {
    // Create a new conversation with welcome message
    conversations[conversationId] = [
      {
        id: uuidv4(),
        text: 'Namaste! I am your Bhagavad Gita guide. Ask me anything about the teachings of Lord Krishna.',
        sender: 'bot',
        timestamp: new Date()
      }
    ];
  }
  
  res.status(200).json(conversations[conversationId]);
});

// Send a message and get a response
app.post('/api/conversations/:conversationId/messages', (req, res) => {
  const { conversationId } = req.params;
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Message text is required' });
  }
  
  // Create conversation if it doesn't exist
  if (!conversations[conversationId]) {
    conversations[conversationId] = [
      {
        id: uuidv4(),
        text: 'Namaste! I am your Bhagavad Gita guide. Ask me anything about the teachings of Lord Krishna.',
        sender: 'bot',
        timestamp: new Date()
      }
    ];
  }
  
  // Add user message
  const userMessage = {
    id: uuidv4(),
    text,
    sender: 'user',
    timestamp: new Date()
  };
  
  conversations[conversationId].push(userMessage);
  
  // Generate response based on user query
  const relevantVerse = findRelevantVerse(text);
  
  // Format response with verse and explanation
  const responseText = `"${relevantVerse.verse}" - Bhagavad Gita, Chapter ${relevantVerse.chapter}, Verse ${relevantVerse.verseNumber}\n\n${relevantVerse.explanation}`;
  
  // Add bot response
  const botResponse = {
    id: uuidv4(),
    text: responseText,
    sender: 'bot',
    timestamp: new Date()
  };
  
  conversations[conversationId].push(botResponse);
  
  // Return both messages
  res.status(201).json({
    userMessage,
    botResponse
  });
});

// Get all available chapters
app.get('/api/chapters', (req, res) => {
  // Extract unique chapters
  const chapters = [...new Set(gitaVerses.map(verse => verse.chapter))].sort((a, b) => a - b);
  
  // Create chapter summaries
  const chapterSummaries = chapters.map(chapterNum => {
    const versesInChapter = gitaVerses.filter(verse => verse.chapter === chapterNum);
    return {
      chapter: chapterNum,
      verseCount: versesInChapter.length,
      title: getChapterTitle(chapterNum),
      summary: getChapterSummary(chapterNum)
    };
  });
  
  res.status(200).json(chapterSummaries);
});

// Get verses from a specific chapter
app.get('/api/chapters/:chapterNum', (req, res) => {
  const chapterNum = parseInt(req.params.chapterNum);
  
  if (isNaN(chapterNum)) {
    return res.status(400).json({ error: 'Invalid chapter number' });
  }
  
  const versesInChapter = gitaVerses.filter(verse => verse.chapter === chapterNum);
  
  if (versesInChapter.length === 0) {
    return res.status(404).json({ error: 'Chapter not found' });
  }
  
  res.status(200).json({
    chapter: chapterNum,
    title: getChapterTitle(chapterNum),
    summary: getChapterSummary(chapterNum),
    verses: versesInChapter
  });
});

// Helper function to get chapter titles
function getChapterTitle(chapterNum) {
  const titles = {
    1: "Arjuna's Dilemma",
    2: "Transcendental Knowledge",
    3: "Karma Yoga",
    4: "Transcendental Knowledge",
    5: "Karma Yoga - Action in Krishna Consciousness",
    6: "Dhyana Yoga",
    7: "Knowledge of the Absolute",
    8: "Attaining the Supreme",
    9: "The Most Confidential Knowledge",
    10: "The Opulence of the Absolute",
    11: "The Universal Form",
    12: "Devotional Service",
    13: "Nature, the Enjoyer, and Consciousness",
    14: "The Three Modes of Material Nature",
    15: "The Yoga of the Supreme Person",
    16: "The Divine and Demoniac Natures",
    17: "The Divisions of Faith",
    18: "Conclusion - The Perfection of Renunciation"
  };
  
  return titles[chapterNum] || `Chapter ${chapterNum}`;
}

// Helper function to get chapter summaries
function getChapterSummary(chapterNum) {
  const summaries = {
    1: "Arjuna sees friends and relatives on the opposing army and is overcome with grief and moral dilemma. He refuses to fight and seeks Krishna's guidance.",
    2: "Krishna begins his teachings by explaining the eternal nature of the soul and the temporary nature of the body. He introduces the concepts of Karma Yoga and equanimity.",
    3: "Krishna explains the importance of action without attachment, performing one's duty for the welfare of society rather than personal gain.",
    4: "Krishna reveals his divine nature and explains how he incarnates whenever dharma declines. He elaborates on different types of sacrifices and the importance of knowledge.",
    5: "Krishna explains how renunciation and action are ultimately the same for the enlightened. He describes the peace that comes from detachment.",
    6: "Krishna details the practice of meditation, controlling the mind, and the qualities of a perfect yogi who has attained self-realization.",
    7: "Krishna describes his divine energies and how he is the source of everything. He explains why people are deluded by the three modes of material nature.",
    8: "Krishna explains what happens at the time of death and how one's consciousness determines their next destination. He describes the cosmic cycles of creation.",
    9: "Krishna reveals the most confidential knowledge about devotional service and how he relates to his devotees. He explains how everything rests upon him.",
    10: "Krishna describes his divine manifestations, explaining how he is the source of all wonderful things in creation.",
    11: "At Arjuna's request, Krishna reveals his universal form, displaying his unlimited power and glory, which overwhelms Arjuna.",
    12: "Krishna explains the superiority of devotional service and describes the qualities of his dear devotees.",
    13: "Krishna discusses the difference between the body (field) and the knower of the body (soul), as well as the process of liberation.",
    14: "Krishna explains the three modes of material nature (goodness, passion, and ignorance) and how they affect the embodied soul.",
    15: "Krishna describes the ultimate purpose of Vedic knowledge - to know him as the Supreme Person and to engage in his devotional service.",
    16: "Krishna contrasts the divine and demoniac natures, listing the qualities of each and explaining their consequences.",
    17: "Krishna explains how faith determines the quality of worship, food, sacrifice, and austerity according to the three modes of nature.",
    18: "Krishna summarizes his teachings, explaining the nature of renunciation, the effects of the modes of nature, and the ultimate path of surrender to him."
  };
  
  return summaries[chapterNum] || `Summary for Chapter ${chapterNum}`;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});