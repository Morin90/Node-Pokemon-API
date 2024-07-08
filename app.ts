import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import favicon from "serve-favicon";
import bodyParser from "body-parser";
import connectDB from "./src/db/config";
import findAllPokemons from "./src/routes/findAllPokemons";
import findOnePokemons from "./src/routes/findOnePokemons";
import createPokemon from "./src/routes/createPokemons";
import deleteOnePokemon from "./src/routes/deleteOnePokemon";
import updatePokemon from "./src/routes/updatePokemon";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

connectDB();


//Ajout du MiddleWare, pour pouvoir tracer les requêtes qui sont faites par le client
app
    .use(favicon(`${__dirname}/public/favicon.ico`))
    .use(morgan(`dev`))
    .use(bodyParser.json())
/*app.use((req: Request, res: Response, next: Function) =>{
    console.log(`URL : ${req.url}`)
    next()
});*/
app.use(findAllPokemons);
app.use(findOnePokemons);
app.use(createPokemon);
app.use(deleteOnePokemon);
app.use(updatePokemon);

app.listen(PORT, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${PORT}`))


