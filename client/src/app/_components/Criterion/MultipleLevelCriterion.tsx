import { Criterion } from "@/app/interfaces/Criterion.interface"
import { Accordion, Text } from "@mantine/core";

interface MultipleLevelCriterionPropsType {
  criterion: Criterion,
  order: number;
}

const MultipleLevelCriterion = ({criterion, order} : MultipleLevelCriterionPropsType) => {
  return (
    <Accordion.Item key={order} value={`Criterion ${order+1}`}>
      <Accordion.Control ><Text fw={600}>Criterion {order+1}</Text></Accordion.Control>
    </Accordion.Item>
  )
}

export default MultipleLevelCriterion
