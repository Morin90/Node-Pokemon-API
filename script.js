import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';
import papaparse from 'https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js';
import { v4 as uuidv4 } from 'https://jslib.k6.io/k6-utils/1.1.0/index.js';

export const options = {
    vus: 10, // Nombre d'utilisateurs virtuels simultanés
    iterations: 100, // Nombre total d'itérations
};

// Load and parse the CSV file
const csvData = new SharedArray('pokemonNames', function () {
    return papaparse.parse(open('./pokemon_names.csv'), { header: true }).data;
});
// Global counter for unique IDs

const BASE_URL = 'http://localhost:3000/api/pokemons'; // Change this to your API URL

// Function to get a random Pokemon name
function getRandomName() {
    const index = Math.floor(Math.random() * csvData.length);
    return csvData[index].name;
}
function generateUUID() {
    return uuidv4();
}

export default function () {
    let headers = { 'Content-Type': 'application/json' };

    // 1. Create a Pokemon with a random name and unique ID
    let createPayload = JSON.stringify({
        name: getRandomName(),
        hp: 10,
        cp: 10,
        picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: ['Electrik']
    });
    console.log(createPayload);
    let postRes = http.post(BASE_URL, createPayload, { headers: headers });
    check(postRes, {
        'POST status is 201': (res) => res.status === 201,
    });
console.log(postRes.body);
    let pokemonId;

    if (postRes.status === 201) {
        let createdPokemon = JSON.parse(postRes.body);
        pokemonId = createdPokemon.data.id;
        console.log(`Created Pokemon with ID: ${pokemonId}`);
    } else {
        console.error(`Failed to create Pokemon: ${postRes.status} ${postRes.body}`);
        return;
    }

    // Ensure the Pokemon ID is defined before proceeding
    if (pokemonId !== undefined) {
        // 2. Get all Pokemons
        let getAllRes = http.get(BASE_URL);
        check(getAllRes, {
            'GET all status is 200': (res) => res.status === 200,
        });

        // 3. Get Pokemon by ID
        let getRes = http.get(`${BASE_URL}/${pokemonId}`);
        check(getRes, {
            'GET by ID status is 200': (res) => res.status === 200,
        });
        
        // 4. Update the Pokemon with a new random name

        console.log(`Pokemon ID avant update: ${pokemonId}`);
        let updatePayload = JSON.stringify({
            name: getRandomName(),
            hp: 12,
            cp: 12,
            picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
            types: ['Electrik', 'Feu']
        });
        let putRes = http.put(`${BASE_URL}/${pokemonId}`, updatePayload, { headers: headers });
        check(putRes, {
            'PUT status is 200': (res) => res.status === 200,
        });
console.log(putRes.body);
        // 5. Delete the Pokemon
        let delRes = http.del(`${BASE_URL}/${pokemonId}`);
        check(delRes, {
            'DELETE status is 200': (res) => res.status === 200,
        });
    } else {
        console.error('Pokemon ID is undefined. Aborting test.');
    }
console.log(`Pokemon ID: ${pokemonId}`);
}