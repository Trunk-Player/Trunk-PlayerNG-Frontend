import NextErrorComponent, { ErrorProps } from "next/error";

import * as Sentry from "@sentry/nextjs";
import { NextPage, NextPageContext } from "next";

interface AppErrorProps extends ErrorProps {
  err?: Error;
  hasGetInitialPropsRun?: boolean;
}

const AppError: NextPage<AppErrorProps> = ({
  statusCode,
  hasGetInitialPropsRun,
  err,
}) => {
  if (!hasGetInitialPropsRun && err) {
    Sentry.captureException(err);
  }

  return <NextErrorComponent statusCode={statusCode} />;
};

AppError.getInitialProps = async (ctx) => {
  const errorInitialProps: AppErrorProps = await NextErrorComponent.getInitialProps(
    ctx
  );

  errorInitialProps.hasGetInitialPropsRun = true;

  if (ctx.err) {
    Sentry.captureException(ctx.err);
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${ctx.asPath}`)
  );

  await Sentry.flush(2000);

  return errorInitialProps;
};

export default AppError;
