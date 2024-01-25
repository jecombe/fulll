#!/bin/bash

# Vérifiez si au moins un argument est fourni
if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <userId>"
  exit 1
fi

# Exécutez votre script Node.js avec tous les arguments de la ligne de commande
fleetId=$(node script.js "$@")

# Renvoyez le fleetId sur la sortie standard
echo "$fleetId"
