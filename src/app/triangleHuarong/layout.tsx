export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center border border-solid border-zinc-600 p-4 dark:border-zinc-400">
      {children}
    </div>
  );
}
