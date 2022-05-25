import type { AppProps } from 'next/app'

import { store } from 'src/utils/store';
import { Provider } from 'react-redux';

import 'src/styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
