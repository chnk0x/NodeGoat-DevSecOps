FROM node:20-alpine

ENV WORKDIR=/usr/src/app/
WORKDIR $WORKDIR

COPY package*.json $WORKDIR
RUN npm install --production --no-cache

FROM node:20-alpine

# Install available Alpine security updates
RUN apk --no-cache upgrade

# Remove package-manager tooling not required at application runtime
RUN rm -rf /usr/local/lib/node_modules/npm \
    /opt/yarn* \
    /usr/local/bin/npm \
    /usr/local/bin/npx \
    /usr/local/bin/yarn \
    /usr/local/bin/yarnpkg

ENV USER=node
ENV WORKDIR=/home/$USER/app
WORKDIR $WORKDIR

COPY --from=0 /usr/src/app/node_modules node_modules
RUN chown $USER:$USER $WORKDIR
COPY --chown=node . $WORKDIR

USER $USER
EXPOSE 4000