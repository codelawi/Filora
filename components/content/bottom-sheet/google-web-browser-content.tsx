import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { WebView } from "react-native-webview";

export default function GoogleWebBrowserContent() {
  const customUserAgent =
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  return (
    <View style={styles.container}>
      <WebView
        source={{
          uri: "https://accounts.google.com/o/oauth2/auth?client_id=905892007083-0ffb6vp465araugl32g3l8amrb7oji7n.apps.googleusercontent.com&redirect_uri=http%3A%2F%2F127.0.0.1%3A8000%2Fauth%2Fgoogle%2Fcallback&scope=openid+profile+email&response_type=code&state=F7KX7mZXLg2CydqyBx9EFIfWcoEPIYD7lQg9yg93",
        }}
        userAgent={customUserAgent}
        startInLoadingState={true}
        style={styles.webview}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#4285F4" />
          </View>
        )}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error("WebView error: ", nativeEvent);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // This is crucial - takes full screen
    width: "100%",
    height: "100%",
  },
  webview: {
    flex: 1,
    backgroundColor: "transparent", // Changed from red to transparent
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
