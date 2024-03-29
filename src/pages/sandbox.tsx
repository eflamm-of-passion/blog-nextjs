import ArrowButton from "@/components/ArrowButton";
import Page from "@/components/Page";
import Head from "next/head";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import capitalize from "@/utils/capitalize";

interface StaticProps {
  locale: string;
}
export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["experiences"])),
      // Will be passed to the page component as props
    },
  };
}

export default function Sandbox() {
  const title = "Eflamm - sandbox";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta
          name="description"
          content="Just a sandbox, nothing to see here"
        />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title={capitalize("Sandbox")} hasBackButtons>
        <div>Nothing to see here for the moment</div>
      </Page>
    </>
  );
}
