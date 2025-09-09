
import Link from "next/link"

export default function Breadcrumb({currentPage, parentPage}: {currentPage:string, parentPage: string}){
    console.log("Desde el breadcrumb: ", currentPage)
    return (
    <nav className="text-sm text-gray-600 mb-8">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                <Link href="/" className="text-blue-600 hover:text-blue-800">Inicio</Link>
                <svg className="w-3 h-3 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </li>
                <li className="flex items-center">
                <Link href={`/${parentPage}`} className="text-blue-600 hover:text-blue-800">Blog</Link>
                <svg className="w-3 h-3 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                </li>
                <li className="text-gray-500" dangerouslySetInnerHTML={{ __html: currentPage }} />
            </ol>
    </nav>

    )
}

