interface StatusModalProps{
  title: string,
  messages?: string[]
}

interface ActionModalProps {
	title: string;
	messages?: string[];
	buttonLabels: [string, string];
	mainAction: () => void;
}

interface UnenrollModalProps{
  title?: string,
  messages?: string[],
}