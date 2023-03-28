import Page from "@/components/Page";
import capitalize from "@/utils/capitalize";
import Head from "next/head";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import Link from "next/link";
import strapiApi from "@/lib/strapi";
import { ArticleData } from "@/types/strapi.type";
import Text from "@/components/Text";

interface StaticProps {
  locale: string;
}
export async function getStaticProps({ locale }: StaticProps) {
  const articlesResponse = await strapiApi.getArticles(locale);

  return {
    props: {
      articles: articlesResponse.data.map(
        (articleResponse) => articleResponse.attributes
      ),
      ...(await serverSideTranslations(locale, ["articles"])),
      // Will be passed to the page component as props
    },
  };
}

interface ArticleCardProps {
  article: ArticleData;
}
function ArticleCard({ article }: ArticleCardProps) {
  const { t, i18n } = useTranslation("articles");
  const formattedUpdatedAt = new Date(article.updatedAt).toLocaleDateString(
    i18n.language,
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (
    <div className="flex justify-center my-5">
      <Link
        className="block w-full transition-transform duration-200 hover:translate-x-1"
        href={"articles/" + article.slug}
      >
        <div
          className={
            "flex flex-row items-center justify-center my-4 p-1 rounded-xl border-2 bg-gradient-to-br from-primary to-primaryGradient cursor-pointer"
          }
        >
          <div className="flex flex-col items-start w-full h-full p-4 bg-third hover:bg-gray-900 rounded-lg">
            <div>
              <Text
                style="highlight"
                className="uppercase text-3xl tracking-wider font-semibold"
              >
                {article.title}
              </Text>
            </div>
            <div className="w-full flex justify-around my-1 text-lg tracking-tighter italic text-gray-400">
              <Text style="note">{t("updated-on") + formattedUpdatedAt}</Text>
              <Text style="note">
                {t("time-to-read") +
                  ": " +
                  article.timeToRead +
                  t("minutes-abbreviation")}
              </Text>
            </div>
            <div>
              <Text style="basic">{article.excerpt}</Text>
            </div>
          </div>
          <div className="pl-1 text-5xl text-third hover:text-gray-900">
            {">"}
          </div>
        </div>
      </Link>
    </div>
  );
}

interface ArticlesProps {
  articles: ArticleData[];
}
export default function Articles({ articles }: ArticlesProps) {
  const { t } = useTranslation("articles");
  const metaDescription = t("meta-description");

  const title = "Eflamm - " + capitalize(t("articles"));

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Page title={capitalize(t("articles"))} opaqueBottomBar hasBackButtons>
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </Page>
    </>
  );
}
