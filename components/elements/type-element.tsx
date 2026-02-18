import React, { useEffect, useState } from "react";
import { Text, TextStyle } from "react-native";

interface TypewriterTextProps {
  sentences: string[];
  speed?: number; // ms per letter
  textStyle?: TextStyle;
  delayBetweenSentences?: number; // ms delay before next sentence
  loop?: boolean; // whether to loop indefinitely
  onFinish?: () => void; // called after last sentence if loop=false
}

const TypeElement: React.FC<TypewriterTextProps> = ({
  sentences,
  speed = 50,
  textStyle,
  delayBetweenSentences = 500,
  loop = false,
  onFinish,
}) => {
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    if (sentences.length === 0) return;

    if (charIndex < sentences[currentSentenceIndex].length) {
      // Animate each letter
      const timeout = setTimeout(() => {
        setCurrentText(
          (prev) => prev + sentences[currentSentenceIndex][charIndex],
        );
        setCharIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timeout);
    } else {
      // Sentence finished → wait before next
      const timeout = setTimeout(() => {
        if (currentSentenceIndex + 1 < sentences.length) {
          setCurrentSentenceIndex((prev) => prev + 1);
          setCurrentText("");
          setCharIndex(0);
        } else {
          if (loop) {
            // restart from first sentence
            setCurrentSentenceIndex(0);
            setCurrentText("");
            setCharIndex(0);
          } else {
            onFinish?.();
          }
        }
      }, delayBetweenSentences);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, currentSentenceIndex, sentences, loop]);

  return <Text style={textStyle}>{currentText}</Text>;
};

export default TypeElement;
