import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.get('/api/pokemons/:id', async (req: Request, res: Response) => {
    
/* #swagger.tags = ['pokemons']
#swagger.summary = 'Rechercher un pokemons'
#swagger.description = 'Recherche un pokemons dans la base de données par son identifiant'
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
            message: { type: 'Le pokemons a été trouvé.' },
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
            message: { type: 'Une erreur est survenue lors de la sélection du pokemons.' },
            error: { type: 'Description détaillée de l\'erreur.' }
        }
    }
}

 */
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