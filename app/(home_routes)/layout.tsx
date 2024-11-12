import React, { ReactNode } from "react";
import Navbar from "@components/navbar";
import WaitListNavUI from "@components/waitlist/WaitListNavUI";
import HexagonLoading from "../components/ui/HexagonLoading";
import WaitListBanner from "../components/waitlist/WaitListBanner";
interface Props {
  children: ReactNode;
}
export default function HomeLayout({ children }: Props) {
  return (
    <div className="max-w-screen-[80vh] mx-auto p-4">
      {/*       <Navbar />
       */}
      <WaitListNavUI />
      {children}
    </div>
  );
}
