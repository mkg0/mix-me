module.exports = {
    extends: 'signavio',
    parser: 'babel-eslint',
    globals: {
        log: true,
        info: true,
        debug: true,
        warn: true,
        error: true,
    },
    rules: {
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: [
                    '**/test/**',
                    '**/tools/**',
                    '**/webpack.config.*.js',
                ],
            },
        ],
    },
}
