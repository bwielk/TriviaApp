config = {
   entry: {
      welcome: "./src/js/app.js",
      leaderboard: "./src/js/leaderboardApp.js"
    },
    output: {
      path: "./build",
      filename: "[name]-bundle.js"
    },

    devtool: "source-map"
  };

module.exports = config;