import { Router, Request, Response } from 'express';
import Pokemon from '../models/pokemons';

const router = Router();

router.post('/api/pokemons', async (req: Request, res: Response) => {
    try {
        const {  name, hp, cp, picture, types } = req.body;

        // Validation de base (vous pouvez ajouter plus de validations si nécessaire)
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

        // Sauvegarder le Pokémon dans la base de données
        await newPokemon.save();

        res.status(201).json({
            message: 'Le Pokémon a été créé avec succès.',
            data: newPokemon
        });
    } catch (error: any) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la création du Pokémon.',
            error: error.message
        });
    }
});

export default router;