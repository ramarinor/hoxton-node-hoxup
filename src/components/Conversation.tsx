import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Message from "./Message";
type Props = {
  currentUser: User | null;
};
function Conversation({ currentUser }: Props) {
  const [currentConversation, setCurrentConversation] =
    useState<Conversation | null>(null);

  const params = useParams();

  function createMessage(text: string) {
    // create a message on the server ✅
    if (currentUser === null) return;
    fetch("http://localhost:4000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: currentUser.id,
        messageText: text,
        conversationId: Number(params.conversationId)
      })
    })
      .then((resp) => resp.json())
      .then((newMessage) => {
        const currentConversationCopy = JSON.parse(
          JSON.stringify(currentConversation)
        );
        currentConversationCopy.messages.push(newMessage);
        setCurrentConversation(currentConversationCopy);
      });

    // update the conversation state
  }

  useEffect(() => {
    if (params.conversationId) {
      fetch(
        `http://localhost:4000/conversations/${params.conversationId}?_embed=messages`
      )
        .then((resp) => resp.json())
        .then((conversation) => setCurrentConversation(conversation));
    }
  }, [params.conversationId]);

  if (currentConversation === null || currentUser === null)
    return <h1>Loading...</h1>;

  return (
    <main className="conversation">
      {/* <!-- Chat header --> */}
      <header className="panel"></header>

      <ul className="conversation__messages">
        {currentConversation.messages.map((message) => (
          <Message
            key={message.id}
            message={message}
            outgoing={message.userId === currentUser.id}
          />
        ))}
      </ul>

      {/* <!-- Message Box --> */}
      <footer>
        <form
          className="panel conversation__message-box"
          onSubmit={(e) => {
            e.preventDefault();
            const formEl = e.target as FormType;
            createMessage(formEl.text.value);
            formEl.reset();
          }}
        >
          <input
            type="text"
            placeholder="Type a message"
            name="text"
            required
            autoComplete="off"
          />
          <button type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path
                fill="currentColor"
                d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
              ></path>
            </svg>
          </button>
        </form>
      </footer>
    </main>
  );
}

export default Conversation;
