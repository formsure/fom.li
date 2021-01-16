import React from 'react'
import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import { validationRules } from '../utils'
import { EmoticonRating } from 'baseui/rating'

const EmoticonRatingField = ({ item, control, errors, labelOverrides }) => {
    return (
        <Controller
            render={({ onChange, onBlur, value, name, ref }) => (
                <div className="fsp">
                    <FormControl
                        label={item.label}
                        caption={
                            errors[item.id] && <p>{errors[item.id].message}</p>
                        }
                        overrides={labelOverrides}>
                        <EmoticonRating
                            value={value}
                            onChange={({ value }) => onChange(value)}
                            inputRef={ref}
                            size={60}
                        />
                    </FormControl>
                </div>
            )}
            name={item.id}
            control={control}
            rules={validationRules(item.rules)}
            defaultValue={0}
        />
    )
}

export default EmoticonRatingField
