import axios from 'axios'


export interface DedustAssetToken {
    type: string,
    name: string,
    symbol: string,
    image: string,
    decimals: number,
    riskScore: number,
    address?: string,
    source?: {
        chain: string,
        address: string,
        bridge: string,
        symbol: string,
        name: string
    }
}

export class DedustApi {
    private _url = 'https://api.dedust.io/v2'

    public async send(url: string): Promise<any | undefined> {
        const apiToUse = this._url

        const res = await axios.get(`${apiToUse}${url}`)

        if (res.data.error) {
            console.error(res.data.error)
            return undefined
        }

        return res.data
    }

    async getAssets (): Promise<DedustAssetToken[] | undefined> {
        const data = await this.send('/assets')

        return data
    }
}
