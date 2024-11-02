const hasMeeting = true;
const meeting = new Promise((resolve,reject)=>{
    if(!hasMeeting){
        const mettingDetails = {
            name:'Technical Meeting',
            location: ' Google Meet',
            time: '10:00 PM'
        }
        resolve(mettingDetails)
    }else{
        reject(new Error(`Meeting already scheduled!`))
    }
});

meeting
    .then((resolve)=>{
        console.log(JSON.stringify(resolve))
    })
    .catch((reject)=>{
        console.log(reject.message)
    })
