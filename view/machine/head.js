import { toCssText, view } from '@/lib/view';

const initialState = { state: 0 };

const stateToString = (state) => 'E01234AH'[state + 1];

const cellWidth = 'min(15vw, 30vh)';
const w16 = `calc(${cellWidth} / 16)`;

const containerStyle = toCssText({
  position: 'absolute',
  top: '30%',
  left: `calc(50% - ${cellWidth} * 9 / 16)`,
});

const commonStyle = {
  position: 'absolute',
  height: cellWidth,
  background: 'radial-gradient(#aaa, #666)',
};

const armStyle = {
  ...commonStyle,
  width: `calc(${cellWidth} / 8)`,
  borderRadius: `${w16} ${w16} 0 0`,
};

const leftArmStyle = toCssText(armStyle);
const rightArmStyle = toCssText({ ...armStyle, left: cellWidth });

const headStyle = toCssText({
  ...commonStyle,
  top: cellWidth,
  width: `calc(${cellWidth} * 9 / 8)`,
  borderRadius: `0 0 ${w16} ${w16}`,
  fontSize: `calc(${cellWidth} * 0.8)`,
  lineHeight: cellWidth,
  textAlign: 'center',
  color: 'white',
});

const headView = view(initialState, (render) => ({ state }) => (
  render`<div style=${containerStyle}>
    <div style=${leftArmStyle} />
    <div style=${rightArmStyle} />
    <div style=${headStyle}>${stateToString(state)}</div>
  </div>`
));

export default headView;
