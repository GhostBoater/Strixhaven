// Fetch the data (you can replace these with actual fetch calls if hosted on GitHub)
const encountersData = [
  {
    "year": 1,
    "location": "Biblioplex",
    "timeOfDay": "Afternoon",
    "encounters": [
      {
        "description": "You overhear a heated debate about the best way to prepare for an upcoming exam. Some students notice you and ask for your input.",
        "studentsInvolved": "Any",
        "choices": [
          { "roll": "Arcana DC 15", "effect": "You share advanced study techniques, impressing the group and earning some study partners." },
          { "roll": "Deception DC 15", "effect": "You make up an outrageous study method as a joke. If successful, they laugh and find you amusing; if failed, they take you seriously and later resent you when it doesn’t work." },
          { "roll": "No roll", "effect": "You ignore the conversation and move on, missing a chance to make connections." }
        ]
      },
      {
        "description": "A student rushes up to you in a panic—they've lost their class notes and need help before a quiz.",
        "studentsInvolved": "Any",
        "choices": [
          { "roll": "Investigation DC 15", "effect": "You find the missing notes quickly, earning the student’s gratitude." },
          { "roll": "Persuasion DC 10", "effect": "You offer to summarize key points for them. They appreciate the help and may repay the favor later." },
          { "roll": "No roll", "effect": "You decline to help, and the student seems disappointed." }
        ]
      }
    ]
  }
];

// Function to filter and display encounters based on location and time
document.getElementById('generateBtn').addEventListener('click', function () {
  const location = document.getElementById('location').value;
  const timeOfDay = document.getElementById('timeOfDay').value;

  const filteredEncounters = encountersData.filter(encounter => 
    encounter.location === location && encounter.timeOfDay === timeOfDay
  );

  const encounterDiv = document.getElementById('encounter');
  encounterDiv.innerHTML = ''; // Clear previous encounter

  if (filteredEncounters.length > 0) {
    const encounter = filteredEncounters[0].encounters[Math.floor(Math.random() * filteredEncounters[0].encounters.length)];
    const description = document.createElement('p');
    description.textContent = encounter.description;
    encounterDiv.appendChild(description);

    encounter.choices.forEach(choice => {
      const choiceButton = document.createElement('button');
      choiceButton.textContent = `Roll: ${choice.roll} - ${choice.effect}`;
      encounterDiv.appendChild(choiceButton);
    });
  } else {
    encounterDiv.textContent = 'No encounters found for the selected location and time.';
  }
});
