export const validationRules = rules => {
    if (rules === null || typeof rules !== 'object') return {}
    let validation = {}
    Object.keys(rules).forEach(function(key) {
        switch (key) {
            case 'url':
                validation['validate'] = value =>
                    value === '' ? true : _validateUrl(value) || 'Url not valid'
                break
            case 'email':
                validation['pattern'] = {
                    value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: 'Email not valid'
                }
                break
            case 'phone':
                validation['pattern'] = {
                    value: /[0-9]+/,
                    message: 'Phone number not valid'
                }
                break
            case 'required':
                validation['required'] =
                    rules[key] === true ? 'Required field' : rules[key]
                break
            default:
                validation[key] = rules[key]
        }
    })
    return validation
}

const _validateUrl = url => {
    try {
        new URL(url)
    } catch (_) {
        return false
    }
    return true
}
