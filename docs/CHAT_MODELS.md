# Supported Chat Models in Flowise

This document provides a comprehensive list of all chat model providers supported in Flowise.

## Overview

Flowise supports a wide range of chat model providers, from commercial APIs to open-source models that can be run locally. All chat models implement the `BaseChatModel` interface, making them interchangeable across different flows, chains, and agents.

## Commercial Providers

### OpenAI

-   **Models**: GPT-4o, GPT-4o-mini, GPT-4-turbo, GPT-3.5-turbo, O1 series
-   **Features**: Function calling, vision capabilities, JSON mode
-   **Documentation**: [ChatOpenAI Node](packages/components/nodes/chatmodels/ChatOpenAI)

### Anthropic

-   **Models**: Claude 3.5 (Sonnet, Haiku), Claude 3 (Opus, Sonnet, Haiku)
-   **Features**: Large context windows, vision capabilities
-   **Documentation**: [ChatAnthropic Node](packages/components/nodes/chatmodels/ChatAnthropic)

### Google

-   **Google Generative AI (Gemini)**
    -   Models: Gemini 2.0, 1.5 Pro/Flash, 1.0 Pro
    -   Features: Multimodal, context caching
-   **Google Vertex AI**
    -   Models: PaLM 2, Gemini models via Vertex
    -   Features: Enterprise features, regional deployments

### Venice AI

-   **Models**: Venice Uncensored, plus proxy access to GPT-4o, Claude 3.5, Llama models
-   **Features**: Uncensored responses, OpenAI-compatible API
-   **Documentation**: [ChatVeniceAI Node](packages/components/nodes/chatmodels/ChatVeniceAI)

### Azure OpenAI

-   **Models**: All OpenAI models via Azure deployments
-   **Features**: Enterprise security, regional deployments, custom endpoints
-   **Documentation**: [AzureChatOpenAI Node](packages/components/nodes/chatmodels/AzureChatOpenAI)

### AWS Bedrock

-   **Models**: Claude (Anthropic), Llama (Meta), Mistral, Titan (Amazon), Command (Cohere)
-   **Features**: AWS integration, pay-per-use pricing
-   **Documentation**: [AWSChatBedrock Node](packages/components/nodes/chatmodels/AWSBedrock)

### Other Commercial Providers

-   **Perplexity**: Internet-connected models with search capabilities
-   **Cohere**: Command models optimized for enterprise use
-   **Mistral AI**: European AI models with strong multilingual support
-   **Together AI**: Access to open models via API
-   **Groq**: Ultra-fast inference for open models
-   **Fireworks**: Fast open model hosting
-   **OpenRouter**: Gateway to multiple providers
-   **DeepSeek**: Chinese AI models with reasoning capabilities

## Open Source & Local Models

### Ollama

-   **Models**: Any GGUF format model
-   **Features**: Local hosting, no API costs
-   **Documentation**: [ChatOllama Node](packages/components/nodes/chatmodels/ChatOllama)

### LocalAI

-   **Models**: OpenAI-compatible local hosting
-   **Features**: Drop-in replacement for OpenAI API
-   **Documentation**: [ChatLocalAI Node](packages/components/nodes/chatmodels/ChatLocalAI)

### HuggingFace

-   **Models**: Access to thousands of models
-   **Features**: Both API and local inference options
-   **Documentation**: [ChatHuggingFace Node](packages/components/nodes/chatmodels/ChatHuggingFace)

## Regional & Specialized Providers

### Chinese Market

-   **Alibaba Tongyi**: Qwen models
-   **Baidu Wenxin**: ERNIE models
-   **DeepSeek**: Reasoning-focused models

### Enterprise & Specialized

-   **IBM Watsonx**: Enterprise AI platform
-   **NVIDIA NIM**: GPU-optimized inference
-   **Cerebras**: High-performance inference
-   **XAI (Grok)**: X.AI's conversational models

## Custom Integrations

### OpenAI-Compatible Endpoints

Any service that implements the OpenAI chat completions API can be used with:

-   **ChatOpenAICustom**: For custom OpenAI-compatible endpoints
-   **LiteLLM**: Universal LLM gateway supporting 100+ models

## Feature Comparison

| Provider      | Streaming | Vision | Function Calling | Context Caching |
| ------------- | --------- | ------ | ---------------- | --------------- |
| OpenAI        | ✅        | ✅     | ✅               | ❌              |
| Anthropic     | ✅        | ✅     | ✅               | ✅              |
| Google Gemini | ✅        | ✅     | ✅               | ✅              |
| Venice AI     | ✅        | ✅     | ❌               | ❌              |
| Azure OpenAI  | ✅        | ✅     | ✅               | ❌              |
| Ollama        | ✅        | ✅\*   | ✅\*             | ❌              |

\*Depends on the specific model

## Usage in Flows

All chat models can be used interchangeably in:

-   **Chains**: LLMChain, ConversationChain, etc.
-   **Agents**: ReAct, Conversational, Tool-using agents
-   **Memory Systems**: Compatible with all memory types
-   **Output Parsers**: Structured output generation

## Adding New Models

To use a chat model in your flow:

1. Drag the chat model node onto the canvas
2. Configure credentials (API keys)
3. Select the model variant
4. Connect to chains, agents, or other nodes
5. Configure parameters (temperature, max tokens, etc.)

## Cost Considerations

-   **Commercial APIs**: Pay per token (see `models.json` for pricing)
-   **Open Source**: Free but requires compute resources
-   **Hybrid**: Some providers offer both options

For detailed pricing information, refer to [models.json](packages/components/models.json).
