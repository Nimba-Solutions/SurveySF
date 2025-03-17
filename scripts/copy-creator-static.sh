#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."
STATIC_RESOURCES="$ROOT/force-app/main/default/staticresources"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "Starting creator file copy to staticresources..."
echo "Target directory: $STATIC_RESOURCES"
echo "-----------------------------------------"

# Create the directory if it doesn't exist
mkdir -p "$STATIC_RESOURCES"

# Function to copy file and echo status
copy_file() {
    local src="$1"
    local dest="$2"
    if cp "$src" "$dest"; then
        echo "SUCCESS"
    else
        echo "FAILED"
        return 1
    fi
}

echo "Copying survey-creator-core.min.css..."
copy_file "$ROOT/surveyjs/survey-creator/packages/survey-creator-core/build/survey-creator-core.min.css" "$STATIC_RESOURCES/surveycreatorcorecss.css"

echo "Copying survey-creator-core.min.js..."
copy_file "$ROOT/surveyjs/survey-creator/packages/survey-creator-core/build/survey-creator-core.min.js" "$STATIC_RESOURCES/surveycreatorcorejs.js"

echo "Copying survey-creator-js.min.js..."
copy_file "$ROOT/surveyjs/survey-creator/packages/survey-creator-js/build/survey-creator-js.min.js" "$STATIC_RESOURCES/surveycreatormin.js"

echo "-----------------------------------------"
echo "Creator copy operations completed"
echo "-----------------------------------------" 