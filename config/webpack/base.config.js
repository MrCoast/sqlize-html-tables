'use strict';

const path = require('path');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
const merge = require('webpack-merge');
const {
    ROOT_PATH,
    SOURCE_PATH,
    CONFIG_PATH,
    NODE_MODULES_PATH,
    BOOTSTRAP_FILES_PATH,
    SASS_PATH,
    TYPINGS_PATH,
    TESTS_PATH,
} = require('../paths.js');

function devEntrypoint(bundleUrlPrefix) {
    return {
        entry: {
            demo: path.resolve(BOOTSTRAP_FILES_PATH, 'DemoApp.js'),
            extension: path.resolve(BOOTSTRAP_FILES_PATH, 'Extension.js'),
        },
        output: {
            filename: '[name].bundle.js',
            publicPath: bundleUrlPrefix,
        },
    };
}

function devServer(host, port, bundleUrlPrefix) {
    return {
        devServer: {
            host,
            port,
            publicPath: bundleUrlPrefix,
            inline: false,
            compress: true,
        },
    };
}

function sourceMaps(sourceMappingStyle) {
    return { devtool: sourceMappingStyle };
}

function devServerWithSourcemaps(host, port, bundleUrlPrefix) {
    return merge([
        sourceMaps('eval-cheap-module-source-map'),
        devServer(host, port, bundleUrlPrefix),
    ]);
}

function resolveExtensions() {
    return {
        resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        },
    };
}

function resolveModules() {
    return {
        resolve: {
            modules: [SOURCE_PATH, NODE_MODULES_PATH],
        },
        node: {
            fs: 'empty',
        },
    };
}

function resolveAliases() {
    return {
        resolve: {
            alias: {
                'config': path.resolve(CONFIG_PATH, 'app'),
                'scss': path.resolve(ROOT_PATH, 'scss'),
            },
        },
    };
}

function loaderAliases() {
    return {
        resolveLoader: {
            alias: {
                text: 'raw-loader',
            },
        },
    };
}

function babelLoader(options = {}) {
    const include = [
        SOURCE_PATH,
        TESTS_PATH,
    ];

    if (options.useBabelForNodeModules) {
        include.push(NODE_MODULES_PATH);
    }

    return {
        module: {
            rules: [{
                test: /\.(js|jsx)$/,
                include,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env'],
                        plugins: [
                            'transform-object-rest-spread',
                        ],
                        cacheDirectory: true,
                    },
                },
            }],
        },
    };
}

function typescriptLoader(transpileOnly = false, useCache = true) {
    const plugins = transpileOnly ? [] : [new CheckerPlugin()];

    return {
        module: {
            rules: [{
                test: /\.(ts|tsx)$/,
                include: [
                    SOURCE_PATH,
                    CONFIG_PATH,
                    TYPINGS_PATH,
                ],
                use: {
                    loader: 'awesome-typescript-loader',
                    options: {
                        useBabel: true,
                        useCache,
                        transpileOnly,
                        forceIsolatedModules: true,
                        babelOptions: {
                            presets: ['react', 'env'],
                        },
                        cacheDirectory: path.resolve(NODE_MODULES_PATH, '.cache', 'awesome-typescript-loader'),
                    },
                },
            }],
        },

        plugins,
    };
}

function htmlLoader() {
    return {
        module: {
            rules: [{
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        attrs: [':data-src'],
                    },
                },
            }],
        },
    };
}

function circularDependencyPlugin() {
    return {
        plugins: [
            new CircularDependencyPlugin({
                exclude: /node_modules/,
                failOnError: true,
            }),
        ],
    };
}

function htmlWebpackPlugin() {
    return merge(
        htmlLoader(),
        {
            plugins: [
                new HtmlWebpackPlugin({
                    template: 'htdocs/demo.html',
                    chunks: [
                        'demo',
                    ],
                }),
            ],
        },
    );
}

function strictExportPresence() {
    return {
        module: {
            strictExportPresence: true,
        },
    };
}

function nodeFeatures() {
    return {
        node: {
            __filename: true,
        },
    };
}

function sassToCss(isDevMode = false) {
    return {
        module: {
            rules: [{
                test: /\.scss/,
                include: [
                    SASS_PATH,
                ],
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: !!isDevMode,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !!isDevMode,
                            sassOptions: {
                                outputStyle: isDevMode ? 'expanded' : 'compressed',
                            },
                        },
                    },
                ],
            }],
        },
        plugins: [
            new MiniCssExtractPlugin('[name].css'),
        ],
    };
}

function devSassToCss() {
    return sassToCss(true);
}

function basicConfig(options = {}) {
    const optionsWithDefaults = Object.assign({
        disableTypechecking: false,
        useCache: true,
        useBabelForNodeModules: false,
    }, options);

    return merge([
        resolveExtensions(),
        resolveModules(),
        resolveAliases(),

        loaderAliases(),
        babelLoader(options),
        typescriptLoader(optionsWithDefaults.disableTypechecking, optionsWithDefaults.useCache),

        circularDependencyPlugin(),
        strictExportPresence(),

        nodeFeatures(),
    ]);
}

function basicConfigWithSassCompilation() {
    return merge([
        basicConfig(),
        devSassToCss(),
    ]);
}

function devConfig(bundleUrlPrefix) {
    return merge([
        basicConfigWithSassCompilation(),
        devEntrypoint(bundleUrlPrefix),
        htmlWebpackPlugin(),
    ]);
}

module.exports = {
    basicConfig,
    resolveAliases,
    devConfig,
    devServerWithSourcemaps,
    sourceMaps,
    sassToCss,
};
