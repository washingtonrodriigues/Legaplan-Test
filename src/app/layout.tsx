import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Legaplan Teste',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body>{children}</body>
    </html>
  );
}
