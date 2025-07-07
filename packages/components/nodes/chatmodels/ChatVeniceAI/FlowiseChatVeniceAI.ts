import { BaseChatModelParams } from '@langchain/core/language_models/chat_models'
import { IMultiModalOption, IVisionChatModal } from '../../../src'
import { ChatOpenAI } from '@langchain/openai'

export interface ChatVeniceAIFields extends BaseChatModelParams {
    temperature?: number
    modelName?: string
    veniceAIApiKey?: string
    streaming?: boolean
    maxTokens?: number
    topP?: number
    frequencyPenalty?: number
    presencePenalty?: number
    stop?: string[]
    baseURL?: string
}

export class ChatVeniceAI extends ChatOpenAI implements IVisionChatModal {
    configuredModel: string
    configuredMaxToken?: number
    multiModalOption: IMultiModalOption
    id: string

    constructor(id: string, fields?: ChatVeniceAIFields) {
        const openAICompatibleFields = {
            ...fields,
            openAIApiKey: fields?.veniceAIApiKey,
            configuration: {
                baseURL: fields?.baseURL || 'https://api.venice.ai/api/v1',
                defaultHeaders: {
                    'x-api-key': fields?.veniceAIApiKey
                }
            }
        }
        super(openAICompatibleFields)
        this.id = id
        this.configuredModel = fields?.modelName ?? 'venice-uncensored'
        this.configuredMaxToken = fields?.maxTokens
    }

    revertToOriginalModel(): void {
        this.modelName = this.configuredModel
        this.maxTokens = this.configuredMaxToken
    }

    setMultiModalOption(multiModalOption: IMultiModalOption): void {
        this.multiModalOption = multiModalOption
    }

    setVisionModel(): void {
        // Venice AI supports multimodal by default with certain models
    }
}
