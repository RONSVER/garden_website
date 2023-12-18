import React, { useState } from "react";
import handsImg from "./assets/hands.svg";
import styles from "./index.module.css";

export async function postFetch(url, type, post, errorState) {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        contentType: type,
      },
      body: post,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
      errorState(`Error response`);
    }

    const data = await response.json();
    console.log("Успешный POST-запрос:", data);
  } catch (error) {
    console.error("Ошибка POST-запроса:", error.message);
  }
}

function InputsDiscount() {
  const [pError, setPError] = useState("");
  const [oneInputValue, setOneInputValue] = useState("");
  const [twoInputValue, setTwoInputValue] = useState("");
  const [threeInputValue, setThreeInputValue] = useState("");
  const [errorState, setErrorState] = useState("");
  const regexNum = /\d+(\.\d+)?/g;
  const regexLetter = /\p{L}+/gu;
  const regexLatin = /^[а-яА-ЯёЁ]+$/u;
  const regexGmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function handleChangeInputOne(event) {
    let value = event.target.value;
    setOneInputValue(value);
  }

  function handleChangeInputTwo(event) {
    return setTwoInputValue(event.target.value);
  }

  function handleChangeInputThree(event) {
    return setThreeInputValue(event.target.value);
  }

  const validateInput = (e) => {
    e.preventDefault();

    if (!oneInputValue.trim()) {
      setPError("Please fill in the field!");
    } else if (oneInputValue.match(regexNum)) {
      setPError("Please remove the numbers from the first field!");
    } else if (!twoInputValue.trim()) {
      setPError("Please fill in the field");
    } else if (twoInputValue.match(regexLetter)) {
      setPError("Please remove the letters from the second field!");
    } else if (!threeInputValue.trim()) {
      setPError("Please fill in the field!");
    } else if (threeInputValue.match(regexLatin)) {
      setPError("Enter English letters!");
    } else if (!threeInputValue.match(regexGmail)) {
      setPError("This not gmail!");
    } else {
      setPError("Great you have a discount!");
      const requestData = {
        name: oneInputValue,
        phone: twoInputValue,
        email: threeInputValue,
      };

      postFetch(
        "http://localhost:3333/sale/send",
        "application/json",
        JSON.stringify(requestData),
        setErrorState
      );
    }
  };

  return (
    <div className={styles.mainInputDiscountDiv}>
      <h2 className={styles.h2InputDiscount}>5% off on the first order</h2>
      <div className={styles.secondInputDiscountDiv}>
        <img className={styles.imgDiscountInput} src={handsImg} alt="hands" />
        <form className={styles.inputsBtnDiscount}>
          <p className={styles.pError}>{`${pError}  ${errorState}`}</p>

          <input
            value={oneInputValue}
            onChange={handleChangeInputOne}
            className={styles.firstInput}
            type="text"
            placeholder="Name"
          />
          <input
            value={twoInputValue}
            onChange={handleChangeInputTwo}
            className={styles.inputs}
            type="text"
            placeholder="Phone number"
          />
          <input
            value={threeInputValue}
            onChange={handleChangeInputThree}
            className={styles.inputs}
            type="text"
            placeholder="Email"
          />
          <button onClick={validateInput} className={styles.btnDiscountInput}>
            Get a discount
          </button>
        </form>
      </div>
    </div>
  );
}

export default InputsDiscount;
