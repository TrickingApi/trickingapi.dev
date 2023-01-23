import Head from 'next/head'
// @ts-ignore
import { Inter } from '@next/font/google'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import ApiExplorer from '../components/ApiExplorer/ApiExplorer'
import { useEffect, useState } from 'react'
import { Trick } from 'tricking-ts';
import { BASE_API_URL } from '../utils/constants'
import TrickBlock from '../components/TrickBlock'
import Collapsible from '../components/Collapsible/Collapsible'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [tricks, setTricks] = useState<Trick[]>([]);

  const fetchTricks = () => {
    fetch(`${BASE_API_URL}/tricks`)
      .then((res: Response) => {
        if (res.status === 200) {
          return res.json();
        }
      }).then((data: Map<string, Trick>) => {
        console.log(typeof data);
        console.log(data);
        const results: Trick[] = [];
        Object.entries(data).forEach((value: [key: string, trick: Trick]) => {
          results.push(value[1]);
        });
        setTricks(results);
      });
  }

  useEffect(() => {
    fetchTricks();
  }, []);

  const getTrickBlocks = () => tricks.map((trick) => {
    return (
      <Collapsible key={trick.id} title={trick.name}>
        <TrickBlock trick={trick}/>
      </Collapsible>
    );
  });

  return (
    <>
      <Head>
        <title>TrickingApi Documentation</title>
        <meta name="description" content="Tricking Api Documentation: written with next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
        {
          tricks.length > 0
          && <section>
              <div className={styles.center}>
                <div className={styles.tricks}>
                  <h2 className={inter.className}>Current Tricks</h2>
                  <br/>
                  {getTrickBlocks()}
                </div>
              </div>
            </section>
        }
      </main>
    </>
  )
}
