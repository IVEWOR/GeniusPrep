export default function Input({ name, id, placeholder, required }) {
  return (
    <input
      className="bg-transparent border outline-none p-2 text-sm rounded"
      type="text"
      name={name}
      placeholder={placeholder}
      id={id}
      required={required}
    />
  );
}
