module.exports = ({ config, mode }) => {
  config.resolve.symlinks = true;

  config.module.rules.push({
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
  });

  config.resolve.extensions.push(".js", ".ts", ".tsx");

  return config;
};
