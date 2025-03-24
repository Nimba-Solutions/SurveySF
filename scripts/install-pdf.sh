#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "INSTALLING AND BUILDING survey-pdf..."
echo "-----------------------------------------"
cd "$SCRIPT_DIR/../surveyjs/survey-pdf" || exit 1
echo "Installing survey-pdf dependencies..."
npm i --ignore-scripts # Skip husky install

# Build survey-pdf packages
echo "Building survey-pdf..."
npm run build
npm run build:fonts

echo "-----------------------------------------"
echo "survey-pdf dependencies installed and built successfully"
echo "-----------------------------------------" 