# ExpressChain - Blockchain Simulator


## What You'll Build

* Transaction mempool & mining
* Proof-of-Work (SHA256 hashing)
* Wallet balances with overspend protection
* Live web dashboard

---

## Quick Start

```bash
npm init -y
npm install express
mkdir public

# Copy server.js & public/index.html
node server.js

# Visit:
http://localhost:3000
```

---

## How It Works

```
1. Type transactions: Alice→Bob: 100
2. Transactions → Mempool (pending)
3. Every 10s → Mine Block (Proof-of-Work)
4. Block → Ledger (permanent storage)
5. Check balances live
```

---

##  Features

* Pre-funded wallets (Alice: 1000, Bob: 500, etc.)
* Overspending protection (balance validation)
* Real SHA256 mining with nonce
* Responsive UI with stats dashboard
* Balance checker for any address

---

## Test It

```
1. Alice→Bob: 100   → Alice: 900, Bob: 600
2. Bob→Carol: 50    → Bob: 550, Carol: 800
3. Check "Alice"    → View live balance
4. Watch mining     → New block every 10 seconds
```

---

## Extra Tasks

* Easy: Limit max 5 transactions per block
* Medium: Persist ledger to a JSON file

---

## Demo UI

![Demo UI](https://jad7ulghye.ufs.sh/f/hb6AeldjPrMw2d1PZxJ9u0sAqILKw7VtUbHOi8zajexShDmr)
