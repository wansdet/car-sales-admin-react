import type { IOption } from '@/common'

export const getOptionByValue = (
    value: string,
    options: IOption[]
): IOption => {
    return <IOption>options.find((option) => option.value === value)
}
