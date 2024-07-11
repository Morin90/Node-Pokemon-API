"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pokemons_1 = __importDefault(require("../models/pokemons"));
const router = (0, express_1.Router)();
router.delete('/api/pokemons/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    /* #swagger.tags = ['pokemons']
    #swagger.security = [{
        basicAuth: []
    }]
#swagger.summary = 'Supprimer un pokemons par Id'
#swagger.responses[200] = {
        description: 'Pokémon supprimé avec succès'
        properties: {
            message: { type: 'Le pokemons a été supprimé avec succès.' }
        }
    }
#swagger.responses[404] = {
        description: 'Pokémon non trouvé'
        properties: {
            message: { type: 'Le pokemons avec cet ID n\'existe pas.' }
        }
    }
#swagger.responses[500] = {
        description: 'Erreur serveur interne'
        properties: {
            message: { type: 'Une erreur est survenue lors de la suppression du pokemons.' },
            error: { type: 'Description détaillée de l\'erreur.' }
        }
    }

 */
    try {
        const id = parseInt(req.params.id);
        // Vérifiez si le Pokémon existe
        const pokemon = yield pokemons_1.default.findOne({ id });
        if (!pokemon) {
            return res.status(404).json({
                message: 'Le Pokémon avec cet ID n\'existe pas.'
            });
        }
        // Supprimez le Pokémon
        yield pokemons_1.default.deleteOne({ id });
        res.status(200).json({
            message: 'Le Pokémon a été supprimé avec succès.'
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la suppression du Pokémon.',
            error: error.message
        });
    }
}));
exports.default = router;
