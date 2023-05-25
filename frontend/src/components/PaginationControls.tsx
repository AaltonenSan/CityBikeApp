import { Pagination } from "react-bootstrap";

interface PaginationControlsProps {
  page: number;
  setPage: (page: number) => void;
  lastPage: number;
}

export default function PaginationControls({ page, setPage, lastPage }: PaginationControlsProps) {

  const handleFirst = () => setPage(1)
  const handlePrev = () => setPage(page - 1)
  const handleNext = () => setPage(page + 1)

  // Pagination logic, always shows 5 pages if possible
  return (
    <Pagination style={{ margin: 1 }}>
      <Pagination.First onClick={() => handleFirst()} disabled={page === 1} />
      <Pagination.Prev onClick={() => handlePrev()} disabled={page === 1} />

      {page - 4 > 0 ? page === lastPage && <Pagination.Item onClick={() => setPage(page - 4)}>{page - 4}</Pagination.Item> : null}
      {page - 3 > 0 ? (page === lastPage - 1 || page === lastPage) && <Pagination.Item onClick={() => setPage(page - 3)}>{page - 3}</Pagination.Item> : null}

      {page >= 3 && <Pagination.Item onClick={() => setPage(page - 2)}>{page - 2}</Pagination.Item>}
      {page >= 2 && <Pagination.Item onClick={() => setPage(page - 1)}>{page - 1}</Pagination.Item>}
      <Pagination.Item active>{page}</Pagination.Item>
      {page <= lastPage - 1 && <Pagination.Item onClick={() => setPage(page + 1)}>{page + 1}</Pagination.Item>}
      {lastPage > 2 ? page <= lastPage - 2 && <Pagination.Item onClick={() => setPage(page + 2)}>{page + 2}</Pagination.Item> : null}

      {lastPage > 3 ? page === 1 && <Pagination.Item onClick={() => setPage(page + 3)}>{page + 3}</Pagination.Item> : null}
      {lastPage > 4 ? page === 1 && <Pagination.Item onClick={() => setPage(page + 4)}>{page + 4}</Pagination.Item> : null}
      {lastPage > 5 ? page === 2 && <Pagination.Item onClick={() => setPage(page + 3)}>{page + 3}</Pagination.Item> : null}

      <Pagination.Next onClick={() => handleNext()} disabled={page === lastPage} />
      <Pagination.Last onClick={() => setPage(lastPage)} disabled={page === lastPage} />
    </Pagination>
  )
}
