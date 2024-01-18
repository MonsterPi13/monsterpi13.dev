"use client";

import { cn } from "@/lib/utils";
import { ScrollArea } from "./scroll-area";

interface SideMenuProps {
  isInner?: boolean;
}

const SideMenu = ({
  children,
  isInner = false,
}: React.PropsWithChildren<SideMenuProps>) => {
  return (
    <ScrollArea
      className={cn(
        "hidden bg-zinc-50 lg:flex lg:flex-col lg:border-r",
        isInner ? "lg:w-80 xl:w-96" : "lg:w-60 xl:w-72"
      )}
    >
      <div className="bg-zinc-50 p-3">{children}</div>
    </ScrollArea>
  );
};

export default SideMenu;
