import { Postgres } from '~/model/Postgres'

import { sql } from "@vercel/postgres";


export default defineEventHandler(async (event: any) => {
    let { id, type } = await readBody(event)


    if (type == 'GET') {
        let { rows } = await sql`SELECT * FROM like WHERE id=${id};`

        if (rows.length = 0) {
            // rows = (await Postgres.Insert('like', { id: id, count: 0 })).rows
            rows = (await sql`INSERT INTO like (id, count) VALUES (${id}, 0) RETURNING *;`).rows
        }

        return {
            code: "00",
            data: rows
        }
    } else if (type == "ADD") {

        // let { rows } = await Postgres.Get('like', `id=${id}`)
        let { rows } = await sql`SELECT * FROM like WHERE id=${id};`

        if (rows.length == 0) {
            // await Postgres.Insert('like', { id: id, count: 1 })
            rows = (await sql`INSERT INTO like (id, count) VALUES (${id}, 1);`).rows
        } else {
            let count = rows[0].count + 1
            // await Postgres.Update('like', { count: count }, `id=${id}`)
            rows = (await sql`UPDATE like SET count=${count} WHERE id=${id} RETURNING *;`).rows
        }
        // rows = (await Postgres.Get('like', `id=${id}`)).rows


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