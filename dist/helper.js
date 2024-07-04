"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueId = exports.success = void 0;
const success = (message, data) => {
    return { message, data };
};
exports.success = success;
// Ajout d'une méthode outils pour définir un Id unique a chaque création de nouveau pokemon
const getUniqueId = (pokemons) => {
    const pokemonsIds = pokemons.map((pokemon) => pokemon.id);
    const maxId = pokemonsIds.reduce((a, b) => Math.max(a, b));
    const uniqueId = maxId + 1;
    return uniqueId;
};
exports.getUniqueId = getUniqueId;
