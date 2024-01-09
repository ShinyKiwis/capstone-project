import dynamic from "next/dynamic";

const DynamicInputBoxComponent = dynamic(
  () => import("../../_components/UserAction/InputBox"),
);

interface DynamicInputBoxProps {
  inputName: string;
  placeholderText: string;
  autoFocus?: boolean;
  type?: string;
  className?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function DynamicInputBox(props: DynamicInputBoxProps) {
  return <DynamicInputBoxComponent {...props}/>;
}
