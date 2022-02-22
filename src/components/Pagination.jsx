export default function Pagination(props){
  // console.log(props)
  let totalPages = +props.value.totalResults,
        itemPerPage = +props.value.itemPerPage,
        pages = +Math.ceil(totalPages / itemPerPage)
        

  let {currentPage} = props.value, 
      prevPage = +currentPage > 1 ? +currentPage - 1 : 0,
      nextPage = +currentPage < pages ? +currentPage + 1 : 0

  let arrForPag = new Array(pages).fill(1)

  return(
    <ul className="pagination">
      <li className={prevPage < 1 ? "disabled" : "waves-effect"} key='prevPage'>
        <a href="#!" 
            data-page={+prevPage} 
            onClick={event => props.paginationHandle(event)}
        >
          <i className="material-icons" data-page={+prevPage}>&lt;</i>
        </a>
      </li>

      {arrForPag.map((item, index) => {
        return(
          <li className={index === currentPage - 1  ? "active" : "waves-effect"} 
            key={index}>
              <a href="#!" 
                data-page={index + 1} 
                onClick={event => props.paginationHandle(event)}
              >
                  {index + 1}
              </a>
          </li>
          )
      })}

      <li className={nextPage < 1 ? "disabled" : "waves-effect"} key='nextPage'>
        <a href="#!" 
          data-page={+nextPage}
          onClick={event => props.paginationHandle(event)}
        >
            <i className="material-icons" data-page={+nextPage}>&gt;</i>
        </a>
      </li>
    </ul>
  )
}