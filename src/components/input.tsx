import React, { RefObject, Dispatch, SetStateAction } from 'react';
import { shell } from '../utils/shell';
import { handleTabCompletion } from '../utils/tabCompletion';
import { Ps1 } from './Ps1';

interface InputProps {
  inputRef: RefObject<HTMLInputElement>;
  containerRef: RefObject<HTMLDivElement>;
  command: string;
  history: { command: string }[];
  lastCommandIndex: number;
  setCommand: Dispatch<SetStateAction<string>>;
  setHistory: Dispatch<SetStateAction<any>>;
  setLastCommandIndex: Dispatch<SetStateAction<number>>;
  clearHistory: () => void;
}

export const Input: React.FC<InputProps> = ({
  inputRef,
  containerRef,
  command,
  history,
  lastCommandIndex,
  setCommand,
  setHistory,
  setLastCommandIndex,
  clearHistory,
}) => {
  const onSubmit = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    const commands: string[] = history
      .map(({ command }) => command)
      .filter((command: string) => command);

    if (event.key === 'c' && event.ctrlKey) {
      event.preventDefault();
      setCommand('');
      setHistory('');
      setLastCommandIndex(0);
    }

    if (event.key === 'l' && event.ctrlKey) {
      event.preventDefault();
      clearHistory();
    }

    if (event.key === 'Tab' && !event.shiftKey && command.trim()) {
      event.preventDefault();
      handleTabCompletion(command, setCommand);
    }

    if (event.key === 'Enter' || event.code === '13') {
      event.preventDefault();
      setLastCommandIndex(0);
      await shell(command, setHistory, clearHistory, setCommand);
      containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex + 1;
      if (index <= commands.length) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      }
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      if (!commands.length) {
        return;
      }
      const index: number = lastCommandIndex - 1;
      if (index > 0) {
        setLastCommandIndex(index);
        setCommand(commands[commands.length - index]);
      } else {
        setLastCommandIndex(0);
        setCommand('');
      }
    }
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setCommand(value);
  };

  return (
    <div className="terminal-input-row">
      <label htmlFor="prompt">
        <Ps1 active />
      </label>

      <input
        ref={inputRef}
        id="prompt"
        type="text"
        className="terminal-input"
        aria-label="Terminal command"
        placeholder="Type a command…"
        value={command}
        onChange={onChange}
        onKeyDown={onSubmit}
        autoComplete="off"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck="false"
      />
    </div>
  );
};

export default Input;
