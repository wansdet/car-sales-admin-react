import { getOptionByValue } from './GenericFunctions'

describe('getOptionByValue function', () => {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ]

    it('should return the correct option when the value exists', () => {
        const value = 'option2'
        const result = getOptionByValue(value, options)
        expect(result).toEqual({ value: 'option2', label: 'Option 2' })
    })

    it('should return undefined when the value does not exist', () => {
        const value = 'nonexistent'
        const result = getOptionByValue(value, options)
        expect(result).toBeUndefined()
    })
})
