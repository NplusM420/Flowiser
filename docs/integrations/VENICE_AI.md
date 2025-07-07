# Venice AI Integration Guide

## Overview

Venice AI is integrated into Flowise as a chat model provider, offering uncensored AI responses and proxy access to various popular models through an OpenAI-compatible API.

## Quick Start

### 1. Get API Key

-   Sign up at [Venice.ai](https://venice.ai)
-   Generate an API key (format: `vk-xxxxxxxxxxxxxxxxxxxxxxxx`)

### 2. Add to Flowise

1. Drag "ChatVeniceAI" node from the Chat Models category
2. Click "Create New" credential
3. Enter your Venice AI API key
4. Select a model and configure parameters

### 3. Available Models

**Venice AI Models:**

| Model ID            | Display Name          | Context | Best For                                 |
| ------------------- | --------------------- | ------- | ---------------------------------------- |
| `venice-uncensored` | Venice Uncensored 1.1 | 32K     | Open conversations without restrictions  |
| `qwen3-4b`          | Venice Small          | 32K     | Fast, efficient responses                |
| `mistral-31-24b`    | Venice Medium         | 131K    | Balanced performance with vision support |
| `qwen3-235b`        | Venice Large          | 131K    | Complex tasks requiring high capability  |
| `qwen-2.5-qwq-32b`  | Venice Reasoning      | 32K     | Specialized reasoning and analysis       |

**Open-Source Models:**

| Model ID                  | Display Name           | Context | Best For                       |
| ------------------------- | ---------------------- | ------- | ------------------------------ |
| `llama-3.2-3b`            | Llama 3.2 3B           | 131K    | Fastest responses, basic tasks |
| `llama-3.3-70b`           | Llama 3.3 70B          | 65K     | Function calling, general use  |
| `llama-3.1-405b`          | Llama 3.1 405B         | 65K     | Most intelligent Llama model   |
| `dolphin-2.9.2-qwen2-72b` | Dolphin 72B            | 32K     | Most uncensored conversations  |
| `qwen-2.5-vl`             | Qwen 2.5 VL 72B        | 32K     | Vision-language tasks          |
| `qwen-2.5-coder-32b`      | Qwen 2.5 Coder 32B     | 32K     | Code generation and debugging  |
| `deepseek-r1-671b`        | DeepSeek R1 671B       | 131K    | Advanced reasoning tasks       |
| `deepseek-coder-v2-lite`  | DeepSeek Coder V2 Lite | 131K    | Lightweight coding assistance  |

## Integration Examples

### Basic Chat

```
[System Message] → [ChatVeniceAI] → [Output]
```

### With Agent

```
[Tools] → [ReAct Agent + ChatVeniceAI] → [Output]
```

### RAG Pipeline

```
[Vector Store] → [Retriever] → [Conversational Chain + ChatVeniceAI] → [Output]
```

## Configuration Options

### Essential Settings

-   **Temperature**: 0-2 (default: 0.7)
-   **Max Tokens**: Limit response length
-   **Streaming**: Real-time responses (default: on)

### Advanced Settings

-   **Top P**: Nucleus sampling (0-1)
-   **Frequency Penalty**: Reduce repetition (-2 to 2)
-   **Presence Penalty**: Encourage topic diversity (-2 to 2)
-   **Stop Sequences**: Custom stop words

### Multimodal

-   **Allow Image Uploads**: Enable for vision-capable models

## Best Practices

1. **Model Selection**

    - Use `venice-uncensored` (default) for unrestricted conversations
    - Choose `venice-small` (qwen3-4b) for fast, cost-effective responses
    - Use `venice-medium` (mistral-31-24b) for vision tasks with 131K context
    - Select `venice-large` (qwen3-235b) for complex tasks requiring high capability
    - Pick `venice-reasoning` (qwen-2.5-qwq-32b) for analytical and reasoning tasks
    - Consider specialized models: coding (qwen-2.5-coder-32b), vision (qwen-2.5-vl)

2. **Performance**

    - Enable streaming for better user experience
    - Adjust temperature based on use case (lower for factual, higher for creative)
    - Set appropriate max tokens to control costs
    - Consider context limits: 32K (Venice models), 65K-131K (various open models)

3. **Integration**
    - Works with all Flowise agents and chains
    - Compatible with memory systems
    - Supports tool calling through agents (check model capabilities)
    - Vision support available on select models (mistral-31-24b, qwen-2.5-vl)

## Common Use Cases

### Uncensored Assistant

Build assistants that can discuss any topic without content filtering:

-   Medical advice discussions
-   Creative writing without restrictions
-   Open philosophical debates

### Multi-Model Comparison

Use Venice AI's proxy access to compare responses from different models:

-   A/B testing between models
-   Best-of selection from multiple models
-   Model-specific task routing

### Cost-Effective Development

Develop with premium models through Venice's proxy:

-   Prototype with GPT-4 or Claude
-   Switch models without changing code
-   Single API key for multiple providers

## Troubleshooting

### API Key Issues

-   Ensure key starts with `vk-`
-   Check key hasn't expired
-   Verify billing is active

### Model Availability

-   Some models may have usage limits
-   Check Venice AI status page for outages
-   Try alternative models if one is unavailable

### Response Quality

-   Adjust temperature for consistency
-   Use system messages for better guidance
-   Enable streaming for long responses

## API Compatibility

Venice AI uses OpenAI-compatible endpoints:

-   Endpoint: `https://api.venice.ai/api/v1`
-   Compatible with OpenAI SDK
-   Supports standard parameters

## Support

-   Documentation: [Venice AI Docs](https://docs.venice.ai)
-   Node README: [ChatVeniceAI README](../../packages/components/nodes/chatmodels/ChatVeniceAI/README.md)
-   Flowise Discord: [Join Community](https://discord.gg/flowise)
