// Fetch the encounter and NPC data from the respective JSON files
Promise.all([
  fetch('encounters.json').then(response => response.json()),
  fetch('npc.json').then(response => response.json())
])
  .then(([encounterData, npcData]) => {
    console.log('Data loaded:', encounterData, npcData);  // Debugging line
    // Add event listener for encounter generation
    document.getElementById('generateBtn').addEventListener('click', function () {
      console.log('Generate Encounter button clicked');  // Debugging line

      const encounterDiv = document.getElementById('encounter');
      encounterDiv.innerHTML = ''; // Clear previous encounter

      if (encounterData.encounters.length > 0) {
        // Randomly select an encounter from the list
        const encounter = encounterData.encounters[Math.floor(Math.random() * encounterData.encounters.length)];

        // Randomly select students from the NPC list
        const randomStudent1 = npcData.students[Math.floor(Math.random() * npcData.students.length)];
        const randomStudent2 = npcData.students[Math.floor(Math.random() * npcData.students.length)];

        // Add students to the encounter dynamically
        encounter.studentsInvolved = [
          { "name": randomStudent1.name, "college": randomStudent1.college, "year": randomStudent1.year, "personality": randomStudent1.personality },
          { "name": randomStudent2.name, "college": randomStudent2.college, "year": randomStudent2.year, "personality": randomStudent2.personality }
        ];

        // Encounter Description with Student NPC inline
        const description = document.createElement('div');
        description.classList.add('description');
        description.innerHTML = `
          <h2>Encounter</h2>
          <p><strong>${encounter.studentsInvolved[0].name}</strong> (${encounter.studentsInvolved[0].year} year student from ${encounter.studentsInvolved[0].college}) rushes up to you in a panic—they've lost their class notes and need help before a quiz.</p>
        `;
        encounterDiv.appendChild(description);

        // Student's Blurb Section
        const studentBlurb = document.createElement('div');
        studentBlurb.classList.add('student-blurb');
        studentBlurb.innerHTML = `
          <p><em>${encounter.studentsInvolved[0].name}, a ${encounter.studentsInvolved[0].year} year student from ${encounter.studentsInvolved[0].college}, is ${encounter.studentsInvolved[0].personality.toLowerCase()}.</em></p>
        `;
        encounterDiv.appendChild(studentBlurb);

        // Choices Section
        const choicesDiv = document.createElement('div');
        choicesDiv.classList.add('choices');
        const choiceHeader = document.createElement('p');
        choiceHeader.classList.add('choice-header');
        choiceHeader.textContent = "Choices:";
        choicesDiv.appendChild(choiceHeader);

        // List of Choices
        const choiceList = document.createElement('ul');  // Creating a list for choices

        encounter.choices.forEach(choice => {
          const choiceItem = document.createElement('li');
          choiceItem.classList.add('choice-item');
          choiceItem.textContent = `Roll: ${choice.roll} - Effect: ${choice.effect}`;
          choiceList.appendChild(choiceItem);
        });

        choicesDiv.appendChild(choiceList);
        encounterDiv.appendChild(choicesDiv);
      } else {
        encounterDiv.textContent = 'No encounters available.';
      }
    });
  })
  .catch(error => console.error('Error loading encounters or NPCs:', error));
