// Listening to widget page messages
const allowedOrigins = ['https://form.jotform.com', 'https://widgets.jotform.io', 'https://jotform-widget.pages.dev'];
let pushedPages = []; // Accumulating pushed pages to make sure we don't send one twice. 
window.addEventListener('message', (event) => {
    // Check if the origin is one of the allowed origins
    if (allowedOrigins.includes(event.origin)) {
        // Check if the event name is the one we want
        if (event.data.event_name == 'form_page_visible') {
            const pushedData = {
                event: 'form_interaction', //Changing name to comply with GA4 naming convention in tracking plan
                formName: event.data.formName,
                page: event.data.page
            }
            // Make sure we haven't pushed this page before. Initially looked at the whole pushedData object, 
            // but GTM does weird shenanigans with with it by modifying the object even though it's a const.
            if (!pushedPages.includes(event.data.page)) {
                window.dataLayer = window.dataLayer || [];
                window.dataLayer.push(pushedData);
                pushedPages.push(event.data.page);
            }
        } else if (event.data.event_name == 'form_completed') {
            const pushedData = {
                event: event.data.event_name,
                formName: event.data.formName,
                page: undefined
            }
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push(pushedData);
        }
    }
}, false);