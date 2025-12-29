export default function Modal({ children }) {
  return (
    <div className="fixed z-50 bg-black/50 inset-0  flex items-center justify-center">
      {children}
    </div>
  );
}
