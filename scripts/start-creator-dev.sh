#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "STARTING survey-creator development server..."
echo "-----------------------------------------"

# Change to the survey-creator-js directory
cd "$SCRIPT_DIR/../surveyjs/survey-creator/packages/survey-creator-js" || exit 1

# Start the development server
npm run start

# This line will only be reached if the server is stopped
echo "-----------------------------------------"
echo "Development server stopped"
echo "-----------------------------------------" 