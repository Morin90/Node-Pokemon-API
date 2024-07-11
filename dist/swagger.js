"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const path_1 = __importDefault(require("path"));
const outputFile = path_1.default.join(__dirname, './swagger-output.json');
const endpointsFiles = [
    path_1.default.join(__dirname, './src/routes/*.js'),
];
const doc = {
    info: {
        title: 'Pokemon API',
        description: 'API pour gérer les Pokémons',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            name: 'pokemons',
            description: 'Opérations sur les Pokémons',
        },
    ],
    securityDefinitions: {
        basicAuth: {
            type: 'basic',
            description: 'Authentification basique pour l\'API',
        },
    },
    definitions: {
        Pokemon: {
            type: 'object',
            properties: {
                id: { type: 'integer', example: 1 },
                name: { type: 'string', example: 'Pikachu' },
                hp: { type: 'integer', example: 35 },
                cp: { type: 'integer', example: 55 },
                picture: { type: 'string', example: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png' },
                types: { type: 'array', items: { type: 'string' }, example: ['Électrique'] }
            }
        },
        Error: {
            type: 'object',
            properties: {
                code: { type: 'integer', example: 400 },
                message: { type: 'string', example: 'Requête invalide' }
            }
        }
    },
    paths: {
        '/api/pokemons': {
            post: {
                tags: ['pokemons'],
                summary: 'Ajouter un nouveau Pokémon',
                security: [{ basicAuth: [] }],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Pokemon'
                            },
                            examples: {
                                Pokemon: {
                                    value: {
                                        id: 1,
                                        name: 'Pikachu',
                                        hp: 35,
                                        cp: 55,
                                        picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
                                        types: ['Électrique']
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '201': {
                        description: 'Création réussie',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Pokemon'
                                },
                                examples: {
                                    Pokemon: {
                                        value: {
                                            id: 1,
                                            name: 'Pikachu',
                                            hp: 35,
                                            cp: 55,
                                            picture: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
                                            types: ['Électrique']
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Mauvaise requête',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                },
                                examples: {
                                    Error: {
                                        value: {
                                            code: 400,
                                            message: 'Requête invalide'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erreur serveur interne',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                },
                                examples: {
                                    Error: {
                                        value: {
                                            code: 500,
                                            message: 'Erreur interne du serveur'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            get: {
                tags: ['pokemons'],
                summary: 'Récupérer tous les Pokémon',
                security: [{ basicAuth: [] }],
                responses: {
                    '200': {
                        description: 'Liste de tous les Pokémon',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Pokemon'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erreur serveur interne',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                },
                                examples: {
                                    Error: {
                                        value: {
                                            code: 500,
                                            message: 'Erreur interne du serveur'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/pokemons/{id}': {
            get: {
                tags: ['pokemons'],
                summary: 'Trouver un Pokémon par ID',
                security: [{ basicAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID du Pokémon',
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Pokémon trouvé avec succès',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Pokemon'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Pokémon non trouvé',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erreur serveur interne',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                }
                            }
                        }
                    }
                }
            },
            delete: {
                tags: ['pokemons'],
                summary: 'Supprimer un Pokémon par ID',
                security: [{ basicAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID du Pokémon',
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Pokémon supprimé avec succès',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Success'
                                },
                                examples: {
                                    Success: {
                                        value: {
                                            message: 'Le Pokémon a été supprimé avec succès.'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Pokémon non trouvé',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erreur serveur interne',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                }
                            }
                        }
                    }
                }
            },
            put: {
                tags: ['pokemons'],
                summary: 'Mettre à jour un Pokémon par ID',
                security: [{ basicAuth: [] }],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'ID du Pokémon',
                        schema: {
                            type: 'integer'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/definitions/Pokemon'
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Pokémon mis à jour avec succès',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Pokemon'
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Mauvaise requête',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Pokémon non trouvé',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Erreur serveur interne',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/definitions/Error'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
};
(0, swagger_autogen_1.default)()(outputFile, endpointsFiles, doc).then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.resolve().then(() => __importStar(require('./app')));
}));
