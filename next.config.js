const { withSentryConfig } = require("@sentry/nextjs");

const moduleExports = {};

const SentryWebpackPluginOptions = {
  silent: true, // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

// The following disables Sentry during the build process as it is
// only accessible on a private server

module.exports =
  process.env.npm_lifecycle_event && process.env.npm_lifecycle_event != "build"
    ? withSentryConfig(moduleExports, SentryWebpackPluginOptions)
    : moduleExports;

// module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
