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
import Dots, { DotsStyle } from "../../base/Dots/Dots";

interface TouchInfo {
  startX: number;
  scrollLeft: number;
}
export type SwipeCondition = "swiping" | "completed";
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
  onSwipeStateChange?: (state: SwipeCondition) => void;
}

const DEFAULT_DOTS_STYLE: DotsStyle = {
  gap: 10,
};

export default function Carousel<T>(props: Props<T>) {
  const {
    items,
    renderItem,
    autoScroll = true,
    autoScrollInterval = 5000,
    dotsStyle = DEFAULT_DOTS_STYLE,
    gap = 10,
    onSwipe,
    showDots = true,
    swipeable = true,
    onSwipeStateChange,
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [nearestIndex, setNearestIndex] = useState<number | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [touchInfo, setTouchInfo] = useState<TouchInfo | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const itemsRef = useRef<Array<HTMLDivElement | null>>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);
  const currentNearestIndexRef = useRef<number | null>(null);
  const singleSetWidthRef = useRef<number>(0);

  const displayItems = useMemo(() => {
    return [...items, ...items, ...items];
  }, [items]);

  const scrollToIndex = useCallback(
    (index: number, useAnimation: boolean = true) => {
      if (!wrapperRef.current) return;

      const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
      if (itemWidth === 0) return;

      const totalWidth = itemWidth + gap;

      const scrollPosition = index * totalWidth;

      wrapperRef.current.scrollTo({
        left: scrollPosition,
        behavior: useAnimation ? "smooth" : "auto",
      });
    },
    [gap]
  );

  // 경계 조건 확인 및 처리
  const checkAndAdjustBoundary = useCallback(() => {
    if (!wrapperRef.current || currentNearestIndexRef.current === null)
      return false;

    const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
    if (itemWidth === 0) return false;

    const totalWidth = itemWidth + gap;
    singleSetWidthRef.current = items.length * totalWidth;

    let adjusted = false;
    const currentIndex = currentNearestIndexRef.current;

    // 오른쪽 경계 검사
    if (currentIndex >= items.length * 2) {
      // 중간 세트의 동일한 위치로 이동
      const newIndex = currentIndex - items.length;
      currentNearestIndexRef.current = newIndex;
      setNearestIndex(newIndex);

      // 스크롤 위치 즉시 조정 (애니메이션 없이)
      scrollToIndex(newIndex, false);
      adjusted = true;
    }
    // 왼쪽 경계 검사
    else if (currentIndex < items.length) {
      // 중간 세트의 동일한 위치로 이동
      const newIndex = currentIndex + items.length;
      currentNearestIndexRef.current = newIndex;
      setNearestIndex(newIndex);

      // 스크롤 위치 즉시 조정 (애니메이션 없이)
      scrollToIndex(newIndex, false);
      adjusted = true;
    }

    return adjusted;
  }, [items.length, gap, scrollToIndex]);

  // 초기 스크롤 위치를 중간 세트로 설정
  useEffect(() => {
    if (!wrapperRef.current || isInitialized || items.length === 0) return;

    const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
    if (itemWidth === 0) return;

    const totalWidth = itemWidth + gap;
    singleSetWidthRef.current = items.length * totalWidth;

    // 중간 세트의 첫 번째 아이템으로 설정
    const initialIndex = items.length;
    currentNearestIndexRef.current = initialIndex;
    setNearestIndex(initialIndex);

    // 스크롤 위치 즉시 조정 (애니메이션 없이)
    scrollToIndex(initialIndex, false);

    setIsInitialized(true);
  }, [items.length, gap, isInitialized, scrollToIndex]);

  // 스크롤 이벤트 핸들러
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleScroll = () => {
      if (isDragging) return; // 드래그 중일 때는 무시

      const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
      if (itemWidth === 0) return;

      const totalWidth = itemWidth + gap;

      // 현재 스크롤 위치에서 가장 가까운 아이템 인덱스 계산
      const newNearestIndex = Math.round(wrapper.scrollLeft / totalWidth);

      // 변경되었을 때만 업데이트
      if (newNearestIndex !== currentNearestIndexRef.current) {
        currentNearestIndexRef.current = newNearestIndex;
        setNearestIndex(newNearestIndex);

        // 현재 아이템 인덱스 업데이트 (표시용)
        const displayIndex = newNearestIndex % items.length;
        if (displayIndex !== currentIndex) {
          onSwipe?.(currentIndex, displayIndex);
          setCurrentIndex(displayIndex);
        }
      }
    };

    wrapper.addEventListener("scroll", handleScroll);
    return () => wrapper.removeEventListener("scroll", handleScroll);
  }, [currentIndex, gap, items.length, onSwipe, isDragging]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      onSwipeStateChange?.("swiping");
      if (!wrapperRef.current || !swipeable) return;

      // 터치 시작할 때 자동 스크롤 중단
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }

      setIsDragging(true);
      setTouchInfo({
        startX: e.touches[0].clientX - wrapperRef.current.offsetLeft,
        scrollLeft: wrapperRef.current.scrollLeft,
      });
    },
    [swipeable, onSwipeStateChange]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging || !wrapperRef.current || !touchInfo) return;

      const x = e.touches[0].clientX - wrapperRef.current.offsetLeft;
      const walk = touchInfo.startX - x;

      wrapperRef.current.scrollLeft = touchInfo.scrollLeft + walk;
    },
    [isDragging, touchInfo]
  );

  // 자동 스크롤 함수
  const startAutoScroll = useCallback(() => {
    // 이미 실행 중인 타이머가 있으면 제거

    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }

    // 자동 스크롤이 비활성화되어 있으면 실행하지 않음
    if (!autoScroll) return;
    autoScrollRef.current = setInterval(() => {
      if (!isInitialized || currentNearestIndexRef.current === null) {
        return;
      }

      // 다음 인덱스로 스크롤
      const nextIndex = currentNearestIndexRef.current + 1;
      currentNearestIndexRef.current = nextIndex;
      setNearestIndex(nextIndex);

      scrollToIndex(nextIndex, true);

      // 다음 표시 인덱스
      const nextDisplayIndex = nextIndex % items.length;
      if (nextDisplayIndex !== currentIndex) {
        onSwipe?.(currentIndex, nextDisplayIndex);
        setCurrentIndex(nextDisplayIndex);
      }

      // 스크롤 애니메이션이 끝날 즈음 경계 조건 확인 (약 300ms 후)
      setTimeout(() => {
        checkAndAdjustBoundary();
      }, 300);
    }, autoScrollInterval);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [
    autoScroll,
    autoScrollInterval,
    checkAndAdjustBoundary,
    currentIndex,
    isInitialized,
    items.length,
    onSwipe,
    scrollToIndex,
  ]);

  const handleTouchEnd = useCallback(() => {
    if (!wrapperRef.current || !touchInfo) return;
    onSwipeStateChange?.("completed");
    setIsDragging(false);

    // 현재 스크롤 위치 계산
    const itemWidth = itemsRef.current[0]?.offsetWidth || 0;
    if (itemWidth === 0) {
      setTouchInfo(null);
      return;
    }

    const totalWidth = itemWidth + gap;
    // 정확한 스크롤 위치에서 가장 가까운 인덱스 계산
    const scrollLeft = wrapperRef.current.scrollLeft;
    const newNearestIndex = Math.round(scrollLeft / totalWidth);

    // 새 인덱스 설정
    currentNearestIndexRef.current = newNearestIndex;
    setNearestIndex(newNearestIndex);

    // 가장 가까운 아이템으로 스냅
    scrollToIndex(newNearestIndex, true);

    // 새 표시 인덱스 계산
    const newDisplayIndex = newNearestIndex % items.length;
    if (newDisplayIndex !== currentIndex) {
      onSwipe?.(currentIndex, newDisplayIndex);
      setCurrentIndex(newDisplayIndex);
    }

    setTouchInfo(null);

    // 경계 조건 확인 (스크롤 애니메이션 이후)
    setTimeout(() => {
      checkAndAdjustBoundary();

      // 터치 끝났을 때 자동 스크롤 재시작
      if (autoScroll) {
        startAutoScroll();
      }
    }, 300);
  }, [
    autoScroll,
    checkAndAdjustBoundary,
    currentIndex,
    gap,
    items.length,
    onSwipe,
    onSwipeStateChange,
    scrollToIndex,
    startAutoScroll,
    touchInfo,
  ]);

  // 자동 스크롤 시작
  useEffect(() => {
    if (autoScroll && isInitialized && !isDragging && nearestIndex !== null) {
      startAutoScroll();
    }

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
        autoScrollRef.current = null;
      }
    };
  }, [autoScroll, isInitialized, isDragging, nearestIndex, startAutoScroll]);

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
      {showDots && (
        <Dots
          {...dotsStyle}
          currentIndex={currentIndex}
          wrapperRef={wrapperRef}
          totalCount={items.length}
        />
      )}
    </div>
  );
}
