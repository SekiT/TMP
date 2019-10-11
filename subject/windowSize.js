import subject from '../lib/subject';

const getSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const windowSize = subject(getSize());

window.addEventListener('resize', () => {
  windowSize.next(getSize());
});

export default windowSize;
