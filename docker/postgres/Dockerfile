FROM postgres:12
#FROM postgis/postgis:10-3.2-alpine

#RUN apt-get clean && apt-get update && \
#    apt-get install -y postgresql-contrib

#ADD *.sql /docker-entrypoint-initdb.d/

#FROM postgres:12-bullseye

#LABEL maintainer="PostGIS Project - https://postgis.net"

#ENV POSTGIS_MAJOR 3
#ENV POSTGIS_VERSION 3.2.1+dfsg-1.pgdg110+1

RUN apt-get update \
#      && apt-cache showpkg postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR \
      && apt-get install -y --no-install-recommends \
#           postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR=$POSTGIS_VERSION \
#           postgresql-$PG_MAJOR-postgis-$POSTGIS_MAJOR-scripts \
      && rm -rf /var/lib/apt/lists/*

#RUN mkdir -p /docker-entrypoint-initdb.d
#COPY ./initdb-postgis.sh /docker-entrypoint-initdb.d/10_postgis.sh
#COPY ./update-postgis.sh /usr/local/bin
