import React from 'react';
import config from '../../config.json';

export const Ps1 = ({ active = false }: { active?: boolean }) => {
  return (
    <span className={`prompt${active ? ' prompt-active' : ''}`}>
      {!active && <span className="prompt-user">{config.ps1_username}@</span>}
      <span className="prompt-host">{config.ps1_hostname}</span>
      <span> ~ $</span>
    </span>
  );
};

export default Ps1;
