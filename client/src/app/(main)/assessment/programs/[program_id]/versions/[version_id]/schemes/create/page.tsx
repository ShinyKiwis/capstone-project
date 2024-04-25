"use client";
import { PageHeader } from "@/app/_components";
import MultipleLevelCriterion from "@/app/_components/Criterion/MultipleLevelCriterion";
import { Criterion } from "@/app/interfaces/Criterion.interface";
import { Accordion, NumberInput, Text } from "@mantine/core";
import React, { useEffect, useState } from "react";
import Step1 from "./(pages)/step1";

const Page = () => {

  return (
    <div className="h-full flex flex-col">
      <PageHeader pageTitle="Create Assessment Scheme"/>
      <div className="flex flex-col flex-1 overflow-hidden">
        insert 3 steps here
        <Step1 />
      </div>
    </div>
  );
};

export default Page;
