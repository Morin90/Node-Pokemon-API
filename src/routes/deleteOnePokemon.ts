import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.delete('/api/pokemons/:id', async (req: Request, res: Response) => {
    /* #swagger.tags = ['pokemons']
    #swagger.security = [{
        basicAuth: []
    }]
#swagger.summary = 'Supprimer un pokemons par Id'
#swagger.responses[200] = {
        description: 'Pokémon supprimé avec succès'
    }
#swagger.responses[404] = {
        description: 'Pokémon non trouvé'
        
    }
#swagger.responses[500] = {
        description: 'Erreur serveur interne'
    }

 */
    /*try {
        const pokemonId = parseInt(req.params.id);

        // Vérifiez si le Pokémon existe
        const pokemon = await Pokemon.findOne({ id : pokemonId});
        if (!pokemon) {
            return res.status(404).json({
                message: 'Le Pokémon avec cet ID n\'existe pas.'
            });
        }

        // Supprimez le Pokémon
        await Pokemon.deleteOne({ id: pokemonId });

        res.status(200).json({
            message: 'Le Pokémon a été supprimé avec succès.'
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression du Pokémon.',
            error: error.message
        });
    }*/

        try {
            const deletedPokemon = await Pokemon.findOneAndDelete({ id: req.params.id });
            if (!deletedPokemon) return res.status(404).json({ message: "Pokemon non trouvé" });
            res.status(200).json({ message: "Pokemon supprimé" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
});

export default router;