#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "INSTALLING AND BUILDING survey-library..."
echo "-----------------------------------------"
cd "$SCRIPT_DIR/../surveyjs/survey-library" || exit 1
echo "Building survey-library..."
npm i --ignore-scripts # Skip husky install

# First build survey-library packages in order
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
echo "INSTALLING AND BUILDING survey-creator..."
echo "-----------------------------------------"
cd "$SCRIPT_DIR/../surveyjs/survey-creator" || exit 1
echo "Building survey-creator..."
npm i --ignore-scripts

# Now build survey-creator packages
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
echo "All dependencies installed and built"
echo "-----------------------------------------"

# Wait for user input
read -p "Press Enter to continue..." 