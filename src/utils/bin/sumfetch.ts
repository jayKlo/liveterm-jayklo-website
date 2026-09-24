import config from '../../../config.json';

const sumfetch = async (args: string[]): Promise<string> => {
  return `<section class="profile-summary" aria-label="About and contact">
<div><h2>${config.name}</h2><p>${config.ps1_hostname}</p></div>
<dl>
<dt>Email</dt><dd><a href="mailto:${config.email}">${config.email}</a></dd>
<dt>GitHub</dt><dd><a href="https://github.com/${config.social.github}" target="_blank" rel="noopener noreferrer">github.com/${config.social.github}</a></dd>
<dt>LinkedIn</dt><dd><a href="https://linkedin.com/in/${config.social.linkedin}" target="_blank" rel="noopener noreferrer">linkedin.com/in/${config.social.linkedin}</a></dd>
<dt>Source</dt><dd><a href="${config.repo}" target="_blank" rel="noopener noreferrer">Website repository</a></dd>
</dl></section>`;
};

export default sumfetch;
