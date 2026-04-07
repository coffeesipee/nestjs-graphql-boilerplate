-- init.sql

-- Create the publication for the tables you want to watch
-- This example watches a 'transactions' table
CREATE PUBLICATION loyalty_cdc_pub FOR TABLE transactions;

-- Create the permanent replication slot
SELECT pg_create_logical_replication_slot('loyalty_service_cdc_slot', 'pgoutput');

-- Grant replication permission to the user
-- The user 'myuser' is created from the environment variables in docker-compose.yml
ALTER USER myuser WITH REPLICATION;