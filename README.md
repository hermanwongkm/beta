# Beta 

## Migration
----
1. Creating a migration script: `yarn knex migrate:make {yourScriptName}`.
2. This will create a file under `src/db/migrations` and you can then populate the entire script.
3. You can execute the migration script using `npx knex migrate:latest`.
4. You can execute a rollback with `knex migrate:rollback`. 
----

## Running 
1. yarn start 
