// Listening to widget page messages
const allowedOrigins = ['https://form.jotform.com', 'https://widgets.jotform.io', 'https://jotform-widget.pages.dev'];
window.addEventListener('message', (event) => {
    // Check if the origin is one of the allowed origins
    if (allowedOrigins.includes(event.origin)) {
        // Check if the event name is the one we want
        if (event.data.event_name == 'form_page_visible' || event.data.event_name == 'form_submitted') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                event: event.data.event_name,
                formName: event.data.formName,
                page: event.data.page
            });
        }
    }
}, false);