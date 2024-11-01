let clients = new Map();

clients.set('Ruhul', 1)
clients.set('Sakib',2)
clients.set('Sajid',3)
console.log(clients);
console.log(clients.get('Ruhul'))

for(const [cname,cid] of clients){
    console.log(`cname: ${cname} , cid: ${cid}`)
}