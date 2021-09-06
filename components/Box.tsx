export const Box: React.FC<{ color: string }> = ({ color, children }) => {
  return (
    <div className="grid grid-cols-full grid-rows-main border-4 rounded-2xl w-64 h-64 p-3 m-3" style={{ borderColor: color }}>
      {children}
    </div>
  );
}