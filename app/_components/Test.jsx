"use client";

import React, { useState, useEffect } from "react";

function AmountImmediateExecution({ value }) {
  const [amountKR, setAmountKR] = useState(value.toLocaleString());

  useEffect(() => {
    setAmountKR(value == null ? null : value.toLocaleString());
  }, [value]);

  return (
    <div>
      <h2>Immediate Execution</h2>
      <span>{amountKR}</span>
    </div>
  );
}

function AmountCallbackExecution({ value }) {
  const [amountKR, setAmountKR] = useState(() => value.toLocaleString());

  console.log(() => null.toLocaleString());
  useEffect(() => {
    setAmountKR(value == null ? null : value.toLocaleString());
  }, [value]);

  return (
    <div>
      <h2>Callback Execution</h2>
      <span>{amountKR}</span>
    </div>
  );
}

export default function TestComponent() {
  const [value, setValue] = useState(123456);

  return (
    <div>
      <button onClick={() => setValue(value + 1)}>Increase Value</button>
      <button onClick={() => setValue(null)}>Set Null</button>

      <AmountImmediateExecution value={value} />
      <AmountCallbackExecution value={value} />
    </div>
  );
}
