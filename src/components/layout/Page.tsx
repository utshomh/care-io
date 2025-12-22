type Props = {
  centered?: boolean;
  className?: string;
  children: React.ReactNode;
};

export default function Page({
  centered = false,
  className = "",
  children,
}: Props) {
  return (
    <main className={`${centered ? "flex-0" : "flex-1"} ${className}`}>
      {children}
    </main>
  );
}
