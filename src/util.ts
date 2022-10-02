export const extend = (...args: any[]) => {
    let source = args.shift()
    let target

    while (source && (target = args.shift())) {
        source = Object.assign(source, target)
    }
    return source
}