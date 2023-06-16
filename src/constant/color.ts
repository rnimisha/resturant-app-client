const COLOR = {
    primary: '#f0b53a',
    lightPrimary: '#FCE4B1',
    light: '#F8F6ED',
    additionalPrimary: '#FFF2E6',
    secondary: '#22BC9B',
    lightSecondary: '#E8F8F5',
    white: '#fff',
    black: '#141D2B',
    error: '#D8000C',
};

export const CHARTCOLORS = {
  0: '#6FC9A2',
  1: '#E9F2D6',
  2: '#B3DEE2',
  3: '#4abbcc',
  4: '#5dacd4',
  5: '#7f9bce',
  6: '#ba93b0',
  7: '#DAE8C5',
  8: '#cf7489',
}

export type StatusColor = Record<string, string[]>;

export const STATUSCOLOR: StatusColor ={
  'Order Received' : ['#cce2ff', '#7192b0'],
  'Processing': ['#fffbcc', '#b0aa71'],
  'Completed': ['#d8f2db', '#71b078']
}

export default COLOR;

