import { Params } from "../../../types/params";
import { UseQueryResult } from "@tanstack/react-query";

interface Props<T> {
  query: (params: Params) => UseQueryResult<Array<T>, unknown>;
  params: Params;
  setParams: (params: Params) => void;
}
export default function PagingList<T>(props: Props<T>) {
  const { query, params, setParams } = props;

  const data = query(params);

  return <div>PagingList</div>;
}
