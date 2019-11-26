#!/usr/bin/env bash
git submodule init
git submodule update

pushd ace
npm install
popd

./bin/ace-bundle.sh
