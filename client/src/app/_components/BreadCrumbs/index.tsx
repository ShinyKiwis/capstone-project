import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { FaAngleRight } from "react-icons/fa6";
import React from "react";

const BreadCrumbs = () => {
  const { breadCrumbs } = useBreadCrumbs();

  return (
    <Breadcrumbs separator={<FaAngleRight color="#228BE6"/>} separatorMargin="sm">
      {breadCrumbs.map((item, index) => (
        <Anchor href={item.href} key={index}>
          {item.title}
        </Anchor>
      ))}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
