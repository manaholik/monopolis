type SpaceType = 'special' | 'property' | 'tax' | 'railroad' | 'utility';
type Player = {
    id: number;
    icon: HTMLElement;
    position: number;
    money: number;
};

const spaces = [
    { name: "GO", type: "special" },
    { name: "Mediterranean Avenue", type: "property", price: 60 },
    { name: "Community Chest", type: "special" },
    { name: "Baltic Avenue", type: "property", price: 60 },
    { name: "Income Tax", type: "tax", amount: 200 },
    { name: "Reading Railroad", type: "railroad", price: 200 },
    { name: "Oriental Avenue", type: "property", price: 100 },
    { name: "Chance", type: "special" },
    { name: "Vermont Avenue", type: "property", price: 100 },
    { name: "Connecticut Avenue", type: "property", price: 120 },
    { name: "Jail", type: "special" },
    { name: "St. Charles Place", type: "property", price: 140 },
    { name: "Electric Company", type: "utility", price: 150 },
    { name: "States Avenue", type: "property", price: 140 },
    { name: "Virginia Avenue", type: "property", price: 160 },
    { name: "St. James Place", type: "property", price: 180 },
    { name: "Tennessee Avenue", type: "property", price: 180 },
    { name: "New York Avenue", type: "property", price: 200 },
    { name: "Free Parking", type: "special" },
    { name: "Kentucky Avenue", type: "property", price: 220 },
    { name: "Indiana Avenue", type: "property", price: 220 },
    { name: "Illinois Avenue", type: "property", price: 240 },
    { name: "B&O Railroad", type: "railroad", price: 200 },
    { name: "Atlantic Avenue", type: "property", price: 260 },
    { name: "Ventnor Avenue", type: "property", price: 260 },
    { name: "Water Works", type: "utility", price: 150 },
    { name: "Marvin Gardens", type: "property", price: 280 },
    { name: "Go to Jail", type: "special" },
    { name: "Pacific Avenue", type: "property", price: 300 },
    { name: "North Carolina Avenue", type: "property", price: 300 },
    { name: "Pennsylvania Avenue", type: "property", price: 320 },
    { name: "Short Line", type: "railroad", price: 200 },
    { name: "Park Place", type: "property", price: 350 },
    { name: "Luxury Tax", type: "tax", amount: 100 },
    { name: "Boardwalk", type: "property", price: 400 },
];

const players: Player[] = [
    { id: 1, icon: document.getElementById('player1-icon')!, position: 0, money: 1500 },
    { id: 2, icon: document.getElementById('player2-icon')!, position: 0, money: 1500 },
];

let currentPlayerIndex = 0;

function rollDice(): number {
    return Math.floor(Math.random() * 6) + 1;
}

function movePlayer(player: Player, steps: number) {
    player.position = (player.position + steps) % spaces.length;

    // Handle passing GO
    if (player.position === 0) {
        player.money += 200; // Collect 200
    }

    updatePlayerPosition(player);
    processCurrentSpace(player);
}

function updatePlayerPosition(player: Player) {
    const space = spaces[player.position];
    // Update player icon position for the corresponding space
    // This logic assumes each space has a consistent DOM element, which should be implemented.
    // Example:
    // player.icon.style.transform = `translate(${x}px, ${y}px)`; // Update this to update the position
}

function processCurrentSpace(player: Player) {
    const space = spaces[player.position];

    switch (space.type) {
        case 'property':
            offerToBuyProperty(player, space);
            break;

        case 'tax':
            player.money -= space.amount!;
            break;

        // Handle other space types (utilities, railroads, special spaces) here
    }
}

function offerToBuyProperty(player: Player, space: any) {
    if (confirm(`Do you want to buy ${space.name} for ${space.price}?`)) {
        if (player.money >= space.price) {
            player.money -= space.price;
            alert(`${space.name} purchased!`);
            // Update ownership data if needed
        } else {
            alert(`You don't have enough money to buy ${space.name}.`);
        }
    }
}

document.querySelector('.roll-button')!.addEventListener('click', () => {
    const steps = rollDice();
    const player = players[currentPlayerIndex];

    movePlayer(player, steps);
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length; // Move to the next player
});
