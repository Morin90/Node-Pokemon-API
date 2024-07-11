import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.post('/api/pokemons', async (req: Request, res: Response) => {
    try {
       
        
        const {  name, hp, cp, picture, types } = req.body;

        // Validation de base des champs
        if ( !name || !hp || !cp || !picture || !types) {
            return res.status(400).json({
                message: 'Tous les champs sont requis :  name, hp, cp, picture, types.'
            });
        }

        // Vérification de l'unicité du nom
        const existingPokemon = await Pokemon.findOne({ name });
        if (existingPokemon) {
            return res.status(400).json({
                message: 'Le nom est déjà pris.'
            });
        }

// Obtention de la longueur actuelle de la collection
const count = await Pokemon.countDocuments({});
const newId = count + 1;

        // Création du Pokémon
        const newPokemon = new Pokemon({
            id: newId,
            name,
            hp,
            cp,
            picture,
            types
        });
 /* #swagger.tags = ['pokemons']
#swagger.summary = 'Ajouter un nouveau pokémon'
#swagger.parameters['body'] = {
    in: 'body',
    description: 'Le nouveau pokémon',
    required: true,
    schema: {
        $ref: '#/definitions/Pokemon'
    }
}
#swagger.description = 'Ajoute un nouveau pokémôn au jeu de base de données.'
 */
        // Sauvegarder le Pokémon dans la base de données
        await newPokemon.save();

        res.status(201).json({
            /* #swagger.responses[201] = {
                description: 'Le pokémón a été ajouté avec succès.',
                schema: {
                    $ref: '#/definitions/Pokemon'
                }
            }
            
            */
            message: 'Le Pokémon a été créé avec succès.',
            data: newPokemon
        });
    } catch (error: any) {
          /* #swagger.responses[500] = {
                description: 'Erreur serveur interne'
            }
             */
        res.status(500).json({
          
            message: 'Une erreur est survenue lors de la création du Pokémon.',
            error: error.message
        });
    }
});

export default router;