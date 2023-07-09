export default function handleStatusErrors(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
}
