/**
 * DF 时间格式化
 * R 请求
 * PLR 基于 PromiseLimit 的请求
 */
export const DF = {
    dateFormat(fmt, date) {
        let ret;
        const opt = {
            "Y+": date.getFullYear().toString(),
            "m+": (date.getMonth() + 1).toString(),
            "d+": date.getDate().toString(),
            "H+": date.getHours().toString(),
            "M+": date.getMinutes().toString(),
            "S+": date.getSeconds().toString(),
        };
        for (let k in opt) {
            ret = new RegExp("(" + k + ")").exec(fmt);
            if (ret) {
                fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1]
                    .length, "0")))
            };
        };
        return fmt;
    },
    ms(date) {
        return DF.dateFormat("MM:SS", date);
    },
};

export const get = (url = '', params = {}) => {
    const {
        delay = 0,
    } = params;
    console.log(`${DF.ms(new Date())}\t started: ${url}`);
    return new Promise((res, rej) => {
        setTimeout(() => {
            console.log(`${DF.ms(new Date())}\t ${url} finished`);
            res({
                url,
                params
            });
        }, delay);
    });
};

export default {};