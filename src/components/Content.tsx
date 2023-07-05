import type { ReactNode } from "react";

export default function Content({ children }: { children: ReactNode }) {
  return (
    <div className="flex-1 w-full h-full flex justify-center p-10">
      <div className="rounded-xl bg-[#FFFFFF] shadow-lg shadow-[#0094FF4d] w-full">
        {children}
      </div>
    </div>
  );
}
