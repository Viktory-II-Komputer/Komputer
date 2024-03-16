
// Setup, initialize front-end here.

if (window.Worker) {
    const worker = new Worker("worker.js", {type: "module"});

    // Listener to receive worker messages.
    // event.data has whatever is passed from the worker.
    worker.addEventListener("message", (event) =>
    {
        // Update the front-end here.
        console.log(event.data);

        
    });

    // Example of sending a message to the worker.
    // The argument can be null, a single item, or a single array, if sending more than one item.
    // Only native values or copies of data object literals are sent (so no class types, methods, etc.). 
    // Send messages to control setup, trigger start, etc.
    worker.postMessage(null);
}
else
{
    console.log("Sorry, your browser doesn't appear to support Javascript web workers.");
}
