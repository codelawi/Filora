import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

interface buttonElementProps extends PressableProps {
  text: string;
}

export default function ButtonElement({
  text,
  ...btnProps
}: buttonElementProps) {
  return (
    <Pressable
      className="bg-[#0076b614] p-3 rounded-lg flex justify-center flex-row border-[#0077b6] border-[.5px]"
      {...btnProps}
    >
      <Text className="text-[#0077b6]">{text}</Text>
    </Pressable>
  );
}
