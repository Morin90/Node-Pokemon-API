export const success = (message: string, data: any) => {
    return {message, data}
    }

    // Ajout d'une méthode outils pour définir un Id unique a chaque création de nouveau pokemon
    export const getUniqueId = (pokemons: { id: any; }[]) => {
        const pokemonsIds = pokemons.map((pokemon: { id: any; }) => pokemon.id);
        const maxId = pokemonsIds.reduce((a: number,b: number) => Math.max(a,b));
        const uniqueId = maxId + 1;
        return uniqueId;
    }   

