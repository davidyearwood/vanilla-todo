export default function spliceNode(children, start, deleteCount) {
  Array.from(children).splice(start, deleteCount);
}
