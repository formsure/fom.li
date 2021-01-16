import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import { Input } from 'baseui/input'
import React from 'react'
import { icons } from '../../../icons'
import { validationRules } from '../utils'

const InputField = ({ item, control, errors, labelOverrides }) => {
    const SpecificIcon = icons[item.icon || 'MdShortText']
    const defaultRules =
        item.widget === 'email'
            ? { ...item.rules, email: true }
            : item.widget === 'url'
            ? { ...item.rules, url: true }
            : item.rules

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
                        <Input
                            name={name}
                            value={value}
                            error={!!errors[item.id]}
                            onChange={e => onChange(e.target.value)}
                            placeholder={item.placeholder}
                            inputRef={ref}
                            endEnhancer={<SpecificIcon size="18px" />}
                        />
                    </FormControl>
                </div>
            )}
            name={item.id}
            control={control}
            rules={validationRules(defaultRules)}
            defaultValue={item.defaultValue || ''}
        />
    )
}
export default InputField
