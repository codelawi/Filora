import GoogleIcon from "@/assets/svg/google-icon";
import TypeElement from "@/components/elements/type-element";
import { Button } from "@/components/ui/button";
import { Image } from "expo-image";
import { Info } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import InfoTextContent from "@/components/content/bottom-sheet/info-text-content";
import { useBottomSheet } from "@/providers/bottom-sheet-provider";

export default function login() {
  const sentences = [
    "Welcome to Filora.",
    "Discover amazing features!",
    "Upload your local files.",
    "Manage your files!",
    "Let's get started!",
  ];

  const { openSheet } = useBottomSheet();

  const openInfoSheet = () => {
    openSheet({
      snapPoints: ["70%"],
      content: <InfoTextContent />,
    });
  };
  return (
    <View className="p-4 flex-1">
      <View className="flex flex-row items-center justify-between">
        <Image
          cachePolicy={"disk"}
          source={require("@/assets/images/filora-logo-screen.png")}
          style={{
            width: 120,
            height: 120,
          }}
        />
        <Button variant={"ghost"} onPressIn={openInfoSheet}>
          <Info />
        </Button>
      </View>
      <View className="flex-1 flex justify-center items-center">
        <TypeElement
          sentences={sentences}
          speed={50}
          delayBetweenSentences={700}
          loop={true} // <-- enable looping
          textStyle={{
            fontSize: 28,
            fontFamily: "titleFont",
            color: "#1E293B",
          }}
        />
      </View>
      <Animated.View entering={FadeInDown.delay(300)}>
        <Button variant={"outline"} className="gap-x-2">
          <GoogleIcon size={21} />
          <Text className="font-creg">Continue with google</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
