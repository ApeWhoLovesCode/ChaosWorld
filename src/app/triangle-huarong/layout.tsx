export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="border-2 border-solid border-zinc-600 p-4 dark:border-zinc-400 h-[80%] aspect-square rounded-lg">
        {children}
      </div>
    </div>
  );
}
