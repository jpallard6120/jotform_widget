// Listening to widget page messages
const allowedOrigins = ['https://form.jotform.com', 'https://widgets.jotform.io', 'https://jotform-widget.pages.dev'];
window.addEventListener('message', (event) => {
    // Check if the origin is one of the allowed origins
    if (allowedOrigins.includes(event.origin)) {
        console.log('Received message:', event);
        debugger
        // Check if the event name is the one we want
        if (event.data.event_name == 'form_page_visible') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: event.data.event_name,
                formName: event.data.formName,
                page: event.data.page
            });
        }
        if (event.data.type == 'submit') {
            console.log('Submit event: ', event)
            debugger
        }
    }
}, false);

// Listening to all submit events
document.addEventListener('submit', function(event) {
    // Get the form element from the event's target
    console.log('Event is: ', event)
    debugger
    const form = event.target;
    // Check if the form's action attribute starts with the desired URL prefix
    if (form.action && form.action.startsWith("https://submit.jotform.com/submit/")) {
        // Your custom event handling logic here
        console.log('Form submitted:', form);
    }
});
