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
        const pokemons = yield pokemons_1.default.find(); // Récupérer tous les Pokémon
        res.json({
            message: 'Les Pokémon ont bien été récupérés.',
            data: pokemons
        });
    }
    catch (error) {
        res.status(500).json({
            message: 'Une erreur est survenue lors de la récupération des Pokémon.',
            error: error.message
        });
    }
}));
exports.default = router;
