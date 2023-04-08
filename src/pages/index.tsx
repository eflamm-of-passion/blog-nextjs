import Head from "next/head";
import { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import styles from "@/styles/Home.module.css";
import Page from "@/components/Page";
import Paragraph from "@/components/Paragraph";

interface StaticProps {
  locale: string;
}
export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
      // Will be passed to the page component as props
    },
  };
}

interface MainTitleProps {
  title: string;
}

const MainTitle = ({ title }: MainTitleProps) => {
  return (
    <div className="w-full flex items-center justify-center flex-col h-1/3 sm:h-1/2">
      <p
        className={
          styles.mainTitleFont +
          " font-bold px-4 lg:px-24 rounded-xl lg:rounded-3xl text-8xl sm:text-sizeable lg:text-sizeable xl:text-sizeable tracking-widest text-black bg-gradient-to-br from-primary to-primaryGradient shadow-secondary/50"
        }
      >
        {title.toUpperCase()}
      </p>
    </div>
  );
};

interface IntroductionProps {
  text: string;
}

const Introduction = ({ text }: IntroductionProps) => {
  const [index, setIndex] = useState(0);
  const [textToDisplay, setTextToDisplay] = useState("");
  useEffect(() => {
    setTextToDisplay(text.slice(0, index));
    setTimeout(() => {
      setIndex(index + 1);
    }, 33);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="w-full h-1/3 flex items-start ">
      <Paragraph size="big" align="start">
        {textToDisplay}
        <span
          className={
            styles.caret +
            " ml-1 " +
            (text.length === textToDisplay.length ? styles.caretBlinking : "")
          }
        />
      </Paragraph>
    </div>
  );
};

function Menu(props: PropsWithChildren) {
  return (
    <div className="w-11/12 md:w-full  h-1/3 lg:h-1/6 flex items-center sm:items-end justify-between flex-col sm:flex-row pb-10 pt-10 sm:pt-0 font-mono text-xl sm:text-3xl capitalize tracking-wide sm:tracking-wider text-orange-300">
      {props.children}
    </div>
  );
}

export default function Home() {
  const { t } = useTranslation("home");
  const metaDescription = t("meta-description");

  return (
    <>
      <Head>
        <title>Eflamm</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className="w-full h-full flex flex-col justify-between items-center">
          <MainTitle title="Eflamm" />
          <Introduction text={t("introduction")} />
          <Menu>
            <Link className="hover:underline" href="/experiences">
              {t("experiences")}
            </Link>
            <Link className="hover:underline" href="/portfolio">
              {t("portfolio")}
            </Link>
            <Link className="hover:underline" href="/articles">
              {t("articles")}
            </Link>
            <Link className="hover:underline" href="/about">
              {t("about")}
            </Link>
          </Menu>
        </div>
      </Page>
    </>
  );
}
