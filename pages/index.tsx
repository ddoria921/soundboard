import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Howl, Howler, HowlOptions } from "howler";
import { useEffect, useState } from "react";

const kanyeSprite: HowlOptions["sprite"] = {
  UH: [0, 400],
  HUH: [3220, 580],
  "HYAHH!": [3810, 500],
  "UH-UH-HAAW": [4320, 880],
  "DU-DUH-DAH": [5200, 680],
  "HEH!": [6600, 450],
  "HAAH!": [7050, 679],
  "UH!!": [7730, 610],
  Ooooooo: [8340, 810],
  "(deep-breath)": [9150, 750],
  "AAAAAAAAAA-OOOWWW!": [9890, 1740],
  "OOOO!": [12680, 650],
  WHAAAAAA: [13330, 690],
  "DOO DOO": [14771, 1125],
  "HWUAH!": [15896, 444],
  AHHHHHH: [18280, 700],
  MASANOONAA: [19478, 1282],
  YEHHHOOOON: [20760, 1178],
  "AHH-HA-HA-HA-HAA": [21940, 1500],
  OOOoooWAAa: [23440, 790],
  "AH DA DAH DAHR RAH": [24220, 1760],
  EESCRONG: [27960, 810],
  "RYAHH!": [28770, 630],
  "HRHEH!": [29740, 560],
  "WOO!": [30308, 472],
  "OCKIT OGUT SIGIT YEEH": [30780, 1820],
  AAAAHHHHHH: [33208, 786],
  "EEYAAH EEYAAH!": [33994, 876],
  NAHHHHHHHHHHH: [34870, 1674],
  MAHHHHHHHHHHH: [36544, 2936],
  "HEH HUH? UH": [49840, 1660],
  "HEH?! WUTCHOO WHUP!": [52960, 2200],
  "WAANA  NUNA WUNA ???": [55160, 2470],
  "HOOTINANINNO EY-HAY HAAY": [57630, 2810],
  rambling: [65600, 3900],
  laughing: [69500, 1250],
};

const kanye = new Howl({
  src: ["/all-kanye-sounds.mp3"],
  sprite: kanyeSprite,
});

const COLOR_PALETTE = {
  red: {
    background: "from-red-700 via-red-600 to-red-700",
    foreground: "bg-red-500",
  },
  yellow: {
    background: "from-yellow-700 via-yellow-600 to-yellow-700",
    foreground: "bg-yellow-500",
  },
  green: {
    background: "from-green-700 via-green-600 to-green-700",
    foreground: "bg-green-500",
  },
  blue: {
    background: "from-blue-700 via-blue-600 to-blue-700",
    foreground: "bg-blue-500",
  },
  purple: {
    background: "from-purple-700 via-purple-600 to-purple-700",
    foreground: "bg-purple-500",
  },
  pink: {
    background: "from-pink-700 via-pink-600 to-pink-700",
    foreground: "bg-pink-500",
  },
};

const Home: NextPage = () => {
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    kanye.on("load", () => {
      setHasLoaded(true);
    });

    return () => {
      kanye.off("load");
    };
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Kanye Soundboard</title>
        <meta name="description" content="Play back Kanye ad libs." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="grid grid-cols-2 gap-4 w-11/12 mx-auto sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {Object.keys(kanyeSprite).map((label, index) => (
            <div className="flex justify-center align-middle" key={label}>
              <SoundPad
                key={label}
                disabled={hasLoaded !== true}
                label={label}
                color={
                  Object.keys(COLOR_PALETTE)[
                    index % Object.keys(COLOR_PALETTE).length
                  ] as SoundPadColor
                }
                onClick={() => {
                  kanye.play(label);
                }}
              />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

type SoundPadColor = keyof typeof COLOR_PALETTE;
type SoundPadProps = {
  color?: SoundPadColor;
  disabled?: boolean;
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

function SoundPad({
  color = "red",
  disabled = false,
  label,
  onClick,
}: SoundPadProps) {
  return (
    <>
      <button className={styles.pushable} disabled={disabled} onClick={onClick}>
        <span className={styles.shadow}></span>
        <span
          className={`${styles.edge} bg-gradient-to-l from-${color}-700 via-${color}-600 to-${color}-700`}
        ></span>
        <span className={`${styles.front} ${COLOR_PALETTE[color].foreground}`}>
          <span className="px-4 break-all">{label}</span>
        </span>
      </button>
    </>
  );
}

export default Home;
