import { ReactNode, useEffect, useState } from "react";
import { i18n } from "next-i18next";
import { useRouter } from "next/router";
import { LanguageRounded } from "@mui/icons-material";
import EmberAnimation from "./EmberAnimation";
import BrazierAnimation from "./BrazierAnimation";
import PageTitle from "./PageTitle";
import ArrowButton from "./ArrowButton";

export interface PageProps {
  title?: string;
  children: ReactNode | undefined;
  backOnclick?: () => {};
  hasBackButtons?: boolean;
  opaqueBottomBar?: boolean;
}
export default function Page({
  title,
  children,
  backOnclick,
  hasBackButtons,
  opaqueBottomBar = false,
}: PageProps) {
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
        className="fixed top-0 right-0 p-2 rounded-md hover:bg-gray-900 z-40"
        onClick={toggleLanguage}
      >
        <span className="font-mono font-bold text-sm text-secondary whitespace-pre-wrap">
          <LanguageRounded />
          {locale?.toUpperCase()}
        </span>
      </button>

      <div className="flex flex-col w-full pt-4 px-6 sm:px-0 lg:max-w-3xl z-20">
        {title ? (
          <div className="flex flex-row items-end mt-10 -ml-6">
            {hasBackButtons ? (
              <div className="-mb-1 sm:mb-0">
                <ArrowButton
                  className="transition-transform duration-200 hover:-translate-x-1"
                  direction="left"
                  shape="square"
                  onClick={backOnclick ? backOnclick : () => router.back()}
                />
              </div>
            ) : null}
            <PageTitle>{title}</PageTitle>
          </div>
        ) : null}
        {children}
        {hasBackButtons ? (
          <>
            <div className="h-32" />
            <div className="fixed bottom-2 sm:bottom-10 z-40">
              <ArrowButton
                className="transition-transform duration-200 hover:-translate-x-1"
                direction="left"
                shape="rectangular"
                onClick={() => router.push("/")}
              />
            </div>
          </>
        ) : null}
      </div>

      {opaqueBottomBar ? (
        <div className="pointer-events-none w-screen h-24 bg-gradient-to-t from-black to-transparent fixed bottom-0 z-30"></div>
      ) : null}
      <div className="fixed bottom-0 left-0 z-10 ">
        <div className="w-screen flex flex-row justify-between">
          <div className="w-1/4 flex flex-row justify-between">
            <EmberAnimation />
            <EmberAnimation />
            <BrazierAnimation className="w-1/4 h-0 absolute -bottom-24 md--bottom-28 -left-8 rotate-12" />
            <EmberAnimation />
            <EmberAnimation />
          </div>
          <div className="w-1/4 flex flex-row justify-between">
            <EmberAnimation />
            <EmberAnimation />
            <BrazierAnimation className="w-1/4 h-0 absolute -bottom-24 md--bottom-28 -right-8 -rotate-12" />
            <EmberAnimation />
            <EmberAnimation />
          </div>
        </div>
      </div>
    </main>
  );
}
