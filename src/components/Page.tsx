import { ReactNode, useEffect, useState } from "react";
import { i18n } from "next-i18next";
import { useRouter } from "next/router";
import Paragraph from "./Paragraph";
import { LanguageRounded } from "@mui/icons-material";

export interface PageProps {
  children: ReactNode | undefined;
  opaqueBottomBar?: boolean;
}
export default function Page({ children, opaqueBottomBar = false }: PageProps) {
  const router = useRouter();
  const [locale, setLocale] = useState(i18n?.resolvedLanguage);

  useEffect(() => {
    i18n?.changeLanguage(locale);
    router.push(router.pathname, router.asPath, { locale: locale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const toggleLanguage = () => {
    if (i18n?.resolvedLanguage === "en") {
      setLocale("fr");
    } else {
      setLocale("en");
    }
  };
  return (
    <main
      className={
        "flex justify-center h-full min-h-screen bg-gradient-to-br from-third to-thirdGradient overflow-auto"
      }
    >
      <button
        className="fixed top-0 right-0 p-2 rounded-md hover:bg-gray-900"
        onClick={toggleLanguage}
      >
        <span className="font-mono font-bold text-sm text-secondary whitespace-pre-wrap">
          <LanguageRounded />
          {locale?.toUpperCase()}
        </span>
      </button>
      {opaqueBottomBar ? (
        <div className="pointer-events-none w-screen h-24 bg-gradient-to-t from-black to-transparent fixed bottom-0"></div>
      ) : null}
      <div className="flex flex-col w-full pt-4 px-6 sm:px-0 lg:max-w-3xl">
        {children}
      </div>
    </main>
  );
}
