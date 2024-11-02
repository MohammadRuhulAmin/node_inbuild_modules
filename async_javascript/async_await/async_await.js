const hasMeeting = false;

const meeting = new Promise((resolve, reject) => {
    if (!hasMeeting) {
        const meetingDetails = {
            name: 'Technical Meeting',
            location: 'Google Meet',
            time: '10:00 PM'
        };
        resolve(meetingDetails); 
    } else {
        reject(new Error('Meeting already scheduled!')); // Reject if meeting is already scheduled
    }
});

const meetingDetails = (details) => {
    const calendar = `${details.name} was scheduled on ${details.location} at ${details.time}`;
    return Promise.resolve(calendar); // Return a resolved Promise with the calendar details
}

async function meetingInfo() {
    try {
        const details = await meeting; // Wait for the meeting Promise
        const calendar = await meetingDetails(details); // Wait for the meetingDetails Promise
        console.log(calendar);
    } catch (err) {
        console.log(err.message); // Log any errors
    }finally{
        console.log("Process Execution done!")
    }
}

meetingInfo();
