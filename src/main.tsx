import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Header } from "./components/Header.tsx";
import { SidebarMenu } from "./components/SidebarMenu.tsx";
import { PageTitle } from "./components/PageTitle.tsx";
import { TrackList } from "./components/TrackList.tsx";
import { TrackDetail } from "./components/TrackDetail.tsx";
import { Footer } from "./components/Footer.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <SidebarMenu />
    <PageTitle />
    <div style={{ display: "flex" }}>
      <TrackList />
      <TrackDetail />
    </div>
    <Footer />
  </StrictMode>
);
