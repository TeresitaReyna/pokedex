const pokemonContainer = document.querySelector(".pokemon-container"); //Contenedor del HTML
const input = document.querySelector("#searchInput"); //Contenedor de la busqueda
let pokemons = []   //Array original de todos los pokemons
let busca = []      //Array que muestra los de la busqueda
let count = 0       //Contador, no lo muevan o explota esto
class pokemon {     //Objeto de los pokemon
    constructor(nombre,id,tipos,stats,n_stats,habilidad,img) {  //Constructor para las variables
        this.nombre = nombre
        this.id = id
        this.tipos = tipos
        this.stats = stats 
        this.n_stats = n_stats 
        this.habilidad = habilidad
        this.img = img
    }

    imprimir(){     //Función que imprime los pokemon en el HTML en base a la lista de objetos
        const dive = document.createElement('div'); //Crea un DIV
        dive.innerHTML =    //Pone la info en el HTML
        `<div class="card-pokemon">
            <div class="image">
                <div class="image__container">
                    <img src="${this.img}" class="imagen-pokemon u-full-width">
                </div>
            </div>
            <div class="info-card info-card__custom">
                <p class="id-pokemon">No° ${this.id.toString().padStart(3, 0)}</p>
                <h4 class="titulo-pokemon">${this.nombre}</h4>
                <p class="tipos">${this.tipos.join('&nbsp &nbsp')}</p>
                <p class="habilidades-pokemon">${this.habilidad.join('&nbsp &nbsp')}</p>
                <li">
                    <div style="display: flex; gap: 25px;  align-items: center;">
                        <p style="text-align: left;">${this.n_stats.join('<br/>')}</p>
                        <p>${this.stats.join('<br/>')}</p>
                    </div>
                </li>    
            </div>`;
        pokemonContainer.append(dive);
    }

    cargarBuscador(){       //Función que hace que se reaccione a la busqueda
        input.addEventListener('keyup', e => {  //Se activa al teclear
            const newP = pokemons.filter(cursito =>     //Filtra la información en base a la busqueda
                `${cursito.nombre.toLowerCase()}`.includes(input.value.toLowerCase())); 
                LimpiarHtmlbody()       //Limpia el HTML para que no haya multidatos
            for (let x = 0; x < newP.length; x++) {     //Crea con la lista en base a los pokemon resultado
                busca[x] = newP[x]
                busca[x].imprimir()         
            }
            return
        })
        
    }
}

Pokemons()  //Manda a llamar a la función que inicializa NO BORRAR

function Pokemons(){ //Inicializa los pokemon, en el limit pones cuantos máximo
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=150&offset=0`)
    .then((res) => res.json())
    .then((data) => {
        createPokemon(data) //Llama a la función que vacía los datos de la API al objeto
    }); 
}

function createPokemon(data){   //Crea los objetos pokemon en base a la API
    const pokes = data.results.map(poke => {
        url = poke.url
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            let statsName = []
            let stats = []
            let tipos = []
            let hab = []
            for (let i = 0; i < data.stats.length; i++) {       //Guarda la info de las STATS     
                statsName[i] = data.stats[i].stat.name;
                stats[i] = data.stats[i].base_stat;
            }
            for (let i = 0; i < data.types.length; i++ ){       //Guarda la info de los tipos
                tipos[i] = data.types[i].type.name;
            }
            for (let i = 0; i < data.abilities.length; i++ ){   //Guarda la info de las habilidades
                hab[i] = data.abilities[i].ability.name;
            }
            
            pokemons [count] = new pokemon(data.name,data.id.toString().padStart(3, 0),tipos,stats,statsName,hab,data.sprites.front_default)
            pokemons[count].imprimir()
            pokemons[count].cargarBuscador()
            count++
        }); 
        return poke
    })
}

function LimpiarHtmlbody(){         //La función se llama "Limpiar HTMLbody" ¿Tu qué crees que hace?
    while(pokemonContainer.firstChild){
        pokemonContainer.removeChild(pokemonContainer.firstChild);
    }
}
