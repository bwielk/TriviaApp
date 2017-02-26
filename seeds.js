use trivia;

db.dropDatabase();

db.questions.insert([

  {
    questionString: "What show made the Olsen twins famous?",
    possibleAnswers: ["Family Matters", "Full House", "Friends", "Blossom"],
    category: "TV",
    correctAnswer: "Full House"
  },

  {
    questionString: "Which of these was not an elemental ring in Captain Planet?",
    possibleAnswers: ["Water", "Fire", "Air", "Earth"],
    category: "TV",
    correctAnswer: "Air"
  },

  {
    questionString: "Where was the Fresh Prince born and raised?",
    possibleAnswers: ["North Philadelphia", "West Philadelphia", "South Philadelphia", "East Philadelphia"],
    category: "TV",
    correctAnswer: "West Philadelphia"
  },

  {
    questionString: "The Green Power Ranger originally possessed which Zord?",
    possibleAnswers: ["Tigerzord", "Raptorzord", "Brachiozord", "Dragonzord"],
    category: "TV",
    correctAnswer: "Dragonzord"
  },

  {
    questionString: "What was the name of the school Principal in Saved by the Bell?",
    possibleAnswers: ["Mr Belding", "Mr Baldwin", "Mr Burchill", "Mr Bidwell"],
    category: "TV",
    correctAnswer: "Mr Belding"
  },

  {
    questionString: "What is the name of Academy Award winning film where a father uses stories to guide his son through their time in a death camp?",
    possibleAnswers: ["Jacob the Liar", "The Pianist", "Life Is Beautiful", "Bent"],
    category: "Film",
    correctAnswer: "Life Is Beautiful"
  },

  {
    questionString: "What was the body count in the original Matrix movie?",
    possibleAnswers: ["27", "33", "38", "43"],
    category: "Film",
    correctAnswer: "27"
  },

  {
    questionString: "Which film won the 1995 Oscar for Best Picture",
    possibleAnswers: ["Forrest Gump", "Pulp Fiction", "Four Weddings and a Funeral", "The Shawshank Redemption"],
    category: "Film",
    correctAnswer: "Forrest Gump"
  },

  {
    questionString: "Which of these films portrayed three animals braving the wilderness in order to get home to their humans?",
    possibleAnswers: ["Homeward Bound", "Jungle 2 Jungle", "Wag the Dog", "Patch Adams"],
    category: "Film",
    correctAnswer: "Homeward Bound"
  },

  {
    questionString: "How many Oscars did Titanic actually win?",
    possibleAnswers: ["8", "11", "15", "17"],
    category: "Film",
    correctAnswer: "11"
  },

  {
    questionString: "What year did the Soviet Union dissolve",
    possibleAnswers: ["1990", "1991", "1994", "1995"],
    category: "Politics",
    correctAnswer: "1991"
  },

  {
    questionString: "What did Nicholas Ridley compare to the Third Reich?",
    possibleAnswers: ["The USA", "Soviet Union", "The EU", "The Yugoslavian Government"],
    category: "Politics",
    correctAnswer: "The EU"
  },

  {
    questionString: "What was the final spark which ignited the Gulf War in 1990",
    possibleAnswers: ["Testing WMD on Kurds", "State support of terrorism", "Annexation of Kuwait", "Massing troops on Israeli border"],
    category: "Politics",
    correctAnswer: "Annexation of Kuwait"
  },

  {
    questionString: "In which year did the scandal come to light which involved Bill Clinton and Monica Lewinski?",
    possibleAnswers: ["1992", "1994", "1996", "1998"],
    category: "Politics",
    correctAnswer: "1998"
  },

  {
    questionString: "What year was Nelson Mandela elected President of South Africa?",
    possibleAnswers: ["1990", "1992", "1994", "1996"],
    category: "Politics",
    correctAnswer: "1994"
  },
  
  {
    questionString: "Who sang 'I want it that way?'",
    possibleAnswers: ["N-Sync", "Take That", "All-4-One", "Backstreet Boys"],
    category: "Music",
    correctAnswer: "Backstreet Boys"
  },

  {
    questionString: "Which of these was not a nickname for a Spice Girl?",
    possibleAnswers: ["Sporty", "Scary", "Flirty", "Baby"],
    category: "Music",
    correctAnswer: "Flirty"
  },

  {
    questionString: "Which of these was not a song released by Korn?",
    possibleAnswers: ["Freak on A Leash", "Got the Life", "Aerials", "A.D.I.D.A.S"],
    category: "Music",
    correctAnswer: "Aerials"
  },

  {
    questionString: "What band did Gwen Stefani become famous with?",
    possibleAnswers: ["No Doubt", "Veruca Salt", "Garbage", "The Cardigans"],
    category: "Music",
    correctAnswer: "No Doubt"
  },

  {
    questionString: "Who sang 'Mmmm bop'?",
    possibleAnswers: ["The Jonas Brothers", "A1", "Hanson", "B*Witched"],
    category: "Music",
    correctAnswer: "Hanson"
  },

  {
    questionString: "A hitman was hired to dash the Olympic dreams of which athlete?",
    possibleAnswers: ["Tonya Harding", "Kristi Yamaguchi", "Jennifer Capriati", "Nancy Kerrigan"],
    category: "Sport",
    correctAnswer: "Nancy Kerrigan"
  },

  {
    questionString: "Who won the European Football Championships in 1992?",
    possibleAnswers: ["Ukraine", "Greece", "Sweden", "Denmark"],
    category: "Sport",
    correctAnswer: "Denmark"
  },

  {
    questionString: "Who scored the most Premier League goals in the 90s?",
    possibleAnswers: ["Andy Cole", "Alan Shearer", "Eric Cantona", "Michael Owen"],
    category: "Sport",
    correctAnswer: "Alan Shearer"
  },

  {
    questionString: "How many Grand Slam Titles did Pete Sampras win?",
    possibleAnswers: ["10", "14", "17", "22"],
    category: "Sport",
    correctAnswer: "14"
  },

  {
    questionString: "Which basketball team did Michael Jordan play for?",
    possibleAnswers: ["LA Lakers", "NY Knicks", "Boston Celtics", "Chicago Bulls"],
    category: "Sport",
    correctAnswer: "Chicago Bulls"
  },

  {
    questionString: "A hitman was hired to dash the Olympic dreams of which athlete?",
    possibleAnswers: ["Tonya Harding", "Kristi Yamaguchi", "Jennifer Capriati", "Nancy Kerrigan"],
    category: "Sport",
    correctAnswer: "Nancy Kerrigan"
  },

  {
    questionString: "What was the name of the first cloned sheep?",
    possibleAnswers: ["Dolly", "Flossy", "Barbara", "Bob"],
    category: "Other",
    correctAnswer: "Dolly"
  },

  {
    questionString: "What kind of trousers did MC Hammer wear?",
    possibleAnswers: ["Bell-bottoms", "Parachute Pants", "Overalls", "Cargo Pants"],
    category: "Other",
    correctAnswer: "Parachute Pants"
  },

  {
    questionString: "What was the name of the handheld digital pet that enjoyed huge popularity in the 90s?",
    possibleAnswers: ["Pokemon", "Digimon", "Tamagotchi", "Transformers"],
    category: "Other",
    correctAnswer: "Tamagotchi"
  },

  {
    questionString: "Which of these was not a 90s style to wear clothes?",
    possibleAnswers: ["Backwards", "Inside out", "Keeping the label on", "Upside down"],
    category: "Other",
    correctAnswer: "Upside down"
  },

  {
    questionString: "What year did Diana Princess of Wales die?",
    possibleAnswers: ["1995", "1996", "1997", "1998"],
    category: "Other",
    correctAnswer: "1997"
  },

  {
    questionString: "Which of these 90's toys was banned?",
    possibleAnswers: ["Sky Dancers", "Socker Boppers", "Moon Shoes", "Pogo Balls"],
    category: "Other",
    correctAnswer: "Sky Dancers"
  }

]);

db.players.insert([
  
  {
    name: "NinaK",
    password: "nina1993",
    scores: 70
  },

  {
    name: "JimmyJimmy",
    password: "Sandy",
    scores: 100
  },

  {
    name: "BlaiseyBaby",
    password: "pradaRulez",
    scores: 60
  },

  {
    name: "Coco",
    password: "255",
    scores: 50
  }
]);

db.questions.find();