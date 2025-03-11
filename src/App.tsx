import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainRouter from "./routers";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainRouter />
    </QueryClientProvider>
  );
}
