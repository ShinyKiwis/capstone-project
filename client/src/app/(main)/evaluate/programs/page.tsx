"use client";
import { userHasResource } from "@/app/lib/userHasResource";
import useNavigate from "@/app/hooks/useNavigate";
import { useBreadCrumbs } from "@/app/providers/BreadCrumbProvider";

function EvaluatePrograms() {
	const navigate = useNavigate();
	const {buildBreadCrumbs} = useBreadCrumbs();
	buildBreadCrumbs();

	if (!userHasResource("evaluate_programs")){
    return navigate("/forbidden");
  }

	return (
		<div>Redirect to metabase pages...</div>
	);
}

export default EvaluatePrograms;