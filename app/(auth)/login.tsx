import GoogleIcon from "@/assets/svg/google-icon";
import TypeElement from "@/components/elements/type-element";
import { Button } from "@/components/ui/button";
import { Image } from "expo-image";
import { Info, User } from "lucide-react-native";
import React from "react";
import { Text, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";

import InfoTextContent from "@/components/content/bottom-sheet/info-text-content";
import { useBottomSheet } from "@/providers/bottom-sheet-provider";

import EmailSignInContent from "@/components/content/bottom-sheet/email-signin-content";
import useApi from "@/hooks/use-api";
import { toast } from "sonner-native";

interface GetGoogleUrl {
  data: {
    url: string;
  };
  success: boolean;
}

export default function login() {
  const api = useApi();

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

  const openWebBrowser = async () => {
    toast.info("Sorry!.", {
      description:
        "While developing this app we faced a lot of problems while trying to develop that users can easly sign in with google but the Expo requires too many things so for not losing time we will pass it.",
      duration: 10000,
    });
  };

  const openEmailSheet = () => {
    openSheet({
      snapPoints: ["60%", "100%"],
      content: <EmailSignInContent />,
    });
  };

  return (
    <View className="p-4 flex-1">
      <Animated.View
        entering={FadeInDown.delay(500)}
        className="flex flex-row items-center justify-between"
      >
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
      </Animated.View>
      <Animated.View
        entering={FadeInDown.delay(800)}
        className="flex-1 flex justify-center items-center"
      >
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
      </Animated.View>
      <Animated.View entering={FadeInDown.delay(1000)} className="gap-y-2">
        <Button
          variant={"outline"}
          className="gap-x-2"
          onPressIn={openWebBrowser}
        >
          <GoogleIcon size={21} />
          <Text className="font-creg">Continue with google</Text>
        </Button>
        <Button
          className="gap-x-2 bg-blue active:bg-blue/80"
          onPressIn={openEmailSheet}
        >
          <User size={21} color={"white"} />
          <Text className="font-creg text-white">Continue with email</Text>
        </Button>
      </Animated.View>
    </View>
  );
}
