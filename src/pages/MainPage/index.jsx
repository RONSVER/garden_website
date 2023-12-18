import React from "react";
import InputsDiscount from "../../components/Main/InputsDiscount";
import BtnDiscount from "../../components/Main/BtnDiscount";
import Categories from "../../components/Main/Categories";
import Sale from "../../components/Main/Sale";

function MainPage() {
  return (
    <div>
      <BtnDiscount />
      <Categories show={true} />
      <InputsDiscount />
      <Sale show={true} />
    </div>
  );
}

export default MainPage;
