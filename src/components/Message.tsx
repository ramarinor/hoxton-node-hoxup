type Props = {
  message: Message;
  outgoing: boolean;
};

function Message({ message, outgoing }: Props) {
  return (
    <li className={outgoing ? "outgoing" : "incoming"}>
      <p>{message.messageText}</p>
    </li>
  );
}

export default Message;
