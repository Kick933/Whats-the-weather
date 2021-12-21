export const dateConvert = (arg) => {
    const date = new Date(arg * 1000)
    return date.toLocaleString().split(',').reverse().join(',')
}