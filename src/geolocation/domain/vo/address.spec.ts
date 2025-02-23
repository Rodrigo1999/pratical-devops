import Address from "./address";
import CustomError from "@shared/domain/service/custom-error";

describe("Address", () => {
    it("deve instanciar corretamente com um endereço válido", () => {
        const address = new Address("Rua das flores, centro, SAL city, PI, BRA, 64640000");
        expect(address.value).toBe("Rua das flores, centro, SAL city, PI, BRA, 64640000");
    });

    it("deve lançar erro ao instanciar com um endereço inválido (componentes insuficientes)", () => {
        expect(() => new Address("Rua das flores, centro, SAL city, PI, BRA")).toThrow(CustomError);
    });

    it("deve lançar erro ao instanciar com um estado inválido (não possui dois caracteres)", () => {
        expect(() => new Address("Rua das flores, centro, SAL city, PIA, BRA, 64640000")).toThrow(CustomError);
    });

    it("deve lançar erro ao instanciar com um país inválido (não possui três caracteres)", () => {
        expect(() => new Address("Rua das flores, centro, SAL city, PI, BR, 64640000")).toThrow(CustomError);
    });

    it("deve retornar os componentes do endereço corretamente", () => {
        const address = new Address("Rua das flores, centro, SAL city, PI, BRA, 64640000");
        expect(address.getAddressComponents()).toEqual({
            street: "Rua das flores",
            neighborhood: "centro",
            city: "SAL city",
            state: "PI",
            country: "BRA",
            cep: "64640000"
        });
    });
});
