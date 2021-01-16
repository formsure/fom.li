// tailwind.config.js

module.exports = {
    purge: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        fontFamily: {
            body: ['B612'],
            mono: [
                'ui-monospace',
                'SFMono-Regular',
                'Menlo',
                'Monaco',
                'Consolas'
            ]
        },
        extend: {
            fontSize: {
                tiny: '.5rem'
            }
        },
        container: {
            center: true
        }
    },
    variants: {
        display: ['responsive', 'group-hover', 'group-focus'],
        transform: ['hover', 'focus', 'group-hover', 'group-focus'],
        scale: ['active', 'group-hover'],
        transitionProperty: ['hover', 'focus', 'group-hover', 'group-focus'],
        transitionDelay: ['hover', 'focus', 'group-hover', 'group-focus']
    },
    plugins: []
}
