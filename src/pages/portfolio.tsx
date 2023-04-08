import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import capitalize from "@/utils/capitalize";
import Head from "next/head";
import Page from "@/components/Page";
import Text from "@/components/Text";
import Image from "next/image";
import { useState } from "react";
import { isTemplateSpan } from "typescript";
import ArrowButton from "@/components/ArrowButton";

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

const previous: (index: number, maxIndex: number) => number = (
  index,
  maxIndex
) => (index === 0 ? maxIndex : index - 1);
const next: (index: number, maxIndex: number) => number = (index, maxIndex) =>
  index === maxIndex ? 0 : index + 1;

interface CarouselProps {
  items: CarouselItem[];
}
interface CarouselItem {
  current: PicturePaths;
  next: PicturePaths;
  previous: PicturePaths;
}
function Carousel({ items }: CarouselProps) {
  // TODO reduce the size of the size pictures
  // TODO animation to right : small to big picture, big to small picture
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      {items && items.length ? (
        <div className="w-full flex flex-row justify-around items-center">
          <ArrowButton
            className="transition-transform duration-200 hover:-translate-x-1"
            direction="left"
            shape="square"
            onClick={() =>
              setCurrentIndex(previous(currentIndex, items.length - 1))
            }
            borderLess
          />

          <div className="w-40">
            <picture>
              <source
                srcSet={
                  items[previous(currentIndex, items.length - 1)].current.png
                }
              />
              <Image
                src={items[currentIndex].current.webp}
                alt=""
                width={1200}
                height={1200}
                className="rounded-sm"
              />
            </picture>
          </div>

          <div className="w-44">
            <picture>
              <source srcSet={items[currentIndex].current.png} />
              <Image
                src={items[currentIndex].current.webp}
                alt=""
                width={1200}
                height={1200}
                className="rounded-sm"
              />
            </picture>
          </div>

          <div className="w-40">
            <picture>
              <source
                srcSet={items[next(currentIndex, items.length - 1)].current.png}
              />
              <Image
                src={items[currentIndex].current.webp}
                alt=""
                width={1200}
                height={1200}
                className="rounded-sm"
              />
            </picture>
          </div>

          <ArrowButton
            className="transition-transform duration-200 hover:translate-x-1"
            direction="right"
            shape="square"
            onClick={() =>
              setCurrentIndex(next(currentIndex, items.length - 1))
            }
            borderLess
          />
        </div>
      ) : null}
    </>
  );
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

interface PortfolioProjectProps {
  project: PortfolioProjectData;
}
function PortfolioProject({ project }: PortfolioProjectProps) {
  // TODO display the buttons to redirect to
  const generateCarouselItems: (
    picturePaths: PicturePaths[]
  ) => CarouselItem[] = (picturePaths) =>
    picturePaths.map((picturePath, index) => {
      return {
        current: picturePath,
        next: picturePaths[next(index, picturePaths.length - 1)],
        previous: picturePaths[previous(index, picturePaths.length - 1)],
      };
    });
  return (
    <div>
      <Carousel items={generateCarouselItems(project.screenshots)} />
      <Description title={project.title} description={project.description} />
    </div>
  );
}

interface PicturePaths {
  webp: string;
  png?: string;
  alt?: string;
}
interface PortfolioProjectData {
  title: string;
  description: string;
  screenshots: PicturePaths[];
}

export default function Portfolio() {
  const { t } = useTranslation("portfolio");
  const metaDescription = t("meta-description");

  const title = "Eflamm - " + capitalize(t("portfolio"));

  const notleloProject: PortfolioProjectData = {
    title: t("notlelo-title"),
    description: t("notlelo-description"),
    screenshots: [
      {
        webp: "/images/portfolio/notlelo-1.webp",
        png: "/images/portfolio/notlelo-1.png",
        alt: "",
      },
      {
        webp: "/images/portfolio/notlelo-2.webp",
        png: "/images/portfolio/notlelo-2.png",
        alt: "",
      },
      {
        webp: "/images/portfolio/notlelo-3.webp",
        png: "/images/portfolio/notlelo-3.png",
        alt: "",
      },
    ],
  };

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
        <PortfolioProject project={notleloProject} />
      </Page>
    </>
  );
}
