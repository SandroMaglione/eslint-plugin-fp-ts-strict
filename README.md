# `fp-ts-strict`

<p>
  <a href="https://github.com/SandroMaglione/eslint-plugin-fp-ts-strict">
    <img src="https://img.shields.io/github/stars/SandroMaglione/eslint-plugin-fp-ts-strict?logo=github" />
  </a>
  <img src="https://img.shields.io/github/repo-size/SandroMaglione/eslint-plugin-fp-ts-strict" />
  <img src="https://img.shields.io/github/license/SandroMaglione/eslint-plugin-fp-ts-strict?logo=github" />
  <img src="https://img.shields.io/github/contributors-anon/SandroMaglione/eslint-plugin-fp-ts-strict" />
  <a href="https://github.com/SandroMaglione">
    <img alt="GitHub: SandroMaglione" src="https://img.shields.io/github/followers/SandroMaglione?label=Follow&style=social" target="_blank" />
  </a>
  <a href="https://twitter.com/SandroMaglione">
    <img alt="Twitter: SandroMaglione" src="https://img.shields.io/twitter/follow/SandroMaglione.svg?style=social" target="_blank" />
  </a>
</p>

<a href="https://www.buymeacoffee.com/sandromaglione">
    <img src="https://shields.io/badge/sandromaglione-Support--me-FFDD00?logo=buy-me-a-coffee&style=for-the-badge&link=https://www.buymeacoffee.com/sandromaglione" />
</a>

---

> fp-ts can help you write safer code, but nothing stops you (or your teammates!) to write unsafe code. Well, it shouldn't be so!

[ESLint](https://eslint.org/) plugin used to enforce functional programming types and patterns using [fp-ts](https://github.com/gcanti/fp-ts).

```shell
npm install --save-dev eslint-plugin-fp-ts-strict
```

```js
// .eslintrc.js
module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["fp-ts-strict"],
  extends: ["plugin:fp-ts-strict/recommended"],
};
```

## Motivation

fp-ts is awesome. Using functional programming, you can make your code safer and easier to read. Nonetheless, it's always javascript we are talking about! Therefore, **nothing stops a distracted version of yourself from writing unsafe code!**

ESLint can help! ESLint can look at your code and point out your typing mistakes. Well, it's time to use ESLint in its full power to enforce functional programming with fp-ts.

Welcome `fp-ts-strict`!

## Rules

### `option-over-undefined`

Avoid using `undefined` in your type unions. Instead of using `Type | undefined`, use `Option<Type>`.

```ts
/** Example of invalid code 👎 */

export const undefinedOption1 = (): string | undefined => {
  return "abc";
};

export function undefinedOption2(): number | undefined {
  return 1;
}

export function undefinedOption3(): number {
  const a: number | undefined = 10;
  return a ?? 0;
}
```

```ts
/** Example of valid code 👍 */

export const undefinedOption1 = (): Option<string> => {
  return "abc";
};

export function undefinedOption2(): Option<number> {
  return 1;
}

export function undefinedOption3(): number {
  const a: Option<number> = some(10);
  return pipe(
    a,
    getOrElse((): number => 0)
  );
}
```

### `option-over-null`

Avoid using `null` in your type unions. Instead of using `Type | null`, use `Option<Type>`.

```ts
/** Example of invalid code 👎 */

export const nullOption1 = (): string | null => {
  return "abc";
};

export function nullOption2(): number | null {
  return 1;
}

export function nullOption3(): number {
  const a: number | null = 10;
  return a ?? 0;
}
```

```ts
/** Example of valid code 👍 */

export const nullOption1 = (): Option<string> => {
  return "abc";
};

export function nullOption2(): Option<number> {
  return 1;
}

export function nullOption3(): number {
  const a: Option<number> = some(10);
  return pipe(
    a,
    getOrElse((): number => 0)
  );
}
```

### `array-head`

Accessing the first element of an array using `array[0]` is unsafe, what if the array is empty?. Use [`head`](https://gcanti.github.io/fp-ts/modules/Array.ts.html#head) from fp-ts instead.

```ts
/** Example of invalid code 👎 */

const list = [1, 2, 3, 4, 5];
export const headAccess = list[0];
```

```ts
/** Example of valid code 👍 */

const list = [1, 2, 3, 4, 5];
export const headAccess = pipe(list, head);
```

### `array-lookup`

Accessing an element of an array using `array[1]` is unsafe, what if the element is undefined?. Use [`lookup`](https://gcanti.github.io/fp-ts/modules/Array.ts.html#lookup) from fp-ts instead.

```ts
/** Example of invalid code 👎 */

const list = [1, 2, 3, 4, 5];
export const headAccess = list[1];
```

```ts
/** Example of valid code 👍 */

const list = [1, 2, 3, 4, 5];
export const headAccess = pipe(list, lookup(1));
```

### `record-lookup`

Accessing an element of a record (map) using `record['a']` or `record.a` is unsafe, what if the element is undefined?. Use [`lookup`](https://gcanti.github.io/fp-ts/modules/Record.ts.html#lookup) from fp-ts instead.

```ts
/** Example of invalid code 👎 */

const record: Record<string, number> = { a: 1, b: 2, c: 3 };
export const recordLookup1 = record["ma"];
export const recordLookup2 = record.ma;
```

```ts
/** Example of valid code 👍 */

const record: Record<string, number> = { a: 1, b: 2, c: 3 };
export const recordLookup = pipe(record, lookup("ma"));
```

## 💡 More rules?

Of course! If you have any other rule in mind that you would like to propose, feel free to [report an issue](https://github.com/SandroMaglione/eslint-plugin-fp-ts-strict/issues). Make typescript safe again, together!

## 📃 Versioning

- v0.1.1 - 13 October 2021
- v0.1.0 - 13 October 2021

## 😀 Support

Currently the best way to support me would be to follow me on my [**Twitter**](https://twitter.com/SandroMaglione).

Another option (or `Option`) would be to buy me a coffee.

<a href="https://www.buymeacoffee.com/sandromaglione">
<img src="https://shields.io/badge/sandromaglione-Support--me-FFDD00?logo=buy-me-a-coffee&style=for-the-badge&link=https://www.buymeacoffee.com/sandromaglione" />
</a>

## 👀 License

MIT License, see the [LICENSE.md](https://github.com/SandroMaglione/eslint-plugin-fp-ts-strict/blob/main/LICENSE) file for details.
