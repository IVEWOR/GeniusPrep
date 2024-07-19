export default function Label({ htmlfor, text }) {
  return (
    <label htmlFor={htmlfor} className="font-medium">
      {text}
    </label>
  );
}
