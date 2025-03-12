import { ReactNode, RefObject, useCallback, useEffect, useState } from "react";
import { Params } from "../../../types/params";
import { UseQueryResult } from "@tanstack/react-query";
import "./style.scss";
import { produce } from "immer";
import { Response } from "../../../types/response";

interface Props<T> {
  query: (params: Params) => UseQueryResult<Response<T>, unknown>;
  params: Params;
  setParams: (params: Params) => void;
  renderItem: (item: T) => ReactNode;
  scrollWrapperRef: RefObject<HTMLDivElement | null>;
  gap?: number;
}

export default function PagingList<T>(props: Props<T>) {
  const {
    query,
    params,
    setParams,
    renderItem,
    scrollWrapperRef,
    gap = 10,
  } = props;

  const { data: response } = query(params);

  const [renderItems, setRenderItems] = useState<Array<T>>([]);
  const [hasNext, setHasNext] = useState<boolean>(true);

  useEffect(() => {
    if (!response) {
      return;
    }
    const { data, hasNext } = response;

    setHasNext(hasNext);
    if (data) {
      // 처음 페이지면 데이터 초기화, 아니면 기존 데이터에 추가
      setRenderItems((prevData) =>
        params.page === 1 ? data : [...prevData, ...data]
      );
    }
  }, [response, params.page]);

  const handleScroll = useCallback(
    (element: HTMLElement) => {
      const isAtBottom =
        element.scrollHeight - element.scrollTop <= element.clientHeight + 1; // +1은 오차 범위

      if (isAtBottom && hasNext) {
        setParams(
          produce(params, (draft) => {
            draft.page += 1;
          })
        );
      }
    },
    [hasNext, params, setParams]
  );

  useEffect(() => {
    if (!scrollWrapperRef?.current) return;
    const onScroll = () =>
      handleScroll(scrollWrapperRef.current as HTMLElement);

    scrollWrapperRef?.current.addEventListener("scroll", onScroll);
  }, [handleScroll, scrollWrapperRef]);

  return (
    <div style={{ gap }} className="paging-list-container">
      {renderItems?.map((item, ix) => (
        <div key={`paging-${ix}`}> {renderItem(item)}</div>
      ))}
    </div>
  );
}
