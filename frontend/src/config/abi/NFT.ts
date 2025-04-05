export const CONTRACT_ADDRESS = "0x3c06eEe7294C426dDe5627595c4Ab811F50F8952";
export const CONTRACT_ABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "sociability",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "thinkingStyle",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "cooperation",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "riskTaking",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "curiosity",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "trustLevel",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "morality",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "adaptability",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "leadership",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "emotionControl",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "longTermVision",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "actionStyle",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "knowledgeSeeking",
                "type": "string"
            }
        ],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "user",
                "type": "address"
            }
        ],
        "name": "hasOwnedNFT",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "tokenId",
                "type": "uint256"
            }
        ],
        "name": "nftAttributes",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "string",
                        "name": "sociability",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "thinkingStyle",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "cooperation",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "riskTaking",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "curiosity",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "trustLevel",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "morality",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "adaptability",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "leadership",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "emotionControl",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "longTermVision",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "actionStyle",
                        "type": "string"
                    },
                    {
                        "internalType": "string",
                        "name": "knowledgeSeeking",
                        "type": "string"
                    }
                ],
                "internalType": "struct ShillNFT.ShillAttributes",
                "name": "",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];