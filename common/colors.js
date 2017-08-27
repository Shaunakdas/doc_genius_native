export default {
  TRANSPARENT: 'transparent',
  PRIMARY: '#019AC1',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
};


const lighten = value => {
  const MAX_HEX_VALUE = 255;
  const hexValue = Math.floor(MAX_HEX_VALUE * Math.min(value, 1)).toString(16);
  return hexValue.length < 2 ? `0${hexValue}` : hexValue;
}

export const alpha = (color, value) => {
  return color.startsWith('#') ?  `${color}${lighten(value)}` : color;
}
