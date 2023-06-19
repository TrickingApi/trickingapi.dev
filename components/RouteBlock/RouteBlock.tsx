import React, { FunctionComponent, useState } from 'react';
import { Box, Card, Divider, Paragraph, Text }from 'dracula-ui';

interface IRouteBlockProps {
  path: string;
  method: string;
  description: string;
  exampleRequest?: string;
  exampleResponse?: string;
}

function getCardColor(path: string) {
  const base = path.split("/")[1];
  switch (base) {
    case "tricks":
      return "cyan";
    case "categories":
      return "orange";
    case "transitions":
      return "pink";
    case "landingstances":
      return "red";
    default:
      return "purple";
  }
}

const RouteBlock: FunctionComponent<IRouteBlockProps> = (props) => {
  return (
    <Card p="sm" m="sm" color={getCardColor(props.path)}>
      <Box>
        <Box p="xs">
          <Text size="lg" weight="bold" color="grey">{props.method}</Text>
          <Text size="lg" weight="bold" color="black">{props.path}</Text>
        </Box>
        <Box>
          <Divider color={getCardColor(props.path)} />
        </Box>
        <Box p="xs">
          <Paragraph size="sm" color="blackSecondary">{props.description}</Paragraph>
        </Box>
      </Box>
    </Card>
  );
}

export default RouteBlock;