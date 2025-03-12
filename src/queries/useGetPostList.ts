type Params = {
  limit: number;
  page: number;
};
interface Props {
  params: Params;
  setParams: (params: Params) => void;
}
export default function useGetPostList(props: Props) {}
