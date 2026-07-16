export async function chatStream({
  token,
  conversationId,
  prompt,
  onToken,
  onDone,
  onError,
}: {
  token: string;
  conversationId: number;
  prompt: string;
  onToken: (token: string) => void;
  onDone: (data: any) => void;
  onError?: (error: Error) => void;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages/conversation/${conversationId}/stream`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/event-stream",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: prompt }),
      },
    );

    if (!response.ok || !response.body) {
      throw new Error("Failed to stream response");
    }

    const reader = response.body.getReader();

    const decoder = new TextDecoder();

    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) break;

      buffer += decoder.decode(value, {
        stream: true,
      });

      const events = buffer.split("\n\n");

      buffer = events.pop() ?? "";

      for (const event of events) {
        if (!event.startsWith("data: ")) continue;

        const data = JSON.parse(event.slice(6));

        if (data.type === "token") {
          onToken(data.content);
        }

        if (data.type === "done") {
          onDone(data);
        }
      }
    }
    
  } catch (error) {
    if (onError) onError(error as Error);
  }
}
