# syntax=docker/dockerfile:1
######################################################################
#  Build an image that can:                                         #
#  • serve your Node/Express API                                    #
#  • compile/run Python, C, C++, and Java programs on demand        #
######################################################################
FROM ubuntu:22.04

# ---- language runtimes & compilers --------------------------------
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive \
    apt-get install -y --no-install-recommends \
      python3 python3-venv \
      build-essential gcc g++ \
      openjdk-17-jdk-headless \
      curl git && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$PATH:$JAVA_HOME/bin

# ---- Node runtime -------------------------------------------------
ARG NODE_VERSION=20
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION}.x | bash - && \
    apt-get install -y nodejs

# ---- App install --------------------------------------------------
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev          # install prod deps only
COPY . .

EXPOSE 8080
CMD ["node", "./server.js"]
