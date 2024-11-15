function summation(a, b, callback) {
    callback(a + b);
}

function subtraction(a, b, callback) {
    callback(a - b);
}

function multiplication(a, b, callback) {
    callback(a * b);
}

function modification(callback) {
    summation(1, 2, (res1) => {
        subtraction(res1, -1, (res2) => {
            multiplication(res2, 12, (res3) => {
                callback(res3); // Pass the final result to the callback
            });
        });
    });
}

// Call modification with a callback to capture and log the result
modification((res) => {
    console.log("Final result:", res);
});
