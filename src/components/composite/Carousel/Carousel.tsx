import {
  ReactNode,
  TouchEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./style.scss";

interface TouchInfo {
  startX: number;
  scrollLeft: number;
}

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
    gap = 10,
    onSwipe,
    showDots = true,
    swipeable = true,
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [touchInfo, setTouchInfo] = useState<TouchInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const displayItems = useMemo(() => {
    return [...items, ...items, ...items];
  }, [items]);

  // 초기 스크롤 위치를 중간 세트로 설정
  useEffect(() => {
    if (!wrapperRef.current || isInitialized || items.length === 0) return;

    const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
    if (itemWidth === 0) return;

    const totalWidth = itemWidth + gap;
    const singleSetWidth = items.length * totalWidth;

    // 중간 세트의 시작 부분으로 스크롤
    wrapperRef.current.scrollLeft = singleSetWidth;
    setIsInitialized(true);
  }, [items.length, gap, isInitialized]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      const { scrollLeft } = wrapper;
      const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
      const totalWidth = itemWidth + gap;
      const singleSetWidth = items.length * totalWidth;

      if (scrollLeft > singleSetWidth * 1.5) {
        wrapper.scrollLeft -= singleSetWidth;
      } else if (scrollLeft < singleSetWidth * 0.5) {
        wrapper.scrollLeft += singleSetWidth;
      }
    };

    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, [items.length, gap]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!wrapperRef.current) return;

    setIsDragging(true);
    setTouchInfo({
      startX: e.touches[0].clientX - wrapperRef.current.offsetLeft,
      scrollLeft: wrapperRef.current.scrollLeft,
    });
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !wrapperRef.current || !touchInfo) return;

      const x = e.touches[0].clientX - wrapperRef.current.offsetLeft;
      const walk = touchInfo.startX - x;

      wrapperRef.current.scrollLeft = touchInfo.scrollLeft + walk;
    },
    [isDragging, touchInfo]
  );

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    setTouchInfo(null);

    if (!wrapperRef.current) return;

    const scrollLeft = wrapperRef.current.scrollLeft;
    const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
    const totalWidth = itemWidth + gap;

    // 가장 가까운 아이템으로 스냅
    const nearestIndex = Math.round(scrollLeft / totalWidth);
    const snapToPosition = nearestIndex * totalWidth;

    wrapperRef.current.scrollTo({
      left: snapToPosition,
      behavior: "smooth",
    });

    setCurrentIndex(nearestIndex % items.length);
  }, [gap, items.length]);

  return (
    <div className="carousel-container">
      <div
        ref={wrapperRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ gap, paddingLeft: gap * 2 }}
        className="carousel-wrapper"
      >
        {displayItems.map((item, ix) => (
          <div
            ref={(el) => {
              itemsRef.current[ix] = el;
            }}
            key={ix}
            className="carousel-item"
          >
            {renderItem(item)}
          </div>
        ))}
      </div>
    </div>
  );
}
