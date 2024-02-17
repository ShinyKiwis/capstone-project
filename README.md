# Capstone Project
This is a project for:
- Project management
- Assessment management
- Evaluation management

We use:
- Postgresql hosted on Supabase
- Apache Superset for BI operations
- Next.JS for front-end
- Nest.JS for back-end

How to run:

## Setup Apache Superset
1. Build the image:
```bash
docker image build -t eduva-superset .
```

2. Setup admin credentials:
```bash
docker exec -it eduva-superset superset fab create-admin \
              --username admin \
              --firstname Superset \
              --lastname Admin \
              --email admin@superset.com \
              --password admin
```

3. Init apache superset
```bash
docker exec -it superset superset init
```

4. Run the apache superset
```bash
docker run -d -p 8080:8088 -e "SUPERSET_SECRET_KEY=superSecretKey" --name eduva-superset eduva-superset
```