import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, G } from "react-native-svg";

const AnimatedG = Animated.createAnimatedComponent(G);

export default function LoadingSpinner({
  size = 24,
  color = "#000",
  duration = 750,
}) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration,
        easing: Easing.linear,
      }),
      -1,
    );
  }, [duration]);

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: 12 },
      { translateY: 12 },
      { rotate: `${rotation.value}deg` },
      { translateX: -12 },
      { translateY: -12 },
    ],
  }));

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {/* Background circle */}
      <Circle
        cx="12"
        cy="12"
        r="10"
        stroke={color}
        strokeWidth="3"
        fill="none"
        opacity={0.25}
      />

      {/* Animated spinner */}
      <AnimatedG animatedProps={animatedProps}>
        <Circle
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={[Math.PI * 20 * 0.75, Math.PI * 20 * 0.25]}
          strokeLinecap="round"
          fill="none"
        />
      </AnimatedG>
    </Svg>
  );
}
