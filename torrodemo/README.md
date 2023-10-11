# Torrodemo

## Description

## Local Setup

### Requirements

- [Docker](https://www.docker.com/)
- [Horizon Github](https://github.com/devasiapro/horizon)

### Steps

The steps are relative to the project folder "horizon/torrodemo" unless stated otherwise.

1. Install dependencies Composer through Docker
```
docker run -it --rm -v `pwd`:/app composer install
```

2. Run Docker using Sail
```
./vendor/bin/sail up
```

3. Create file ".env" based from ".env.example"

4. Run migration files
```
./vendor/bin/sail artisan migrate
```

5. Run seeder files
```
./vendor/bin/sail db:seed
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

To Follow
