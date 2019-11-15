const path = require('path');

module.exports = {
    mode: 'development',
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    entry: path.join(__dirname, 'src/scripts'),
    output: {
        filename: 'webpack.js',
        path: path.resolve(__dirname, 'dist/js'),
    }
};