import PokeScore from "./poke-score";
import CustomError from "@shared/domain/service/custom-error";

describe("PokeScore", () => {
    it("deve instanciar corretamente com um score válido", () => {
        const score = new PokeScore(100);
        expect(score.value).toBe(100);
    });

    it("deve lançar erro ao instanciar com score menor que 0", () => {
        expect(() => new PokeScore(-1)).toThrow(CustomError);
    });

    it("deve lançar erro ao instanciar com score maior que 200", () => {
        expect(() => new PokeScore(201)).toThrow(CustomError);
    });

    it("deve retornar nível 'demigod' para scores até 50", () => {
        expect(new PokeScore(50).getLevel()).toBe("demigod");
    });

    it("deve retornar nível 'god' para scores entre 51 e 150", () => {
        expect(new PokeScore(100).getLevel()).toBe("god");
    });

    it("deve retornar nível 'supreme_god' para scores entre 151 e 200", () => {
        expect(new PokeScore(175).getLevel()).toBe("supreme_god");
    });

    it("deve considerar dois PokeScores iguais se seus valores forem iguais", () => {
        const score1 = new PokeScore(100);
        const score2 = new PokeScore(100);
        expect(score1.isEqual(score2)).toBeTruthy();
    });

    it("deve considerar dois PokeScores diferentes se seus valores forem diferentes", () => {
        const score1 = new PokeScore(100);
        const score2 = new PokeScore(101);
        expect(score1.isEqual(score2)).toBeFalsy();
    });
});
