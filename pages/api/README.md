# Nextjs API Routes

To be filled out.

## Nextjs API routes With Sentry

While `@sentry/nextjs` will enable Sentry for your nextjs application, files under the `pages/api` require one additional installing step.

Wrap your API handlers with a `withSentry` function to capture [Next.js API route errors](https://nextjs.org/docs/api-routes/introduction):

```javascript
import { withSentry } from "@sentry/nextjs";

const handler = async (req, res) => {
  // ...
};

export default withSentry(handler);
```

Configure the Sentry initialization:

```javascript
Sentry.init({
  dsn: "https://39df0e1e9f694faa877dbcd4ec1ad07f@bigbrother.weathermelon.io//3",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});
```

The above configuration has automatic error tracking with source maps for both JavaScript and TypeScript. We recommend adjusting `tracesSampleRate` in production, see [Sampling](https://docs.sentry.io/platforms/javascript/configuration/sampling/).

Then create an intentional error, so you can test that everything is working from your development environment. For example, a button whose `onClick` handler throws an error:

```javascript
<button
  type="button"
  onClick={() => {
    throw new Error("Sentry Frontend Error");
  }}
>
  Throw error
</button>
```

If you're new to Sentry, use the email alert to access your account and complete a product tour.

If you're an existing user and have disabled alerts, you won't receive this email.
