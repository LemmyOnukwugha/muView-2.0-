import React from "react"
import Pagination from "react-bootstrap/Pagination"

const CustomPagination = ({ page, totalPages, setPage }) => {
  return (
    <Pagination className="mt-3">
      {Array?.from(Array(totalPages)?.keys()).map((item, index) => (
        <Pagination.Item
          active={index + 1 === page}
          onClick={() => {
            setPage(index + 1)
          }}
        >
          {index + 1}
        </Pagination.Item>
      ))}
    </Pagination>
  )
}

export default CustomPagination
