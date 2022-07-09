import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
const accBob = await stdlib.newTestAccount(startingBalance);
  await stdlib.newTestAccounts(2, startingBalance);
console.log('Hello, Alice and Bob!');

const fmt = (x) => stdlib.formatCurrency(x, 4);
const getBalance = async (who) => fmt(await stdlib.balanceOf(who));
console.log('Launching...');
const ctcAlice = accAlice.contract(backend);
const ctcBob = accBob.contract(backend, ctcAlice.getInfo());
const beforeAlice = await getBalance(accAlice);
const beforeBob = await getBalance(accBob);
console.log('Starting backends...');
await Promise.all
  backend.Alice(ctcAlice, {
    ...stdlib.hasRandom,
    // implement Alice's interact object here
  }),
  backend.Bob(ctcBob, {
    ...stdlib.hasRandom,
    // implement Bob's interact object here
  }),

  ctcAlice.p.Alice({
    ...Player('Alice'),
    wager: stdlib.parseCurrency(5),
  }),
  ctcBob.p.Bob({
    ...Player('Bob'),
    acceptWager: (amt) => {
      console.log(`Bob accepts the wager of ${fmt(amt)}.`);   

},
})




