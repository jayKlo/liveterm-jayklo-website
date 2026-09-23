#!/bin/sh
# Clone and install this website using its committed npm lockfile.
set -eu

command -v node >/dev/null 2>&1 || { echo "Install Node.js 24.21.0 first." >&2; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "Install npm 11.19.0 or newer first." >&2; exit 1; }

git clone https://github.com/jayKlo/liveterm-jayklo-website.git
cd liveterm-jayklo-website
npm ci
printf '\nInstalled. Run: cd liveterm-jayklo-website && npm run dev\n'
