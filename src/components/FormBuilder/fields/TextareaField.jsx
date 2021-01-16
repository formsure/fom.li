import React from 'react'
import { Textarea } from 'baseui/textarea'
import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import { validationRules } from '../utils'

const TextareaField = ({ item, control, errors, labelOverrides }) => {
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
                        <Textarea
                            value={value}
                            error={!!errors[item.id]}
                            onChange={e => onChange(e.target.value)}
                            placeholder={item.placeholder}
                            clearOnEscape
                        />
                    </FormControl>
                </div>
            )}
            name={item.id}
            control={control}
            defaultValue={''}
            rules={validationRules(item.rules)}
        />
    )
}
export default TextareaField
