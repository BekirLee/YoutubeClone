import React from 'react'
import SearchQuery from '../../components/SearchQuery'
import Header from '../../components/Header'
import Guide from '../../components/Guide'
import HiddenGuide from '../../components/HiddenGuide'

function SearchQueryPage() {
    return (
        <div className="searchQueryPageContainer bg-[#0f0f0f] w-full h-full">
            <Header />
            <div className="guideContainer hidden">
                <Guide />
            </div>
            <HiddenGuide />
            <SearchQuery />
        </div>
    )
}

export default SearchQueryPage
