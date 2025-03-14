#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."
STATIC_RESOURCES="$ROOT/force-app/main/default/staticresources"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "Starting library file copy to staticresources..."
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

echo "Copying survey-core.min.css..."
copy_file "$ROOT/surveyjs/survey-library/packages/survey-core/build/survey-core.min.css" "$STATIC_RESOURCES/surveycoremin.css"

echo "Copying survey.core.min.js..."
copy_file "$ROOT/surveyjs/survey-library/packages/survey-core/build/survey.core.min.js" "$STATIC_RESOURCES/surveycore.js"

echo "Copying survey-js-ui.min.js..."
copy_file "$ROOT/surveyjs/survey-library/packages/survey-js-ui/build/survey-js-ui.min.js" "$STATIC_RESOURCES/surveyjsui.js"

echo "-----------------------------------------"
echo "Library copy operations completed"
echo "-----------------------------------------" 