# Services builder
FROM node:18.15.0-alpine as builder
# Create app directory
WORKDIR /app
RUN npm install -g npm@9.7.2
# Copy packages config
COPY [ \
"tsconfig*.json", \
"package*.json", \
"./" \
]
COPY ./packages/srv-users/*.json ./packages/srv-users/
COPY ./packages/srv-vehicles/*.json ./packages/srv-vehicles/
COPY ./packages/utils ./packages/utils
#RUN find packages -name "package.json" -not -path "*/node_modules/*" -print0  | xargs -0 -n1 -I path bash -c 'mkdir --parents "config/$(dirname path)" && cp path ./config/path'

# Install all dependencies
RUN npm ci
# Generate contracts
#COPY tsconfig.json ./tsconfig.json
COPY ./keys ./keys
# Bundle app sources (if we need to add a new service then we should copy its directory)
COPY packages/srv-users ./packages/srv-users
COPY packages/srv-vehicles ./packages/srv-vehicles
# Build services (if we need to add a new service then we should add its workspace)
RUN npm run build \
    -w=packages/srv-users \
    -w=packages/srv-vehicles


# Image that contains all services, it was done to speed up the process of building and to be able to run all TS services in one container
FROM node:18-alpine as development
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/tsconfig.json /app
COPY --from=builder /app/packages /app/packages
WORKDIR /app
# Add docker-compose-wait tool to wait for depend on services
ENV WAIT_VERSION 2.9.0
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/$WAIT_VERSION/wait /wait
RUN chmod +x /wait
# Start the server using the development build, auth service by default
#CMD ["sh", "-c" , "/wait && cd packages/srv-users && npm run migration:up && node dist/main.js"]
