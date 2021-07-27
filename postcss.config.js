module.exports = {
    plugins: {
        'postcss-px-to-viewport': {
            unitToConvert: 'px',
            viewportWidth: 750,
            unitPrecision: 5,
            viewportUnit: 'vw',
            fontViewportUnit: 'vw',
            exclude: /node_modules/,
            include: /\/src/,
        }
    }
}