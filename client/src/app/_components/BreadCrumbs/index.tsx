"use client";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";
import { Anchor, Breadcrumbs } from "@mantine/core";
import { FaAngleRight } from "react-icons/fa6";
import React from "react";
import Link from "next/link";

const BreadCrumbs = () => {
  const { breadCrumbs } = useBreadCrumbs();

  return (
    <Breadcrumbs
      separator={<FaAngleRight color="#228BE6" />}
      separatorMargin="xs"
    >
      {breadCrumbs.map((item, index) => {
        if (window.location.pathname.toString() !== item.href) {
          return (
            <Anchor href={item.href} key={index} component={Link}>
              {item.title}
            </Anchor>
          );
        }else {
          return (
            <span key={index} className="font-semibold">{item.title}</span>
          )
        }
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumbs;
