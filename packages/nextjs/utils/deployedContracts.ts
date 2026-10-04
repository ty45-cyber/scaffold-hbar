export const deployedContracts = {
  "ScaffoldHBAR": {
    "address": "0x41Db632021ED879189fb77dd4d1f7B3B1868B598",
    "abi": [
      {
        "inputs": [],
        "name": "greeting",
        "outputs": [
          {
            "internalType": "string",
            "name": "",
            "type": "string"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      },
      {
        "inputs": [
          {
            "internalType": "string",
            "name": "_greeting",
            "type": "string"
          }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ]
  }
} as const;
