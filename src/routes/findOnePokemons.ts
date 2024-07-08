import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.get('/api/pokemons/:id', async (req: Request, res: Response) => {
    try {
        const pokemonId = req.params.id;
        const pokemon = await Pokemon.findOne({ id: pokemonId }); // Rechercher un Pokémon par son identifiant

        if (!pokemon) {
            return res.status(404).json({
                message: `Le Pokémon avec l'identifiant ${pokemonId} n'a pas été trouvé.`
            });
        }

        res.json({
            message: 'Le Pokémon a bien été récupéré.',
            data: pokemon
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération du Pokémon.',
            error: error.message
        });
    }
});

export default router;