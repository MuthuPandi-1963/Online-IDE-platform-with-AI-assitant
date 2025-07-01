// Just a placeholder so Docker doesn't crash
console.log("Worker started... waiting for jobs from Redis");

// Later: pull jobs from Redis queue and compile
setInterval(() => {
  console.log("Worker idle...");
}, 5000);
