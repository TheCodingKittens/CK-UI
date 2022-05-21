import axios from "axios";
import {getDomain} from "./domain-utils";


const api = axios.create({
    baseURL: getDomain(),
    headers: {'Content-Type': 'application/json'}
});

api.get = () => {
    return {
        status: 200,
        data: [
            {
                "id": 1,
                "commands": [
                    {
                        "command": "a = 2",
                        "id": "07287eaa-817b-4ef1-b5e6-36ba539eff80",
                        "type": "Line"
                    }
                ],
                "output": "",
                "vars": {
                    "a": 2
                },
                "edges": []
            },
            {
                "id": 2,
                "commands": [
                    {
                        "command": "b = 3",
                        "id": "adcbe713-5d00-4b6a-95cc-dd3f6ca36a2d",
                        "type": "Line"
                    }
                ],
                "output": "",
                "vars": {
                    "a": 2,
                    "b": 3
                },
                "edges": []
            },
            {
                "id": 3,
                "commands": [
                    {
                        "command": "if a > 1:",
                        "id": "0473bea2-2285-44a8-9bd5-ac66bfd48a02",
                        "type": "If.test"
                    },
                    {
                        "id": "b1af4965-4694-4dd2-8b58-d5216f3fecfe",
                        "type": "If.body",
                        "value": [
                            {
                                "command": "b = 0",
                                "id": "f864a772-5d94-48c5-bb2f-cf2b3afd4752",
                                "type": "Line"
                            },
                            {
                                "command": "print('it worked!')",
                                "id": "7eee112e-8c0f-4c20-b718-2da4c7301c97",
                                "type": "Line"
                            }
                        ]
                    },
                    {
                        "command": "else:",
                        "id": "a6fdd8a1-f270-4f53-85c2-65422af28171",
                        "type": "If.else",
                        "value": [
                            {
                                "command": "b = 1",
                                "id": "5ae26049-5599-4c00-aba1-2cc0173886ba",
                                "type": "Line"
                            }
                        ]
                    }
                ],
                "output": "it worked!",
                "vars": {
                    "a": 2,
                    "b": 0
                },
                "edges": [
                    {
                        "from": "0473bea2-2285-44a8-9bd5-ac66bfd48a02",
                        "to": "b1af4965-4694-4dd2-8b58-d5216f3fecfe"
                    },
                    {
                        "from": "0473bea2-2285-44a8-9bd5-ac66bfd48a02",
                        "to": "a6fdd8a1-f270-4f53-85c2-65422af28171"
                    },
                    {
                        "from": "f864a772-5d94-48c5-bb2f-cf2b3afd4752",
                        "to": "7eee112e-8c0f-4c20-b718-2da4c7301c97",
                        "parent": "b1af4965-4694-4dd2-8b58-d5216f3fecfe"
                    }
                ]
            },
            {
                "id": 4,
                "commands": [
                    {
                        "command": "1 + 1",
                        "id": "544f54ff-4dfe-42ab-a81b-5f878e8edd5c",
                        "type": "Line"
                    }
                ],
                "output": "2",
                "vars": {
                    "a": 2,
                    "b": 0
                },
                "edges": []
            },
            {
                "id": 5,
                "commands": [
                    {
                        "command": "print('and thats it.')",
                        "id": "de9747af-4128-446b-8596-fc0a9a1339ca",
                        "type": "Line"
                    }
                ],
                "output": "and thats it.",
                "vars": {
                    "a": 2,
                    "b": 0
                },
                "edges": []
            },
            {
                "id": 6,
                "commands": [
                    {
                        "command": "while a < 4:",
                        "id": "b7539dee-37f1-4525-b5b4-5d255e533603",
                        "type": "While.test"
                    },
                    {
                        "id": "ac8b9e72-8097-4e4c-a0b7-872cc2c887e5",
                        "type": "While.body",
                        "value": [
                            {
                                "command": "b += 1",
                                "id": "8fb49374-8f19-4ff0-b03b-e23379cd243c",
                                "type": "Line"
                            },
                            {
                                "command": "print(b)",
                                "id": "fb5a2d63-2310-4d21-bf73-e04a15afda01",
                                "type": "Line"
                            },
                            {
                                "command": "a += 1",
                                "id": "ba2d3e1f-f3e4-4c6d-87a2-ec82779551d7",
                                "type": "Line"
                            }
                        ]
                    }
                ],
                "output": "1\n2",
                "vars": {
                    "a": 4,
                    "b": 2
                },
                "edges": [
                    {
                        "from": "b7539dee-37f1-4525-b5b4-5d255e533603",
                        "to": "ac8b9e72-8097-4e4c-a0b7-872cc2c887e5"
                    },
                    {
                        "from": "ac8b9e72-8097-4e4c-a0b7-872cc2c887e5",
                        "to": "b7539dee-37f1-4525-b5b4-5d255e533603"
                    },
                    {
                        "from": "8fb49374-8f19-4ff0-b03b-e23379cd243c",
                        "to": "fb5a2d63-2310-4d21-bf73-e04a15afda01",
                        "parent": "ac8b9e72-8097-4e4c-a0b7-872cc2c887e5"
                    },
                    {
                        "from": "fb5a2d63-2310-4d21-bf73-e04a15afda01",
                        "to": "ba2d3e1f-f3e4-4c6d-87a2-ec82779551d7",
                        "parent": "ac8b9e72-8097-4e4c-a0b7-872cc2c887e5"
                    }
                ]
            }
        ]
    }
};

export {
    api
};