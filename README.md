# DIGITAL CV

## Prerequisite
- node
- npm

## Smart contract
```
npm install -g truffle
cd smart_contract
truffle deploy --network ropsten --reset
```

## Start server
```
npm install
npm start
```

## Add extension
On chrome go into this [link](chrome://extensions/) and enable *developer mode*. Then add *unpacked extension* and add the local directory called 
```
extension
```
PS: aggiornare url contratto e server deploy in *extension/script.js* se vengono cambiati.
