export const sortName = (text, n) => {
    if (text.length > n) {
        const shorNamedText = text.substring(0, n).concat('.....')
        return shorNamedText
    }
    return text
}