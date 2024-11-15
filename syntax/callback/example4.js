function task1(callback) {
    console.log("task 1 completed");
    callback();
}

function task2(callback) {
    setTimeout(() => {
        console.log("task 2 completed");
        callback();
    }, 3000);
}

function task3(callback) {
    console.log("Task Three processing");
    setTimeout(() => {
        console.log("Data processing");
        callback(234); // Pass 234 as data after processing is complete
    }, 3000);
}

function tasks() {
    task1(() => {
        task2(() => {
            task3((result) => {
                console.log("Final result:", result); // Log the result from task3
            });
        });
    });
}

// Run the tasks
tasks();
