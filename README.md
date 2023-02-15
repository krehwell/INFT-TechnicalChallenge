NIFT Technical Challenge

## Description
_np: I don't have much time to finish all together with the UI (Busy with job in this slavery world, yo!). So, I just made the API_

Project tree
```bash
.
├── package.json
├── README.md
├── src                 # Source code dir
│   ├── app.ts          # Main API Initializer
│   ├── exceptions
│   ├── interfaces
│   ├── middleware
│   ├── referralCode    # Routes and all "Referral Code" related handler
│   ├── server.ts
│   └── utils
├── tsconfig.json
├── tslint.json
└── yarn.lock
```

I shared my `.env` in this repo which normally should not. But for the sake of simplicity to connect it to my mongodb atlas,
this repo includes it anyway

## Installation

```bash
yarn install
```

## Running

```bash
yarn dev
```

For API testing, you can load the Postman json script in "./misc/Referral Codes CRUD.postman_collection.json" and test it
using Postman. The script should include all the CRUD operation template.

API path should follows:
