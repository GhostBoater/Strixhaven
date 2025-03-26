// Fetch encounters data from the encounters.json file
fetch('encounters.json')
  .then(response => response.json())
  .then(data => {
    // Add event listener for encounter generation
    document.getElementById('generateBtn').addEventListener('click', function () {
      const location = document.getElementById('location').value;
      const timeOfDay = document.getElementById('timeOfDay').value;

      // Filter encounters based on location and timeOfDay
      const filteredEncounters = data.encounters.filter(encounter => 
        encounter.location === location && encounter.timeOfDay === timeOfDay
      );

      const encounterDiv = document.getElementById('encounter');
      encounterDiv.innerHTML = ''; // Clear previous encounter

      if (filteredEncounters.length > 0) {
        const encounter = filteredEncounters[Math.floor(Math.random() * filteredEncounters.length)];

        // Encounter Description
        const description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = `<h2>Encounter</h2><p>${encounter.description}</p>`;
        encounterDiv.appendChild(description);

        // Choices Section
        const choicesDiv = document.createElement('div');
        choicesDiv.classList.add('choices');
        const choiceHeader = document.createElement('p');
        choiceHeader.classList.add('choice-header');
        choiceHeader.textContent = "Choices:";
        choicesDiv.appendChild(choiceHeader);

        encounter.choices.forEach(choice => {
          const choiceButton = document.createElement('button');
          choiceButton.textContent = `Roll: ${choice.roll}`;
          
          const effectText = document.createElement('p');
          effectText.classList.add('effect');
          effectText.textContent = `Effect: ${choice.effect}`;
          choicesDiv.appendChild(choiceButton);
          choicesDiv.appendChild(effectText);
        });

        encounterDiv.appendChild(choicesDiv);
      } else {
        encounterDiv.textContent = 'No encounters found for the selected location and time.';
      }
    });
  })
  .catch(error => console.error('Error loading encounters:', error));
