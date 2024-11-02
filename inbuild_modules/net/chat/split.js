function processReceived(buffered){
    let received = buffered.split('\n')
    console.log(received)
    while(received.length > 1){
        console.log(received[0])
        buffered = received.slice(1).join('\n')
        received = buffered.split('\n')
    }
}


processReceived('line 1\n line 2 \n line 3 \n line 4')