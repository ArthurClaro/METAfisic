#!/usr/bin/env bash
# exit on error
# set -e   # (opcional)

yarn
yarn prisma generate
yarn build
