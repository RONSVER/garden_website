import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { prodByCategoriesRequest } from "../../store/slices/prodByCategoriesSlice";

function AllProductsByCategoriesPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const prodByCategoriesData = useSelector(
    (state) => state.prodBycategories.list
  );

  console.log(id, "id params");
  console.log(prodByCategoriesData);
  useEffect(() => {
    dispatch(prodByCategoriesRequest(id));
  }, [dispatch]);

  return <div></div>;
}

export default AllProductsByCategoriesPage;
