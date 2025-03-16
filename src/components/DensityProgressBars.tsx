import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useSentenceStore } from "@/context/sentence-store";

// Karakter frekansı için tip tanımlaması
interface CharFrequency {
  count: number;
  percentage: number;
}

// Sıralanmış yoğunluk haritası için tip tanımlaması
interface LetterDensity {
  letter: string;
  letterCount: number;
  percentage: number;
}

export default function DensityProgressBars() {
  const [seeMore, setSeeMore] = useState(false);
  const [letterDensities, setLetterDensities] = useState<
    Record<string, CharFrequency>
  >({});

  const sentence = useSentenceStore((state) => state.sentence);

  const totalChars = sentence.replace(/[\s\p{P}]/gu, "").length;

  function handleSeeMore() {
    setSeeMore((prev) => !prev);
  }

  useEffect(() => {
    function countLetterFrequency(sentence: string) {
      // Boşlukları kaldır
      const cleanSentence = sentence.replace(/[\s\p{P}]/gu, "");

      const charFrequency: Record<string, CharFrequency> = {};

      for (const char of cleanSentence) {
        if (charFrequency[char]) {
          charFrequency[char].count++;
        } else {
          charFrequency[char] = {
            count: 1,
            percentage: 0, // Başlangıç değeri, sonra hesaplanacak
          };
        }
      }

      // Yüzdeleri hesapla
      for (const char in charFrequency) {
        // Yüzde hesabı: (karakterSayısı / toplamKarakterSayısı) * 100
        const percentage = (charFrequency[char].count / totalChars) * 100;

        // İki ondalık basamağa yuvarla
        charFrequency[char].percentage = parseFloat(percentage.toFixed(2));
      }

      setLetterDensities(charFrequency);
    }

    countLetterFrequency(sentence);
  }, [sentence]);

  const sortedDensityMap: LetterDensity[] = Object.entries(letterDensities)
    .sort((a, b) => b[1].percentage - a[1].percentage)
    .map(([char, data]) => ({
      letter: char,
      letterCount: data.count,
      percentage: data.percentage,
    }));

  return (
    <section className="flex flex-col gap-5">
      {sentence ? (
        <>
          <h3 className="text-preset-2">Letter Density</h3>
          <motion.ul
            initial={{ height: "152px" }}
            animate={{ height: seeMore ? "auto" : "152px" }}
            className="flex min-h-[152px] flex-col gap-3 overflow-hidden"
          >
            {sortedDensityMap.map((letter) => (
              <li key={letter.letter}>
                <ProgressBar
                  letter={letter.letter}
                  letterCount={letter.letterCount}
                  percentage={letter.percentage}
                />
              </li>
            ))}
          </motion.ul>
          <div
            onClick={handleSeeMore}
            className="text-preset-3 flex cursor-pointer items-center gap-1"
          >
            See {seeMore ? "Less" : "More"}
            <motion.span>
              {seeMore ? <ChevronUp /> : <ChevronDown />}
            </motion.span>
          </div>
        </>
      ) : (
        ""
      )}
    </section>
  );
}

type ProgressBarProps = {
  letter: string;
  letterCount: number;
  percentage: number;
};

function ProgressBar({ letter, letterCount, percentage }: ProgressBarProps) {
  const progress = {
    width: `${percentage}%`,
  };

  return (
    <motion.div
      initial={{ scaleX: 0, filter: "blur(5px)" }}
      animate={{ scaleX: 1, filter: "blur(0)" }}
      transition={{ duration: 0.5 }}
      className="text-preset-4 flex origin-left items-center gap-[14px]"
    >
      <div>{letter.toUpperCase()}</div>

      {/* PROGRESS BAR CONTAINER */}
      <span className="h-3 w-full rounded-full bg-neutral-100 dark:bg-neutral-800">
        {/* PROGRESS  */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          style={progress}
          className="h-3 rounded-full bg-gradient-to-r from-purple-300 to-purple-400"
        ></motion.div>
      </span>
      <span className="flex gap-1 text-right">
        <span>{letterCount}</span>
        <span>({percentage}%)</span>
      </span>
    </motion.div>
  );
}
