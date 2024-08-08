import { Postgres } from '~/model/Postgres'

export default defineEventHandler(async (event: any) => {
    let { id, type } = await readBody(event)


    if (type == 'GET') {
        let { rows } = await Postgres.Get('like', `id=${id}`)

        if (rows.length = 0) {
            rows = (await Postgres.Insert('like', { id: id, count: 0 })).rows
        }

        return {
            code: "00",
            data: rows
        }
    } else if (type == "ADD") {

        let { rows } = await Postgres.Get('like', `id=${id}`)

        if (rows.length == 0) {
            let time = new Date().getTime();
            await Postgres.Insert('like', { id: id, count: 1, time: time })
        } else {
            let count = rows[0].count + 1
            await Postgres.Update('like', { count: count }, `id=${id}`)
        }
        rows = (await Postgres.Get('like', `id=${id}`)).rows

        return {
            code: "00",
            data: rows
        }
    }


    return {
        code: "99",
        msg: "未知指令"
    }

})