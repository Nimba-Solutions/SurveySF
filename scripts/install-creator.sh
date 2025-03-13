#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "INSTALLING AND BUILDING survey-creator..."
echo "-----------------------------------------"
cd "$SCRIPT_DIR/../surveyjs/survey-creator" || exit 1
echo "Installing survey-creator dependencies..."
npm i --ignore-scripts

# Build survey-creator packages
cd packages/survey-creator-core || exit 1
echo "-----------------------------------------"
echo "INSTALLING AND BUILDING survey-creator-core..."
echo "-----------------------------------------"
npm i --ignore-scripts
npm run build

cd ../survey-creator-js || exit 1
echo "-----------------------------------------"
echo "INSTALLING AND BUILDING survey-creator-js..."
echo "-----------------------------------------"
npm i --ignore-scripts
npm run build

echo "-----------------------------------------"
echo "survey-creator dependencies installed and built successfully"
echo "-----------------------------------------" 