import LoadingSpinner from "@/assets/svg/loading-spinner-svg";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function Index() {
  const router = useRouter();
  const logoSource = require("@/assets/images/filora-logo-screen.png");

  const welcomeWords = ["Setting app for you", "Setting Fonts", "Welcome"];

  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prevIndex) => {
        if (prevIndex < welcomeWords.length - 1) {
          return prevIndex + 1;
        } else {
          // When we reach the last word, clear interval and redirect
          clearInterval(interval);
          setTimeout(() => {
            router.replace("/(tabs)/home");
          }, 500); // Small delay to show the last word
          return prevIndex;
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className="flex-1 items-center">
      <View className="flex-1 justify-center items-center">
        <Animated.View entering={FadeInUp.delay(300)}>
          <Image
            source={logoSource}
            cachePolicy={"disk"}
            style={{
              width: 180,
              height: 180,
            }}
          />
        </Animated.View>
      </View>
      <Animated.View
        entering={FadeInUp.delay(600)}
        className="flex flex-row items-center gap-x-2 pb-10"
      >
        <LoadingSpinner size={19} />
        <Text className="font-csemibold text-md">
          {welcomeWords[wordIndex]}
        </Text>
      </Animated.View>
    </View>
  );
}
