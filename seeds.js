use trivia;

db.dropDatabase();

db.questions.insert([
  
  // {
  //   question: "What is 1 + 1?",
  //   options: ["1", "3", "11", "2"],
  //   correctAnswer: "2"
  // },

  {
    question: "What show made the Olsen twins famous?",
    options: ["Family Matters", "Full House", "Friends", "Blossom"],
    correctAnswer: "Full House"
  },

  {
    question: "Where was the Fresh Prince born and raised?",
    options: ["North Philadelphia", "West Philadelphia", "South Philadelphia", "East Philadelphia"],
    correctAnswer: "West Philadelphia"
  },

  {
    question: "What was the name of the first cloned sheep?",
    options: ["Dolly", "Flossy", "Barbara", "Bob"],
    correctAnswer: "Dolly"

  },

  {
    question: "What was the body count in the original Matrix movie?",
    options: ["27", "33", "38", "43"],
    correctAnswer: "27"
  },

  {
    question: "In which year did the scandal come to light which involved Bill Clinton and Monica Lewinski",
    options: ["1992", "1994", "1996", "1998"],
    correctAnswer: "1998"
  },

  {
    question: "What was the name of the handheld digital pet that enjoyed huge popularity in the 90s?",
    options: ["Pokemon", "Digimon", "Tamagotchi", "Transformers"],
    correctAnswer: "Tamagotchi"
  },

  {
    question: "The Green Power Ranger originally possessed which Zord?",
    options: ["Tigerzord", "Raptorzord", "Brachiozord", "Dragonzord"],
    correctAnswer: "Dragonzord"
  },
  
  {
    question: "Who sand 'I want it that way?'",
    options: ["N-Sync", "Take That", "All-4-One", "Backstreet Boys"],
    correctAnswer: "Backstreet Boys",
  },
  
  {
    question: "What year did the Soviet Union dissolve",
    options: ["1990", "1991", "1994", "1995"],
    correctAnswer: "1991"
  },

  {
    question: "A hitman was hired to dash the Olympic dreams of which athlete?",
    options: ["Tonya Harding", "Kristi Yamaguchi", "Jennifer Capriati", "Nancy Kerrigan"],
    correctAnswer: "Nancy Kerrigan"
  },

]);

db.questions.find();