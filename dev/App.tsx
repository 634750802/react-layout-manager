import { GridLayout, GridLayoutType } from '../src/index.js';
import '../src/styles.scss';
import Box from './components/Box.js';

export default function App () {
  return (
    <GridLayout className="main" type={GridLayoutType.RESPONSIVE} guideUi>
      <Box initialRect={[0, 0, 1, 1]} onReady={console.log} />
      <Box initialRect={[-2, -2, 2, 1]} onReady={console.log} />
    </GridLayout>
  );
}