#!/bin/bash

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <userId>"
  exit 1
fi

fleetId=$(node script.js "$@")

echo "$fleetId"
