"use client";
import { userHasResource } from "@/app/lib/userHasResource";
import useNavigate from "@/app/hooks/useNavigate";

function EvaluatePrograms() {
	const navigate = useNavigate();

	if (!userHasResource("evaluate_programs")){
    return navigate("/forbidden");
  }

	return (
		<div>Redirect to metabase pages...</div>
	);
}

export default EvaluatePrograms;