import Limit from './limit.mjs';
import { DF, get } from './_.mjs';

const limit = new Limit(3);
const list = [1000, 3000, 2000, 4000, 1000, 1000, 2000, 4000, 5000];
const x = {
    async build(f) {
        return await f();
    },
};
const start = (needLimit = false) => {
    const F = needLimit ? limit : x;
    console.log(`${DF.ms(new Date())}\t start promise.all`);
    Promise.all(list.map((l, i) => {
        return F.build(() => get(`/api/${i}-${l}`, { delay: l, }));
    }))
        .then(results => {
            console.log('results:', results);
            console.log(`${DF.ms(new Date())}\t end promise.all`);
        });
};

start(process.argv[2] === '1')