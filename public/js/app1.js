const userList = document.querySelector('#users');

let url = "https://pokeapi.co/api/v2/pokemon/";
// let url = "https://pokeapi.co/api/v2/pokemon?limit=150&offset=0";

document.addEventListener('DOMContentLoaded', async() => {
    userList.innerHTML = `<h1>Cargando...</h1>`;
    const data = await loadUsers();
    // console.log(data.count);
    renderUsers(data);
});

input.addEventListener('keyup', e => {
    console.log(input.value);
    // const newUsers = users.filter(user => `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(input.value.toLowerCase()));
    // renderUsers(newUsers);
});

async function loadUsers() {
    let respuesta = await fetch(url);
    return res = respuesta.json();
    //console.log(res);
}

function renderUsers(users) {
    //const itemsString = createUserItems(users);
    //userList.innerHTML = itemsString;

    userList.innerHTML = ``;
    for (let i = 1; i < 2; i++) { //users.results.length;
        // userList.innerHTML += `<li class="bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer">${users.results[i].name}</li>`
        let habilidad = [];
        let stats = [];
        let statsName = [];
        let tipos = [];
        fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`) //`https://pokeapi.co/api/v2/pokemon/${i}/`
            .then((res) => res.json())
            .then((data) => {
                // console.log(data);
                for (let x = 0; x < data.abilities.length; x++) {
                    // console.log(data.name + ": " + data.abilities[x].ability.name);
                    habilidad[x] = data.abilities[x].ability.name;
                }

                for (let y = 0; y < data.stats.length; y++) {
                    //console.log(data.name + ": " + data.stats[y].stat.name + " " + data.stats[y].base_stat);
                    statsName[y] = data.stats[y].stat.name;
                    stats[y] = data.stats[y].base_stat;
                }
                
                for (let z = 0; z < data.types.length; z++) {
                    //console.log(data.name + ": " + data.types[z].type.name);
                    tipos[z] = data.types[z].type.name;
                }

                userList.innerHTML += `<li class="bg-zinc-800 hover:bg-zinc-700 hover:cursor-pointer">
                    <div style="display: flex; justify-content: center; align-items: center; flex-direction: column;">
                        <img src="${data.sprites.front_default}" alt="${data.name}" style="height: 20vh">
                        <p>${data.name}</p>
                        <p>No° ${data.id.toString().padStart(3, 0)}</p>
                        <p style="border">${tipos.join('<br/>')}</p>
                        <p>
                            <h4>Habilidades</h4>
                            ${habilidad.join('<br/>')}
                        </p>
                        
                        <div style="display: flex; gap: 25px; justify-content: center; align-items: center;">
                            <p style="text-align: left;">${statsName.join('<br/>')}</p>
                            <p>${stats.join('<br/>')}</p>
                        </div>
                    </div>
                </li>`
            });
    }
}