import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import capitalize from "@/utils/capitalize";
import Head from "next/head";
import Page from "@/components/Page";
import Text from "@/components/Text";
import SectionTitle from "@/components/SectionTitle";
import Paragraph from "@/components/Paragraph";

interface StaticProps {
  locale: string;
}
export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["portfolio"])),
      // Will be passed to the page component as props
    },
  };
}

function Carousel() {
  return <></>;
}

interface DescriptionProps {
  title: string;
  description: string;
}
function Description({ title, description }: DescriptionProps) {
  return (
    <div>
      <h3>
        <Text style="highlight" className="text-4xl">
          {title}
        </Text>
      </h3>
      <Text>{description}</Text>
    </div>
  );
}

export default function Portfolio() {
  const { t } = useTranslation("portfolio");
  const metaDescription = t("meta-description");

  const title = "Eflamm - " + capitalize(t("portfolio"));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="robots" content="index,follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title={capitalize(t("porftolio"))} opaqueBottomBar hasBackButtons>
        <div>
          <Carousel />
          <Description
            title={t("notlelo-title")}
            description={t("notlelo-description")}
          />
        </div>
      </Page>
    </>
  );
}
