let game =JSON.parse(localStorage.getItem("backpackData")) || { inventory:[], xp:0, lvl: 1, weatherIndex:0};
const input = document.getElementById('input-item');
const button = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');

function draw(){
    todoList.innerHTML = "";
    game.inventory.forEach((item, index) => { 
        const li = document.createElement('li');
        li.textContent = item.name;
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = '️🗑️'
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            game.inventory.splice(index, 1);
            draw();
        });
        li.appendChild(deleteBtn);

        if (item.equipped){
            li.classList.add('equipped');
        };
        li.addEventListener('click', () => {
            item.equipped = !item.equipped;

            if (item.equipped){
                game.xp = game.xp +25;
            }else{
                game.xp = game.xp -25;
            }

            if (game.xp >= 100) {
                game.lvl = game.lvl + 1;
                game.xp = 0;
                alert("🎊 LEVELUP! Your packaging skills have increased to level " + game.lvl);
            }

            draw();
        });
        todoList.appendChild(li);
    });
    localStorage.setItem('backpackData', JSON.stringify(game));
}

button.addEventListener('click', () => {
    const itemName = input.value;
    game.inventory.push({ name: itemName, equipped: false});
    draw();
    input.value = "";   
})

const weatherToggle = document.getElementById('weather-toggle');

const states = ["☀️Sunny☀️", "🌧️Rainy🌧️", "🌨️Snowy🌨️", "💨Windy💨", "🌫️Foggy🌫️", "⛈️Stormy⛈️"]

if (game.weatherIndex === undefined) {
    game.weatherIndex = 0;
}

weatherToggle.textContent = states [game.weatherIndex]

weatherToggle.addEventListener('click', () => {
    game.weatherIndex = game.weatherIndex + 1;

    game.inventory = game.inventory.filter((item) => {
        if(item.equipped === true) {
            return true;
        }
        if(item.name.includes("Raincoat") || item.name.includes("Waterproof") || item.name.includes("Dry sacks") || item.name.includes("Moisture-wicking")){
            return false;
        }
        if(item.name.includes("Waterproof") || item.name.includes("Warm") || item.name.includes("Softshell")){
            return false;
        }
        if(item.name.includes("Windproof") || item.name.includes("Neck gaiter") || item.name.includes("Lip balm") || item.name.includes("Gloves") || item.name.includes("Beanie")) {
            return false;
        }
        if(item.name.includes("Sun") || item.name.includes("Breathable") || item.name.includes("Swimmwear")) {
            return false;
        }
        if(item.name.includes("Headlamp")|| item.name.includes("Offline maps") || item.name.includes("Waterproof jacket") || item.name.includes("Reflexive pronouns") || item.name.includes("Compass")){
            return false;
        }
        if(item.name.includes("Raincoat") || item.name.includes("Powerbank") || item.name.includes("Firestarter")){
            return false;
        }
        return true;
    }) 

    if (game.weatherIndex >= states.length) {
        game.weatherIndex = 0;
    }
    weatherToggle.textContent = states[game.weatherIndex];

    if (states[game.weatherIndex] === "🌧️Rainy🌧️") {
        game.inventory.push({ name: "Raincoat", equipped: false });
        game.inventory.push({ name: "Waterproof shoes", equipped: false });
        game.inventory.push({ name: "Dry sacks", equipped: false });
        game.inventory.push({ name: "Moisture-wicking base layer" });
    }

    if(states[game.weatherIndex] === "🌨️Snowy🌨️") {
        game.inventory.push({ name: "Waterproof insulated gloves", equipped: false });
        game.inventory.push({ name: "Warm hat", equipped: false });
        game.inventory.push({ name: "Warm waterproof shoes", equipped: false});
        game.inventory.push({ name: "Waterproof softshell shoes",equipped: false});
        game.inventory.push({ name:"Softshell pants", equipped: false});
    }

    if(states[game.weatherIndex] === "💨Windy💨") {
        game.inventory.push({ name: "Windproof jacket", equipped: false });
        game.inventory.push({ name: "Windproof pants ", equipped: false});
        game.inventory.push({ name: "Neck gaiter", equipped: false});
        game.inventory.push({ name: "Lip balm", equipped: false});
        game.inventory.push({ name: "Headband/Beanie", equipped: false});
        game.inventory.push({ name: "Gloves", equipped: false});
    }
    if(states[game.weatherIndex] === "☀️Sunny☀️") {
        game.inventory.push({name:"Sun glasses", equipped: false});
        game.inventory.push({ name: "Breathable clothing", equipped: false});
        game.inventory.push({ name: "Sun cream", equipped: false});
        game.inventory.push({ name: "Swimmwear", equipped: false});
    }
    if(states[game.weatherIndex] === "🌫️Foggy🌫️") {
        game.inventory.push({ name:"Headlamp", equipped: false});
        game.inventory.push({ name: "Offline maps", equipped: false});
        game.inventory.push({ name: "Dry sacks", equipped: false});
        game.inventory.push({ name: "Waterproof jacket", equipped: false});
        game.inventory.push({ name: "Reflexive pronouns", equipped: false});
        game.inventory.push({ name: "Compass", equipped: false});

    }
    if(states[game.weatherIndex] === "⛈️Stormy⛈️") {
        game.inventory.push({name: "Raincoat", equipped: false});
        game.inventory.push({ name: "Waterproof shoes", equipped: false});
        game.inventory.push({ name: "Waterproof pants", equipped: false});
        game.inventory.push({ name: "Dry sacks", equipped: false});
        game.inventory.push({ name: "Offline maps", equipped: false});
        game.inventory.push({ name: "Powerbank", equipped: false});
        game.inventory.push({ name: "Firestarter", equipped: false});
    }
    draw();
});

draw();

const resetBtn = document.getElementById('reset-btn');

resetBtn.addEventListener('click', () => {
    if (confirm("Do you really want to delete whole list and start a new track?")){
        game.inventory = [];
        draw();
    }
});