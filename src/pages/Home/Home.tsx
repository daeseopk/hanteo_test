import { Outlet } from "react-router-dom";
import Header from "../../components/composite/Header/Header";
import { TABS } from "../../dummy/dummy";
import "./style.scss";

export default function Home() {
  return (
    <div className="home-container">
      <Header tabs={TABS} />
      <Outlet />
    </div>
  );
}
