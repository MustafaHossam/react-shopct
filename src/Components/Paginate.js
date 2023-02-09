import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
  //console.log("pages ", Array(pages).keys());
  //search: `page=${x+1}`
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={{
              pathname: "/",
              search: `?page=${x + 1}`,
            }}
          >
            <Pagination.Item key={page} className={(x + 1) === page ? 'custom-active' : null}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
}

export default Paginate;
