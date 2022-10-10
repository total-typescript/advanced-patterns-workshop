import { expect, it } from "vitest";

/**
 * I removed the default generic of TypeSafeStringMap, and it broke!
 * Why?
 *
 * The reason is that if you DON'T specify a default generic, then
 * TypeScript will default it to Record<string, string>. When you
 * later try to assign keys to TypeSafeStringMap, TypeScript will
 * still keep Record<string, string> inside TMap.
 *
 * This means that keyof TMap (inside get) will be string, which
 * means you lose the type safety of the keys.
 */
class TypeSafeStringMap<TMap extends Record<string, string> = {}> {
  private map: TMap;
  constructor() {
    this.map = {} as TMap;
  }

  get(key: keyof TMap): string {
    return this.map[key];
  }

  set<K extends string>(
    key: K,
    value: string,
  ): TypeSafeStringMap<TMap & Record<K, string>> {
    (this.map[key] as any) = value;

    return this;
  }
}

const map = new TypeSafeStringMap()
  .set("matt", "pocock")
  .set("jools", "holland")
  .set("brandi", "carlile");

it("Should not allow getting values which do not exist", () => {
  map.get(
    // @ts-expect-error
    "jim",
  );
});

it("Should return values from keys which do exist", () => {
  expect(map.get("matt")).toBe("pocock");
  expect(map.get("jools")).toBe("holland");
  expect(map.get("brandi")).toBe("carlile");
});
