import express, {Request, Response} from "express";
import dotenv from "dotenv";
import {success, getUniqueId} from "./helper";
import {pokemons as importedPokemons} from "./mock-pokemon";
import morgan from "morgan";
import favicon from "serve-favicon";
import bodyParser from "body-parser";
// Récuperer uniquement la fonction success du module Helper.js

let pokemons = [...importedPokemons];
dotenv.config();
const app = express();
const PORT = process.env.PORT|| 3000;


//Ajout du MiddleWare, pour pouvoir tracer les requêtes qui sont faites par le client
app
.use(favicon(`${__dirname}/public/favicon.ico`))
.use(morgan(`dev`))
.use(bodyParser.json())
/*app.use((req: Request, res: Response, next: Function) =>{
    console.log(`URL : ${req.url}`)
    next()
});*/

//Point de terminaison test
app.get("/", (request: Request, response: Response) => {
    //Message de bienvenue
    response.status(200).send("Hello Express  👌   !");
})

//Point de terminaison permettant de récupérer un pokemon/id
app.get("/api/pokemons/:id", (request: Request, response: Response) => {
    // constante pour récuperer le params Id
    const id = parseInt(request.params.id);
    // constante pour rechercher le bon id
    const pokemon = pokemons.find((pokemon => pokemon.id == id));
    //constante pour le message
    const message = `Un pokemon a bien été trouvé`;
    // Ajout d'un message pour informer que le pokemon a bien été trouvé
    response.json({message,pokemon});
})

//Le nouveau point de terminaison affiche la liste des pokemons
app.get(`/api/pokemons`, (request: Request, response: Response) => {
    // Ajout d'un message pour informer que la liste a bien été récuperée
    const message = `La liste des pokemons a bien été récupérée.`;
    response.json(success(message,pokemons));
    
})

//point de terminaison pour ajouter un pokemon
app.post(`/api/pokemons`, (request: Request, response: Response) => {
    const id = getUniqueId(pokemons);
    const pokemonCreated = {
        ...request.body, ...{id: id, created: new Date()}}
        pokemons.push(pokemonCreated);
        const message = `Le pokemon ${pokemonCreated.name} a bien été créé.`;
        response.json(success(message, pokemonCreated));
    
})

//Ajout d'un nouveau point de terminaison pour modifier un pokemon
app.put(`/api/pokemons/:id`, (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const pokemonUpdated = {
        ...request.body, id: id}
        pokemons = pokemons.map(pokemon =>{
            return pokemon.id === id ? pokemonUpdated : pokemon}
        )
        const message = `Le pokemon ${pokemonUpdated.name} a bien été mis à jour.`;
        response.json(success(message, pokemonUpdated));
})

//Ajout d'un nouveau point de terminaison pour supprimer un pokemon
app.delete(`/api/pokemons/:id`, (request: Request, response: Response) => {
    const id = parseInt(request.params.id);
    const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id);
    pokemons.filter(pokemon => pokemon.id !== id);
    if (pokemonDeleted) {
        pokemons = pokemons.filter((pokemon) => pokemon.id !== id);
        const message = `Le pokemon ${pokemonDeleted.name} a bien été supprimé.`;
        response.json(success(message, pokemonDeleted));
    } else {
        const message = `Aucun pokemon trouvé avec l'id ${id}.`;
        response.status(404).json({ message });
    }
});

app.listen(PORT, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${PORT}`))


