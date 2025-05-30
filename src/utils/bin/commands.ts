// List of commands that do not require API calls

import * as bin from './index';
import config from '../../../config.json';

// Help
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort().join(', ');
  var c = '';
  for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
    if (i % 7 === 0) {
      c += Object.keys(bin).sort()[i - 1] + '\n';
    } else {
      c += Object.keys(bin).sort()[i - 1] + ' ';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

// About
export const about = async (args: string[]): Promise<string> => {
  return `Hi, I am ${config.name}. 
Welcome to my website!
More about me:
'sumfetch' - short summary.
'resume' - my latest resume.
'readme' - my github readme.`;
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Donate
export const donate = async (args: string[]): Promise<string> => {
  return `Thanks for considering a donation! Here are your options:

[1] <u><a href="https://neal.fun/spend/" target="_blank">Spend Bill Gates' Money</a></u> 💰
[2] <u><a href="https://3pic.github.io/money" target="_blank">Spend Elon's Fortune</a></u> 🚀
[3] <u><a href="https://joshworth.com/dev/wealthgap/" target="_blank">US Wealth Distribution</a></u> 📊

(Spoiler: You probably need more directories than I can afford 😅)
`;
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);

  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);

  return 'Opening linkedin...';
};

// Search
export const google = async (args: string[]): Promise<string> => {
  window.open(`https://google.com/search?q=${args.join(' ')}`);
  return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
  window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
  return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
  window.open(`https://bing.com/search?q=${args.join(' ')}`);
  return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
  window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
  return `Searching reddit for ${args.join(' ')}...`;
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `
drwxr-xr-x  2 ${config.ps1_username}  staff  📁 home/
drwxr-xr-x  2 ${config.ps1_username}  staff  📁 projects/
drwxr-xr-x  2 ${config.ps1_username}  staff  📁 blog/
drwxr-xr-x  2 ${config.ps1_username}  staff  📁 contact/
drwxr-xr-x  2 ${config.ps1_username}  staff  📁 skills/
-rw-r--r--  1 ${config.ps1_username}  staff  📄 about.md
-rw-r--r--  1 ${config.ps1_username}  staff  📄 resume.pdf
-rw-r--r--  1 ${config.ps1_username}  staff  📄 README.md

Type 'cd <directory>' to navigate
Type 'cat <file>' to view file contents
`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const nano = async (args?: string[]): Promise<string> => {
  return `...just no.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

// Banner
export const banner = (args?: string[]): string => {
  return `
     ██╗ █████╗ ██╗   ██╗██╗  ██╗██╗      ██████╗ 
     ██║██╔══██╗╚██╗ ██╔╝██║ ██╔╝██║     ██╔═══██╗
     ██║███████║ ╚████╔╝ █████╔╝ ██║     ██║   ██║
██   ██║██╔══██║  ╚██╔╝  ██╔═██╗ ██║     ██║   ██║
╚█████╔╝██║  ██║   ██║   ██║  ██╗███████╗╚██████╔╝
 ╚════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝╚══════╝ ╚═════╝ 
                                                  
Type 'help' to see the list of available commands.
Type 'sumfetch' to display summary.
`;
};
