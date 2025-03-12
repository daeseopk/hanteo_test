import { RefObject, useEffect, useState } from "react";
import "./style.scss";

interface Props extends DotsStyle {
  totalCount: number;
  currentIndex: number;
  wrapperRef?: RefObject<HTMLDivElement | null>;
}
export interface DotsStyle {
  gap?: number;
  activeColor?: string;
  inactiveOpacity?: number;
}

const MIN_OPACITY = 0.3;
const MAX_OPACITY = 1;

export default function Dots(props: Props) {
  const {
    totalCount,
    wrapperRef,
    activeColor = "rgba(70, 70, 70, 1)",
    inactiveOpacity = MIN_OPACITY,
    gap = 10,
  } = props;
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    if (!wrapperRef?.current) {
      return;
    }

    const handleScroll = () => {
      requestAnimationFrame(() => {
        const wrapper = wrapperRef.current;

        if (!wrapper) return;
        const targetItem = wrapper?.querySelector(".carousel-item");
        if (!targetItem) return;

        const currentScrollLeft = wrapper.scrollLeft - targetItem.clientWidth;
        const minScrollLeft =
          (targetItem.clientWidth + gap) * totalCount - targetItem.clientWidth;
        const maxScrollLeft = minScrollLeft * 2 - gap;

        const percentage =
          ((currentScrollLeft - minScrollLeft) /
            (maxScrollLeft - minScrollLeft)) *
          100;

        const progress = percentage * (totalCount - 1);
        setScrollProgress(progress);
      });
    };
    wrapperRef.current.addEventListener("scroll", handleScroll);
  }, [gap, totalCount, wrapperRef]);

  const handleDotClick = (index: number) => {
    if (!wrapperRef?.current) return;

    // 캐러셀의 중간 세트에 있는 아이템으로 이동
    const itemWidth =
      wrapperRef.current.querySelector(".carousel-item")?.clientWidth || 0;
    if (itemWidth === 0) return;

    const totalWidth = itemWidth + gap;
    // 중간 세트의 시작 인덱스 + 클릭한 인덱스
    const targetIndex = totalCount + index;
    const scrollPosition = targetIndex * totalWidth;

    wrapperRef.current.scrollTo({
      left: scrollPosition,
      behavior: "smooth",
    });
  };

  // index 별 opacity 계산 함수
  const getOpacity = (ix: number, scrollProgress: number) => {
    const calcOpacity = (distance: number) =>
      Math.max(inactiveOpacity, Math.min(MAX_OPACITY, 1 - distance / 100));

    const midPoint = ix * 100;
    const observeRange = [ix * 100 - 100, ix * 100 + 100];

    // 엣지 케이스 처리 함수
    const handleEdgeCases = () => {
      // 첫 번째 인덱스 엣지 케이스
      if (
        ix === 0 &&
        scrollProgress >= (totalCount - 1) * 100 &&
        scrollProgress <= totalCount * 100
      ) {
        const distance = Math.abs(scrollProgress - totalCount * 100);
        return calcOpacity(distance);
      }

      // 마지막 인덱스 엣지 케이스
      if (
        ix === totalCount - 1 &&
        scrollProgress <= 0 &&
        scrollProgress >= -100
      ) {
        const distance = Math.abs(scrollProgress + 100);
        return calcOpacity(distance);
      }

      return null;
    };

    // 엣지케이스 먼저 처리
    const edgeResult = handleEdgeCases();
    if (edgeResult !== null) return edgeResult;

    // 기본 범위 내 처리
    if (
      scrollProgress >= observeRange[0] &&
      scrollProgress <= observeRange[1]
    ) {
      const distance = Math.abs(scrollProgress - midPoint);
      return calcOpacity(distance);
    }

    return inactiveOpacity;
  };

  return (
    <div className="dots-container">
      <div
        style={{
          gap,
        }}
        className="dots-wrapper"
      >
        {Array.from({ length: totalCount }, (_, ix) => {
          return (
            <div
              key={`dot-${ix}`}
              onClick={() => handleDotClick(ix)}
              style={{
                backgroundColor: activeColor,
                opacity: getOpacity(ix, scrollProgress),
              }}
              className="dots-item"
            />
          );
        })}
      </div>
    </div>
  );
}
