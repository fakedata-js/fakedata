export const extend = (...args: any[]) => {
    let source = args.shift()
    let target

    while (source && (target = args.shift())) {
        source = Object.assign(source, target)
    }
    return source
}

export const random = (max: number, min: number = 0) => {
    return Math.floor((Math.random() * (max - min)) + min)
}

export default {
    extend,
    random,
}