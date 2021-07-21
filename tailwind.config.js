module.exports = {
    mode: 'jit',
    purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            boxShadow: {
                btn: '0 1px 2px 0 rgba(60, 64, 67, 0.3),' +
                    '0 1px 3px 1px rgba(60, 64, 67, 0.15)'
            },
            width: {
                '600px': '600px',
                '238px':'238px',
                '400px' : '400px'
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
