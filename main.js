
if (window.Worker) {
    const worker = new Worker("worker.js", {type: "module"});
    console.log("Worker created.");

    // Listener to receive worker messages.
    const onMessage = function(event) 
    {
        // event.data has whatever was passed from the worker.
        // We can update the front-end from this data here.

    }

    // Example of how to send a message to the worker.
    // The argument can be null, a single item, or a single array, if sending more than one item.
    // Note that only copies of native values or data object literals can be sent. 
    // So a class instance sent (not recommended) would be converted to a generic data object, losing type & methods.
    // Likely, we'll want to send messages to change setup values and to trigger starting.
    worker.postMessage(null);
}
else
{
    console.log("Sorry, your browser doesn't appear to support Javascript web workers.");
}
