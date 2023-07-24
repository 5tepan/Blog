import React from 'react'
import {getPagesArray} from "../../../utils/Pages"

const Pagination = ({totalPages, page, changePage}) => {
    let pagesArray = getPagesArray(totalPages)

    return (
        <div className="page__wrapper">
            {pagesArray.map(p =>
                <span
                    className={page === p ? 'page currPage' : 'page'}
                    key={p}
                    onClick={() => changePage(p)}
                >
                        {p}
                    </span>
            )}
        </div>
    )
}

export default Pagination