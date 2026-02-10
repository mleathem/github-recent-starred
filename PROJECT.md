# Project Overview

Development challenge: Angular - "implement a small webapp that will list the most starred Github repos that were created in the last 30 days. You'll be fetching the sorted JSON data directly from the Github API"

# Features added

- GDPR permission: before the third-party API request is made, the user must click a checkbox to agree they are aware a third-party may gain IP data
- Context menu - pertaining to the Github Repository (URL, issues URL, Copy clone command etc)

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

- First test run - test-results/first-run.txt
- Last test run - test-results/last-run.txt

- Success test first pass - test-results/second-run.txt

# Notes / bugs

For the conext menu (in `repo-item` component) Angular Aria was used. This seems to give good accessibility support, but during testing the keyboard tab key behaviour is unexpected - to replicate:

- tab to repo item
- 'Enter' to open menu
- the arrow up down can be used to select menu items (as expected). But the tab key closes the menu.
- Note: escape closes menu as expected
  This may well be correct, but further research could be done to ensure correct behaviour.
