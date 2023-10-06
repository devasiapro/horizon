# Horizon REST API

## Description

Rest API for Horizon.

## Local Setup (Manual)

### Requirements

- [Python 3]()
- [MySQL]()
- Access to the GIT repository project. 
  The assumption is that you've already cloned the codebase in your local machine
  and is inside the project folder as reference.
- The instructions are based in Linux environment.

### Steps

1. Go to the "rest_api" folder.
```
cd rest_api
```

2. Initialize Virtualenv
```
python venv env
```

3. Activate Virtualenv
```
source env/bin/activate
```

4. Install Python dependencies 
```
pip install -r requirements.txt
```

5. Create database
```
mysql -u [YOUR_USER_HERE] -p
CREATE DATABASE horizon
exit
```

6. Update the .env.local file for proper credentials and save as .env

7. Run migration script
```
alembic upgrade head
```

8. To rollback
```
alembic downgrade base
```

## Local Setup (Docker)

To Follow

## Production Setup

To Follow
