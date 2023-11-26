import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import { ReduxProvider } from '../store/provider';
// import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ReduxProvider>
        <Component {...pageProps} />
      </ReduxProvider>
    </ErrorBoundary>
  );
}
