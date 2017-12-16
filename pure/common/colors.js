export default {
  TRANSPARENT: 'transparent',
  PRIMARY: '#00bfff',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  SECONDARY: '#95989A',
  ALMOST_WHITE: '#FAFAFA',
  PALE_GREY: '#eceff0',
  CHAT_BG: '#ebebeb',
  LIGHT_BLUE: '#b3e1ed',
  ALT_TEXT: '#93b6bf',
  GREY: '#94979a',
  DARK_TEXT: '#343434',
  CHAT_INPUT_BORDER: '#C7C7CC',
  SEARCH_FILL: '#F8F8F8',
  SEARCH_TEXT: '#8E8E93',
  QA: '#D1D5DB',
  RED: '#FF0000',
  BEIGE: '#FFE8E8',
  EDIT_BG: '#E88800',
  DELETE_BG: '#E74C3C',
  OB_TEXT: '#666666',
  MODAL_BG: '#E8E8E8',
  MODAL_BUTTON: '#507fc7',
  MODAL_BORDER: '#b9b9b9',
  MODAL_TEXT: '#060606',
  GAME_PURPLE: '#800080',
  GAME_BLUE: '#000080',
  GAME_GREEN: '#00CE00',
  GAME_ORANGE: '#FFA500',
  GAME_RED: '#e52b50',
};


const lighten = (value) => {
  const MAX_HEX_VALUE = 255;
  const hexValue = Math.floor(MAX_HEX_VALUE * Math.min(value, 1)).toString(16);
  return hexValue.length < 2 ? `0${hexValue}` : hexValue;
};

export const alpha = (color, value) => (
  color.startsWith('#') ? `${color}${lighten(value)}` : color);
