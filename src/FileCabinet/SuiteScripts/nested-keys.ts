// 2. TypeScript – Recursive Type Utilities

type NestedKeys<T, Prefix extends string = ''> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<infer U>
      ? `${Prefix}${K & string}` | `${Prefix}${K & string}.${NestedKeys<U>}`
      : `${Prefix}${K & string}` | `${Prefix}${K & string}.${NestedKeys<T[K]>}`
    : `${Prefix}${K & string}`;
}[keyof T];

type Customer = {
  id: string;
  name: string;
  addresses: {
    street: string;
    city: string;
    country: string;
  }[];
};

type Result = NestedKeys<Customer>;