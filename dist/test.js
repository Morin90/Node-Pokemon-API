"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = void 0;
exports.default = default_1;
const http_1 = __importDefault(require("k6/http"));
const k6_1 = require("k6");
exports.options = {
    stages: [
        { duration: '30s', target: 10 }, // simulate ramp-up of traffic from 1 to 10 users over 30 seconds
        { duration: '1m', target: 10 }, // stay at 10 users for 1 minute
        { duration: '10s', target: 0 }, // ramp-down to 0 users
    ],
};
const BASE_URL = 'http://localhost:3000/api/pokemons'; // Change this to your API URL
function default_1() {
    // Test the POST endpoint
    const payload = JSON.stringify({
        name: 'TestPokemon',
        hp: 100,
        cp: 100,
        picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: ['Electric']
    });
    const headers = { 'Content-Type': 'application/json' };
    const postRes = http_1.default.post(BASE_URL, payload, { headers: headers });
    (0, k6_1.check)(postRes, {
        'POST status is 201': (response) => response.status === 201,
    });
    // Extract the created Pokemon ID
    const pokemonId = postRes.json('data.id');
    // Test the GET all endpoint
    const getAllRes = http_1.default.get(BASE_URL);
    (0, k6_1.check)(getAllRes, {
        'GET all status is 200': (response) => response.status === 200,
    });
    // Test the GET by ID endpoint
    const getRes = http_1.default.get(`${BASE_URL}/${pokemonId}`);
    (0, k6_1.check)(getRes, {
        'GET by ID status is 200': (response) => response.status === 200,
    });
    // Test the PUT endpoint
    const updatePayload = JSON.stringify({
        name: 'UpdatedPokemon',
        hp: 120,
        cp: 120,
        picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        types: ['Electric', 'Fire']
    });
    const putRes = http_1.default.put(`${BASE_URL}/${pokemonId}`, updatePayload, { headers: headers });
    (0, k6_1.check)(putRes, {
        'PUT status is 200': (response) => response.status === 200,
    });
    // Test the DELETE endpoint
    const delRes = http_1.default.del(`${BASE_URL}/${pokemonId}`);
    (0, k6_1.check)(delRes, {
        'DELETE status is 200': (response) => response.status === 200,
    });
    (0, k6_1.sleep)(1);
}
