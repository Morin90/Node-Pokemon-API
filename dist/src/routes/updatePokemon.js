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
router.put('/api/pokemons/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const pokemon = yield pokemons_1.default.findOne({ id });
        if (!pokemon) {
            return res.status(404).json({
                message: 'Le Pokémon avec cet ID n\'existe pas.'
            });
        }
        // Mettre à jour le Pokémon
        const updatedPokemon = yield pokemons_1.default.findOneAndUpdate({ id }, updateData, { new: true });
        res.status(200).json({
            message: 'Le Pokémon a été mis à jour avec succès.',
            data: updatedPokemon
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la mise à jour du Pokémon.',
            error: error.message
        });
    }
}));
exports.default = router;
