import { useSentenceStore } from "@/context/sentence-store";
import totalCharacterImage from "../../assets/pattern-character-count.svg";
import sentenceCountImage from "../../assets/pattern-sentence-count.svg";
import wordCountImage from "../../assets/pattern-word-count.svg";

import { motion, AnimatePresence } from "framer-motion";

export default function CountCards() {
  const sentence = useSentenceStore((state) => state.sentence);
  const includeSpaces = useSentenceStore((state) => state.includeSpaces);

  const totalChars = includeSpaces
    ? sentence.split("").length
    : sentence.replace(/\s/g, "").length;

  const totalWords = sentence === "" ? 0 : sentence.trim().split(/\s/g).length;
  const totalSentences = sentence === "" ? 0 : sentence.split(". ").length;

  const countsCards = [
    {
      countName: "Total Characters",
      bg: "bg-purple-400",
      bgImage: totalCharacterImage,
      value: totalChars,
    },
    {
      countName: "Word Count",
      bg: "bg-yellow-500",
      bgImage: wordCountImage,
      value: totalWords,
    },
    {
      countName: "Sentence Count",
      bg: "bg-orange-500",
      bgImage: sentenceCountImage,
      value: totalSentences,
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {countsCards.map((countCard) => (
        <CountCard
          bg={countCard.bg}
          bgImage={countCard.bgImage}
          cardName={countCard.countName}
          value={countCard.value}
        />
      ))}
    </section>
  );
}

type CountCardProps = {
  bg: string;
  bgImage: string;
  cardName: string;
  value: number;
};

function CountCard({ bg, bgImage, cardName, value }: CountCardProps) {
  const sentence = useSentenceStore((state) => state.sentence);

  return (
    sentence && (
      <AnimatePresence key={bgImage}>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ scale: 0 }}
          className={`flex items-center ${bg} radius-12 relative min-h-[150px] origin-left overflow-hidden p-4`}
        >
          <img
            src={bgImage}
            alt="card svg image"
            className="absolute top-0 -right-7"
          />
          <div className="z-10- flex flex-col">
            <span className="text-preset-1 z-10 text-neutral-900">{value}</span>
            <span className="text-preset-3 z-10 text-neutral-900">
              {cardName}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>
    )
  );
}
