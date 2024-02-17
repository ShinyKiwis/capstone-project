FROM apache/superset
# Switching to root to install the required packages
USER root
# Example: installing the PostgreSQL driver to connect to the metadata database
RUN pip install psycopg2-binary
# Example: installing a driver to connect to Redshift
# Find which driver you need based on the analytics database
# you want to connect to here:
# https://superset.apache.org/installation.html#database-dependencies
# RUN pip install sqlalchemy-redshift
# Switching back to using the `superset` user
USER superset