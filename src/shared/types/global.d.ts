type PartialRange<Type, Items extends keyof Type> = Omit<Type, Items> & Partial<Pick<Type, Items>>


type IInputOutput<T> = {
  [K in keyof T]: T[K] extends (...args: infer A) => infer O
    ? { input: A extends [] ? never : A; output: O }
    : never;
};
