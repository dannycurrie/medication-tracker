export default function Layout({ children }) {
  return (
    <main className="flex h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl max-h-full items-center justify-between font-mono text-sm lg:flex">
        {children}
      </div>
    </main>
  )
}