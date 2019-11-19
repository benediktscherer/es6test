const path = require('path');

const conf = {
    jsCwd: './src/scripts',
    jsDest: 'dist/js'
};

/**
 *
 * for dynamic entry points
 *
 * @type {{mode: string, output: {path: *, filename: string}, entry: *, resolve: {extensions: [string, string, string]}, optimization: {splitChunks: {chunks: string}}, module: {rules: {test: RegExp, use: [string], exclude: RegExp}[]}}}
 */
const config = {
    mode: 'development',
    entry: {
        filename: conf.jsCwd + '/index.ts'
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, conf.jsDest),
        publicPath: '/js/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
    },
    module: {
        rules: [
            {
                test: /\.ts(x)?$/,
                use: [
                    'awesome-typescript-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [
            '.tsx',
            '.ts',
            '.js'
        ]
    }
};

module.exports = config;