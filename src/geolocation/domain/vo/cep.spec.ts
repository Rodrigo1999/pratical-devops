import CEP from "./cep";
import CustomError from "@shared/domain/service/custom-error";

describe("CEP", () => {
    it("deve instanciar corretamente um CEP válido", () => {
        const cep = new CEP("64640-000");
        expect(cep.value).toBe("64640000");
    });

    it("deve lançar um erro se o CEP for inválido (menos de 8 dígitos)", () => {
        expect(() => new CEP("12345-67")).toThrow(CustomError);
    });

    it("deve lançar um erro se o CEP contiver caracteres inválidos", () => {
        expect(() => new CEP("64640-00X")).toThrow(CustomError);
    });

    it("deve lançar um erro se o CEP for vazio", () => {
        expect(() => new CEP(" ")).toThrow(CustomError);
    });

    it("deve aceitar CEPs sem hífen", () => {
        const cep = new CEP("64640000");
        expect(cep.value).toBe("64640000");
    });
});
