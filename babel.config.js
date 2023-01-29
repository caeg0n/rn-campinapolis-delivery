/* eslint-disable quotes */
/* eslint-disable prettier/prettier */

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ts', '.tsx', '.js', '.ios.js', '.android.js'],
          alias: {
            '@src': './src',
          },
        },
      ],
      [
        "module:react-native-dotenv",
        {
          "moduleName": "@env",
          "path": ".env",
          "blacklist": null,
          "whitelist": null,
          "safe": false,
          "allowUndefined": true,
        },
      ],
    ],
  };
};
