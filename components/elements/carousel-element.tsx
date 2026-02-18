import React, { ReactNode, useState } from "react";
import { Dimensions, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

interface SlideCarouselProps {
  slides: ReactNode[]; // each slide can be anything: image, text, etc.
  height?: number;
}

export const CarouselElement: React.FC<SlideCarouselProps> = ({
  slides,
  height = 250,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const screenWidth = Dimensions.get("window").width;

  return (
    <View className="items-center">
      <Carousel
        width={screenWidth * 0.85}
        height={height}
        data={slides}
        loop={false}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <View className="w-full h-full overflow-hidden rounded-xl">
            {item}
          </View>
        )}
      />

      {/* Dots */}
      <View className="flex-row mt-4 gap-x-2">
        {slides.map((_, index) => {
          // Shared value for animation
          const width = useSharedValue(index === activeIndex ? 16 : 8);

          // Animate width when activeIndex changes
          width.value = withTiming(index === activeIndex ? 16 : 8, {
            duration: 250,
          });

          const animatedStyle = useAnimatedStyle(() => ({
            width: width.value,
          }));

          return (
            <Animated.View
              key={index}
              className={`h-2 rounded-full ${index === activeIndex ? "bg-blue-600" : "bg-gray-300"}`}
              style={animatedStyle}
            />
          );
        })}
      </View>
    </View>
  );
};
