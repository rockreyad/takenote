const { withSentryConfig } = require('@sentry/nextjs');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'avatars.githubusercontent.com',
      'avatar.vercel.sh',
      'googleusercontent.com'
    ]
  },
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ['@prisma/client', 'bcryptjs', 'docx'],
    serverActions: true
  }
  // sentry: {
  // See the sections below for information on the following options:
  //   'Configure Source Maps':
  //     - disableServerWebpackPlugin
  //     - disableClientWebpackPlugin
  //     - hideSourceMaps
  //     - widenClientFileUpload
  //   'Configure Legacy Browser Support':
  //     - transpileClientSDK
  //   'Configure Serverside Auto-instrumentation':
  //     - autoInstrumentServerFunctions
  //     - excludeServerRoutes
  //   'Configure Tunneling to avoid Ad-Blockers':
  //     - tunnelRoute
  // }
};
const withMDX = require('@next/mdx')();
const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, configFile, stripPrefix, urlPrefix, include, ignore

  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,

  // An auth token is required for uploading source maps.
  // You can get an auth token from https://sentry.io/settings/account/api/auth-tokens/
  // The token must have `project:releases` and `org:read` scopes for uploading source maps
  authToken: process.env.SENTRY_AUTH_TOKEN,

  silent: true // Suppresses all logs

  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};

(module.exports = withMDX(nextConfig)),
  withSentryConfig(nextConfig, sentryWebpackPluginOptions);
