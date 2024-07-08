import Pokemon from "../models/pokemons"
import { Request, Response, Router } from "express"



const router = Router();

router.get('/api/pokemons', async (req: Request, res: Response) => {
    try {
        const pokemons = await Pokemon.find(); // Récupérer tous les Pokémon
        res.json({
            message: 'Les Pokémon ont bien été récupérés.',
            data: pokemons
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des Pokémon.',
            error: error.message
        });
    }
});

export default router;