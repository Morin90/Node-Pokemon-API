"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const helper_1 = require("./helper");
const mock_pokemon_1 = require("./mock-pokemon");
const morgan_1 = __importDefault(require("morgan"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const body_parser_1 = __importDefault(require("body-parser"));
// Récuperer uniquement la fonction success du module Helper.js
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
//Ajout du MiddleWare, pour pouvoir tracer les requêtes qui sont faites par le client
app
    .use((0, serve_favicon_1.default)(`${__dirname}/public/favicon.ico`))
    .use((0, morgan_1.default)(`dev`))
    .use(body_parser_1.default.json());
/*app.use((req: Request, res: Response, next: Function) =>{
    console.log(`URL : ${req.url}`)
    next()
});*/
//Point de terminaison test
app.get("/", (request, response) => {
    //Message de bienvenue
    response.status(200).send("Hello Express  👌   !");
});
//Point de terminaison permettant de récupérer un pokemon/id
app.get("/api/pokemons/:id", (request, response) => {
    // constante pour récuperer le params Id
    const id = parseInt(request.params.id, 10);
    // constante pour rechercher le bon id
    const pokemon = mock_pokemon_1.pokemons.find((pokemon => pokemon.id == id));
    //constante pour le message
    const message = `Un pokemon a bien été trouvé`;
    // Ajout d'un message pour informer que le pokemon a bien été trouvé
    response.json({ message, pokemon });
});
//Le nouveau point de terminaison affiche la liste des pokemons
app.get(`/api/pokemons`, (request, response) => {
    // Ajout d'un message pour informer que la liste a bien été récuperée
    const message = `La liste des pokemons a bien été récupérée.`;
    response.json((0, helper_1.success)(message, mock_pokemon_1.pokemons));
});
//point de terminaison pour ajouter un pokemon
app.post(`/api/pokemons`, (request, response) => {
    const id = (0, helper_1.getUniqueId)(mock_pokemon_1.pokemons);
    const pokemonCreated = Object.assign(Object.assign({}, request.body), { id: id, created: new Date() });
    mock_pokemon_1.pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`;
    response.json((0, helper_1.success)(message, pokemonCreated));
});
app.listen(PORT, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${PORT}`));
