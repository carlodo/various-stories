const path = require("path");
const glob = require("glob");

module.exports = ({ config, mode }) => {
  config.resolve.symlinks = true;

  config.module.rules.push(
    {
      test: /\.js$/,
      include: [
        // projectstorm is written for recent versions of the
        // node engine, so it will not work on older browsers
        // without transpilation
        path.resolve(__dirname, "../node_modules/@projectstorm")
      ],
      loader: require.resolve("babel-loader"),
      options: {
        presets: ["@babel/preset-env"]
      }
    },
    {
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [["react-app", { flow: false, typescript: true }]]
          }
        },
        {
          loader: require.resolve("react-docgen-typescript-loader")
        }
      ]
    }
  );
  config.resolve.extensions.push(".js", ".ts", ".tsx");
  return config;
};
