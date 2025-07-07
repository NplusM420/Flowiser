import { INodeParams, INodeCredential } from '../src/Interface'

class VeniceAIApi implements INodeCredential {
    label: string
    name: string
    version: number
    description: string
    inputs: INodeParams[]

    constructor() {
        this.label = 'Venice AI API'
        this.name = 'veniceAIApi'
        this.version = 1.0
        this.description = 'Use this credential to authenticate with Venice AI'
        this.inputs = [
            {
                label: 'Venice AI API Key',
                name: 'veniceAIApiKey',
                type: 'password',
                placeholder: 'vk-xxxxxxxxxxxxxxxxxxxxxxxx'
            }
        ]
    }
}

module.exports = { credClass: VeniceAIApi }
