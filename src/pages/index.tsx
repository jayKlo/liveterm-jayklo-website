import Head from 'next/head';
import React from 'react';
import config from '../../config.json';
import { Input } from '../components/input';
import { useHistory } from '../components/history/hook';
import { History } from '../components/history/History';
import { banner } from '../utils/bin';
import { Theme } from '../utils/theme';

interface IndexPageProps {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const IndexPage: React.FC<IndexPageProps> = ({ inputRef, theme, setTheme }) => {
  const containerRef = React.useRef(null);
  const {
    history,
    command,
    lastCommandIndex,
    setCommand,
    setHistory,
    clearHistory,
    setLastCommandIndex,
  } = useHistory([{ id: 0, date: new Date(0), command: '', output: banner() }]);

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollIntoView({ block: 'nearest' });
      if (window.matchMedia('(pointer: fine)').matches) {
        inputRef.current.focus({ preventScroll: true });
      }
    }
  }, [history]);

  return (
    <>
      <Head>
        <title>{config.title}</title>
      </Head>

      <section className="terminal" aria-label="JayKlo terminal">
        <header className="terminal-header">
          <div className="terminal-title">
            <span className="terminal-mark" aria-hidden="true">
              &gt;_
            </span>
            <span>{config.ps1_hostname}</span>
            <span className="terminal-title-detail">/ terminal</span>
          </div>
          <label className="theme-control">
            <span>Theme</span>
            <select
              aria-label="Theme"
              value={theme}
              onChange={(event) => setTheme(event.target.value as Theme)}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
        </header>
        <div ref={containerRef} className="terminal-body">
          <History history={history} />

          <Input
            inputRef={inputRef}
            containerRef={containerRef}
            command={command}
            history={history}
            lastCommandIndex={lastCommandIndex}
            setCommand={setCommand}
            setHistory={setHistory}
            setLastCommandIndex={setLastCommandIndex}
            clearHistory={clearHistory}
          />
          <footer className="terminal-hints" aria-label="Keyboard shortcuts">
            <span>
              <kbd>Tab</kbd> autocomplete
            </span>
            <span>
              <kbd>↑ ↓</kbd> history
            </span>
            <span>
              <kbd>Ctrl L</kbd> clear
            </span>
          </footer>
        </div>
      </section>
    </>
  );
};

export default IndexPage;
