if (window.Worker) {
    const worker = new Worker("worker.js", {type: "module"});
    console.log("Worker object created.");
}
else
{
    console.log("Sorry, your browser doesn't appear to support Javascript web workers.");
}
