import Page from "@/components/Page";
import Head from "next/head";
import React from "react";
import { useTranslation } from "next-i18next";
import capitalize from "@/utils/capitalize";
import Paragraph from "@/components/Paragraph";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { theme } from "../../tailwind.config.js";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import Link from "next/link.js";
import OutlineButton from "@/components/OutlineButton";
import Note from "@/components/Note";
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

export default function Experiences() {
  const { t } = useTranslation("experiences");

  const title = "Eflamm - " + capitalize(t("experiences"));
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
      <Page title={capitalize(t("experiences"))} opaqueBottomBar hasBackButtons>
        <Paragraph className="text-justify">{t("introduction")}</Paragraph>
        <div className="flex flex-row justify-around my-5 sm:my-14">
          <Link
            href="https://github.com/eflamm-of-passion"
            target="_blank"
            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-900"
          >
            <GithubIcon
              size={64}
              colors={[
                theme.extend.colors.primaryGradient.DEFAULT,
                theme.extend.colors.primary.DEFAULT,
              ]}
            />
            <Paragraph className="text-center">
              {t("my-github-account")}
            </Paragraph>
          </Link>
          <Link
            href="https://www.linkedin.com/in/eflamm/"
            target="_blank"
            className="flex flex-col items-center p-2 rounded-lg hover:bg-gray-900"
          >
            <LinkedinIcon
              size={64}
              colors={[
                theme.extend.colors.primaryGradient.DEFAULT,
                theme.extend.colors.primary.DEFAULT,
              ]}
              rounded
            />
            <Paragraph className="text-center">
              {t("my-linkedin-account")}
            </Paragraph>
          </Link>
        </div>
        <Note align="justify">{t("contact-note")}</Note>
        <div className="flex justify-center my-5 sm:mt-24">
          <Link
            className="block w-2/3 transition-transform duration-200 hover:translate-y-1 "
            href="/api/resume"
            target="_blank"
          >
            <OutlineButton>{t("download-my-resume")}</OutlineButton>
          </Link>
        </div>
      </Page>
    </>
  );
}
