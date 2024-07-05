"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
const mongoose_1 = __importDefault(require("mongoose"));
// Récuperer uniquement la fonction success du module Helper.js
let pokemons = [...mock_pokemon_1.pokemons];
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/pokemons";
// Connect to MongoDB
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield mongoose_1.default.connect(MONGODB_URI);
        console.log('MongoDB connected successfully');
    }
    catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
});
exports.default = connectDB;
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
    const id = parseInt(request.params.id);
    // constante pour rechercher le bon id
    const pokemon = pokemons.find((pokemon => pokemon.id == id));
    //constante pour le message
    const message = `Un pokemon a bien été trouvé`;
    // Ajout d'un message pour informer que le pokemon a bien été trouvé
    response.json({ message, pokemon });
});
//Le nouveau point de terminaison affiche la liste des pokemons
app.get(`/api/pokemons`, (request, response) => {
    // Ajout d'un message pour informer que la liste a bien été récuperée
    const message = `La liste des pokemons a bien été récupérée.`;
    response.json((0, helper_1.success)(message, pokemons));
});
//point de terminaison pour ajouter un pokemon
app.post(`/api/pokemons`, (request, response) => {
    const id = (0, helper_1.getUniqueId)(pokemons);
    const pokemonCreated = Object.assign(Object.assign({}, request.body), { id: id, created: new Date() });
    pokemons.push(pokemonCreated);
    const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`;
    response.json((0, helper_1.success)(message, pokemonCreated));
});
//Ajout d'un nouveau point de terminaison pour modifier un pokemon
app.put(`/api/pokemons/:id`, (request, response) => {
    const id = parseInt(request.params.id);
    const pokemonUpdated = Object.assign(Object.assign({}, request.body), { id: id });
    pokemons = pokemons.map(pokemon => {
        return pokemon.id === id ? pokemonUpdated : pokemon;
    });
    const message = `Le pokemon ${pokemonUpdated.name} a bien été mis à jour.`;
    response.json((0, helper_1.success)(message, pokemonUpdated));
});
//Ajout d'un nouveau point de terminaison pour supprimer un pokemon
app.delete(`/api/pokemons/:id`, (request, response) => {
    const id = parseInt(request.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons.filter(pokemon => pokemon.id !== id);
    if (pokemonDeleted) {
        pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
        const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`;
        response.json((0, helper_1.success)(message, pokemonDeleted));
    }
    else {
        const message = `Aucun pokemon trouvé avec l'id ${id}.`;
        response.status(404).json({ message });
    }
});
app.listen(PORT, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${PORT}`));
// port pour la base de données : mongodb://localhost:27017
