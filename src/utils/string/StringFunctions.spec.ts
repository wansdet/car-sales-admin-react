import { limitWords } from './StringFunctions'

describe('limitWords function', () => {
    it('should not truncate text when word count is less than or equal to the word limit', () => {
        const text = 'Lorem ipsum dolor sit amet'
        const wordLimit = 5
        const result = limitWords(text, wordLimit)
        expect(result).toBe(text)
    })

    it('should truncate text and add ellipsis when word count exceeds the word limit', () => {
        const text = 'Lorem ipsum dolor sit amet consectetur adipiscing elit'
        const wordLimit = 5
        const result = limitWords(text, wordLimit)
        expect(result).toBe('Lorem ipsum dolor sit amet...')
    })

    it('should handle empty text', () => {
        const text = ''
        const wordLimit = 10
        const result = limitWords(text, wordLimit)
        expect(result).toBe('')
    })

    it('should handle word limit of 0', () => {
        const text = 'Lorem ipsum dolor sit amet'
        const wordLimit = 0
        const result = limitWords(text, wordLimit)
        expect(result).toBe('...')
    })
})
