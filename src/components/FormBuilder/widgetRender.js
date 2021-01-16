import React from 'react'
import RadioField from './fields/RadioField'
import CheckboxField from './fields/CheckboxField'
import DropdownField from './fields/DropdownField'
import TextareaField from './fields/TextareaField'
import InputField from './fields/InputField'
import StarRatingField from './fields/StarRatingField'
import EmoticonRatingField from './fields/EmoticonRatingField'
import FileField from './fields/FileField'
import PhoneField from './fields/PhoneField'

const fields = {
    radio: RadioField,
    yesorno: RadioField,
    checkbox: CheckboxField,
    dropdown: DropdownField,
    long: TextareaField,
    short: InputField,
    email: InputField,
    url: InputField,
    starrating: StarRatingField,
    emojirating: EmoticonRatingField,
    file: FileField,
    phone: PhoneField
}

const WidgetRender = props => {
    const ComponentWidget = fields[props.item.widget]
    return <ComponentWidget {...props} />
}

export default WidgetRender
