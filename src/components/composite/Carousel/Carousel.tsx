import { ReactNode, useEffect, useMemo, useRef, useState } from "react";
import "./style.scss";

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
    gap = 30,
    onSwipe,
    showDots = true,
    swipeable = true,
  } = props;
  const [currentIndex, setCurrentIndex] = useState(0);

  // 가상의 앞뒤 아이템을 포함한 배열
  const displayItems = useMemo(
    () => [items[items.length - 1], ...items, items[0]],
    [items]
  );

  return (
    <div className="carousel-container">
      <div style={{ gap }} className="carousel-wrapper">
        {displayItems.map((item, ix) => (
          <div key={ix} className="carousel-item">
            <div style={{}} className="carousel-item__wrapper">
              {renderItem(item)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
