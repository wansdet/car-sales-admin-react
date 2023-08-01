import React from 'react'

import {
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
} from '@mui/material'

interface IYearSelectionProps {
    years: number[]
    selectedYear: number
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const YearSelection = ({
    years,
    selectedYear,
    onChange,
}: IYearSelectionProps) => {
    return (
        <FormControl
            data-testid="year-selection"
            component="fieldset"
            sx={{ mb: 4 }}
        >
            <FormLabel data-testid="year-selection-label" component="legend">
                Select Year
            </FormLabel>
            <RadioGroup
                row
                aria-label="year"
                name="year"
                value={selectedYear.toString()}
                onChange={onChange}
            >
                {years.map((year: number) => (
                    <FormControlLabel
                        data-test="year-selection-option-label"
                        key={year}
                        value={year.toString()}
                        control={<Radio data-test="year-selection-option" />}
                        label={year.toString()}
                    />
                ))}
            </RadioGroup>
        </FormControl>
    )
}

export default YearSelection
