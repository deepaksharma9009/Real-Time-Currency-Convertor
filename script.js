const dropdowns = document.querySelectorAll(".select-container select");
const btn = document.querySelector("#exchange-button");
const fromCurr = document.querySelector(".from-container select");
const toCurr = document.querySelector(".to-container select");
const amountMsg = document.querySelector("#amount");
const finalOpt = document.querySelector("#result");
const oneCurr = document.querySelector("#single-currency");
const oneCurrValue = document.querySelector("#single-currency-value");
const oneCurrReverse = document.querySelector("#single-currency-reverse");
const oneCurrValueReverse = document.querySelector(
  "#single-currency-value-reverse"
);
const resultCotainer = document.querySelector(".result-container");

resultCotainer.classList.add("hide");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    select.append(newOption);
    if (select.name === "from" && currCode === "INR") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "USD") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (event) => {
    updateFlag(event.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

btn.addEventListener("click", async (event) => {
  event.preventDefault();
  let amount = document.querySelector("form input");
  let amnVal = amount.value;
  if (amnVal === "" || amnVal < 1) {
    amnVal = 1;
    amount.value = "Invalid Input";
  }
  resultCotainer.classList.remove("hide");
  fetchData(amount.value);
  fetchDataReverse();
});

const fetchData = async (amount) => {
  let URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ZTJ27PSZ8yvvgWEJnMkih9u4HT4ft7zaoT61xjrd&currencies=${fromCurr.value}&base_currency=${toCurr.value}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[fromCurr.value];

    let finalAmt = amount * rate;

    // Update UI elements
    amountMsg.innerText = `${amount} ${fromCurr.value} =`;
    finalOpt.innerText = `${finalAmt} ${toCurr.value}`;
    oneCurr.innerText = `1 ${fromCurr.value} =`;
    oneCurrValue.innerText = ` ${rate} ${toCurr.value}`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const fetchDataReverse = async () => {
  let URL = `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_ZTJ27PSZ8yvvgWEJnMkih9u4HT4ft7zaoT61xjrd&currencies=${toCurr.value}&base_currency=${fromCurr.value}`;

  try {
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data.data[toCurr.value];

    // Update UI elements
    oneCurrReverse.innerText = `1 ${toCurr.value} =`;
    oneCurrValueReverse.innerText = ` ${rate} ${fromCurr.value}`;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
