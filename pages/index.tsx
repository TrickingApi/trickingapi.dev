import Head from 'next/head';
import Image from 'next/image';
// @ts-ignore
import { Inter } from '@next/font/google';
import Link from 'next/link';
import styles from '../styles/Home.module.scss';
import ApiExplorer from '../components/ApiExplorer/ApiExplorer';
import TrickBlock from '../components/TrickBlock';
import Collapsible from '../components/Collapsible/Collapsible';
import * as Tricks from '@trickingapi/tricks-core-data/tricks';
import { TricksClient } from '@trickingapi/tricking-ts';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCode, faEllipsis } from '@fortawesome/free-solid-svg-icons';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [tricksCount, setTricksCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const trickBlocks = Object.entries(Tricks).map(([, trick]) => {
    return (
      <Collapsible key={trick.id} title={trick.name}>
        <TrickBlock trick={trick}/>
      </Collapsible>
    );
  });

  useEffect(() => {
    const client = new TricksClient();
    client.getAllTrickNames().then((trickNames) => {
      setTricksCount(Object.entries(trickNames).length);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Head>
        <title>TrickingApi Documentation</title>
        <meta name="description" content="Tricking Api Documentation: written with next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
      <Image src='/trickingAPILogo.png' width='128' height='128' alt={'Tricking API Logo'} priority/>
        <div className={styles.center}>
          <h1 className={inter.className}>Tricking API</h1>
          <div className={styles.thirteen}>
            <h2 className={inter.className}>v0.1</h2>
          </div>
          <br/>
        </div>
        <div className={styles.center}>
          <p className={inter.className}>In pursuit of a complete database of tricks.</p>
        </div>
        <div className={styles.center}>
          <h3 className={inter.className}>A lightweight consumption-only REST API for the <a href='https://en.wikipedia.org/wiki/Tricking_(martial_arts)'>Tricking</a> vocabulary.</h3>
        </div>
        <div className={styles.center}>
          <p className={inter.className}>
            Now serving <span className={styles.bold}>{loading ? <FontAwesomeIcon icon={faEllipsis} pulse/> : tricksCount}</span> tricks.
          </p>
        </div>
        <div className={styles.center}>
          <p className={inter.className}>
            We&apos;re still in the early phases of development so data is sparse. Feel free to join the discord to stay up-to-date on releases and how to contribute to the database!
          </p>
        </div>
        <div className={styles.center}>
          <ApiExplorer/>
        </div>
        <div className={styles.grid}>
          <Link
            href="/docs"
            className={styles.card}
          >
            <h2 className={inter.className}>
              Docs <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Find in-depth information about TrickingAPI&apos;s features.
            </p>
          </Link>

          <a
            href="https://github.com/TrickingApi/trickingapi"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Contribute <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Contribute to the Tricking API Project!
            </p>
          </a>

          <a
            href="https://discord.gg/T588bdSVKU"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Community <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Join the TrickingAPI discord to ask questions, chat with contributors about the API, discuss issues, and propose features!
            </p>
          </a>
        </div>
        <section>
          <div className={styles.center}>
            <h2 className={inter.className}>Current Tricks</h2>
          </div>  
          <div className={styles.tricks}>
            {trickBlocks}
          </div>
        </section>
        <div className={`${styles.center} ${styles.footer}`}>
          <div>
            <a href='https://github.com/trickingapi/trickingapi.dev'>Edit this site <FontAwesomeIcon icon={faCode}/></a>
          </div>
          <div>
            <p className={inter.className}>  
              Made with ❤️ by <a href='mikaelmantis.com'>Mikael Mantis</a>
            </p>
          </div>
        </div>
      </main>
    </>
  )
}
