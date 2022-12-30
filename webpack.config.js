const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/main.tsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js',
    },
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },

            {
                // look for .css or .scss files
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                // in the `src` directory
                //include: [path.resolve(paths.appSrc)],
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            //discardDuplicates: true,
                            importLoaders: 1,
                            // This enables local scoped CSS based in CSS Modules spec
                            modules: true,
                            // generates a unique name for each class (e.g. app__app___2x3cr)
                            //localIdentName: '[name]__[local]___[hash:base64:5]',
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        }),
    ],
};
