#!/bin/bash

# List of custom objects
custom_objects=("SurveyVersion__c" "PageElement__c" "ElementResponse__c" "SurveyResponse__c" "Element__c" "Page__c" "SurveyPage__c")

# Directory paths
template_dir="./templates"
output_dir="./classes"

# Function to generate the lowercase version of object name (%%%object%%%)
generate_lower_case_name() {
    local object_name=$1
    # Remove __c suffix and make lowercase
    echo "$(echo "${object_name%__c}" | tr '[:upper:]' '[:lower:]')"
}

# Loop over all custom objects and process the templates
for object in "${custom_objects[@]}"; do
    lower_object=$(generate_lower_case_name "$object")

    # Process each template file
    for template in "$template_dir"/*.cls "$template_dir"/*.cls-meta.xml; do
        filename=$(basename -- "$template")
        
        # Replace %%%Object%%% and %%%object%%% with the current object and lower_object
        new_filename=$(echo "$filename" | sed "s/%%%Object%%%/${object%__c}/g")
        sed -e "s/%%%Object%%%/${object%__c}/g" -e "s/%%%object%%%/$lower_object/g" "$template" > "$output_dir/$new_filename"

        echo "Generated $new_filename"
    done
done
