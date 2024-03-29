import Page from "@/components/Page";
import Paragraph from "@/components/Paragraph";
import SectionTitle from "@/components/SectionTitle";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import Link from "next/link";

import capitalize from "../utils/capitalize";

// inspirations :
// https://kentcdodds.com/about
// https://wesbos.com/about https://wesbos.com/uses
// https://jvns.ca/about/
// https://ishadeed.com/about/
// https://welearncode.com/about

// TODO about this web site (link to github)
// TODO who am i (developper, scout leader, gaming, series, internet)
// with a link to experiences
// my values
// TODO where to find me
// TODO contact form
// TODO license

interface StaticProps {
  locale: string;
}
export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["about"])),
      // Will be passed to the page component as props
    },
  };
}

export default function About() {
  const { t } = useTranslation("about");

  const title = "Eflamm - " + capitalize(t("about"));
  const metaDescription = t("meta-description");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title={capitalize(t("about"))} opaqueBottomBar hasBackButtons>
        <SectionTitle>{t("myself")}</SectionTitle>
        <Paragraph>{t("myself-p1")}</Paragraph>
        <Paragraph>{t("myself-p2")}</Paragraph>
        <Paragraph>{t("myself-p3")}</Paragraph>
        <SectionTitle>{t("this-web-site")}</SectionTitle>
        <Paragraph>{t("this-web-site-p1")}</Paragraph>
        <Paragraph>
          {t("this-web-site-p2")}
          <Link
            className="text-sm sm:text-base lg:text-lg text-blue-400 hover:text-blue-300 visited:text-blue-600"
            href="https://github.com/eflamm-of-passion/blog-nextjs"
          >
            https://github.com/eflamm-of-passion/blog-nextjs
          </Link>
        </Paragraph>
      </Page>
    </>
  );
}
