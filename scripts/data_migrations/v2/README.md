This is a once-off migration of the database from v1 to v2.

We are currently doing migrations manually via the Xata UI. This is not great as we would like for all changes to be accountable via code. The solution to that is doing migrations with the Drizzle ORM, however, Drizzle only supports a direct Postgres connection. The legacy db on Xata does not allow direct connections, as such, we need to create a new DB and migrate everything over.

In this migration, we also:

- Make the pk for all tables to be UUIDv7
- Move the clerk ID into its own field
