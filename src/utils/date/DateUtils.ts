import dayjs from 'dayjs'

export const dateFormat = (value: Date | undefined, mask: string) => {
    if (value) {
        return dayjs.utc(value).format(mask)
    }
    return '' // Return an empty string when the value is undefined.
}

export const dateUTC = (date: Date) => {
    const day = date.getUTCDate()
    const month = date.getUTCMonth() + 1
    const year = date.getUTCFullYear()

    return new Date(Date.UTC(year, month - 1, day)) // Subtract 1 from month as it is zero-based in the Date constructor.
}
