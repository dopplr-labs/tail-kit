#!/bin/bash

if [ ! -d "heroicons" ]; then
  git clone https://github.com/tailwindlabs/heroicons
fi

if [ ! -d "../src/components/icons/outline" ]; then
  mkdir '../src/components/icons/outline'
fi

if [ ! -d "../src/components/icons/solid" ]; then
  mkdir '../src/components/icons/solid'
fi

node convert-svg-to-icons.js

# remove the heroicons directory after creating all the icons
rm -rf ./heroicons
