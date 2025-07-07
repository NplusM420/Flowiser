# Venice AI Chat Model

This node allows you to use Venice AI's chat models within Flowise.

## Features

-   **OpenAI-compatible API**: Venice AI provides an OpenAI-compatible endpoint, making integration seamless
-   **Multiple models**: Supports various Venice AI models and open-source alternatives
-   **Multimodal support**: Select models support vision/image inputs
-   **Streaming**: Real-time streaming responses supported
-   **Large context windows**: Models support up to 131K tokens of context

## Configuration

### Credentials

1. Obtain your Venice AI API key from [Venice.ai](https://venice.ai)
2. Create a new credential in Flowise:
    - Type: `Venice AI API`
    - API Key: Your Venice AI API key (format: `vk-xxxxxxxxxxxxxxxxxxxxxxxx`)

### Node Settings

-   **Model Name**: Select from available models:

    **Venice Models:**

    -   `venice-uncensored` (default): Venice Uncensored 1.1 - Uncensored model (32K context)
    -   `qwen3-4b`: Venice Small - Fast, efficient model (32K context)
    -   `mistral-31-24b`: Venice Medium - Balanced model with vision support (131K context)
    -   `qwen3-235b`: Venice Large - Powerful model for complex tasks (131K context)
    -   `qwen-2.5-qwq-32b`: Venice Reasoning - Specialized for reasoning tasks (32K context)

    **Open-Source Models:**

    -   `llama-3.2-3b`: Llama 3.2 3B - Smallest, fastest Llama (131K context)
    -   `llama-3.3-70b`: Llama 3.3 70B - Latest with function calling (65K context)
    -   `llama-3.1-405b`: Llama 3.1 405B - Most intelligent Llama (65K context)
    -   `dolphin-2.9.2-qwen2-72b`: Dolphin 72B - Most uncensored model (32K context)
    -   `qwen-2.5-vl`: Qwen 2.5 VL 72B - Vision-language model (32K context)
    -   `qwen-2.5-coder-32b`: Qwen 2.5 Coder 32B - Optimized for coding (32K context)
    -   `deepseek-r1-671b`: DeepSeek R1 671B - Advanced reasoning (131K context)
    -   `deepseek-coder-v2-lite`: DeepSeek Coder V2 Lite - Lightweight coding (131K context)

-   **Temperature**: Controls randomness (0-2, default: 0.7)
-   **Max Tokens**: Maximum tokens to generate
-   **Streaming**: Enable/disable streaming responses (default: enabled)
-   **Image Uploads**: Allow image inputs for multimodal models

### Advanced Settings

-   **Top P**: Nucleus sampling parameter
-   **Frequency Penalty**: Penalize repeated tokens (-2 to 2)
-   **Presence Penalty**: Penalize tokens based on presence (-2 to 2)
-   **Stop Sequence**: Comma-separated list of stop words
-   **Base URL**: Custom API endpoint (default: `https://api.venice.ai/api/v1`)

## Usage Example

1. Add the Venice AI Chat node to your flow
2. Configure credentials with your Venice AI API key
3. Select your desired model
4. Connect to other nodes (prompts, chains, agents, etc.)
5. Configure parameters as needed

## API Compatibility

Venice AI provides an OpenAI-compatible API, which means:

-   Request/response formats match OpenAI's chat completion API
-   Supports standard parameters like temperature, max_tokens, etc.
-   Compatible with existing OpenAI-based tools and libraries

For more information, visit [Venice AI Documentation](https://docs.venice.ai)
