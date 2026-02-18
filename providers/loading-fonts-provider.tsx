import * as Font from "expo-font";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { toast } from "sonner-native";

export default function LoadingFontsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          cRegular: require("@/assets/fonts/c-regular.ttf"),
          cBold: require("@/assets/fonts/c-bold.ttf"),
          cLight: require("@/assets/fonts/c-light.ttf"),
          cMedium: require("@/assets/fonts/c-medium.ttf"),
          cSemibold: require("@/assets/fonts/c-semibold.ttf"),
          titleFont: require("@/assets/fonts/title-font.ttf"),
        });
        setFontLoaded(true);
      } catch (e) {
        toast.error("Error loading UI fonts.");
        console.log(e);
        setFontLoaded(false);
      }
    };
    loadFonts();
  }, []);

  if (!fontLoaded) {
    return (
      <View>
        <Text>Font loading ...</Text>
      </View>
    );
  }

  return <>{children}</>;
}
