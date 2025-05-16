/**
 * Script to automatically copy built extension files to Salesforce static resources
 */
const fs = require('fs');
const path = require('path');

// Paths
const distDir = path.resolve(__dirname, '../dist');
const staticResourcesDir = path.resolve(__dirname, '../../force-app/main/default/staticresources');
const surveyExtensionsDir = path.join(staticResourcesDir, 'surveyExtensions');

// Get all JS files from dist directory (excluding unnecessary files)
const getExtensionFiles = () => {
  return fs.readdirSync(distDir)
    .filter(file => 
      // Include only .js files
      file.endsWith('.js') && 
      // Exclude declaration files
      !file.endsWith('.d.js') && 
      !file.includes('.map.') &&
      // Exclude index.js and surveyjs-extensions.js (the bundle)
      file !== 'index.js' && 
      file !== 'surveyjs-extensions.js'
    );
};

// Create static resource metadata XML
const createResourceMetaXml = (description) => {
  const metaXml = `<?xml version="1.0" encoding="UTF-8"?>
<StaticResource xmlns="http://soap.sforce.com/2006/04/metadata">
    <cacheControl>Public</cacheControl>
    <contentType>application/x-javascript</contentType>
    <description>${description}</description>
</StaticResource>`;

  fs.writeFileSync(path.join(staticResourcesDir, 'surveyExtensions.resource-meta.xml'), metaXml);
  console.log('Created metadata file: surveyExtensions.resource-meta.xml');
};

// Main execution
console.log('Starting to copy extensions to static resources...');

// Create the surveyExtensions directory if it doesn't exist
if (!fs.existsSync(surveyExtensionsDir)) {
  fs.mkdirSync(surveyExtensionsDir, { recursive: true });
  console.log(`Created directory: ${surveyExtensionsDir}`);
}

// Create metadata file if it doesn't exist
const metaFile = path.join(staticResourcesDir, 'surveyExtensions.resource-meta.xml');
if (!fs.existsSync(metaFile)) {
  createResourceMetaXml('SurveyJS Extensions for Salesforce LWC');
}

// Get all extension files and copy them
const extensionFiles = getExtensionFiles();
console.log(`Found ${extensionFiles.length} extension files to copy`);

if (extensionFiles.length === 0) {
  console.warn('No extension files found to copy! Check the filter criteria.');
}

extensionFiles.forEach(filename => {
  // Copy file to the surveyExtensions directory
  fs.copyFileSync(
    path.join(distDir, filename),
    path.join(surveyExtensionsDir, filename)
  );
  console.log(`Copied ${filename} to surveyExtensions static resource`);
});

console.log('All extensions copied successfully to surveyExtensions static resource'); 