import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/en-gb'
import { dateFormat, dateUTC } from './DateUtils'

dayjs.extend(utc)

describe('DateUtils', () => {
    const mockDate = new Date('2023-07-19T12:34:56Z')

    it('formats date correctly using dateFormat', () => {
        const formattedDate = dateFormat(mockDate, 'YYYY-MM-DD')
        expect(formattedDate).toBe('2023-07-19')
    })

    it('returns a new Date in UTC format using dateUTC', () => {
        const utcDate = dateUTC(mockDate)
        // Since the dateUTC function returns a new Date object with UTC format, we need to compare it with the equivalent UTC date string.
        const expectedUTCDateString = '2023-07-19T00:00:00.000Z'
        expect(utcDate.toISOString()).toBe(expectedUTCDateString)
    })
})
