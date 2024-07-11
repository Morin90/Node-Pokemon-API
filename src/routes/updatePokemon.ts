import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.put('/api/pokemons/:id', async (req: Request, res: Response) => {
    /* #swagger.tags = ['pokemons']
    #swagger.security = [{
        basicAuth: []
    }]
#swagger.summary = 'Mettre à jour un pokemons'
#swagger.description = 'Mettre à jour un pokemons de la base de données'
#swagger.parameters['id'] = {
    in: 'path',
    description: 'L\'id du pokemons',
    required: true,
    type: 'integer'
}
#swagger.responses[200] = {
    description: 'OK',
    schema: {
        type: 'object',
        properties: {
            message: { type: 'Le pokemons a été mis à jour avec succès.' },
            data: { $ref: '#/definitions/Pokemon' }
        }
    }
}   
#swagger.responses[404] = {
    description: 'Not Found',
    schema: {
        type: 'object',
        properties: {
            message: { type: 'Le pokemons avec cet ID n\'existe pas.' }
        }
    }

}
#swagger.responses[500] = {
    description: 'Internal Server Error',
    schema: {
        type: 'object',
        properties: {
            message: { type: 'Une erreur est survenue lors de la mise à jour du pokemons.' },
            error: { type: 'Description détaillée de l\'erreur.' }
        }
    }
}

 */
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