import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, {
    createContext,
    ReactNode,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";

type OpenSheetProps = {
  snapPoints?: (string | number)[];
  content: ReactNode;
};

type BottomSheetContextType = {
  openSheet: (props: OpenSheetProps) => void;
  closeSheet: () => void;
};

const BottomSheetContext = createContext<BottomSheetContextType>({
  openSheet: () => {},
  closeSheet: () => {},
});

export const useBottomSheet = () => useContext(BottomSheetContext);

export const BottomSheetProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [sheetContent, setSheetContent] = useState<ReactNode>(null);
  const [snapPoints, setSnapPoints] = useState<(string | number)[]>([
    "25%",
    "50%",
  ]);
  const [visible, setVisible] = useState(true);
  const [currentSnap, setCurrentSnap] = useState(-1);

  const openSheet = useCallback(
    ({ content, snapPoints: points }: OpenSheetProps) => {
      if (points) setSnapPoints(points);
      setSheetContent(content);
      setVisible(true);
      bottomSheetRef.current?.snapToIndex(1);
    },
    [],
  );

  const closeSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setVisible(false);
  }, []);

  useEffect(() => {
    if (currentSnap == -1) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [currentSnap]);

  return (
    <BottomSheetContext.Provider value={{ openSheet, closeSheet }}>
      {children}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1} // closed by default
        snapPoints={snapPoints}
        onClose={() => setSheetContent(null)}
        enablePanDownToClose={true}
        onChange={setCurrentSnap}
        // Added props
        backgroundStyle={{
          display: visible ? "flex" : "none",
          borderWidth: 0, // remove border
          shadowColor: "#000", // shadow color
          shadowOffset: { width: 0, height: 1 }, // small offset
          shadowOpacity: 0.4, // light shadow
          shadowRadius: 2, // soft shadow
          elevation: 3, // Android shadow
        }}
      >
        <BottomSheetView className="p-4 w-full">{sheetContent}</BottomSheetView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};
