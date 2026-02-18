import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { AuthUser, useAuthStore } from "@/helpers/store/auth-store";
import { getToken } from "@/utils/storage";

import LoadingSpinner from "@/assets/svg/loading-spinner-svg";

export default function AuthGateProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const { setUser } = useAuthStore();

  useEffect(() => {
    const init = async () => {
      try {
        // check auth
        const token = await getToken();

        if (token) {
          const user: AuthUser = { token };
          setUser(user);
          router.replace("/(tabs)/home");
        } else {
          router.replace("/(auth)/login");
        }
      } catch (e) {
        console.error(e);
        router.replace("/(auth)/login");
      } finally {
        setReady(false);
      }
    };

    init();
  }, []);

  if (!ready) {
    return (
      <View className="flex-1 justify-center items-center">
        <View className="flex flex-row items-center gap-x-2 ">
          <LoadingSpinner />
          <Text className="font-creg text-lg">Authentication</Text>
        </View>
      </View>
    );
  }

  return <>{children}</>;
}
