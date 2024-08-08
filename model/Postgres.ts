import { sql } from "@vercel/postgres";


export class Postgres {

    /**
     * 获取数据
     * @param tableName 表名
     * @param where 筛选参数
     * @param select 查询参数
     * @returns 
     */
    public static async Get(tableName: string, where: string, select = '*') {
        return await sql`SELECT ${select} FROM ${tableName} WHERE ${where};`
    }

    /**
     * 插入数据
     * @param tableName 表名
     * @param data 数据
     * @returns 
     */
    public static async Insert(tableName: string, data: any) {
        let keys = Object.keys(data)
        let values = Object.values(data)
        let sqlStr = `INSERT INTO ${tableName} (${keys.join(',')}) VALUES (${values.map((item: any) => `'${item}'`).join(',')});`
        return await sql`${sqlStr}`
    }

    /**
     * 更新数据
     * @param tableName 表名
     * @param data 数据
     * @param where 筛选参数
     * @returns 
     */
    public static async Update(tableName: string, data: any, where: string) {
        let keys = Object.keys(data)
        let values = Object.values(data)
        let sqlStr = `UPDATE ${tableName} SET ${keys.map((item, index) => `${item}='${values[index]}'`).join(',')} WHERE ${where};`
        return await sql`${sqlStr}`
    }

    /**
     * 删除数据
     * @param tableName 表名
     * @param where 筛选参数
     * @returns 
     */
    public static async Delete(tableName: string, where: string) {
        return await sql`DELETE FROM ${tableName} WHERE ${where};`
    }

    /**
     * 自定义
     * @param sqlStr 
     * @returns 
     */
    public static async Query(sqlStr: string) {
        return await sql`${sqlStr}`
    }

}