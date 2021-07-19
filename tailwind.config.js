module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                xl: '0px 0px 15px 1px rgba(0, 0, 0, 0.25)'
            },
            width: {
                '600px': '600px'
            },
            backgroundColor: {
                'brown': '#404040'
            }

        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
