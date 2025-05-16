# SurveyJS Event Debugger

A Lightning Web Component (LWC) that provides a visual interface for monitoring and debugging SurveyJS events.

## Features

- **Event Discovery**: Automatically discovers all available events in the SurveyJS Creator instance
- **Event Filtering**: Select which events to monitor
- **Event Logging**: Displays event logs in real-time
- **Categorized Events**: Groups events by category (creator, survey, dragDrop)
- **Drag-Drop Focus**: Automatically selects drag-drop related events by default
- **Collapsible UI**: Expand/collapse the debugger UI as needed

## Usage

1. Add the component to your SurveyJS Creator LWC template:

```html
<c-survey-js-event-debugger creator-instance={creatorInstance}></c-survey-js-event-debugger>
```

2. Make sure your main component exposes the `creatorInstance` property:

```javascript
creatorInstance = null;

// In your initialization code:
const creator = new SurveyCreator.SurveyCreator(options);
this.creatorInstance = creator;
```

3. The debugger will automatically discover available events and start monitoring drag-drop related events.

4. Use the UI to select additional events to monitor or clear the event logs.

## How It Works

The debugger intercepts SurveyJS event subscriptions by replacing the `add` method on event objects. This allows it to log events before they reach their original handlers.

When an event is triggered, the debugger extracts relevant information from the event and displays it in the UI.

## Troubleshooting

- If events aren't being logged, make sure the `creatorInstance` is properly passed to the debugger component.
- Some events may not be discovered if they're added dynamically after initialization. Use the `refresh` method to rediscover events:

```javascript
this.template.querySelector('c-survey-js-event-debugger').refresh();
```

- The debugger limits the number of logged events to prevent performance issues. You can adjust this limit by modifying the `maxLogs` property in the component. 