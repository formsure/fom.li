import React from 'react'
import { Checkbox, LABEL_PLACEMENT } from 'baseui/checkbox'
import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import { validationRules } from '../utils'

const CheckboxField = ({ item, control, errors, labelOverrides }) => {
    return (
        <Controller
            control={control}
            name={item.id}
            rules={validationRules(item.rules)}
            defaultValue={false}
            render={({ onChange, onBlur, value, name, ref }) => {
                return (
                    <div className="fsp">
                        <FormControl
                            caption={
                                errors[item.id] && (
                                    <p>{errors[item.id].message}</p>
                                )
                            }
                            overrides={labelOverrides}>
                            <Checkbox
                                checked={value}
                                inputRef={ref}
                                onBlur={onBlur}
                                onChange={e => onChange(e.target.checked)}
                                labelPlacement={LABEL_PLACEMENT.right}>
                                {item.label}
                            </Checkbox>
                        </FormControl>
                    </div>
                )
            }}
        />
    )
}
export default CheckboxField
