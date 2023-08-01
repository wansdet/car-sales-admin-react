import React, { useState } from 'react'
import { Grid } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

import { H2, IRadio } from '@/components/data-display'

interface IRadioGroupGridProps {
    labelGroup: string
    labelAll: string
    checkAll: string
    radios: IRadio[]
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioGroupGrid = (props: IRadioGroupGridProps) => {
    const { labelGroup, labelAll, checkAll, radios, onChange } = props
    const [selectedRadio, setSelectedRadio] = useState('')
    const labelGroupFormatted = labelGroup.toLowerCase().replace(/\s+/g, '_')
    const dataTestFormControl = `radio-group-grid-${labelGroup
        .toLowerCase()
        .replace(/\s+/g, '-')}`

    return (
        <FormControl data-test={dataTestFormControl} component="fieldset">
            <FormLabel data-test="radio-group-label">
                <H2 variant="h5">{labelGroup}</H2>
            </FormLabel>
            <RadioGroup
                row
                aria-label={`radio-group-label-${labelGroupFormatted}`}
                name={`radio-group-${labelGroupFormatted}`}
                value={selectedRadio}
                onChange={(e) => {
                    setSelectedRadio(e.target.value)
                    onChange(e)
                }}
                style={{ display: 'flex' }}
            >
                <Grid container>
                    <Grid item xs={12} md={3} lg={2}>
                        <FormControlLabel
                            data-test="group-radio-label"
                            value=""
                            control={<Radio data-test="group-radio" />}
                            label={labelAll}
                            checked={selectedRadio === checkAll}
                        />
                    </Grid>
                    {radios.map((radio: IRadio) => (
                        <Grid item xs={12} md={3} lg={2} key={radio.value}>
                            <FormControlLabel
                                data-test="group-radio-label"
                                value={radio.value}
                                control={<Radio data-test="group-radio" />}
                                label={radio.label}
                                checked={selectedRadio === radio.value}
                            />
                        </Grid>
                    ))}
                </Grid>
            </RadioGroup>
        </FormControl>
    )
}

export default RadioGroupGrid
