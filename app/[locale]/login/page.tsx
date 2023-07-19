import { createTranslator } from "next-intl";
import { notFound } from "next/navigation";

import LogoImage from "../(loggedIn)/layoutComponents/sidebar/LogoImage";
import Form from "./components/Form";

async function getMessages(locale: string = "en") {
  try {
    return (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default async function LoginPage({
  params: { locale },
  searchParams,
}: {
  params: { [key: string]: string | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const messages = await getMessages(locale);
  const t = createTranslator({
    locale: locale ?? "en",
    messages,
    namespace: "loginPage",
  });

  const callbackUrl = Array.isArray(searchParams.callbackUrl)
    ? searchParams.callbackUrl[0]
    : searchParams.callbackUrl;

  return (
    <main>
      <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <LogoImage className="mx-auto h-48 w-auto" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              {t("header")}
            </h2>
          </div>
          <div className="mt-8">
            <Form callbackUrl={callbackUrl} />
          </div>
        </div>
      </div>
    </main>
  );
}
