import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.delete('/api/pokemons/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);

        // Vérifiez si le Pokémon existe
        const pokemon = await Pokemon.findOne({ id });
        if (!pokemon) {
            return res.status(404).json({
                message: 'Le Pokémon avec cet ID n\'existe pas.'
            });
        }

        // Supprimez le Pokémon
        await Pokemon.deleteOne({ id });

        res.status(200).json({
            message: 'Le Pokémon a été supprimé avec succès.'
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression du Pokémon.',
            error: error.message
        });
    }
});

export default router;