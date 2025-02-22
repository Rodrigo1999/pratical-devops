type PartialRange<Type, Items extends keyof Type> = Omit<Type, Items> & Partial<Pick<Type, Items>>

type IInputOutput<T> = {
    [K in keyof T]: T[K] extends (input: infer I) => infer O
      ? { input: I; output: O }
      : T[K] extends (...args: infer A) => infer O
      ? { input: A; output: O }
      : never;
};