import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import React from 'react'
import { Select } from 'baseui/select'
import { validationRules } from '../utils'

const DropdownField = ({ item, control, errors, labelOverrides }) => {
    return (
        <Controller
            control={control}
            name={item.id}
            rules={validationRules(item.rules)}
            defaultValue={[]}
            render={({ onChange, onBlur, value, name, ref }) => {
                const options = item.optionsRender
                    ? item.optionsRender
                    : item.options.map((value, index) => ({
                          label: value,
                          id: index
                      }))

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
                            <Select
                                options={options}
                                value={value}
                                multi={item.multi}
                                placeholder="Select option"
                                onChange={params => onChange(params.value)}
                            />
                        </FormControl>
                    </div>
                )
            }}
        />
    )
}
export default DropdownField
