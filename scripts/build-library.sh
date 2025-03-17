#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "BUILDING survey-library..."
echo "-----------------------------------------"

# Build survey-library packages in order
cd "$SCRIPT_DIR/../surveyjs/survey-library/packages/survey-core" || exit 1
echo "Building survey-core..."
npm run build

cd ../survey-js-ui || exit 1
echo "Building survey-js-ui..."
npm run build

echo "-----------------------------------------"
echo "survey-library built successfully"
echo "-----------------------------------------" 