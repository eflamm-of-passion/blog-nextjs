import type { NextApiRequest, NextApiResponse } from "next";
import puppeteer, { Browser } from "puppeteer-core";
import Chromium from "chrome-aws-lambda";
import "react";
import ReactDOMServer from "react-dom/server";
import fs from "fs";
import Image from "next/image";
import { PropsWithChildren, ReactNode } from "react";
import {
  ContactDetailsData,
  EducationData,
  ExperienceData,
  MissionData,
  ProjectData,
  ResumeData,
} from "@/types/resume.type";
import { CallIcon } from "@/components/icons/CallIcon";
import { MailIcon } from "@/components/icons/MailIcon";
import { LocationIcon } from "@/components/icons/LocationIcon";
import { CakeIcon } from "@/components/icons/CakeIcon";
import { CarIcon } from "@/components/icons/CarIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { GithubIcon } from "@/components/icons/GithubIcon";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Buffer>
  // res: NextApiResponse<string>
) {
  const browserExecPath =
    process.env.NODE_ENV === "production"
      ? await Chromium.executablePath
      : process.env.BROWSER_PATH;
  const browser: Browser = await puppeteer.launch({
    args: Chromium.args,
    executablePath: browserExecPath,
    defaultViewport: Chromium.defaultViewport,
    headless: Chromium.headless,
  });

  const profilePictureImageData = fs
    .readFileSync("public/data/profile.jpg")
    .toString("base64");

  const resumeData: ResumeData = JSON.parse(
    fs.readFileSync("public/data/resume-data.json").toString("utf-8")
  );

  const experiencesOnFirstPage = resumeData.experiences.slice(0, 3);
  const experiencesOnSecondPage = resumeData.experiences.slice(3, 4);

  const page = await browser.newPage();
  await page.setViewport({
    width: 1440,
    height: 1200,
    isMobile: false,
    hasTouch: false,
  });

  interface ProfilePicProps {
    imageData: string;
  }

  const ProfilePic = ({ imageData }: ProfilePicProps) => {
    const style: React.CSSProperties = {
      width: "4cm",
      height: "4cm",
      marginTop: "0.5cm",
      marginLeft: "0.5cm",
      padding: "0.2cm",
      borderRadius: "1000px",
      backgroundColor: "orange",
    };
    return (
      <div>
        <Image
          alt=""
          width={0}
          height={0}
          style={style}
          src={`data:image/png;base64,${imageData}`}
        />
      </div>
    );
  };

  interface ColumnProps {
    children: ReactNode;
  }

  const LeftColumn = ({ children }: ColumnProps) => {
    const style: React.CSSProperties = {
      display: "inline-block",
      float: "left",
      width: "25%",
      height: "100%",
      backgroundColor: "#3b3232",
      color: "#ffffff",
    };
    return <div style={style}>{children}</div>;
  };

  const RightColumn = ({ children }: ColumnProps) => {
    const style: React.CSSProperties = {
      display: "inline-block",
      float: "right",
      width: "71%",
      height: "100%",
      paddingTop: "0.5cm",
      paddingRight: "0.4cm",
      backgroundColor: "white",
      color: "#333333",
    };
    return <div style={style}>{children}</div>;
  };

  interface NameProps {
    firstName: string;
    lastName: string;
  }
  const Name = ({ firstName, lastName }: NameProps) => {
    const textStyle: React.CSSProperties = {
      marginTop: "5mm",
      marginBottom: "-20px",
      fontFamily: "sans",
      letterSpacing: "0.5mm",
      textAlign: "center",
    };
    const firstNameStyle: React.CSSProperties = {
      fontWeight: "400",
    };
    const lastNameStyle: React.CSSProperties = {
      fontWeight: "600",
    };
    const underlineStyle: React.CSSProperties = {
      width: "80%",
      height: "5mm",
      margin: "auto",
      marginBottom: "15mm",
      borderRadius: "5px",
      backgroundColor: "#FFEB0A",
    };
    return (
      <>
        <h1 style={textStyle}>
          <span style={firstNameStyle}>{firstName}</span>
          <span> </span>
          <span style={lastNameStyle}>{lastName}</span>
        </h1>
        <div style={underlineStyle} />
      </>
    );
  };

  interface ExperienceProps {
    data: ExperienceData;
  }
  const Experience = ({ data }: ExperienceProps) => {
    const companyLogoImageData = data.companyLogo
      ? fs.readFileSync(data.companyLogo).toString("base64")
      : null;
    const containerStyle = {
      display: "flex",
      alignItems: "bottom",
      marginTop: "4mm",
      marginBottom: "2mm",
    };
    const headerComponentStyle: React.CSSProperties = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      paddingLeft: "2mm",
      paddingTop: "1mm",
    };
    const logoStyle: React.CSSProperties = {
      minWidth: "11mm",
      width: "11mm",
      height: "11mm",
      marginLeft: "-2mm",
      borderRadius: "1px",
    };
    const annotationStyle = {
      color: "grey",
      fontSize: "3.2mm",
    };
    return (
      <>
        <div style={containerStyle}>
          {companyLogoImageData ? (
            <Image
              alt=""
              width={0}
              height={0}
              style={logoStyle}
              src={`data:image/png;base64,${companyLogoImageData}`}
            />
          ) : (
            <div style={logoStyle} />
          )}
          <div style={headerComponentStyle}>
            <h3>{data.title}</h3>
            <p style={annotationStyle}>
              {data.startDate} - {data.endDate} · {data.duration},{" "}
              {data.location}
            </p>
          </div>
        </div>
        <Mission data={data.description} />
      </>
    );
  };

  interface MissionProps {
    data: MissionData;
  }
  const Mission = ({ data }: MissionProps) => {
    const annotationStyle = {
      color: "grey",
      fontSize: "3.2mm",
    };
    return (
      <div>
        <p>{data.summary}</p>
        <ul>
          {data.tasks.map((task) => (
            <li key={Math.random()}>{task}</li>
          ))}
        </ul>
        {data.projects &&
          data.projects.map((project) => (
            <Project key={Math.random()} data={project} />
          ))}
        <p style={annotationStyle}>{data.stack}</p>
      </div>
    );
  };

  interface ProjectProps {
    data: ProjectData;
  }
  const Project = ({ data }: ProjectProps) => {
    return (
      <>
        <p>{data.summary}</p>
        <ul>
          {data.tasks.map((task) => (
            <li key={Math.random()}>{task}</li>
          ))}
        </ul>
      </>
    );
  };

  interface EducationProps {
    data: EducationData;
  }
  const Education = ({ data }: EducationProps) => {
    const annotationStyle = {
      color: "grey",
      fontSize: "3.2mm",
    };
    return (
      <div>
        <h3>{data.title}</h3>
        <p style={annotationStyle}>
          {data.startYear} - {data.endYear}, {data.institution}
        </p>
      </div>
    );
  };

  interface ContactDetailsProps {
    data: ContactDetailsData;
  }
  const ContactDetails = ({ data }: ContactDetailsProps) => {
    const linkStyle: React.CSSProperties = {
      letterSpacing: "0.03mm",
      fontSize: "3.2mm",
    };
    const contactDetailsLine: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
    };
    return (
      <>
        <h2>Contact</h2>
        <div style={contactDetailsLine}>
          <MailIcon />
          <p style={linkStyle}>{process.env.MY_MAIL_ADDRESS}</p>
        </div>
        <div style={contactDetailsLine}>
          <CallIcon />
          <p>{process.env.MY_PHONE_NUMBER}</p>
        </div>
        <div style={contactDetailsLine}>
          <LocationIcon />
          <p>{data.city}</p>
        </div>
        <div style={contactDetailsLine}>
          <CakeIcon />
          <p>{data.age}</p>
        </div>
        <div style={contactDetailsLine}>
          <CarIcon />
          <p>{data.driverLicense}</p>
        </div>
        <br />
        <br />
        <div style={contactDetailsLine}>
          <LinkedinIcon />
          <p style={linkStyle}>{data.linkedin}</p>
        </div>
        <div style={contactDetailsLine}>
          <GithubIcon />
          <p style={linkStyle}>{data.github}</p>
        </div>
      </>
    );
  };

  const Body = ({ children }: PropsWithChildren) => {
    const globalStyle = {
      fontFamily: "sans-serif",
    };
    return <div style={globalStyle}>{children}</div>;
  };

  interface SectionTitleProps {
    title: string;
    color: string;
    width: string;
  }
  const SectionTitle = ({ title, color, width }: SectionTitleProps) => {
    const textStyle: React.CSSProperties = {
      marginTop: "4mm",
      marginBottom: "-2.8mm",
      fontFamily: "sans",
      letterSpacing: "0.5mm",
    };
    const underlineStyle: React.CSSProperties = {
      width: `${width}`,
      height: "3mm",
      marginLeft: "-2mm",
      borderRadius: "3px",
      backgroundColor: `${color}`,
    };
    return (
      <>
        <h2 style={textStyle}>
          <span>{title}</span>
        </h2>
        <div style={underlineStyle} />
      </>
    );
  };

  const firstPageContent = ReactDOMServer.renderToString(
    <html>
      <body className="margin-0 padding-0">
        <style>
          {`
          @page { size: A4 portrait; margin: 0cm; }
          @page :first {margin-bottom: 0;}
          .margin-0 {margin: 0}
          .padding-0 {padding: 0}
          h1,h2,h3,p,ul,li{margin:0}
          h1{font-size:12mm;letter-spacing:0}
          h2{font-size:6mm;margin-top:4.2mm;font-weight:400;letter-spacing:0.5mm}
          h3{font-size:4mm;font-weight:400;letter-spacing:0.3mm}
          p,li{font-size:3.5mm;letter-spacing:0.12mm;text-align:justify;line-height:4mm;}
          p{margin-top:0.5mm;margin-bottom:0.5mm;}
          
          .breakPage{page-break-before: always;}
          .secondPageMargin{height:2mm}
          .leftColumn{margin-top:12mm;padding-right:4mm;padding-left:4mm;color: white;}
          .leftColumn h2{width:75%;margin-top:10mm;margin-right:auto;margin-left:auto;margin-bottom:6mm;padding-bottom:2mm;padding-left:3mm;border-bottom:0.2mm solid white;}
          .leftColumn p{margin-top:2mm;margin-bottom:2mm;padding-left:1mm;letter-spacing:0.2mm;}
          `}
        </style>
        <Body>
          <LeftColumn>
            <ProfilePic imageData={profilePictureImageData} />
            <div className="leftColumn">
              <ContactDetails data={resumeData.contactDetails} />
              <h2>Langues</h2>
              {resumeData.languages.map((language) => (
                <p key={Math.random()}>{language}</p>
              ))}
              <h2>En bref</h2>
              {resumeData.brief.map((word) => (
                <p key={Math.random()}>{word}</p>
              ))}
            </div>
          </LeftColumn>
          <RightColumn>
            <Name
              firstName={resumeData.contactDetails.firstName}
              lastName={resumeData.contactDetails.lastName}
            />
            <SectionTitle
              title="A propos de moi"
              color="#FEB885"
              width="57mm"
            />
            <p>{resumeData.introduction}</p>
            <SectionTitle title="Expériences" color="#BDE411" width="42mm" />
            {experiencesOnFirstPage.map((experience) => (
              <Experience key={Math.random()} data={experience} />
            ))}
            <div className="breakPage" />
            <div className="secondPageMargin" />
            {experiencesOnSecondPage.map((experience) => (
              <Experience key={Math.random()} data={experience} />
            ))}
            <SectionTitle title="Bénévolat" color="#02F25E" width="36mm" />
            {resumeData.volunteering.map((experience) => (
              <Experience key={Math.random()} data={experience} />
            ))}
            <SectionTitle title="Formation" color="#85D4FF" width="37mm" />
            {resumeData.education.map((education) => (
              <Education key={Math.random()} data={education} />
            ))}
          </RightColumn>
        </Body>
      </body>
    </html>
  );

  await page.setContent(firstPageContent);
  await page.waitForSelector("img");
  const pdf = await page.pdf({
    format: "a4",
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();

  // Serve the PDF document as a response
  // res.setHeader("Content-Type", "text/html");
  // res.send(html);
  res.setHeader("Content-Type", "application/pdf");
  res.send(pdf);
}
