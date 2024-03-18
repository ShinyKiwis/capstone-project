
export const InputFieldTitle = ({ title, required }: { title: string; required?:boolean }) => {
  let className = "text-2xl font-bold mb-1";
  return <div className={className}>{title} {required? <span className="text-[#fa5252]">*</span>: null}</div>;
};

export const InputLabel = ({ title }: { title: string }) => {
  let className = "w-44 text-lg font-semibold";
  return <div className={className}>{title}</div>;
};