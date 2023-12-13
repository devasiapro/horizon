# Playtech Demo 

## Description

## Local Setup

### Requirements

- [Docker](https://www.docker.com/)
- [Horizon Github](https://github.com/devasiapro/horizon)
- [Game List Document](https://drive.google.com/drive/u/0/folders/1cQY84wlm6V0pSZgSmzv3fGij18h9NURr)

### Steps

The steps are relative to the project folder "horizon/ptdemo" unless stated otherwise.

Make sure to download the latest Excel files for the game list and place in appropriate file
location based in the fetch-games command (database/raw_files).

1. Install dependencies Composer through Docker
```
docker run -it --rm -v `pwd`:/app composer install
```

2. Run Docker using Sail
```
./vendor/bin/sail up
./vendor/bin/sail artisan key:generate
```

3. Create file ".env" based from ".env.example"

4. Run migration files
```
./vendor/bin/sail artisan migrate
```

5. Run seeder files
```
php artisan app:fetch-games all
```

6. Setup frontend
```
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

7. Check browser in http://localhost

NOTES:

- Use Docker's exec command if you need to run stuff like composer installs.
```
docker exec -it torrodemo-laravel.test-1 bash
```

## Production Setup

- AWS LightSail
- https://torrodemo.horizon88.com
- Game list document

1. Update and upgrade
```
sudo apt update
sudo apt upgrade
```

2. Install Nginx
```
sudo apt install nginx
sudo systemctl status nginx
sudo systemctl restart nginx
sudo nginx -t
```

2. Install PHP
```
sudo apt install --no-install-recommends php8.1
sudo apt-get install php8.1-cli php8.1-common php8.1-mysql php8.1-zip php8.1-gd php8.1-mbstring php8.1-curl php8.1-xml php8.1-bcmath php8.1-fpm
```

3. Install Composer
```
curl -sS https://getcomposer.org/installer -o /tmp/composer-setup.php
HASH=`curl -sS https://composer.github.io/installer.sig`
echo $HASH
php -r "if (hash_file('SHA384', '/tmp/composer-setup.php') === '$HASH') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
sudo php /tmp/composer-setup.php --install-dir=/usr/local/bin --filename=composer
composer
```

4. Install MySQL
```
sudo apt install mysql-server
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your password';
```

5. Set permissions
```
sudo mkdir -p /var/www/html/
sudo chown -R ubuntu:ubuntu /var/www/html/
```

6. Clone laravel
```
cd /var/www/html
git clone git@github.com:devasiapro/horizon.git
git checkout dev # change to branch
sudo chmod -R ugo+rw storage/logs
chmod -R ugo+rw storage/framework
composer install
php artisan key:generate
```

7. Set Nginx
```
cd /etc/nginx/sites-available/
sudo vim default
```

```
server {
    listen 80;
    listen [::]:80;
    server_name torrodemo.horizon88.com;
    root /var/www/html/horizon/torrodemo/public;
 
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-Content-Type-Options "nosniff";
 
    index index.php;
 
    charset utf-8;
 
    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }
 
    location = /favicon.ico { access_log off; log_not_found off; }
    location = /robots.txt  { access_log off; log_not_found off; }
 
    error_page 404 /index.php;
 
    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.1-fpm.sock;
        fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
        include fastcgi_params;
    }
 
    location ~ /\.(?!well-known).* {
        deny all;
    }
}
```

8. Set values of .env

9. Setup frontend
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 16
nvm use 16
npm install
npm run build
```

10. Check browser http://torrodemo.horizon88.com

11. Setup SSH using Let's Encrypt
```
sudo snap install core; sudo snap refresh core
sudo apt remove certbot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
sudo certbot --nginx -d torrodemo.horizon88.com
sudo systemctl status snap.certbot.renew.service
```

11. Check browser at https://torrodemo.horizon88.com. Make sure .env is updated from http to https.
