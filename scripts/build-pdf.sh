#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "BUILDING survey-pdf..."
echo "-----------------------------------------"

# Build survey-pdf
cd "$SCRIPT_DIR/../surveyjs/survey-pdf" || exit 1
echo "Building survey-pdf main package..."
npm run build

echo "Building survey-pdf fonts..."
npm run build:fonts

echo "-----------------------------------------"
echo "survey-pdf built successfully"
echo "-----------------------------------------" 