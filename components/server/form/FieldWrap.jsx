export default function FieldWrap({ children, addCls }) {
  return <div className={`grid gap-2 mb-4 ${addCls}`}>{children}</div>;
}
