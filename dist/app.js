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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importStar(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const serve_favicon_1 = __importDefault(require("serve-favicon"));
const body_parser_1 = __importDefault(require("body-parser"));
const config_1 = __importDefault(require("./src/db/config"));
const findAllPokemons_1 = __importDefault(require("./src/routes/findAllPokemons"));
const findOnePokemons_1 = __importDefault(require("./src/routes/findOnePokemons"));
const createPokemons_1 = __importDefault(require("./src/routes/createPokemons"));
const deleteOnePokemon_1 = __importDefault(require("./src/routes/deleteOnePokemon"));
const updatePokemon_1 = __importDefault(require("./src/routes/updatePokemon"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const router = (0, express_1.Router)();
router.use((0, express_basic_auth_1.default)({
    users: { 'admin': 'supersecret' },
    challenge: true
}));
(0, config_1.default)();
//Ajout du MiddleWare, pour pouvoir tracer les requêtes qui sont faites par le client
app
    .use((0, serve_favicon_1.default)(`${__dirname}/public/favicon.ico`))
    .use((0, morgan_1.default)(`dev`))
    .use(body_parser_1.default.json());
app.use(findAllPokemons_1.default);
app.use(findOnePokemons_1.default);
app.use(createPokemons_1.default);
app.use(deleteOnePokemon_1.default);
app.use(updatePokemon_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(require('./swagger-output.json')));
app.use((req, res) => {
    const message = 'La ressource demandée n\'existe pas. Vous pouvez essayer une autre URL.';
    return res.status(404).json({ message });
});
app.listen(PORT, () => console.log(`Notre application Node est démarré sur le port : http://localhost:${PORT}`));
