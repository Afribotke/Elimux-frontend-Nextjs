export function toMessagesRow(item) {
  return {
    id: item.id,
    sender_id: item.sender_id,
    receiver_id: item.receiver_id,
    content: item.content,
  }
}
