import express, {Request, Response} from "express";
import dotenv from "dotenv";
import {success} from "./helper";
import {pokemons} from "./mock-pokemon";
// Récuperer uniquement la fonction success du module Helper.js


dotenv.config();
const app = express();
const PORT = process.env.PORT|| 3000;
const pokemon= [pokemons];

//Point de terminaison test
app.get("/", (request: Request, response: Response) => {
    //Message de bienvenue
    response.status(200).send("Hello Express  👌   !");
})

//Point de terminaison permettant de récupérer un pokemon/id
app.get("/api/pokemons/:id", (request: Request, response: Response) => {
    // constante pour récuperer le params Id
    const id = parseInt(request.params.id, 10);
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



app.listen(PORT, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${PORT}`))


