#!/bin/bash

# Get script directory and set paths
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT="$SCRIPT_DIR/.."
STATIC_RESOURCES="$ROOT/force-app/main/default/staticresources"

echo "-----------------------------------------"
echo "Starting file copy to staticresources..."
echo "Target directory: $STATIC_RESOURCES"
echo "-----------------------------------------"

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

echo "Copying defaultV2.css..."
copy_file "$SCRIPT_DIR/../surveyjs/survey-library/build/survey-core/defaultV2.css" "$STATIC_RESOURCES/defaultV2.css"

echo "Copying surveycore.js..."
copy_file "$SCRIPT_DIR/../surveyjs/survey-library/build/survey-core/survey.core.min.js" "$STATIC_RESOURCES/surveycore.js"

echo "Copying surveycreatorcorecss.css..."
copy_file "$SCRIPT_DIR/../surveyjs/survey-creator/packages/survey-creator-core/build/survey-creator-core.css" "$STATIC_RESOURCES/surveycreatorcorecss.css"

echo "Copying surveycreatorcorejs.js..."
copy_file "$SCRIPT_DIR/../surveyjs/survey-creator/packages/survey-creator-core/build/survey-creator-core.js" "$STATIC_RESOURCES/surveycreatorcorejs.js"

echo "Copying surveycreatormin.js..."
copy_file "$SCRIPT_DIR/../surveyjs/survey-creator/packages/survey-creator-core/build/survey-creator-core.min.js" "$STATIC_RESOURCES/surveycreatormin.js"

echo "Copying surveyjsui.js..."
copy_file "$SCRIPT_DIR/../surveyjs/survey-library/build/survey-js-ui/survey-js-ui.min.js" "$STATIC_RESOURCES/surveyjsui.js"

echo "-----------------------------------------"
echo "Copy operations completed"
echo "Source directory: $SCRIPT_DIR"
echo "-----------------------------------------"

# Wait for user input
read -p "Press Enter to continue..." 