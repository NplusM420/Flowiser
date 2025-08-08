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

    it('should have model selection with asyncOptions', () => {
        const modelInput = node.inputs.find((input: any) => input.name === 'modelName')
        expect(modelInput).toBeDefined()
        expect(modelInput?.type).toBe('asyncOptions')
        expect(modelInput?.loadMethod).toBe('listModels')
        expect(modelInput?.default).toBe('venice-uncensored')
    })

    it('should have loadMethods with listModels function', () => {
        expect(node.loadMethods).toBeDefined()
        expect(typeof node.loadMethods.listModels).toBe('function')
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

    it('should have temperature with correct default', () => {
        const temperatureInput = node.inputs.find((input: any) => input.name === 'temperature')
        expect(temperatureInput).toBeDefined()
        expect(temperatureInput?.default).toBe(0.7)
        expect(temperatureInput?.type).toBe('number')
        expect(temperatureInput?.step).toBe(0.1)
    })

    it('should have all required additional parameters', () => {
        const additionalParams = ['maxTokens', 'topP', 'frequencyPenalty', 'presencePenalty', 'stopSequence']
        additionalParams.forEach((param) => {
            const input = node.inputs.find((input: any) => input.name === param)
            expect(input).toBeDefined()
            expect(input?.additionalParams).toBe(true)
        })
    })

    it('should have cache parameter', () => {
        const cacheInput = node.inputs.find((input: any) => input.name === 'cache')
        expect(cacheInput).toBeDefined()
        expect(cacheInput?.type).toBe('BaseCache')
        expect(cacheInput?.optional).toBe(true)
    })
})
