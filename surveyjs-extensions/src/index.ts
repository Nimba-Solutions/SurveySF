import { UuidPropertyEditor } from './uuidPropertyEditor';

// Export all components
export { UuidPropertyEditor };

// Main initialization function that registers all extensions
export function initializeExtensions(): void {
    console.log('Initializing SurveyJS extensions...');

    // Register the UUID property editor
    UuidPropertyEditor.register();

    console.log('SurveyJS extensions initialized successfully');
}

// Auto-initialize if window is available (browser environment)
if (typeof window !== 'undefined') {
    // Add the initialize function to the window object for external access
    (window as any).SurveyJSExtensions = {
        initializeExtensions,
        UuidPropertyEditor
    };

    // Check if Survey is already loaded
    if (typeof (window as any).Survey !== 'undefined') {
        console.log('Survey global found, initializing extensions immediately');
        initializeExtensions();
    } else {
        console.log('Survey global not found, extensions will need manual initialization');
    }
} 