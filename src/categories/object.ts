export interface ObjectFakeConfig {
  [key: string]: any
}

const normalizeConfig = (config: ObjectFakeConfig): ObjectFakeConfig => {
  if (config == null || typeof config !== 'object' || Array.isArray(config)) {
    throw new Error('config must be an object')
  }
  return config
}

export default function ObjectFake (config: ObjectFakeConfig): any {
  const fConfig = normalizeConfig(config)
  const obj: any = {}
  for (const key in fConfig) {
    let value; const generator = fConfig[key]
    if (typeof generator === 'function') {
      value = generator()
    } else {
      value = generator
    }
    obj[key] = value
  }

  return obj
}

ObjectFake.shape = function (config: ObjectFakeConfig): any {
  return () => {
    return ObjectFake(config)
  }
}
