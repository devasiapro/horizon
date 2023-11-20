# Horizon REST API

## Description

Rest API for Horizon.

## Local Setup (Manual)

### Requirements

- [Python 3](https://www.python.org/)
- [MySQL](https://www.mysql.com/)
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
sudo apt update
sudo apt install python3-pip
pip install virtualenv
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

8. If rollback is needed
```
alembic downgrade base
```

9. Run scripts for seeders
```
sh migration_seeder.sh
python scripts/populate_customer_module.py
```

10. Run local server using uvicorn
```
uvicorn src.main:app --port 8888 --reload
```

## Local Setup (Docker)

To Follow

## Production Setup

### Requirements

- [Python 3](https://www.python.org/)
- MySQL database instance.
- Access to the GIT repository project. 
- https://crm-api.horizon88.com

### Setup

Note: The parent folder is in "home/ubuntu".

1. Fetch codebase and go to relavant project folder.
```
git clone git@github.com:devasiapro/horizon.git
cd rest_api
```

2. Setup proper values in .env

3. Install Python packages
```
sudo apt update
sudo apt install python3-venv
```

4. Activate Python virtual environment
```
python3 -m venv env
source env/bin/activate
```

5. Install Python libraries 
```
pip install -r requirements.txt
```

6. Run Gunicorn server
```
gunicorn src.main:app -k uvicorn.workers.UvicornWorker
```

7. Create systemd unit file in the /etc/systemd/system
```
vim /etc/systemd/system/horizon.service
```

```
[Unit]

Description=Gunicorn Daemon for Horizon 

After=network.target


[Service]

User=ubuntu

Group=www-data

WorkingDirectory=/home/ubuntu/horizon/rest_api

ExecStart=/home/ubuntu/horizon/rest_api/env/bin/gunicorn -c gunicorn_conf.py src.main:app


[Install]

WantedBy=multi-user.target
```

8. Start and enable Horizon
```
sudo systemctl start horizon
sudo systemctl enable horizon
```

9. Install Nginx
```
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

10. Create Nginx file in /etc/nginx/sites-available/crm-api.horizon88.com
```
server {
        client_max_body_size 64M;
        listen 80;
        server_name crm-api.horizon88.com;

        location / {
                proxy_pass             http://127.0.0.1:8000;
                proxy_read_timeout     60;
                proxy_connect_timeout  60;
                proxy_redirect         off;

                # Allow the use of websockets
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
}
```

11. Create softlink for Nginx file
```
sudo ln -s /etc/nginx/sites-available/crm-api.horizon88.com /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

12. Setup SSL using Let's Encrypt
```
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d crm-api.horizon88.com
sudo systemctl restart nginx
```

13. Run db migrations
```
alembic upgrade head
```
