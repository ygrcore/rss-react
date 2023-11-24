import type { Metadata } from 'next';
import { Signika } from 'next/font/google';
import { ReduxProvider } from '../store/provider';

const signika = Signika({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My Pokemons',
  description: 'My App is about Pokemons',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
      </head>
      <body className={signika.className}>
        <div id="root">
          <ReduxProvider>{children}</ReduxProvider>
        </div>
      </body>
    </html>
  );
}
