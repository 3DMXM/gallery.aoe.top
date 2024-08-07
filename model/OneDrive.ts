
import axios from 'axios'

import { Config } from './Config'

const { token } = Config

export class OneDrive {

    // 初始化
    constructor() {
        let token = Config.token

        let time = new Date().getTime();
        let expires_on = token.expires_on * 1000;

        // console.log(token);

        if ((!token.accessToken) || (expires_on != 0 && time > expires_on)) {
            console.log("token不存在或已过期, 重新更新!!!");
            this.GetAccessToken(token.refreshToken)
        }

    }

    /**
     * 通过 code 获取 RefreshToken
     * @param code 
     * @returns 
     */
    public async GetRefreshToken(code: string) {
        const url = "https://login.microsoftonline.com/common/oauth2/token";
        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: token.clientId,
                client_secret: token.clientSecret,
                code: code?.toString() || "",
                redirect_uri: token.redirectUri
            })
        })
        let data = await res.json()
        return data
    }

    /**
     * 通过 RefreshToken 获取 AccessToken
     * @param refreshToken 
     * @returns 
     */
    public async GetAccessToken(refreshToken: string) {

        const url = "https://login.microsoftonline.com/common/oauth2/token";

        let res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
                grant_type: "refresh_token",
                client_id: token.clientId,
                client_secret: token.clientSecret,
                refresh_token: refreshToken,
                redirect_uri: token.redirectUri,
            })
        })

        let data = await res.json()
        Config.token.accessToken = data.access_token
        Config.token.expires_on = data.expires_on

        return data
    }

    /**
     * 通过目录获取文件列表
     * @param path 
     * @returns 
     */
    public async GetChildren(path: string[]) {
        // 将 path 转换为url编码
        let UrlPath = encodeURIComponent(path.join('/'));

        let select = [
            'id', 'lastModifiedDateTime', 'name', 'file', 'parentReference', 'folder', 'size', '@microsoft.graph.downloadUrl'
        ]

        const url = `https://graph.microsoft.com/v1.0/me/drive/root:${UrlPath}:/children?select=${select.join(',')}`;

        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        let data = await res.json()
        return data
    }

    /**
     * 通过ID获取文件数据
     * @param fileId 
     * @returns 
     */
    public async GetFileData(fileId: string) {
        const url = `https://graph.microsoft.com/v1.0/me/drive/items/${fileId}/content`;

        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })

        let data = await res.text()
        return data
    }

    /**
    * 预览文件
    * @param itemId 
    * @returns 
    */
    public async GetPreview(itemId: string) {
        const url = `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}/preview`;
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        let data = await res.text()
        return data
    }

    /**
     * 通过ID获取文件数据
     * @param itemId 
     */
    public async GetFileDataById(itemId: string) {
        const url = `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}`;
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        let data = await res.json()

        return data
    }

    /**
     * 获取缩略图
     * @param itemId 
     * @returns 
     */
    public async GetThumbnails(itemId: string) {
        const url = `https://graph.microsoft.com/v1.0/me/drive/items/${itemId}/thumbnails`;
        let res = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token.accessToken}`,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        })
        let data = await res.json()
        return data
    }
}