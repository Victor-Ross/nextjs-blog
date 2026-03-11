interface ContainerProps {
  children: React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  return (
    <div className="min-h-screen text-slate-900 bg-slate-300">
      <div className="mx-auto px-8 max-w-5xl ">{children}</div>
    </div>
  );
}
