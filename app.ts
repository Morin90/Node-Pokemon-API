import express, { Request, Response, Router } from "express";
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
import swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;
const router = Router();
router.use(basicAuth({
    users: { 'admin': 'supersecret' },
    challenge: true
}));
connectDB();


//Ajout du MiddleWare, pour pouvoir tracer les requêtes qui sont faites par le client
app
    .use(favicon(`${__dirname}/public/favicon.ico`))
    .use(morgan(`dev`))
    .use(bodyParser.json())

app.use(findAllPokemons);
app.use(findOnePokemons);
app.use(createPokemon);
app.use(deleteOnePokemon);
app.use(updatePokemon);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(require('./swagger-output.json')));

app.use((req: Request, res: Response) => {
    const message = 'La ressource demandée n\'existe pas. Vous pouvez essayer une autre URL.';
    return res.status(404).json({ message });
});



app.listen(PORT, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${PORT}`))




