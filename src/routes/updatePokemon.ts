import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.put('/api/pokemons/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const updateData = req.body;

        // Vérifiez si le Pokémon existe
        const pokemon = await Pokemon.findOne({ id });
        if (!pokemon) {
            return res.status(404).json({
                message: 'Le Pokémon avec cet ID n\'existe pas.'
            });
        }

        // Mettre à jour le Pokémon
        const updatedPokemon = await Pokemon.findOneAndUpdate({ id }, updateData, { new: true });

        res.status(200).json({
            message: 'Le Pokémon a été mis à jour avec succès.',
            data: updatedPokemon
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour du Pokémon.',
            error: error.message
        });
    }
});

export default router;