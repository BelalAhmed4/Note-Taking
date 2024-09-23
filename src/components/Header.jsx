export default function Header({ children }) {
  return (
    <header className="w-full flex justify-end items-center  gap-3 px-9 py-9 h-[10vh]">
      {children}
    </header>
  );
}
