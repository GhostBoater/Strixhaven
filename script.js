// Load the NPCs and Encounters JSON data
let encountersData;
let npcsData;

// Fetch encounters and NPCs from JSON files
fetch('encounters.json')
  .then(response => response.json())
  .then(data => {
    encountersData = data.encounters;
  })
  .catch(error => console.error('Error loading encounters:', error));

fetch('npc.json')
  .then(response => response.json())
  .then(data => {
    npcsData = data.npcs;
  })
  .catch(error => console.error('Error loading NPCs:', error));

// Function to get a random NPC based on how many students are needed
function getRandomStudents(numStudents) {
  let randomStudents = [];
  let shuffled = [...npcsData].sort(() => 0.5 - Math.random()); // Shuffle the NPC list
  for (let i = 0; i < numStudents; i++) {
    randomStudents.push(shuffled[i]);
  }
  return randomStudents;
}

// Function to generate an encounter
function generateEncounter() {
  if (!encountersData || !npcsData) {
    alert("Data is still loading, please try again later.");
    return;
  }

  // Get a random encounter
  let randomEncounter = encountersData[Math.floor(Math.random() * encountersData.length)];

  // Get the required number of students for this encounter
  let studentsInvolved = getRandomStudents(randomEncounter.studentsInvolved);

  // Create the encounter description
  let encounterDescription = randomEncounter.description;

  // Add student details dynamically to the description
  studentsInvolved.forEach((student, index) => {
    encounterDescription += `<br><br>${student.name}, a ${student.year} year student from ${student.college}, is ${student.personality.join(", ")}.`;
  });

  // Display the encounter and the choices
  let encounterText = `<h3>Encounter:</h3><p>${encounterDescription}</p><h4>Choices:</h4><ul>`;

  randomEncounter.choices.forEach(choice => {
    // Replace [student1] with the actual student's name
    let updatedEffect = choice.effect.replace("[student1]", studentsInvolved[0].name);

    encounterText += `<li><strong>Roll:</strong> ${choice.roll} | <strong>Effect:</strong> ${updatedEffect}</li>`;
  });

  encounterText += `</ul>`;

  // Display the encounter on the page
  document.getElementById("encounter").innerHTML = encounterText;
}

// Add event listener to the generate button
document.getElementById("generateBtn").addEventListener("click", generateEncounter);
