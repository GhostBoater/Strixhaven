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

fetch('npcs.json')
  .then(response => response.json())
  .then(data => {
    npcsData = data.npcs;
  })
  .catch(error => console.error('Error loading NPCs:', error));

// Function to get a random NPC
function getRandomStudent() {
  return npcsData[Math.floor(Math.random() * npcsData.length)];
}

// Function to generate an encounter
function generateEncounter() {
  if (!encountersData || !npcsData) {
    alert("Data is still loading, please try again later.");
    return;
  }

  // Get a random encounter
  let randomEncounter = encountersData[Math.floor(Math.random() * encountersData.length)];

  // Get a random student for the encounter
  let student = getRandomStudent();

  // Create the encounter description
  let encounterDescription = randomEncounter.description.replace("[student1]", student.name);

  // Add student details dynamically to the description
  encounterDescription += `<br><br>${student.name}, a ${student.year} year student from ${student.college}, is ${student.personality.join(", ")}.`;

  // Display the encounter and the choices
  let encounterText = `<h3>Encounter:</h3><p>${encounterDescription}</p><h4>Choices:</h4><ul>`;

  randomEncounter.choices.forEach(choice => {
    encounterText += `<li><strong>Roll:</strong> ${choice.roll} | <strong>Effect:</strong> ${choice.effect.replace("[student1]", student.name)}</li>`;
  });

  encounterText += `</ul>`;

  // Display the encounter on the page
  document.getElementById("encounter").innerHTML = encounterText;
}

// Add event listener to the generate button
document.getElementById("generateBtn").addEventListener("click", generateEncounter);
