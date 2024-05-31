# How to backup data
```
pg_dump -h aws-0-ap-southeast-1.pooler.supabase.com -U postgres.mfpktdcxpiomiijaclos -d postgres --schema=public -f supabase_dump.sql
```
# How to restore data
```
psql -h localhost -U eduva -d eduva_metabase -f supabase_dump.sql
```
