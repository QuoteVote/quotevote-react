import React from "react";

import { createTheme, StylesProvider, ThemeProvider } from "@material-ui/core/styles";
import customTheme from "../src/theme";

const theme = createTheme(customTheme)
const StylesDecorator = storyFn => (
  <ThemeProvider theme={theme}>
    <StylesProvider injectFirst>
        {storyFn()}
    </StylesProvider>
  </ThemeProvider>
);

export default StylesDecorator;
