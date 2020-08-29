import React from "react";

import { StylesProvider } from '@material-ui/core/styles'

const StylesDecorator = storyFn => (
    <StylesProvider injectFirst>
        {storyFn()}
    </StylesProvider>
);

export default StylesDecorator;
