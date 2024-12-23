import React from 'react'
import SearchQuery from '../../components/SearchQuery'
import Header from '../../components/Header'
import Guide from '../../components/Guide'

function SearchQueryPage() {
    return (
        <div className="bg-[#0f0f0f] w-full h-full">
            <Header />
            <Guide />
            <SearchQuery />
        </div>
    )
}

export default SearchQueryPage
