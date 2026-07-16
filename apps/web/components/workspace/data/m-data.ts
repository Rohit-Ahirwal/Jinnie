// messages/data.ts

export const messages = [
  {
    id: 1,
    role: "user",
    content: "Explain the authentication flow of this project.",
  },
  {
    id: 2,
    role: "assistant",
    content:
      "The authentication starts in middleware.ts and then delegates to Clerk before protecting dashboard routes.",
  },
];
