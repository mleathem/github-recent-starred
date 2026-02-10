# Project Overview

Development challenge: Angular - "implement a small webapp that will list the most starred Github repos that were created in the last 30 days. You'll be fetching the sorted JSON data directly from the Github API"

# Features added

- **GDPR permission** - before the third-party API request is made, the user must click a checkbox to agree they are aware a third-party may gain IP data
- **Context menu** - pertaining to the Github Repository (URL, issues URL, Copy clone command etc)

# Demo URL

https://demo.leathem.de/github-recent-starred/

# Tech Choices

- Angular v21
- no router (one pager)
- Vitest (as default in v21)
- ESLint + Prettier
- Tailwind
- Angular Aria (new as of v21) for the repo-item menu

# How to Run

standard as default project - see README

# Test Results

- First test run - `test-results/first-run.txt`
- Following test fixes - `test-results/last-run-before-features-added.txt`
- Success test first pass - `test-results/second-run.txt`

- Final test run - `test-results/final-run.txt`

# Notes / bugs

For the conext menu (in `repo-item` component) Angular Aria was used. This seems to give good accessibility support, but during testing the keyboard tab key behaviour is unexpected - to replicate:

- `Tab` to select repo item
- `Enter` to open menu (open modal)
- Modal opens as expected
- The `arrows` up/down can be used to select menu items (as expected). But the `tab` key closes the menu. This was unexpected: expected was to tab through all menu items and after the final item the menu modal would slose
- Note: `escape` closes modal as expected
  This may well be true expected behaviour, but further research could be done to ensure correct behaviour.
