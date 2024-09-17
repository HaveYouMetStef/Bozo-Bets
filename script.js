// Array to store bets
let bets = [];


// Function to handle bet submission
function addBet(event) {
  event.preventDefault(); // Prevent the form from reloading the page

  // Get user and team from form input
  const user = document.getElementById('user').value;
  const team = document.getElementById('team').value;

  // Add the bet to the bets array
  const newBet = { user, team, result: null };
  bets.push(newBet);

  // Update the current week bets section
  updateBetList();

  // Reset the form
  document.getElementById('bet-form').reset();
}

// Function to update the list of bets displayed on the page
function updateBetList() {
  const betList = document.getElementById('bet-list');
  
  // Clear the current list
  betList.innerHTML = '';

  // Loop through the bets array and create list items for each bet
  bets.forEach((bet, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${bet.team} bet on ${bet.user} `;

    //apply color based on result
    if (bet.result === 'win') {
        listItem.style.color = 'green';
    } else if (bet.result === 'loss') {
        listItem.style.color = 'red';
    }

    //Win button
    const winButton = document.createElement('button');
    winButton.textContent = 'Win'
    winButton.addEventListener('click', () => markAsWin(index));

    //Loss button
    const lossButton = document.createElement('button');
    lossButton.textContent = 'Loss';
    lossButton.addEventListener('click', () => markAsLoss(index));

    //add the buttons to the list item
    listItem.appendChild(winButton);
    listItem.appendChild(lossButton);

    //add list item to the bet list
    betList.appendChild(listItem);
  });
}

//function for the win button when pressed
function markAsWin(index) {
    bets[index].result = 'win';
    updateBetList();
    updateResultsAndBozos();
}

//funct for the loss button when pressed
function markAsLoss(index) {
    bets[index].result = 'loss';
    updateBetList();
    updateResultsAndBozos();
}



function updateResultsAndBozos() {
    const bozos = [];
    const resultsSection = document.querySelector('.results');
    const bozoList = document.getElementById('bozo-list');

    //clear the current bozos list
    resultsSection.innerHTML = '<h3>Results</h3>';
    bozoList.innerHTML = '';

    //Loop through the bozos array and create list items for each bozo
    bets.forEach((bet) => {
        const resultItem = document.createElement('p');

        if (bet.result === 'win') {
            resultItem.textContent = `${bet.team} won their bet on ${bet.user}`;
        } else if (bet.result === 'loss') {
            resultItem.textContent = `${bet.team} lost their bet on ${bet.user}`;
            bozos.push(bet.team);
        }
        resultsSection.appendChild(resultItem);
    });

    //update the Bozos section

    if (bozos.length > 0) {
        bozos.forEach((team) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${team} is a Bozo this week!`;
            bozoList.appendChild(listItem); //display each bozo
        });
    } else {
        const noBozoItem = document.createElement('p');
        noBozoItem.textContent = 'Kings of the week!';
        bozoList.appendChild(noBozoItem)

    }
}


// Attach the addBet function to the form submit event
document.getElementById('bet-form').addEventListener('submit', addBet);
