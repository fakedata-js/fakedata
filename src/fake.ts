export type FromObject<Type> = {
  [prop in keyof Type]: Type[prop]
}

export type NormalizedConfig<Type> = Type & {
  normalized: boolean
}