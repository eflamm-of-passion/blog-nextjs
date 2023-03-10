import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import strapiApi from "@/lib/strapi";
import { ArticleData } from "@/types/strapi.type";
import Head from "next/head";
import Page from "@/components/Page";
import ArrowButton from "@/components/ArrowButton";
import PageTitle from "@/components/PageTitle";
import Paragraph from "@/components/Paragraph";

export async function getStaticPaths(context: GetStaticProps) {
  // FIXME
  const paths = await strapiApi.getArticleSlugs("fr");
  return {
    paths,
    fallback: false,
  };
}

interface StaticProps {
  slug: string;
  locale: string;
}
export async function getStaticProps({ slug, locale }: StaticProps) {
  const articleResponse = await strapiApi.getArticleBySlug(slug, locale);
  return {
    props: {
      article: articleResponse.data.map(
        (articleResponse) => articleResponse.attributes
      )[0],
      ...(await serverSideTranslations(locale, ["articles"])),
      // Will be passed to the page component as props
    },
  };
}

interface ArticleProps {
  article: ArticleData;
}
export default function Article({ article }: ArticleProps) {
  const router = useRouter();

  const title = "Eflamm - " + article.title;
  const processedContent: string[] = article.content.split("\n");

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page>
        <div className="flex flex-row items-end -ml-6">
          <div className="-mb-1 sm:mb-0">
            <ArrowButton
              direction="left"
              shape="square"
              onClick={() => router.push("/articles")}
            />
          </div>
          <PageTitle>{article.title}</PageTitle>
        </div>
        <div className="text-primary">
          {processedContent.map((paragraph, index) => (
            <Paragraph key={index}>{paragraph}</Paragraph>
          ))}
        </div>
        <div className="h-32" />
        <div className="fixed bottom-2 sm:bottom-10">
          <ArrowButton
            direction="left"
            shape="rectangular"
            onClick={() => router.push("/")}
          />
        </div>
      </Page>
    </>
  );
}
