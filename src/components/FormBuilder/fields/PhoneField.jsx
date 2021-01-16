import { COUNTRIES, PhoneInput } from 'baseui/phone-input'

import { Controller } from 'react-hook-form'
import { FormControl } from 'baseui/form-control'
import React from 'react'
import { validationRules } from '../utils'

const PhoneField = props => {
    const {
        item,
        control,
        errors,
        labelOverrides,
        dialCode = '+1',
        setDialcode
    } = props

    const [country, setCountry] = React.useState(COUNTRIES.US)
    React.useEffect(() => {
        const defaultCountry = Object.values(COUNTRIES).filter(
            values => values.dialCode === dialCode
        )
        setCountry(defaultCountry[0] ? defaultCountry[0] : COUNTRIES.US)
    }, [dialCode])

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
                        <PhoneInput
                            country={country}
                            inputRef={ref}
                            value={value}
                            error={!!errors[item.id]}
                            onTextChange={event => onChange(event.target.value)}
                            onCountryChange={changeCountry => {
                                setDialcode(changeCountry.value[0].dialCode)
                                setCountry(changeCountry.option)
                            }}
                        />
                    </FormControl>
                </div>
            )}
            name={item.id}
            control={control}
            defaultValue={item.defaultValue || ''}
            rules={validationRules({ ...item.rules, phone: true })}
        />
    )
}
export default PhoneField
