"use client";

import React, { useEffect, useState } from "react";
import HomeTabIcon from "@/ui/Icons/HomeTabIcon";
import PopulationTabIcon from "@/ui/Icons/PopulationTabIcon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { Tab, Tabs } from "@/lib/types";

const Sidebar = () => {
  const pathname = usePathname();
  const tabs = [
    {
      id: "home",
      name: "home",
      icon: <HomeTabIcon />,
      route: "/",
    },
    {
      id: "population",
      name: "population",
      icon: <PopulationTabIcon />,
      route: "/population",
    },
  ] as Tabs;
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const tab = tabs.find((tab) => tab.route === pathname);
    setActiveTab(tab?.name || "home");
  }, [pathname]);

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab.name);
  };

  return (
    <div className="w-full h-fit rounded-xl bg-primary flex gap-6 items-center justify-between px-4 py-4 sticky top-4 shadow-xl shadow-white md:shadow-none md:top-0 z-50 md:h-full md:flex-col md:justify-start md:py-12 md:relative">
      <span className="text-2xl md:text-4xl font-bold">PopDop</span>
      <ul className="w-fit space-x-1 flex flex-row md:flex-col md:w-full md:space-x-0 md:space-y-1">
        {tabs.map((tab) => (
          <li key={tab.id}>
            <Link
              className={cn(
                "w-fit px-3 py-2 flex items-center gap-2 rounded-full hover:bg-[#D9D9D9] cursor-pointer scale-90 md:scale-100 md:w-full md:p-4 md:pl-24",
                activeTab === tab.name && "bg-[#D9D9D9]"
              )}
              href={tab.route}
              onClick={() => handleTabClick(tab)}
            >
              {tab.icon}
              <span
                className={cn(
                  "text-base",
                  activeTab === tab.name ? "font-bold" : "font-normal"
                )}
              >
                {tab.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
