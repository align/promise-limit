export default class Limit {
    constructor(max = 1) {
        this.limit = max;
        this.count = 0;
        this.queue = [];
    }

    // 入队
    enqueue(fn) {
        return new Promise((resolve, reject) => {
            this.queue.push({
                fn,
                resolve,
                reject,
            });
        });
    }
    // 出队
    dequeue() {
        if (this.count < this.limit && this.queue.length) {
            const {
                fn,
                resolve,
                reject,
            } = this.queue.shift();

            this.run(fn)
                .then(resolve)
                .catch(reject);
        }
    }
    // 执行
    async run(fn) {
        this.count++;
        const value = await fn();
        this.count--;
        this.dequeue();
        return value;
    }
    // 构建
    build(fn) {
        const canRun = this.count < this.limit;
        return canRun
            ? this.run(fn)
            : this.enqueue(fn);
    }
}