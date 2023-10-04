// Function to test for object existence
function objectExists(arr, obj) {
    return arr.some(item => {
        return Object.keys(obj).every(key => obj[key] === item[key]) && 
               Object.keys(item).length === Object.keys(obj).length;
    });
}

// Listening to widget page messages
const allowedOrigins = ['https://form.jotform.com', 'https://widgets.jotform.io', 'https://jotform-widget.pages.dev'];
let pushedEvents = []; // Accumulating pushed events to make sure we don't send one twice. 
window.addEventListener('message', (event) => {
    // Check if the origin is one of the allowed origins
    if (allowedOrigins.includes(event.origin)) {
        // Check if the event name is the one we want
        if (event.data.event_name == 'form_page_visible' || event.data.event_name == 'form_submitted') {
            const pushedData = {
                event: event.data.event_name,
                formName: event.data.formName,
                page: event.data.page
            }
            // Make sure we haven't pushed this event before
            if (!objectExists(pushedEvents, pushedData)) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(pushedData);
                pushedEvents.push(pushedData)
            }
        }
    }
}, false);