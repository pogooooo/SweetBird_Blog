function PageList({ prevList, prevPage, postLength, lastList, maxPage, moveToList }) {
    let pageList = [];

    if (prevPage === maxPage) {
        // 마지막 페이지일 때
        for (let i = (prevPage - 1) * postLength + 1; i <= (prevPage - 1) * postLength + lastList; i++) {
            pageList.push(i);
        }
    } else {
        // 마지막 페이지가 아닐 때
        for (let i = (prevPage - 1) * postLength + 1; i <= prevPage * postLength; i++) {
            pageList.push(i);
        }
    }

    return (
        <div className="Main_footer_num">
            {pageList.map((list) => (
                <span className={list === prevList ? "selected_num" : ""} key={list} onClick={() => {
                    moveToList(list)
                }}>{list}</span>
            ))}
        </div>
    );
}

export default PageList;
