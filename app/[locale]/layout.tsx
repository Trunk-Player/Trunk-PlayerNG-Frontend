import { NextIntlClientProvider, createTranslator, useLocale } from "next-intl";
import { checkLanguage } from "@/utils/i18nUtils";
import { notFound } from "next/navigation";
import "./globals.css";

import type { AvailableLanguagesType } from "@/types/i18nTypes";
import type { ReactNode } from "react";
import ReduxProvider from "@/components/ReduxProvider";

async function getMessages(locale: AvailableLanguagesType) {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

type GenerateMetadataProps = {
  children: ReactNode;
  params: { locale: AvailableLanguagesType };
};

export async function generateMetadata({
  params: { locale: uncheckedLocale },
}: GenerateMetadataProps) {
  const locale = checkLanguage(uncheckedLocale);
  const messages = await getMessages(locale);

  const t = createTranslator({ locale, messages });

  return {
    title: t("app.name"),
    description: t("app.description"),
  };
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: AvailableLanguagesType };
}) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const uncheckedLocale = useLocale();
  const locale = checkLanguage(uncheckedLocale);
  const messages = await getMessages(locale);

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  return (
    <html className="h-full" lang={locale}>
      <body className="h-full" suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ReduxProvider>{children}</ReduxProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
