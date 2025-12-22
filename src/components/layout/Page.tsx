type Props = {
  centered?: boolean;
  children: React.ReactNode;
};

export default function Page({ centered = false, children }: Props) {
  return <main className={centered ? "flex-0" : "flex-1"}>{children}</main>;
}
