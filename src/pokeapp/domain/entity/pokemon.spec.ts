import CustomError from "@shared/domain/service/custom-error";
import Pokemon from "./pokemon";
import { PokeScore } from "@pokeapp/domain/vo";

describe("Pokemon", () => {
    it("deve instanciar corretamente um Pokemon válido", () => {
        const pokemon = new Pokemon({
            id: "12345",
            created_at: new Date(),
            updated_at: new Date(),
            name: "Pikachu",
            score: 50,
            lastAddressCaptured: "Rua A, Bairro B, Cidade C, ST, BRA, 12345678",
            last_evolve_at: null,
            is_released: false,
            poke_id: 'poke-102',
            ability: []
        });
        expect(pokemon.getName()).toBe("Pikachu");
        expect(pokemon.getScore()).toBe(50);
    });

    it("deve lançar erro ao tentar soltar um Pokémon já liberado", () => {
        const pokemon = new Pokemon({
            id: "12345",
            created_at: new Date(),
            updated_at: new Date(),
            name: "Pikachu",
            score: 50,
            lastAddressCaptured: "Rua A, Bairro B, Cidade C, ST, BRA, 12345678",
            last_evolve_at: null,
            is_released: true,
            poke_id: 'poke-102',
            ability: []
        });
        expect(() => pokemon.release()).toThrow(CustomError);
    });

    it("deve permitir a recaptura do Pokémon", () => {
        const pokemon = new Pokemon({
            id: "12345",
            created_at: new Date(),
            updated_at: new Date(),
            name: "Pikachu",
            score: 50,
            lastAddressCaptured: "Rua A, Bairro B, Cidade C, ST, BRA, 12345678",
            last_evolve_at: null,
            is_released: false,
            poke_id: 'poke-102',
            ability: []
        });
        pokemon.recapture("Rua X, Bairro Y, Cidade Z, ST, BRA, 87654321");
        expect(pokemon.getFullLastCapturedAddress()).toBe("Rua X, Bairro Y, Cidade Z, ST, BRA, 87654321");
    });

    it("deve evoluir corretamente o Pokémon", () => {
        const pokemon = new Pokemon({
            id: "12345",
            created_at: new Date(),
            updated_at: new Date(),
            name: "Pikachu",
            score: 50,
            lastAddressCaptured: "Rua A, Bairro B, Cidade C, ST, BRA, 12345678",
            last_evolve_at: new Date(Date.now() - (Pokemon.TIME_AWAIT_PER_EVOLVE + 1000)),
            is_released: false,
            poke_id: 'poke-102',
            ability: []
        });
        expect(pokemon.evolve()).toBeTruthy();
        expect(pokemon.getScore()).toBe(60);
    });

    it("deve impedir evolução se ainda estiver no tempo de espera", () => {
        const pokemon = new Pokemon({
            id: "12345",
            created_at: new Date(),
            updated_at: new Date(),
            name: "Pikachu",
            score: 50,
            lastAddressCaptured: "Rua A, Bairro B, Cidade C, ST, BRA, 12345678",
            last_evolve_at: new Date(Date.now() - 5000),
            is_released: false,
            poke_id: 'poke-102',
            ability: []
        });
        expect(() => pokemon.evolve()).toThrow(CustomError);
    });

    it("deve retornar 'max_envolve_rached' ao atingir o valor máximo de evolução", () => {
        const pokemon = new Pokemon({
            id: "12345",
            created_at: new Date(),
            updated_at: new Date(),
            name: "Pikachu",
            score: PokeScore.LEVEL_SUPREME_GOD,
            lastAddressCaptured: "Rua A, Bairro B, Cidade C, ST, BRA, 12345678",
            last_evolve_at: new Date(Date.now() - (Pokemon.TIME_AWAIT_PER_EVOLVE + 1000)),
            is_released: false,
            poke_id: 'poke-102',
            ability: []
        });
        expect(pokemon.evolve()).toBe("max_envolve_rached");
    });
});
