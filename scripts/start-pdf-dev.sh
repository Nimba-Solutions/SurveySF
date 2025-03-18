#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "STARTING survey-pdf development server..."
echo "-----------------------------------------"

# Change to the survey-pdf directory
cd "$SCRIPT_DIR/../surveyjs/survey-pdf" || exit 1

# Start the development server
npm run serve

# This line will only be reached if the server is stopped
echo "-----------------------------------------"
echo "Development server stopped"
echo "-----------------------------------------" 