# Version 2 of Horizon API

## Notes

- Migration
```
npx typeorm-ts-node-commonjs migration:run -d src/database/database.options.ts
```

- To populate customer and dashboard data.
```
npm run game-fetcher
```

## Local Setup

### Requirements

- [NVM](https://github.com/nvm-sh/nvm)
- CRM API setup. Refer to README in the rest_api folder.
- Access to the GIT repository project. 
  The assumption is that you've already cloned the codebase in your local machine
  and is inside the project folder as reference.
- The instructions are based in Linux environment.

### Steps


### Deployment

1. Fetch codebase and go to relavant project folder.
```
git clone git@github.com:devasiapro/horizon.git
cd rest_api_v2
```

2. Install Node dependencies:
```
nvm install 16
nvm use 16
npm install
```

3. Create .env based in .env.local and update values

4. Create database
```
# If MySQL
CREATE DATABASE horizon_v2;
```

5. Build
```
npm run build
```

6. Run using PM2
```
npm install pm2@latest -g
pm2 start dist/main.js --name horizon
```

7. Run database migration
```
npx typeorm-ts-node-commonjs migration:run -d src/database/database.options.ts
```

8. Run initial data
```
node dist/main-command.js initializer
```

8. Add a user
```
node dist/main-command.js user-generator -u chris -p testpassword
```

9. To populate game-session data
```
node dist/main-command.js game-fetcher --startdate=2023-11-01 --enddate=2023-11-15
```
