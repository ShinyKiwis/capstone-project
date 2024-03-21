import { ReadonlyURLSearchParams } from "next/navigation";
import { User } from "../providers/AuthProvider";
import sidebarItems from "../_components/SideBar/items";

const isValid = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  user: User | null,
) => {
  const parsedPathname = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname
  console.log(searchParams.toString())
  for(const item of sidebarItems) {
    for(const page of item.pages) {
      if (user?.resources.includes(page.resource) && parsedPathname === page.href) {
        return true
      }
    }
  }

  return false;
};

export default isValid;
