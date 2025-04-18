import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { Trick, TricksClient } from "@trickingapi/tricking-ts";

import styles from "../styles/Randomizer.module.scss";
import { getRandomDraculaColor } from "../utils";

const inter = Inter({ subsets: ["latin"] });

export default function Randomizer() {
  const [isLoading, setIsLoading] = useState(false);
  const [tricksById, setTricksById] = useState<{ [id: string]: Trick }>({});
  const [currentTrick, setCurrentTrick] = useState<Trick | undefined>(
    undefined
  );

  useEffect(() => {
    const tricksClient = new TricksClient();
    setIsLoading(true);
    tricksClient.getAllTricks().then((tricks) => {
      setIsLoading(false);
      const trickNames: string[] = [];
      const tricksById: { [id: string]: Trick } = {};
      for (const [key, value] of Object.entries(tricks)) {
        tricksById[key] = value;
        trickNames.push(value.name);
      }
      setTricksById(tricksById);
    });
  }, []);

  const getRandomTrick = () => {
    const idx = Math.floor(Math.random() * Object.keys(tricksById).length);
    const trick = tricksById[Object.keys(tricksById)[idx]];
    setCurrentTrick(trick);
  };

  const hasAliases = (aliases?: string | string[]) => {
    if (!aliases) {
      return false;
    }
    if (Array.isArray(aliases)) {
      if (aliases.length === 0) {
        return false;
      }
    }
    return true;
  };

  const formatAliases = (aliases: string | string[]) => {
    if (Array.isArray(aliases) && aliases.length > 0) {
      return aliases.join(", ");
    }
    return aliases;
  };

  return (
    <>
      <Head>
        <title>Trick Randomizer</title>
        <meta name="description" content="Click for a random trick!" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image
          src="/trickingAPILogo.png"
          width="128"
          height="128"
          alt={"Tricking API Logo"}
          priority
        />
        <div className={styles.center}>
          <h1 className={inter.className}>Trick Randomizer</h1>
        </div>
        {isLoading && (
          <div className={styles.loading}>
            <p className={inter.className}>Loading Tricks...</p>
          </div>
        )}
        {!isLoading && (
          <div className={styles.tricksRandomizer}>
            <button onClick={() => getRandomTrick()}>Random Trick</button>
            {currentTrick && (
              <div className={styles.trickBlock}>
                <h2
                  className={inter.className}
                  style={{ color: getRandomDraculaColor() }}
                >
                  {currentTrick.name}
                </h2>
                {hasAliases(currentTrick.aliases) && (
                  <div className={styles.aliases}>
                    <span className={inter.className}>
                      <strong>Aliases:</strong>{" "}
                      {formatAliases(currentTrick.aliases)}
                    </span>
                  </div>
                )}
                <p className={inter.className}>{currentTrick.description}</p>
              </div>
            )}
          </div>
        )}
      </main>
    </>
  );
}
