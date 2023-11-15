# Horizon CRM Frontend

## Description

Frontend codebase for Horizon CRM.

## Local Setup (Manual)

### Requirements

- [NVM](https://github.com/nvm-sh/nvm)
- CRM API setup. Refer to README in the rest_api folder.
- Access to the GIT repository project. 
  The assumption is that you've already cloned the codebase in your local machine
  and is inside the project folder as reference.
- The instructions are based in Linux environment.

### Steps
1. Go to the "crm_frontend" folder.
```
cd crm_frontend
```
2. Update values in .env file

3. Activate NodeJS if haven't done so.
```
nvm use 16
npm install 16
```

4. Run development server
```
npm run dev
```

5. Check in Browser

## Production Deployment

1. Go to folder
```
cd crm_frontend
```

2. Ensure that .env is of propervalue

2. Install NodeJS
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 16
nvm use 16
npm install
```

3. Run build
```
npm run build-light
```

4. Install Nginx
```
sudo apt update
sudo apt install nginx
```

5. Create nginx file
```
vim /etc/nginx/sites-available/crm.horizon88.com
```

```
server {
        listen 80;
        listen [::]:80;

        root /var/www/horizon/crm_frontend/dist;
        index index.html index.htm index.nginx-debian.html;

        server_name crm.horizon88.com;

        location / {
                try_files $uri /index.html;
        }
}
```

6. Create softlink for Nginx file
```
sudo ln -s /etc/nginx/sites-available/crm.horizon88.com /etc/nginx/sites-enabled/
```

7. Setup SSL using Let's Encrypt
```
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d crm.horizon88.com
sudo systemctl restart nginx
```
