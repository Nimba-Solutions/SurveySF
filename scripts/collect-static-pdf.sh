#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."
STATIC_RESOURCES="$ROOT/force-app/main/default/staticresources"

# Add trap to handle Ctrl+C
trap 'echo -e "\nScript interrupted by user. Exiting..."; exit 1' SIGINT

echo "-----------------------------------------"
echo "Starting survey-pdf file copy to staticresources..."
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


# Copy Survey PDF Files to Static Resources
echo "Copying survey.pdf.min.js..."
copy_file "$ROOT/surveyjs/survey-pdf/build/survey.pdf.min.js" "$STATIC_RESOURCES/surveypdf.js"

echo "Copying survey.pdf.fonts.min.js..."
copy_file "$ROOT/surveyjs/survey-pdf/build/survey.pdf.fonts.min.js" "$STATIC_RESOURCES/surveypdffonts.js"

echo "Copying jspdf.umd.min.js..."
copy_file "$ROOT/surveyjs/survey-pdf/node_modules/jspdf/dist/jspdf.umd.min.js" "$STATIC_RESOURCES/jspdfmin.js"

echo "-----------------------------------------"
echo "Survey PDF copy operations completed"
echo "-----------------------------------------" 