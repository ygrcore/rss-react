import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'My Pokemons',
  description: 'My App is about Pokemons'
}

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
      <body>
        <div id="root">{children}</div>
      </body>
    </html>
  );
}