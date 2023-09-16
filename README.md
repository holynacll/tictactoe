## to run (require docker and docker compose)
git clone this-repo

mkdir this-repo

docker run --rm --interactive --tty \
  --volume $PWD:/app \
  composer install

./vendor/bin/sail up -d

./vendor/bin/sail exec laravel.test bash

cp .env.example .env

php artisan key:generate

php artisan migrate

npm i

npm run dev

url: http://localhost:8000/