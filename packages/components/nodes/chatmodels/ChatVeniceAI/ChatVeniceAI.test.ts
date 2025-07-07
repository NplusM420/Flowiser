const { nodeClass: ChatVeniceAI_ChatModels } = require('./ChatVeniceAI')

describe('ChatVeniceAI', () => {
    let node: any

    beforeEach(() => {
        node = new ChatVeniceAI_ChatModels()
    })

    it('should have correct properties', () => {
        expect(node.label).toBe('ChatVeniceAI')
        expect(node.name).toBe('chatVeniceAI')
        expect(node.version).toBe(1.0)
        expect(node.type).toBe('ChatVeniceAI')
        expect(node.icon).toBe('venice.svg')
        expect(node.category).toBe('Chat Models')
        expect(node.description).toBe('Venice AI chat models using OpenAI-compatible endpoint')
    })

    it('should have credential configuration', () => {
        expect(node.credential).toBeDefined()
        expect(node.credential.type).toBe('credential')
        expect(node.credential.credentialNames).toContain('veniceAIApi')
    })

    it('should have model selection with correct options', () => {
        const modelInput = node.inputs.find((input: any) => input.name === 'modelName')
        expect(modelInput).toBeDefined()
        expect(modelInput?.type).toBe('options')
        expect(modelInput?.options).toBeDefined()

        const modelNames = modelInput?.options?.map((opt: any) => opt.name)
        expect(modelNames).toContain('venice-uncensored')
        expect(modelNames).toContain('gpt-4o')
        expect(modelNames).toContain('claude-3.5-sonnet')
        expect(modelNames).toContain('llama-3.1-405b')
    })

    it('should have streaming enabled by default', () => {
        const streamingInput = node.inputs.find((input: any) => input.name === 'streaming')
        expect(streamingInput).toBeDefined()
        expect(streamingInput?.default).toBe(true)
    })

    it('should have correct base URL', () => {
        const baseURLInput = node.inputs.find((input: any) => input.name === 'baseURL')
        expect(baseURLInput).toBeDefined()
        expect(baseURLInput?.default).toBe('https://api.venice.ai/api/v1')
    })

    it('should support image uploads', () => {
        const imageInput = node.inputs.find((input: any) => input.name === 'allowImageUploads')
        expect(imageInput).toBeDefined()
        expect(imageInput?.default).toBe(true)
    })
})
