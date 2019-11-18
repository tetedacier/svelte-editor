#!/usr/bin/env bash
build_ace () {
  for path in public/ace/src-min/{ace.js,theme-monokai.js,{mode-,snippets/}{css,text,javascript,json,markdown,yaml,twig,typescript,html}.js}; do
    cat $path
  done
}
build_ace > public/ace-bundle.js
# build_ace
