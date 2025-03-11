import { Outlet } from "react-router-dom";
import Header from "./components/composite/Header/Header";
import { TABS } from "./dummy/dummy";

export default function Home() {
  return (
    <div>
      <Header tabs={TABS} />
      <Outlet />
    </div>
  );
}
