import format from 'date-fns/format'

const themeElements = {
    buttonBg: 'Button Background',
    buttonHover: 'Button Text',
    formBg: 'Page Background',
    text: 'Text'
}
const themes = {
    elements: themeElements,
    buttonOverrides: theming => {
        let styleObject = {}
        if (theming && theming.buttonBg && theming.buttonBg !== null) {
            styleObject.backgroundColor = theming.buttonBg
        }
        if (theming && theming?.buttonHover && theming.buttonHover !== null) {
            styleObject.color = theming.buttonHover
        }
        return {
            BaseButton: {
                style: styleObject
            }
        }
    },
    bgOverride: theming => {
        let styleObject = {}
        if (theming && theming?.formBg && theming.formBg !== null) {
            styleObject.backgroundColor = theming.formBg
        }
        return styleObject
    },
    labelOverrides: theming => {
        let styleObject = {}
        if (theming && theming?.text && theming.text !== null) {
            styleObject.color = theming.text
        }
        return {
            Label: {
                style: styleObject
            }
        }
    },
    handleColorChange: (value, palette) => {
        switch (palette) {
            case 'buttonBg':
                return themes.buttonOverrides(value.hex)
            case 'buttonHover':
                return themes.bgOverride(value.hex)
            case 'formBg':
                return themes.inputOverrides(value.hex)
            case 'text':
                return themes.labelOverrides(value.hex)
            default:
                return null
        }
    }
}

const stringToColor = str => {
    let hash = 0,
        amount = -50
    str = str + str + str

    if (str.length === 0) return hash
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash)
        hash = hash & hash
    }
    let color = '#'
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 255
        color += ('60' + value.toString(16)).substr(-2)
    }
    return (
        '#' +
        color
            .replace(/^#/, '')
            .replace(/../g, color =>
                (
                    '0' +
                    Math.min(
                        255,
                        Math.max(0, parseInt(color, 16) + amount)
                    ).toString(16)
                ).substr(-2)
            )
    )
}

// https://stackoverflow.com/a/17527156/827525

function percentageToHsl(percentage, hue0, hue1) {
    percentage = percentage / 100
    let hue = percentage * (hue1 - hue0) + hue0
    return 'hsl(' + hue + ', 100%, 50%)'
}

const truncate = (str, len = 10, start = 0) =>
    str.length > len ? `${str.substring(start, len)}...` : str

const formatDate = date => format(new Date(date), 'MMM d, hh:mm a')

function _getOs(userAgent) {
    let OSName = 'Unknown'
    if (userAgent.indexOf('Win') !== -1) OSName = 'Win'
    if (userAgent.indexOf('Mac') !== -1) OSName = 'Mac'
    if (userAgent.indexOf('Linux') !== -1) OSName = 'Linux'
    if (userAgent.indexOf('Android') !== -1) OSName = 'Android'
    if (userAgent.indexOf('like Mac') !== -1) OSName = 'iOS'
    return OSName
}

const getBrowser = function(userAgent) {
    let ua = userAgent,
        tem,
        M =
            ua.match(
                /(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i
            ) || []
    if (/trident/i.test(M[1])) {
        tem = /\brv[ :]+(\d+)/g.exec(ua) || []
        return 'IE ' + (tem[1] || '')
    }
    if (M[1] === 'Chrome') {
        tem = ua.match(/\b(OPR|Edge?)\/(\d+)/)
        if (tem != null)
            return tem
                .slice(1)
                .join(' ')
                .replace('OPR', 'Opera')
                .replace('Edg ', 'Edge ')
    }
    M = M[2] ? [M[1], M[2]] : ['-?', '-?', '-?']
    if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
    return { browser: M.join(' '), os: _getOs(ua) }
}

const formatLogAction = function(action, formId) {
    return action
        .replace('API.', '')
        .replace(`.${formId}`.toUpperCase(), '')
        .replace('.0', '')
        .replace('.1', '')
}

const convertToSlug = function(str) {
    let splitStr = str.toLowerCase().split(' ')
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
    }
    return splitStr
        .join(' ')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, '')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '')
}
function moneyFormat(price) {
    const pieces = parseFloat(price)
        .toFixed(2)
        .split('')
    let ii = pieces.length - 3
    while ((ii -= 3) > 0) {
        pieces.splice(ii, 0, ',')
    }
    return pieces.join('')
}

const formatCurrecny = (amt, code) => {
    let c =
        code === 'INR'
            ? `₹`
            : code === 'USD'
            ? `$`
            : code === 'AED'
            ? `د.إ`
            : code === 'EUR'
            ? `€`
            : `?`
    return `${c}${amt ? moneyFormat(amt) : ''}`
}
const getDate = date => new Date(date).toISOString().split('T')[0]

const getPercentage = (value, total) => {
    const perc = (value * 100) / total
    return Number.isInteger(perc) ? perc : perc.toFixed(2)
}

const formatFilename = fileUrl => {
    const filename = fileUrl.split('-')
    return filename[2]
}

const getChartFields = () => [
    'multiOption',
    'checkbox',
    'dropdown',
    'yesorno',
    'starrating',
    'emojirating'
]
export {
    themes,
    stringToColor,
    truncate,
    formatDate,
    getBrowser,
    formatLogAction,
    convertToSlug,
    percentageToHsl,
    formatCurrecny,
    getDate,
    getPercentage,
    getChartFields,
    formatFilename
}
