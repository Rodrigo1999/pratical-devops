import Id from "./id";

describe("Id", () => {
    it("deve instanciar corretamente com um ID válido", () => {
        const id = new Id("12345");
        expect(id.value).toBe("12345");
    });

    it("deve gerar um ID temporário corretamente", () => {
        const tempId = Id.generateId();
        expect(tempId.startsWith("temp_")).toBeTruthy();
    });

    it("deve identificar corretamente um ID gerado como temporário", () => {
        const tempId = new Id("temp_abcdef");
        expect(tempId.isGenratedId()).toBeTruthy();
    });

    it("não deve identificar um ID comum como temporário", () => {
        const normalId = new Id("12345");
        expect(normalId.isGenratedId()).toBeFalsy();
    });
});