export const Box: React.FC<{ color: string, className?: string }> = ({ color, children, className }) => {
  className = className ?? 'grid grid-cols-full grid-rows-main ';

  return (
    <div className={`relative border-4 rounded-2xl w-64 h-64 p-3 m-3 ${className}`} style={{ borderColor: color }}>
      {children}
    </div>
  );
}