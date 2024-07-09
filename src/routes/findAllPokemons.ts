import Pokemon from "../models/pokemons"
import { Request, Response, Router } from "express"



const router = Router();

router.get('/api/pokemons', async (req: Request, res: Response) => {
    try {
        // Recherche des pokemons par nom
        const limit = parseInt(req.query.limit as string) || 6; // limiter la recherche a 6 pokemons maximum
        if (req.query.name) {
            const name = req.query.name as string;
            const totalPokemons = await Pokemon.countDocuments({ name: new RegExp(name, 'i') });
            const pokemons = await Pokemon.find({ name: new RegExp(name, 'i') }).sort({ name: 1 }).limit(limit); // Utilisation de regex pour recherche insensible à la casse
            return res.json({
                message: `Il y a ${totalPokemons} pokemons qui correspondent è votre recherche.`,
                data: pokemons
            });
        } else {
            // Compter tous les Pokémon dans la base de données
            const totalPokemons = await Pokemon.countDocuments();
            const pokemons = await Pokemon.find().sort({ name: 1 }); // Récupérer tous les Pokémon
            res.json({
                message: 'Les Pokémon ont bien été récupérés, il y en a ' + totalPokemons + ' au total.',
                data: pokemons
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des Pokémon.',
            error: error.message
        });
    }
});

export default router;