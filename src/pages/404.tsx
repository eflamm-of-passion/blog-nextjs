import ArrowButton from "@/components/ArrowButton";
import Page from "@/components/Page";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import capitalize from "@/utils/capitalize";
import SectionTitle from "@/components/SectionTitle";
import Paragraph from "@/components/Paragraph";
import OutlineButton from "@/components/OutlineButton";
import Link from "next/link";

interface StaticProps {
  locale: string;
}
export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["404"])),
      // Will be passed to the page component as props
    },
  };
}

export default function PageNotFound404() {
  const title = "Eflamm - 404 page not found";
  const { t } = useTranslation("404");
  const metaDescription = t("404-meta-description");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title={capitalize(t("404-error"))} hasBackButtons>
        <div className="h-3/4 flex flex-col items-center justify-center ">
          <Paragraph size="big">{t("404-message")}</Paragraph>
          <Link
            className="block w-3/4 sm:w-1/2 mt-10 transition-transform duration-200 hover:translate-y-1 "
            href="/"
            passHref
          >
            <OutlineButton>{t("404-button-label")}</OutlineButton>
          </Link>
        </div>
      </Page>
    </>
  );
}
