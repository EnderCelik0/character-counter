import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useSentenceStore } from "@/context/sentence-store";
import { InfoIcon } from "lucide-react";

export default function UserTextArea() {
  const [includeLimit, setIncludeLimit] = useState<boolean>(false);

  const sentence = useSentenceStore((state) => state.sentence);
  const updateSentence = useSentenceStore((state) => state.updateSentence);

  const characterLimit = useSentenceStore((state) => state.characterLimit);
  const updateCharacterLimit = useSentenceStore(
    (state) => state.updateCharacterLimit,
  );

  const updateIncludeSpaces = useSentenceStore(
    (state) => state.updateIncludeSpaces,
  );

  const averageWordsPerMinute = 200;

  const totalWords = sentence.split(" ").length;

  const includeSpaces = useSentenceStore((state) => state.includeSpaces);

  const totalChars = includeSpaces
    ? sentence.split("").length
    : sentence.replace(/\s/g, "").length;

  const readingTime = Math.round(totalWords / averageWordsPerMinute);

  const isExceededLimit = characterLimit && totalChars > characterLimit;

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-[10px]">
        <Textarea
          onChange={(e) => updateSentence(e.target.value)}
          placeholder="Start typing here... (or paste your text)"
          className="border-neutral-70 border-2"
          maxLength={includeLimit && characterLimit ? characterLimit : 3000}
        />
        {isExceededLimit && characterLimit && includeLimit ? (
          <div className="flex gap-2 text-orange-500">
            <InfoIcon width={16} />
            <span>
              Limit reached! Your text exceeds {characterLimit} characters.
            </span>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex">
        <div className="flex w-full flex-col gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="exclude-spaces"
              className="transition-all duration-200"
              onCheckedChange={(value) => updateIncludeSpaces(!value)}
            />
            <label
              htmlFor="exclude-spaces"
              className="text-sm leading-none font-medium transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Exclude Spaces
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="set-limit"
              className="transition-all duration-200"
              onCheckedChange={(value) => {
                setIncludeLimit(value);
              }}
            />
            <label
              htmlFor="set-limit"
              className="text-sm leading-none font-medium transition-all peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Set Character Limit
            </label>
          </div>
          {includeLimit && (
            <Input onChange={(e) => updateCharacterLimit(e.target.value)} />
          )}
          <span className="text-sm md:ml-auto">
            Approx. reading time:{" <"} {readingTime} minute
          </span>
        </div>
      </div>
    </section>
  );
}
