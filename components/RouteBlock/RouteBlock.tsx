import React, { FunctionComponent } from 'react';
import { Box, Card, Divider, Paragraph, Text }from 'dracula-ui';
import { getColorFromPath } from '../../utils';
interface IRouteBlockProps {
  path: string;
  method: string;
  description: string;
  exampleRequest?: string;
  exampleResponse?: string;
}

const RouteBlock: FunctionComponent<IRouteBlockProps> = (props) => {
  return (
    <Card p="sm" m="sm" color={getColorFromPath(props.path)}>
      <Box>
        <Box p="xs">
          <Text size="lg" weight="bold" color="grey">{props.method}</Text>
          <Text size="lg" weight="bold" color="black">{props.path}</Text>
        </Box>
        <Box>
          <Divider color={getColorFromPath(props.path)} />
        </Box>
        <Box p="xs">
          <Paragraph size="sm" color="blackSecondary">{props.description}</Paragraph>
        </Box>
      </Box>
    </Card>
  );
}

export default RouteBlock;