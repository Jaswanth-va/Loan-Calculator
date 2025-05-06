import { useState } from "react";

export default function Dashboard() {
  const [principal, setPrincipal] = useState("");
  const [term, setTerm] = useState("");
  const [interest, setInterest] = useState("");
  const [EMI, SetEMI] = useState(null);

  function interestRatePerMonth(interestRate) {
    return interestRate / (100 * 12);
  }

  function termInMonths(termInYears) {
    return termInYears * 12;
  }
  function calculateEMI() {
    const P = principal;
    const R = interestRatePerMonth(interest);
    const N = termInMonths(term);
    let emi = (P * R * (1 + R) ** N) / ((1 + R) ** N - 1);
    emi = Number(emi.toFixed(2));
    const amortizationSchTable = [];
    let Balance = P;
    for (let i = 0; i < N; i++) {
      let Interest = Number((Balance * R).toFixed(2));
      let Principal = (emi - Interest).toFixed(2);
      Balance = Number((Balance - Principal).toFixed(2));
      if (Balance < 0) {
        Balance = 0;
      }
      const obj = { Month: [i + 1], Principal, Interest, Balance };
      amortizationSchTable.push(obj);
    }
    console.log(amortizationSchTable);
    SetEMI(emi);
  }

  return (
    <main style={{ maxWidth: "600px", margin: "auto" }}>
      <h1>Loan Calculator</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <div>
          <label>Principal:</label>
          <input
            type="text"
            value={principal}
            onChange={(e) => {
              setPrincipal(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Term in years:</label>
          <input
            type="text"
            value={term}
            onChange={(e) => {
              setTerm(e.target.value);
            }}
          />
        </div>
        <div>
          <label>Intrest rate in percentage::</label>
          <input
            type="text"
            value={interest}
            onChange={(e) => {
              setInterest(e.target.value);
            }}
          />
        </div>
        <button
          style={{ width: "fit-content" }}
          onClick={() => {
            calculateEMI();
          }}
        >
          Calculate EMI
        </button>
      </div>
      <h2>{EMI && EMI}</h2>
    </main>
  );
}
