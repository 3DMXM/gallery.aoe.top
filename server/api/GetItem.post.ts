import { Config } from "~/model/Config"
import { OneDrive } from "~/model/OneDrive"

export default defineEventHandler(async (event: any) => {
    let { path } = await readBody(event)
    // 在 path 在前面添加 Config.onedriveRoot
    path.unshift(Config.onedriveRoot)
    // 移除空值
    path = path.filter((item: string) => item)

    const od = new OneDrive()
    let data = await od.GetChildren(path)

    if (data.value) {
        return {
            code: '00',
            data: data.value
        }
    } else {
        return {
            code: '99',
            message: '获取列表失败',
        }
    }
})