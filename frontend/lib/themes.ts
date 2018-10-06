import { ThemeOptions } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';

//https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=607D8B
const defaultTheme = {
    name: 'Default',
    options: {/*default*/}
  };
const dark = {
    name: 'Dark',
    options: {
        palette: {
            primary: {
            light:'#484848',
            main: '#212121',
            dark: '#000000',
          },
          secondary: {
            light: '#819ca9',
            main: '#546e7a',
            dark: '#29434e',
          },
        },
      }
    };

const redLine = {
    //https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=B71C1C&secondary.color=757575
    name: 'RedLine', 
    options: {
        palette: {
            primary: {
            light:'#f05545',
            main: '#b71c1c',
            dark: '#7f0000',
          },
          secondary: {
            light: '#a4a4a4',
            main: '#757575',
            dark: '#494949',
          },
        },
      }
    };
const pinky =  {
        name: 'Pinky',
        options: {
          palette: {
              primary: {
              light: purple[600],
              main: purple[300],
              dark: purple[100],
            },
            secondary: {
              light: green[600],
              main: green[300],
              dark: green[100],
            },
          },
        }
    };
export interface IThemeDefinition {
    name: string,
    options: ThemeOptions
}

const allThemes:Array<IThemeDefinition> = [defaultTheme,  dark, redLine, pinky];
export default allThemes;
  