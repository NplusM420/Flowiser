import { BaseCache } from '@langchain/core/caches'
import { ICommonObject, IMultiModalOption, INode, INodeData, INodeParams } from '../../../src/Interface'
import { getBaseClasses, getCredentialData, getCredentialParam } from '../../../src/utils'
import { ChatVeniceAI, ChatVeniceAIFields } from './FlowiseChatVeniceAI'
import { ChatOpenAI } from '@langchain/openai'

class ChatVeniceAI_ChatModels implements INode {
    label: string
    name: string
    version: number
    type: string
    icon: string
    category: string
    description: string
    baseClasses: string[]
    credential: INodeParams
    inputs: INodeParams[]

    constructor() {
        this.label = 'ChatVeniceAI'
        this.name = 'chatVeniceAI'
        this.version = 1.0
        this.type = 'ChatVeniceAI'
        this.icon = 'venice.svg'
        this.category = 'Chat Models'
        this.description = 'Venice AI chat models using OpenAI-compatible endpoint'
        this.baseClasses = [this.type, ...getBaseClasses(ChatOpenAI)]
        this.credential = {
            label: 'Connect Credential',
            name: 'credential',
            type: 'credential',
            credentialNames: ['veniceAIApi']
        }
        this.inputs = [
            {
                label: 'Cache',
                name: 'cache',
                type: 'BaseCache',
                optional: true
            },
            {
                label: 'Model Name',
                name: 'modelName',
                type: 'options',
                options: [
                    {
                        label: 'Venice Uncensored 1.1',
                        name: 'venice-uncensored',
                        description: 'Venice AI uncensored model (32K context)'
                    },
                    {
                        label: 'Venice Small',
                        name: 'qwen3-4b',
                        description: 'Fast, efficient model for simple tasks (32K context)'
                    },
                    {
                        label: 'Venice Medium',
                        name: 'mistral-31-24b',
                        description: 'Balanced model with vision support (131K context)'
                    },
                    {
                        label: 'Venice Large',
                        name: 'qwen3-235b',
                        description: 'Powerful model for complex tasks (131K context)'
                    },
                    {
                        label: 'Venice Reasoning',
                        name: 'qwen-2.5-qwq-32b',
                        description: 'Specialized for reasoning tasks (32K context)'
                    },
                    {
                        label: 'Llama 3.2 3B',
                        name: 'llama-3.2-3b',
                        description: 'Smallest, fastest Llama model (131K context)'
                    },
                    {
                        label: 'Llama 3.3 70B',
                        name: 'llama-3.3-70b',
                        description: 'Latest Llama with function calling (65K context)'
                    },
                    {
                        label: 'Llama 3.1 405B',
                        name: 'llama-3.1-405b',
                        description: 'Most intelligent Llama model (65K context)'
                    },
                    {
                        label: 'Dolphin 72B',
                        name: 'dolphin-2.9.2-qwen2-72b',
                        description: 'Most uncensored model (32K context)'
                    },
                    {
                        label: 'Qwen 2.5 VL 72B',
                        name: 'qwen-2.5-vl',
                        description: 'Vision-language model (32K context)'
                    },
                    {
                        label: 'Qwen 2.5 Coder 32B',
                        name: 'qwen-2.5-coder-32b',
                        description: 'Optimized for coding tasks (32K context)'
                    },
                    {
                        label: 'DeepSeek R1 671B',
                        name: 'deepseek-r1-671b',
                        description: 'Advanced reasoning model (131K context)'
                    },
                    {
                        label: 'DeepSeek Coder V2 Lite',
                        name: 'deepseek-coder-v2-lite',
                        description: 'Lightweight coding model (131K context)'
                    }
                ],
                default: 'venice-uncensored'
            },
            {
                label: 'Temperature',
                name: 'temperature',
                type: 'number',
                step: 0.1,
                default: 0.7,
                optional: true,
                description: 'Controls randomness of the output (0-2)'
            },
            {
                label: 'Streaming',
                name: 'streaming',
                type: 'boolean',
                default: true,
                optional: true,
                additionalParams: true
            },
            {
                label: 'Max Tokens',
                name: 'maxTokens',
                type: 'number',
                step: 1,
                optional: true,
                additionalParams: true,
                description: 'Maximum number of tokens to generate'
            },
            {
                label: 'Top P',
                name: 'topP',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true,
                description: 'Nucleus sampling: only sample from top P probability tokens'
            },
            {
                label: 'Frequency Penalty',
                name: 'frequencyPenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true,
                description: 'Penalize repeated tokens based on frequency (-2 to 2)'
            },
            {
                label: 'Presence Penalty',
                name: 'presencePenalty',
                type: 'number',
                step: 0.1,
                optional: true,
                additionalParams: true,
                description: 'Penalize tokens based on presence in text (-2 to 2)'
            },
            {
                label: 'Stop Sequence',
                name: 'stopSequence',
                type: 'string',
                rows: 4,
                optional: true,
                description: 'List of stop words to use when generating. Use comma to separate multiple stop words.',
                additionalParams: true
            },
            {
                label: 'Base URL',
                name: 'baseURL',
                type: 'string',
                optional: true,
                additionalParams: true,
                default: 'https://api.venice.ai/api/v1',
                description: 'Venice AI API base URL'
            },
            {
                label: 'Allow Image Uploads',
                name: 'allowImageUploads',
                type: 'boolean',
                description: 'Allow image input for multimodal models',
                default: true,
                optional: true
            }
        ]
    }

    async init(nodeData: INodeData, _: string, options: ICommonObject): Promise<any> {
        const temperature = nodeData.inputs?.temperature as string
        const modelName = nodeData.inputs?.modelName as string
        const maxTokens = nodeData.inputs?.maxTokens as string
        const topP = nodeData.inputs?.topP as string
        const frequencyPenalty = nodeData.inputs?.frequencyPenalty as string
        const presencePenalty = nodeData.inputs?.presencePenalty as string
        const stopSequence = nodeData.inputs?.stopSequence as string
        const streaming = nodeData.inputs?.streaming as boolean
        const baseURL = nodeData.inputs?.baseURL as string
        const allowImageUploads = nodeData.inputs?.allowImageUploads as boolean

        if (nodeData.inputs?.credentialId) {
            nodeData.credential = nodeData.inputs?.credentialId
        }
        const credentialData = await getCredentialData(nodeData.credential ?? '', options)
        const veniceAIApiKey = getCredentialParam('veniceAIApiKey', credentialData, nodeData)

        const cache = nodeData.inputs?.cache as BaseCache

        const obj: ChatVeniceAIFields = {
            temperature: parseFloat(temperature),
            modelName,
            veniceAIApiKey,
            streaming: streaming ?? true,
            baseURL
        }

        if (maxTokens) obj.maxTokens = parseInt(maxTokens, 10)
        if (topP) obj.topP = parseFloat(topP)
        if (frequencyPenalty) obj.frequencyPenalty = parseFloat(frequencyPenalty)
        if (presencePenalty) obj.presencePenalty = parseFloat(presencePenalty)
        if (cache) obj.cache = cache
        if (stopSequence) {
            const stopSequenceArray = stopSequence.split(',').map((item) => item.trim())
            obj.stop = stopSequenceArray
        }

        const multiModalOption: IMultiModalOption = {
            image: {
                allowImageUploads: allowImageUploads ?? true
            }
        }

        const model = new ChatVeniceAI(nodeData.id, obj)
        model.setMultiModalOption(multiModalOption)
        return model
    }
}

module.exports = { nodeClass: ChatVeniceAI_ChatModels }
