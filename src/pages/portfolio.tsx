import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import capitalize from "@/utils/capitalize";
import Head from "next/head";
import Page from "@/components/Page";
import Text from "@/components/Text";
import Image from "next/image";
import { useState } from "react";
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

interface CarouselItemProps {
  previousAnimation: boolean;
  nextAnimation: boolean;
  baseClassName: string;
  previousClassName?: string;
  nextClassName?: string;
  picturePaths: PicturePaths;
  pictureClassName?: string;
}
function CarouselItem({
  previousAnimation,
  nextAnimation,
  baseClassName,
  previousClassName,
  nextClassName,
  picturePaths,
  pictureClassName,
}: CarouselItemProps) {
  return (
    <div
      className={` absolute w-full ${
        !previousAnimation && !nextAnimation ? baseClassName : " "
      }
${
  previousAnimation && previousClassName
    ? ` transition duration-1000 ease-in-out transform ${previousClassName}`
    : " "
}
${
  nextAnimation && nextClassName
    ? ` transition duration-1000 ease-in-out transform ${nextClassName}`
    : " "
}`}
    >
      <picture>
        <source srcSet={picturePaths.png} />
        <Image
          src={picturePaths.webp}
          alt=""
          width={1200}
          height={1200}
          className={"rounded-sm " + pictureClassName}
        />
      </picture>
    </div>
  );
}

interface CarouselProps {
  items: CarouselItem[];
}
interface CarouselItem {
  current: PicturePaths;
  next: PicturePaths;
  previous: PicturePaths;
}
function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousAnimation, setPreviousAnimation] = useState(false);
  const [nextAnimation, setNextAnimation] = useState(false);

  return (
    <>
      {items && items.length ? (
        <div className="relative w-full flex items-center mt-10 ">
          <div className="absolute w-full translate-x-0 z-30">
            <ArrowButton
              className="transition-transform duration-200 hover:-translate-x-1 relative"
              direction="left"
              shape="square"
              onClick={() => {
                setPreviousAnimation(true);
                setTimeout(() => {
                  setCurrentIndex(previous(currentIndex, items.length - 1));
                  setPreviousAnimation(false);
                }, 1000);
              }}
              borderLess
            />
          </div>

          <div className=" relative w-2/3 flex items-center">
            <div className=" opacity-0">
              <picture>
                <source srcSet={items[currentIndex].current.png} />
                <Image
                  src={items[currentIndex].current.webp}
                  alt=""
                  width={1200}
                  height={1200}
                  className={"rounded-sm w-32 sm:w-44 "}
                />
              </picture>
            </div>

            {/* -2 */}
            <CarouselItem
              previousAnimation={previousAnimation}
              nextAnimation={nextAnimation}
              baseClassName="-translate-x-1/2 opacity-0 filter grayscale"
              previousClassName="translate-x-0 opacity-100 filter grayscale"
              nextClassName="opacity-0"
              pictureClassName="w-32 sm:w-44"
              picturePaths={
                items[
                  previous(
                    previous(currentIndex, items.length - 1),
                    items.length - 1
                  )
                ].current
              }
            />

            {/* -1 */}
            <CarouselItem
              previousAnimation={previousAnimation}
              nextAnimation={nextAnimation}
              baseClassName="translate-x-0 z-10 opacity-100 filter grayscale"
              previousClassName="translate-x-1/2 z-20 opacity-100"
              nextClassName="-translate-x-[50%] opacity-0  filter grayscale"
              pictureClassName="w-32 sm:w-44"
              picturePaths={
                items[previous(currentIndex, items.length - 1)].current
              }
            />

            {/* 0 */}
            <CarouselItem
              previousAnimation={previousAnimation}
              nextAnimation={nextAnimation}
              baseClassName="translate-x-1/2 z-20 "
              previousClassName="translate-x-full z-10 opacity-100 filter grayscale"
              nextClassName="translate-x-0 z-10 opacity-100 filter grayscale"
              pictureClassName="w-32 sm:w-44"
              picturePaths={items[currentIndex].current}
            />

            {/* +1 */}
            <CarouselItem
              previousAnimation={previousAnimation}
              nextAnimation={nextAnimation}
              baseClassName="translate-x-full z-10 opacity-100 filter grayscale"
              previousClassName="translate-x-[150%] opacity-0 filter grayscale"
              nextClassName="translate-x-1/2 z-20"
              pictureClassName="w-32 sm:w-44"
              picturePaths={items[next(currentIndex, items.length - 1)].current}
            />

            {/* +2 */}
            <CarouselItem
              previousAnimation={previousAnimation}
              nextAnimation={nextAnimation}
              baseClassName="translate-x-[150%] opacity-0 filter grayscale"
              nextClassName="translate-x-full z-10 opacity-100 filter grayscale"
              previousClassName="opacity-0 filter grayscale"
              pictureClassName="w-32 sm:w-44"
              picturePaths={
                items[
                  next(next(currentIndex, items.length - 1), items.length - 1)
                ].current
              }
            />
          </div>
          <div className="absolute w-full translate-x-[81%] z-30 ">
            <ArrowButton
              className="transition-transform duration-200 hover:translate-x-1"
              direction="right"
              shape="square"
              onClick={() => {
                setNextAnimation(true);
                setTimeout(() => {
                  setCurrentIndex(next(currentIndex, items.length - 1));
                  setNextAnimation(false);
                }, 1000);
              }}
              borderLess
            />
          </div>
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
    <div className="mt-5">
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
