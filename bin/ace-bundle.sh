#!/usr/bin/env bash

# rebuild ace if needed
if [[ ! -f public/ace/src-min/ace.js ]]; then
  node ace/Makefile.dryice.js -m -target public/ace
fi

build_ace () {
  for path in public/ace/src-min/{ace.js,theme-monokai.js,{mode-,snippets/}{css,text,javascript,xml,json,markdown,yaml,twig,typescript,html}.js}; do
    cat $path
  done
}
build_ace > public/ace-bundle.js
