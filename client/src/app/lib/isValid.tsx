import { ReadonlyURLSearchParams } from "next/navigation";
import sidebarItems from "../_components/SideBar/items";
import { userHasResource } from "./userHasResource";
import { User } from "../interfaces/User.interface";

const isValid = (
  pathname: string,
  searchParams: ReadonlyURLSearchParams,
  user: User | null,
) => {
  const parsedPathname = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname
  // console.log(searchParams.toString())

  for(const item of sidebarItems) {
    for(const page of item.pages) {
      if (userHasResource(page.resource) && parsedPathname === page.href) {
        return true
      }else if(userHasResource(page.resource) && parsedPathname.includes(page.href)) {
        return true
      }
    }
  }

  return false;
};

export default isValid;
