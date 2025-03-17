#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "INSTALLING AND BUILDING survey-library..."
echo "-----------------------------------------"
cd "$SCRIPT_DIR/../surveyjs/survey-library" || exit 1
echo "Installing survey-library dependencies..."
npm i --ignore-scripts # Skip husky install

# Build survey-library packages in order
cd "$SCRIPT_DIR/../surveyjs/survey-library/packages/survey-core" || exit 1
echo "Building survey-core..."
npm i --ignore-scripts
npm run build:icons || npm run build_icons || echo "No icons build script found, continuing..."
npm run build

cd ../survey-js-ui || exit 1
echo "Building survey-js-ui..."
npm i --ignore-scripts
npm run build

echo "-----------------------------------------"
echo "survey-library dependencies installed and built successfully"
echo "-----------------------------------------" 