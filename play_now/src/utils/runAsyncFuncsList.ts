import { arrayItem } from './array/arrayItem';

type asyncFunc<T> = (item: T) => Promise<void>;

export async function runAsyncFuncsList<T>(
  items: T[],
  itemFunc: asyncFunc<T>
): Promise<void> {
  for (let i: number = 0; i < items.length; i++) {
    const item = arrayItem(items, i);

    await itemFunc(item);
  }
}
