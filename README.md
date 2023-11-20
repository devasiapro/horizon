# Horizon

## Description

CRM application for Realsourcing to monitor transactions between providers and developers.

Note that Torrospin Demo has it's own setup in the "torrodemo" folder.

## Local Installation

### Requirements

- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- Access in Github repository containing this project.

### Steps

Note: This assumes you have a project folder in any location like "~/Dev" or "~/Project". All the
commands or steps will be performed inside that folder unless specified otherwise.

- ```git clone https://github.com/horizon```
- ```cd horizon```
- ```docker compose up -d```
- Check your browser in http://localhost:3000 for frontend or http://localhost for backend

### Notes

- This is performed in a Linux or Unix based OS. Windows is to follow...

## Branching Guide

- In your local, create a branch name with the following naming convention: id-name-in-dash-followed-by-descriptive. e.g. scrum-42-bug-fix-for-login
- After development and local testing, push to Github then pull request to "staging" branch.
- Once tested in "staging" branch and is OK for deployment, make another pull request of your local ticket to the "production" branch to be deployed.

## Production Deployment

To Follow
