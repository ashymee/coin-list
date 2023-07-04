import { ReactNode } from "react";
import Content from "./Content";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-[#F3F7FB] flex flex-col overflow-hidden">
      <Header />
      <Content>{children}</Content>
      <Footer />
    </div>
  );
}
