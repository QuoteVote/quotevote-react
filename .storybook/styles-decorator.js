import React from "react";

import { createMuiTheme, StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import customTheme from "../src/theme";

const theme = createMuiTheme(customTheme)
const StylesDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
        {storyFn()}
    </StylesProvider>
  </ThemeProvider>
);

export default StylesDecorator;
