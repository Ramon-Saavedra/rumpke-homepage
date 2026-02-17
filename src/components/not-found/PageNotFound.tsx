import Link from "next/link"


const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-bg-l dark:bg-bg-d text-zinc-900 dark:text-white transition-colors  ease-out">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-lg mb-6">Seite nicht gefunden</p>
      <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">Die angeforderte Seite existiert nicht oder wurde verschoben.</p>
      <Link href="/" className="px-6 py-2 rounded-md bg-primary dark:bg-primary-dark text-white font-semibold hover:bg-hover-l dark:hover:bg-hover-d transition-all ">
        Zurück zur Startseite
      </Link>
    </div>
  )
}

export default PageNotFound
