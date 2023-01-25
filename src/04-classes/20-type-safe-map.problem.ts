import { expect, it } from "vitest";

/**
 * In this problem, we need to type the return type of the set()
 * method to make it add keys to the TMap generic.
 *
 * In the return type of set(), we'll need to modify the TMap
 * generic to add the new key/value pair.
 */

class TypeSafeStringMap<TMap extends Record<string, string> = {}> {
  private map: TMap;
  constructor() {
    this.map = {} as TMap;
  }

  get(key: keyof TMap): string {
    return this.map[key];
  }

  set<K extends string>(key: K, value: string): unknown {
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
