export type FromObject<Type> = Partial<{
  [prop in keyof Type]: Type[prop]
}>