/// <reference types="react-scripts" />
type User = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  avatar: string;
  id: number;
};
type Message = {
  userId: number;
  messageText: string;
  conversationId: number;
  id: number;
};

type Conversation = {
  userId: number;
  participantId: number;
  id: number;
  messages: Message[];
};
type FormType = HTMLFormElement & {
  text: HTMLInputElement;
};
