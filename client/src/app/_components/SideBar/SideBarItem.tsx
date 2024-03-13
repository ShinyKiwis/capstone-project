"use client";
import { Accordion, NavLink, Menu } from "@mantine/core";

import { memo, useEffect, useState } from "react";
import sidebarItems from "./items";
import { usePathname, useSearchParams } from "next/navigation";
import { usePageTitleContext } from "@/app/providers/PageTitleProvider";
import { useRouter } from "next/navigation";

interface Page {
  title: string;
  href: string;
}

interface SideBarItemProps {
  Icon?: any;
  title: string;
  pages: Page[];
  expand: boolean;
}

const isActivePath = (pathname: string, currentPathname: string) => {
  let titles = [];
  let found = false;
  for (const sidebarItem of sidebarItems) {
    if (found) break;
    for (const subItem of sidebarItem.pages) {
      if (subItem.href === currentPathname) {
        titles.push(sidebarItem.title);
        titles.push(subItem.title);
        found = true;
        break;
      }
    }
  }

  // console.log(titles);
  // console.log(pathname);

  return titles.includes(pathname);
};

const SideBarItem = ({ Icon, title, pages, expand }: SideBarItemProps) => {
  const searchParams = useSearchParams().toString();
  const pathname = usePathname();
  const fullpath = pathname + (searchParams ? `?${searchParams}` : "");
  const [activeTitle, setIsActiveTitle] = useState(
    isActivePath(title, fullpath),
  );
  const isActiveSubtitle = (subtitle: string) =>
    isActivePath(subtitle, fullpath);

  const { setPageTitle } = usePageTitleContext();
  const router = useRouter();

  useEffect(() => {
    setIsActiveTitle(isActivePath(title, fullpath));
  }, [pathname]);

  if (expand) {
    return (
      <Accordion className="my-0 w-full" variant="fill" chevronSize={0}>
        <Accordion.Item key={title} value={title}>
          <Accordion.Control>
            <NavLink
              label={title}
              leftSection={<Icon size={25} />}
              active={activeTitle}
              variant="filled"
              className={`rounded-md ${expand ? "px-4" : ""} py-1 text-xl font-bold ${!activeTitle ? "text-gray-400" : "text-white"}`}
            />
          </Accordion.Control>
          <Accordion.Panel>
            {pages.map((page) => {
              return (
                <NavLink
                  label={page.title}
                  href={page.href}
                  active={isActiveSubtitle(page.title)}
                  variant={isActiveSubtitle(page.title) ? "subtle" : ""}
                  className={`rounded-md font-bold ${!isActiveSubtitle(page.title) ? "text-gray-400" : ""}`}
                  key={page.title}
                  onClick={(e) => {
                    e.preventDefault();
                    setPageTitle(page.title);
                    router.push(page.href);
                  }}
                />
              );
            })}
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    );
  } else
    return (
      <div key={title}>
        <Menu position="right-start" offset={20}>
          <Menu.Target>
            <NavLink
              label={<Icon size={25} />}
              active={activeTitle}
              variant="filled"
              className={`mx-0 mt-4 rounded-md py-1 text-xl font-bold ${!activeTitle ? "text-gray-400" : "text-white"}`}
            />
          </Menu.Target>
          <Menu.Dropdown className="shadow-lg">
            {pages.map((page) => {
              return (
                <Menu.Item key={page.title}>
                  <NavLink
                    label={page.title}
                    href={page.href}
                    active={isActiveSubtitle(page.title)}
                    variant={isActiveSubtitle(page.title) ? "subtle" : ""}
                    className={`mx-0 rounded-md font-bold ${!isActiveSubtitle(page.title) ? "text-gray-400" : ""}`}
                    key={page.title}
                    onClick={(e) => {
                      e.preventDefault();
                      setPageTitle(page.title);
                      router.push(page.href);
                    }}
                  />
                </Menu.Item>
              );
            })}
          </Menu.Dropdown>
        </Menu>
      </div>
    );
};

export default memo(SideBarItem);
