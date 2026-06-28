import type { ChatMessage } from "./types";
import { getWeddingDate } from "./config";

const MAX_MESSAGES = 200;
const CHAT_DURATION_MS = 2 * 60 * 60 * 1000; // 2 horas tras abrirse
const CHAT_BEFORE_MS = 15 * 60 * 1000; // 15 min antes de la ceremonia

const globalStore = globalThis as unknown as {
  weddingMessages?: ChatMessage[];
  weddingChatOpenedAt?: number;
};

function getStore(): ChatMessage[] {
  if (!globalStore.weddingMessages) {
    globalStore.weddingMessages = [];
  }
  return globalStore.weddingMessages;
}

export function isChatOpen(): boolean {
  if (process.env.CHAT_FORCE_OPEN === "true") return true;

  const now = Date.now();
  const ceremony = getWeddingDate().getTime();
  const openFrom = ceremony - CHAT_BEFORE_MS;
  const openUntil = ceremony + CHAT_DURATION_MS;

  return now >= openFrom && now <= openUntil;
}

function pruneOldMessages(messages: ChatMessage[]): ChatMessage[] {
  if (!isChatOpen()) return [];

  const ceremony = getWeddingDate().getTime();
  const cutoff = ceremony - CHAT_BEFORE_MS;

  return messages
    .filter((m) => new Date(m.created_at).getTime() >= cutoff)
    .slice(-MAX_MESSAGES);
}

export function getMessages(): ChatMessage[] {
  const store = getStore();
  const pruned = pruneOldMessages(store);
  globalStore.weddingMessages = pruned;
  return pruned;
}

export function addMessage(author: string, content: string): ChatMessage {
  if (!isChatOpen()) {
    throw new Error("Chat cerrado");
  }

  const message: ChatMessage = {
    id: crypto.randomUUID(),
    author,
    content,
    created_at: new Date().toISOString(),
  };

  const store = getStore();
  store.push(message);
  globalStore.weddingMessages = pruneOldMessages(store);

  return message;
}
