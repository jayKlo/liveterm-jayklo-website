import React from 'react';
import { History as HistoryInterface } from './interface';
import { Ps1 } from '../Ps1';
import { commandExists } from '../../utils/commandExists';

export const History: React.FC<{ history: Array<HistoryInterface> }> = ({
  history,
}) => {
  return (
    <>
      {history.map((entry: HistoryInterface, index: number) => (
        <div className="terminal-entry" key={entry.command + index}>
          {entry.command && (
            <div className="history-command">
              <Ps1 />
              <span className="history-command-text">{entry.command}</span>
            </div>
          )}

          <div
            className={`terminal-output${entry.command.trim() && !commandExists(entry.command) ? ' terminal-error' : ''}`}
            dangerouslySetInnerHTML={{ __html: entry.output }}
          />
        </div>
      ))}
    </>
  );
};

export default History;
