import Head from 'next/head'
// @ts-ignore
import { Inter } from '@next/font/google'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>TrickingApi Documentation</title>
        <meta name="description" content="Tricking Api Documentation: written with next.js" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>
            Try it out by entering in your browser&nbsp;
            <code className={styles.code}>https://api.trickingapi.dev/tricks</code>
          </p>
        </div>
        <div className={styles.center}>
          <h1>Tricking API</h1>
          <div className={styles.thirteen}>
            <h2>v0.1</h2>
          </div>
          <br/>
        </div>
        <div className={styles.center}>
          <p className={inter.className}>
            We&apos;re still in the early phases of development so data is sparse. <br/>Feel free to join the discord to stay up-to-date on releases and how to contribute to the database!
          </p>
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
              Find in-depth information about TrickingAPI`&apos;`s features.
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
              Contribute to the Tricking API Projeect!
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
      </main>
    </>
  )
}
