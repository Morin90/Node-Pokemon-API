"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const validTypes = ['Plante', 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée'];
// Define the Pokemon schema
const PokemonSchema = new mongoose_1.Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: [true, 'Le nom est une propriété requise.'],
        unique: true,
        minlength: [1, 'Le nom doit contenir entre 1 et 25 caractères.'],
        maxlength: [25, 'Le nom doit contenir entre 1 et 25 caractères.'],
        trim: true,
    },
    hp: {
        type: Number,
        required: [true, 'Les points de vie sont une propriété requise.'],
        min: [0, 'Les points de vie doivent être supérieurs ou égales à 0.'],
        max: [999, 'Les points de vie doivent être inférieures ou égales à 999.'],
        validate: {
            validator: Number.isInteger,
            message: 'Utilisez uniquement des nombres entiers pour les points de vie.'
        }
    },
    cp: {
        type: Number,
        required: [true, 'Les points de dégâts sont une propriété requise.'],
        min: [0, 'Les points de dégâts doivent être supérieurs ou égales à 0.'],
        max: [99, 'Les points de dégâts doivent être inférieures ou égales à 99.'],
        validate: {
            validator: Number.isInteger,
            message: 'Utilisez uniquement des nombres entiers pour les points de dégâts.'
        }
    },
    picture: {
        type: String,
        required: [true, 'L\'image est une propriété requise.'],
        validate: {
            validator: function (value) {
                return /^https?:\/\/.+\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(value);
            },
            message: 'Utilisez uniquement une URL valide pour l\'image.'
        }
    },
    types: {
        type: [String],
        required: [true, 'Un pokémon doit au moins avoir un type.'],
        validate: {
            validator: function (value) {
                if (value.length === 0) {
                    throw new Error('Un pokémon doit au moins avoir un type.');
                }
                if (value.length > 3) {
                    throw new Error('Un pokémon ne peut pas avoir plus de trois types.');
                }
                value.forEach(type => {
                    if (!validTypes.includes(type)) {
                        throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes.join(', ')}`);
                    }
                });
                return true;
            },
            message: (props) => `${props.value} n'est pas un type valide.`
        }
    }
}, {
    timestamps: { createdAt: 'created', updatedAt: false }
});
// Create the Pokemon model
const Pokemon = (0, mongoose_1.model)('Pokemon', PokemonSchema);
exports.default = Pokemon;
