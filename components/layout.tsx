import Head from "next/head";
import Link from "next/link";
import utilStyles from "../styles/utils.module.css";
import Header from "./header";
import styles from "./layout.module.css";

const name = "takamatsu";
export const siteTitle = "Next.js Sample website";

type LayoutProps = {
  children?: React.ReactNode;
  home?: boolean;
};

const Layout = ({ children, home }: LayoutProps) => {
  return (
    <>
      <Header>
        <Head>
          <link rel="icon" href="favicon.ico" />
          <meta name="description" content="Learn how to build a personal website using Next.js" />
          <meta
            property="og:image"
            content={`https://og-image.now.sh/${encodeURI(
              siteTitle,
            )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
          />
          <meta name="og:title" content={siteTitle} />
          <meta name="twitter:card" content="summary_large_image" />
        </Head>
      </Header>
      <div className={styles.container}>
        <header className={styles.header}>
          {home && (
            <>
              <img
                src="/images/profile.jpg"
                className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
                alt={name}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          )}
        </header>
        <main>{children}</main>
        {!home && (
          <div className={styles.backToHome}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
