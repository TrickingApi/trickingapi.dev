import React from 'react';

import { Button, Text } from 'dracula-ui';
import { getColorFromPath } from '../../utils';

const LinkButton = ({ value, ...props}: any ) => (
    <Button color={getColorFromPath(value)} size="sm" {...props}> 
        <Text color="black">{value}</Text>
    </Button>
);

export default LinkButton;
