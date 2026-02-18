import { Image } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
export default function InfoTextContent() {
  return (
    <View>
      <Image
        cachePolicy={"disk"}
        source={require("@/assets/images/filora-logo-screen.png")}
        style={{
          width: 120,
          height: 120,
        }}
      />
      <Text className="font-creg text-lg p-4">
        <Text className="font-title text-blue">Filora</Text> is an open source
        files manager , which provide you to upload your local photos, videos,
        files for free. and the{" "}
        <Text className="font-title text-blue">Filora</Text> storage is
        unlimited and free.
      </Text>
      <Text className="font-creg text-lg mt-6 p-4">
        you need first to authenticate with{" "}
        <Text className="text-destructive font-title">Google account</Text>, in
        condition to be personal becuase all your cloud data will be connected
        with it so stay alert.
      </Text>
      <Text className="font-title text-blue text-center mt-4">
        created by m3ath (codelawi)
      </Text>
    </View>
  );
}
