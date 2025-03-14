#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "BUILDING survey-creator..."
echo "-----------------------------------------"

# Build survey-creator packages
cd "$SCRIPT_DIR/../surveyjs/survey-creator/packages/survey-creator-core" || exit 1
echo "-----------------------------------------"
echo "BUILDING survey-creator-core..."
echo "-----------------------------------------"
npm run build

cd ../survey-creator-js || exit 1
echo "-----------------------------------------"
echo "BUILDING survey-creator-js..."
echo "-----------------------------------------"
npm run build

echo "-----------------------------------------"
echo "survey-creator built successfully"
echo "-----------------------------------------" 