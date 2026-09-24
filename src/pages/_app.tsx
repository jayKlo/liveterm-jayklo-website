import React from 'react';
import '../styles/global.css';
import Head from 'next/head';
import config from '../../config.json';
import { useTheme } from '../utils/theme';

const palette = Object.fromEntries(
  Object.entries(config.colors).flatMap(([theme, colors]) =>
    Object.entries(colors).map(([token, value]) => [
      `--${theme}-${token}`,
      value,
    ]),
  ),
) as React.CSSProperties;

const App = ({ Component, pageProps }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const { theme, setTheme } = useTheme();

  return (
    <>
      <Head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
      </Head>

      <main className="site-shell" data-theme={theme} style={palette}>
        <Component
          {...pageProps}
          inputRef={inputRef}
          theme={theme}
          setTheme={setTheme}
        />
      </main>
    </>
  );
};

export default App;
