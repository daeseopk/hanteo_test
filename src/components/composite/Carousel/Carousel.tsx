import { ReactNode } from "react";

interface DotsStyle {
  gap?: number;
  activeColor?: string;
  inactiveColor?: string;
  enableAnimation?: boolean;
}
interface Props<T> {
  items: Array<T>;
  renderItem: (item: T) => ReactNode;
  gap?: number;
  showDots?: boolean;
  autoScroll?: boolean;
  autoScrollInterval?: number;
  swipeable?: boolean;
  onSwipe?: (beforeIndex: number, currentIndex: number) => void;
  dotsStyle?: DotsStyle;
}

const DEFAULT_DOTS_STYLE: DotsStyle = {
  activeColor: "rgba(69, 69, 69, 1)",
  inactiveColor: "rgba(69, 69, 69, 0.3)",
  gap: 10,
};

export default function Carousel<T>(props: Props<T>) {
  const {
    items,
    renderItem,
    autoScroll = true,
    autoScrollInterval = 3000,
    dotsStyle = DEFAULT_DOTS_STYLE,
    gap = 50,
    onSwipe,
    showDots = true,
    swipeable = true,
  } = props;
}
