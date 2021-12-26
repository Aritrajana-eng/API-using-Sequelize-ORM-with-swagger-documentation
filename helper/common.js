
const getPagination = (totalCount ,page, limit) => {

    let total_pages = Math.ceil(totalCount / limit)
    let offset = page ? limit * (page - 1) : 1

    return { total_pages, offset }
}

const getPagingData = (apiPath, totalCount, total_pages, page, limit) => {
    let has_next = false
    let previous_page_url = null
    let next_page_url = null

    if (page * limit < totalCount) {
        has_next = true
        next_page_url = 'http://localhost:3000' + "/api/user/" + apiPath + "?page=" + (page + 1)
    }

    if (page > 1) {
        previous_page_url = 'http://localhost:3000' + "/api/user/" + apiPath + "?page=" + (page - 1)
    }

    let meta = {
        total: totalCount,
        limit: limit,
        total_pages,
        has_next: has_next,
        current_page: page,
        next_page_url: next_page_url,
        previous_page_url: previous_page_url
    }

    return meta
}

module.exports = {
    getPagination,
    getPagingData
}
