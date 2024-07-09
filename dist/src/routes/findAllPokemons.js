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
const pokemons_1 = __importDefault(require("../models/pokemons"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/api/pokemons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Recherche des pokemons par nom
        const limit = parseInt(req.query.limit) || 6; // limiter la recherche a 6 pokemons maximum
        if (req.query.name) {
            const name = req.query.name;
            if (name && name.length < 2) {
                return res.status(400).json({
                    message: 'La recherche doit contenir au moins 2 caractères.'
                });
            }
            const totalPokemons = yield pokemons_1.default.countDocuments({ name: new RegExp(name, 'i') });
            const pokemons = yield pokemons_1.default.find({ name: new RegExp(name, 'i') }).sort({ name: 1 }).limit(limit); // Utilisation de regex pour recherche insensible à la casse
            return res.json({
                message: `Il y a ${totalPokemons} pokemons qui correspondent è votre recherche.`,
                data: pokemons
            });
        }
        else {
            // Compter tous les Pokémon dans la base de données
            const totalPokemons = yield pokemons_1.default.countDocuments();
            const pokemons = yield pokemons_1.default.find().sort({ name: 1 }); // Récupérer tous les Pokémon
            res.json({
                message: 'Les Pokémon ont bien été récupérés, il y en a ' + totalPokemons + ' au total.',
                data: pokemons
            });
        }
    }
    catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des Pokémon.',
            error: error.message
        });
    }
}));
exports.default = router;
