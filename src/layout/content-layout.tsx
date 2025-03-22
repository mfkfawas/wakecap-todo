import { PropsWithChildren } from 'react';

export function ContentLayout({ children }: PropsWithChildren) {
  return (
    <main className="max-w-5xl mx-auto flex justify-center py-8">
      <div className="flex flex-col gap-8 items-center">{children}</div>
    </main>
  );
}
