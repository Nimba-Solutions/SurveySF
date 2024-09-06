#!/bin/bash

# List of custom objects
custom_objects=("SurveyVersion__c" "PageElement__c" "ElementResponse__c" "SurveyResponse__c" "Element__c" "Page__c" "SurveyPage__c")

# Source files (the ones you want to duplicate)
source_classes=("SurveyDTO" "SurveyRepository" "SurveyService" "SurveyController" "SurveyAPI")

# Function to generate new class names based on object name and class type
generate_class_name() {
    local object_name=$1
    local class_type=$2

    # Remove the __c suffix and append the class type
    local base_object_name="${object_name%__c}"
    echo "${base_object_name}${class_type}.cls"
}

# Function to generate the lower case name for replacements
generate_lower_case_name() {
    local object_name=$1

    # Remove the __c suffix and make lowercase for variable name replacements
    echo "$(echo "${object_name%__c}" | tr '[:upper:]' '[:lower:]')"
}

# Function to duplicate a class for a custom object
duplicate_class() {
    local object_name=$1
    local source_class=$2
    local class_type=$3

    # Generate the new class name
    local new_class=$(generate_class_name "$object_name" "$class_type")
    
    # Generate the lower case variable name for survey
    local object_var_name=$(generate_lower_case_name "$object_name")

    # Replace all occurrences of Survey__c, Survey, and survey with the new object name and variable name
    sed -e "s/Survey__c/$object_name/g" \
        -e "s/\bSurvey\b/${object_name%__c}/g" \
        -e "s/\bsurvey\b/$object_var_name/g" \
        "$source_class.cls" > "$new_class"

    # Special handling for API class: update the @RestResource urlMapping
    if [ "$class_type" == "API" ]; then
        local api_url_mapping="/${object_var_name}s/*"
        sed -i "s#@RestResource(urlMapping='/surveys/\*')#@RestResource(urlMapping='$api_url_mapping')#" "$new_class"
    fi

    echo "Generated $new_class"
}

# Loop over all custom objects and duplicate each class
for object in "${custom_objects[@]}"; do
    duplicate_class "$object" "SurveyDTO" "DTO"
    duplicate_class "$object" "SurveyRepository" "Repository"
    duplicate_class "$object" "SurveyService" "Service"
    duplicate_class "$object" "SurveyController" "Controller"
    duplicate_class "$object" "SurveyAPI" "API"
done
