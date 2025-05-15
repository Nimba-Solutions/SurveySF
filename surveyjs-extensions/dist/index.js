import { UuidPropertyEditor } from './uuidPropertyEditor';
import { ObjectFieldMapper } from './objectFieldMapper';
// Export all components
export { UuidPropertyEditor, ObjectFieldMapper };
// Main initialization function that registers all extensions
export function initializeExtensions() {
    console.log('Initializing SurveyJS extensions...');
    // Register the UUID property editor
    UuidPropertyEditor.register();
    // Note: We don't auto-register ObjectFieldMapper here
    // It will be registered by its LWC companion component
    console.log('SurveyJS extensions initialized successfully');
}
// Auto-initialize if window is available (browser environment)
if (typeof window !== 'undefined') {
    // Add the initialize function to the window object for external access
    window.SurveyJSExtensions = {
        initializeExtensions: initializeExtensions,
        UuidPropertyEditor: UuidPropertyEditor,
        ObjectFieldMapper: ObjectFieldMapper
    };
    // Check if Survey is already loaded
    if (typeof window.Survey !== 'undefined') {
        console.log('Survey global found, initializing extensions immediately');
        initializeExtensions();
    }
    else {
        console.log('Survey global not found, extensions will need manual initialization');
    }
}
