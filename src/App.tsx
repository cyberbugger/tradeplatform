import MarketPlatform from './components/MarketPlatform';
import { AVAILABLE_PRODUCTS } from './constants';

function App() {
  return <MarketPlatform availableProducts={AVAILABLE_PRODUCTS} />
}

export default App;
