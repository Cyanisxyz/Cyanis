export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatResponse {
  message: {
    role: string;
    content: string;
  };
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

export interface ErrorResponse {
  error: string;
  details: any;
}

export async function sendMessage(messages: Message[]): Promise<ChatResponse> {
  try {
    const response = await fetch('http://localhost:3000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    const data = await response.json();

    if (!response.ok) {
      // Enhanced error handling with more specific messages
      if (response.status === 500 && data.error === 'Server configuration error') {
        throw new Error('OpenAI API key is not configured. Please check your server configuration.');
      } else if (response.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else if (response.status === 400) {
        throw new Error(`Invalid request: ${data.error}`);
      } else {
        throw new Error(data.error || `Server error: ${response.statusText}`);
      }
    }

    return data;
  } catch (error) {
    // Check if the error is a network error (server not running)
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      throw new Error('Unable to connect to the server. Please make sure the server is running by executing "npm run server" in your terminal.');
    }
    
    // Re-throw the error with the original message if it's already a custom error
    if (error instanceof Error) {
      throw error;
    }
    
    // Generic error handling as a fallback
    throw new Error('An unexpected error occurred while communicating with the server.');
  }
}