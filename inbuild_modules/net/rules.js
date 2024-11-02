import { BlockList } from 'net';
const blockList = new BlockList();

// Custom rules array to keep track of added rules
const rules = [];

// Helper functions to add and store rules
function addAddressToBlockList(address) {
  blockList.addAddress(address);
  rules.push({ type: 'address', address });
}

function addRangeToBlockList(startAddress, endAddress) {
  blockList.addRange(startAddress, endAddress);
  rules.push({ type: 'range', startAddress, endAddress });
}

function addSubnetToBlockList(address, prefixLength, family = 'ipv4') {
  blockList.addSubnet(address, prefixLength, family);
  rules.push({ type: 'subnet', address, prefixLength, family });
}

function getRules() {
  return rules;
}

addAddressToBlockList('123.123.123.123');
addRangeToBlockList('10.0.0.1', '10.0.0.10');
addSubnetToBlockList('8592:757c:efae:4e45::', 64, 'ipv6');

// Display current rules
console.log('Current Block Rules:', getRules());
