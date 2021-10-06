# Beta 

## Migration
----
1. You can create a MODEL and a MIGRATION SCRIPT using the command `node_modules/.bin/sequelize model:create --name Todo --attributes title:string,something:integer` Note that there should not be spaces between the attributes.
2. This will create a file under `src/db/migrations` and you can then populate the entire script as well as a model under `src/db/models`.
2. Next, you can execute the migration script using `node_modules/.bin/sequelize db:migrate` 
4. You can execute a rollback with `node_modules/.bin/sequelize db:migrate:undo`
----

## Running 
1. go to `config/docker` and run `docker-compose up`
2. yarn start 

## Sequelize setup
1. Sequelize's configuration file path is declared in `.sequelizerc` 
2. folders and files were generated with `yarn sequelize init` 
3. This will generate 3 folders/file, `config.json`, `migration` folder and `models` folder.
4. `config.json` will contain the username and password for the database connection.

