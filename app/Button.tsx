export default function Button({
  children,
  onClick,
}: {
  children: string;
  onClick: () => void;
}) {
  return (
    <button onClick={onClick} className="px-5 rounded-lg py-3 bg-gray-500 mx-2">
      {children}
    </button>
  );
}
