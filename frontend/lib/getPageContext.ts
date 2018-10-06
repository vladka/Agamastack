/* eslint-disable no-underscore-dangle */

import { SheetsRegistry, GenerateClassName } from 'jss';
import { createMuiTheme, createGenerateClassName , Theme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';


// A theme with custom primary and secondary color.
// It's optional.
//see: https://material-ui.com/customization/themes/
const theme0 = createMuiTheme({
  palette: {
    primary: {
      light: purple[300],
      main: purple[500],
      dark: purple[700],
    },
    secondary: {
      light: green[300],
      main: green[500],
      dark: green[700],
    },
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      light: purple[100],
      main: purple[100],
      dark: purple[100],
    },
    secondary: {
      light: green[100],
      main: green[100],
      dark: green[100],
    },
  },
});


export interface IPageContext {
  theme: Theme,
  sheetsManager: Map<any,any>,
  sheetsRegistry: SheetsRegistry,
  generateClassName: GenerateClassName

}

function createPageContext() {
  console.log('creating page-context...');
  const result =    {
    theme,
    // This is needed in order to deduplicate the injection of CSS in the page.
    sheetsManager: new Map(),
    // This is needed in order to inject the critical CSS.
    sheetsRegistry: new SheetsRegistry(),
    // The standard class name generator.
    generateClassName: createGenerateClassName(),
  };
  return result;
}

export default function getPageContext() {
  // Make sure to create a new context for every server-side request so that data
  // isn't shared between connections (which would be bad).
  if (!process.browser) {
    return createPageContext();
  }

  // Reuse context on the client-side.
  if (!global.__INIT_MATERIAL_UI__) {
    global.__INIT_MATERIAL_UI__ = createPageContext();
  }

  return global.__INIT_MATERIAL_UI__ as IPageContext;
}
