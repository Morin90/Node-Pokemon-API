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
router.post('/api/pokemons', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, hp, cp, picture, types } = req.body;
        // Validation de base des champs
        if (!name || !hp || !cp || !picture || !types) {
            return res.status(400).json({
                message: 'Tous les champs sont requis :  name, hp, cp, picture, types.'
            });
        }
        // Vérification de l'unicité du nom
        const existingPokemon = yield pokemons_1.default.findOne({ name });
        if (existingPokemon) {
            return res.status(400).json({
                message: 'Le nom est déjà pris.'
            });
        }
        // Obtention de la longueur actuelle de la collection
        /**function generateUniqueId() {
            let idUnique = Date.now() +  Math.floor(Math.random() * 33);
            if(idUnique === idUnique) {
                return idUnique +1;
            }
            return idUnique;
        }**/
        const newPokemon = new pokemons_1.default({
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
        yield newPokemon.save();
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
    }
    catch (error) {
        /* #swagger.responses[500] = {
                description: 'Erreur serveur interne'
            }
           */
        res.status(500).json({
            message: 'Une erreur est survenue lors de la création du Pokémon.',
            error: error.message
        });
    }
}));
exports.default = router;
