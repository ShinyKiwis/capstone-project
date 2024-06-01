"use client";
import useNavigate from "@/app/hooks/useNavigate";
import { userHasResource } from "@/app/lib/userHasResource";
import { useAuth } from "@/app/providers/AuthProvider";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

function EvaluatePrograms() {
  const [cookies, setCookie, removeCookie] = useCookies(["permitted"]);
  const { buildBreadCrumbs } = useBreadCrumbs();
  const navigate = useNavigate();
  const currentUser = useAuth().user;

  useEffect(() => {
    buildBreadCrumbs();
    if (!userHasResource("evaluate_programs", currentUser)) return navigate("/forbidden");
    setCookieHandler();
    navigate("http://localhost:3300")
  }, []);

  const setCookieHandler = () => {
    setCookie("permitted", true, {
      path: "/",
    });
  };

  return (
    <div>
      <div>Redirect to metabase pages...</div>
    </div>
  );
}

export default EvaluatePrograms;
