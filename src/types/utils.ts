export type Nullable<A> = A | null;
export type DeepNullable<T> = T extends (...args: any[]) => any
  ? T
  : T extends any[]
    ? _DeepNullableArray<T[number]>
    : T extends object
      ? _DeepNullableObject<T>
      : T;

/** @private */
// tslint:disable-next-line:class-name
export type _DeepNullableArray<T> = Array<DeepNullable<Nullable<T>>>;
/** @private */
export type _DeepNullableObject<T> = {
  [P in keyof T]: null | DeepNullable<Nullable<T[P]>>;
};
