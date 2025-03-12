#!/bin/bash

cd ../surveyjs/survey-creator/packages/survey-creator-js
echo "-----------------------------------------"
echo "Starting development server..."
echo "-----------------------------------------"

# Start the watch process in the background
npm run watch:dev &

# Start the dev server in the background
npm run start &

echo "-----------------------------------------"
echo "Dev server starting at http://localhost:8083"
echo "-----------------------------------------"

# Keep the script running so the background processes don't terminate
wait 