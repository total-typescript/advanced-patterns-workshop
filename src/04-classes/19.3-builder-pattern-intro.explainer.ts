import { Equal, Expect } from "../helpers/type-utils";

export class BuilderTuple<TList extends any[] = []> {
  list: TList;
  constructor() {
    this.list = [] as any;
  }

  push<TItem extends string | number | boolean>(
    item: TItem,
  ): BuilderTuple<[...TList, TItem]> {
    this.list.push(item);
    return this as any;
  }
}

const builderBeforePush = new BuilderTuple();
const listBeforePush = builderBeforePush.list;

const builderAfterPush = builderBeforePush.push(1).push(2).push(3);
const listAfterPush = builderAfterPush.list;

type tests = [
  Expect<Equal<typeof builderBeforePush, BuilderTuple<[]>>>,
  Expect<Equal<typeof listBeforePush, []>>,
  Expect<Equal<typeof builderAfterPush, BuilderTuple<[1, 2, 3]>>>,
  Expect<Equal<typeof listAfterPush, [1, 2, 3]>>,
];
