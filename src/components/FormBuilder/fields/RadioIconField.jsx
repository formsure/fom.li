import { Radio, RadioGroup } from 'baseui/radio'

import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import React from 'react'
import { validationRules } from '../utils'

const RadioIconField = ({ item, control, errors, labelOverrides }) => {
    return (
        <Controller
            control={control}
            name={item.id}
            rules={validationRules(item.rules)}
            defaultValue={item.defaultValue || null}
            render={({ onChange, onBlur, value, name, ref }) => {
                return (
                    <div className="fsp radioicon">
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
                                align="horizontal"
                                error={!!errors[item.id]}
                                overrides={labelOverrides}>
                                {item.options &&
                                    Object.keys(item.options).map(
                                        (option, index) => (
                                            <Radio
                                                value={index}
                                                key={index}
                                                overrides={{
                                                    Label: ({
                                                        $value,
                                                        $checked
                                                    }) => (
                                                        <div
                                                            className={`rd-l ${$checked}`}>
                                                            {
                                                                item.options[
                                                                    option
                                                                ].label
                                                            }
                                                            {
                                                                item.options[
                                                                    option
                                                                ].icon
                                                            }
                                                        </div>
                                                    )
                                                }}></Radio>
                                        )
                                    )}
                            </RadioGroup>
                        </FormControl>
                    </div>
                )
            }}
        />
    )
}
export default RadioIconField
