import { groq } from '@ai-sdk/groq';
import { Agent } from '@mastra/core/agent';
import { MCPClient } from "@mastra/mcp";

const apiKey = process.env.SMITHERY_API_KEY as string;
const profileKey = process.env.SMITHERY_PROFILE_KEY as string;

const mcps = new MCPClient({
  servers: {
    movie: {
      command: "npx",
      type: "stdio", 
      args: [
        "npx",
        "-y",
        "@smithery/cli@latest",
        "run",
        "@emro624/dictionary-mcp-main",
        "--key",
        apiKey,
        "--profile",
        profileKey,
      ],
    },
  },
});

export const myAgent = new Agent({
  name: 'Movie Agent',
  instructions: `
 Sana gelen kelimeleri türkçeye çevir. Kullanıcının sana verdiği cümleden hangi kelimenin anlamını istediğini analiz et mcp toollarını kullanarak kullanıcının istediği kelimenin anlamını getir.
`,
  model: groq('llama-3.3-70b-versatile'),
  tools: await mcps.getTools(),
});