import { isBetween } from "./isBetween";

describe("isBetween", () => {
    it("deve retornar true quando o número estiver entre min e max", () => {
        expect(isBetween(1, 5, 10)).toBeTruthy();
    });

    it("deve retornar false quando o número não estiver entre min e max", () => {
        expect(isBetween(6, 5, 4)).toBeFalsy();
    });

    it("deve retornar true quando min intercede o próprio número", () => {
        expect(isBetween([5], 5, 10)).toBeTruthy();
    });

    it("deve retornar true quando max intercede o próprio número", () => {
        expect(isBetween(3, 7, [7])).toBeTruthy();
    });

    it("deve retornar false quando o número for exatamente igual a min e min não intercede", () => {
        expect(isBetween(5, 5, 10)).toBeFalsy();
    });

    it("deve retornar false quando o número for exatamente igual a max e max não intercede", () => {
        expect(isBetween(1, 10, 10)).toBeFalsy();
    });
});