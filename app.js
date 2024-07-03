const express = require("express");
// Récuperer uniquement la fonction success du module Helper.js
const {success} = require("./helper.js");
let pokemons = require("./mock-pokemon.js");

const app = express();
const port = 3000;
//Point de terminaison test
app.get("/", (req, res) => {
    //Message de bienvenue
    res.send("Hello Express  👌   !");
})

//Point de terminaison permettant de récupérer un pokemon/id
app.get("/api/pokemons/:id", (req, res) => {
    // constante pour compter le nombre de pokemons
    const id = parseInt(req.params.id);
    // constante pour rechercher le bon id
    const pokemon = pokemons.find(pokemon => pokemon.id == id);
    //constante pour le message
    const message = `Un pokemon a bien été trouvé`;
    // Ajout d'un message pour informer que le pokemon a bien été trouvé
    res.json(success(message, pokemon));
})

//Le nouveau point de terminaison affiche le nombre de pokemons se trouvant dans le Pokedex
app.get(`/api/pokemons`, (req, res) => {
    res.send(`Il y a ${pokemons.length} pokemons dans le Pokedex pour le moment.`);
})

app.listen(port, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${port}`))