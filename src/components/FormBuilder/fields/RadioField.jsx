import React from 'react'
import { RadioGroup, Radio, ALIGN } from 'baseui/radio'
import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import { validationRules } from '../utils'

const RadioField = ({ item, control, errors, labelOverrides }) => {
    return (
        <Controller
            control={control}
            name={item.id}
            rules={validationRules(item.rules)}
            defaultValue={item.defaultValue || null}
            render={({ onChange, onBlur, value, name, ref }) => {
                return (
                    <div className="fsp">
                        <FormControl
                            label={item.label}
                            caption={
                                errors[item.id] && (
                                    <p>{errors[item.id].message}</p>
                                )
                            }
                            overrides={labelOverrides}>
                            <RadioGroup
                                value={parseInt(value)}
                                onChange={e => onChange(e.target.value)}
                                name={name}
                                align={ALIGN.horizontal}
                                error={!!errors[item.id]}
                                overrides={labelOverrides}>
                                {item.options &&
                                    item.options.map((option, index) => (
                                        <Radio value={index} key={index}>
                                            {option}
                                        </Radio>
                                    ))}
                            </RadioGroup>
                        </FormControl>
                    </div>
                )
            }}
        />
    )
}
export default RadioField
