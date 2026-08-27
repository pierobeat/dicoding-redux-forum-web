export function FieldError({ message }) {
  if (!message) return null;

  return <p style={{ color: 'red' }}>{message}</p>;
}
