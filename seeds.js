use trivia;

db.dropDatabase();

db.questions.insert([
  
  // {
  //   question: "What is 1 + 1?",
  //   options: ["1", "3", "11", "2"],
  //   correctAnswer: "2"
  // },

  {
    questionString: "What show made the Olsen twins famous?",
    possibleAnswers: ["Family Matters", "Full House", "Friends", "Blossom"],
    category: "TV",
    correctAnswer: "Full House"
  },

  {
    questionString: "Where was the Fresh Prince born and raised?",
    possibleAnswers: ["North Philadelphia", "West Philadelphia", "South Philadelphia", "East Philadelphia"],
    category: "TV",
    correctAnswer: "West Philadelphia"
  },

  {
    questionString: "What was the name of the first cloned sheep?",
    possibleAnswers: ["Dolly", "Flossy", "Barbara", "Bob"],
    category: "Science",
    correctAnswer: "Dolly"

  },

  {
    questionString: "What was the body count in the original Matrix movie?",
    possibleAnswers: ["27", "33", "38", "43"],
    category: "Movies",
    correctAnswer: "27"
  },

  {
    questionString: "In which year did the scandal come to light which involved Bill Clinton and Monica Lewinski",
    possibleAnswers: ["1992", "1994", "1996", "1998"],
    category: "Show-business",
    correctAnswer: "1998"
  },

  {
    questionString: "What was the name of the handheld digital pet that enjoyed huge popularity in the 90s?",
    possibleAnswers: ["Pokemon", "Digimon", "Tamagotchi", "Transformers"],
    categories: "TV",
    correctAnswer: "Tamagotchi"
  },

  {
    questionString: "The Green Power Ranger originally possessed which Zord?",
    possibleAnswers: ["Tigerzord", "Raptorzord", "Brachiozord", "Dragonzord"],
    category: "TV",
    correctAnswer: "Dragonzord"
  },
  
  {
    questionString: "Who sang 'I want it that way?'",
    possibleAnswers: ["N-Sync", "Take That", "All-4-One", "Backstreet Boys"],
    category: "Music",
    correctAnswer: "Backstreet Boys",
  },
  
  {
    questionString: "What year did the Soviet Union dissolve",
    possibleAnswers: ["1990", "1991", "1994", "1995"],
    category: "Politics",
    correctAnswer: "1991"
  },

  {
    questionString: "A hitman was hired to dash the Olympic dreams of which athlete?",
    possibleAnswers: ["Tonya Harding", "Kristi Yamaguchi", "Jennifer Capriati", "Nancy Kerrigan"],
    category: "Sport",
    correctAnswer: "Nancy Kerrigan"
  },

]);

db.questions.find();