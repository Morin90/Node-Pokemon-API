const express = require("express");
const helper = require("./helper.js");
let pokemons = require("./mock-pokemon.js");

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello Express  👌   !");
})

app.get("/api/pokemons/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const pokemon = pokemons.find(pokemon => pokemon.id == id);
    const message = `Un pokemon a bien été trouvé`;
    res.json(helper.success(message, pokemon));
})

app.get(`/api/pokemons`, (req, res) => {
    res.send(`Il y a ${pokemons.length} pokemons dans le Pokedex pour le moment.`);
})

app.listen(port, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${port}`))