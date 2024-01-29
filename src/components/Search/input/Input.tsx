import { ChangeEvent, useEffect, useState } from "react";
import s from "./input.module.css";

type PropsType = {
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: PropsType) => {
  const [inputValue, setInputValue] = useState(props.value);

  useEffect(() => {
    setInputValue(props.value);
  }, [props.value]);

  return (
    <>
      <input
        className={s.input}
        value={inputValue}
        onFocus={() => setInputValue("")}
        onChange={props.onChange}
        placeholder="Введите название города..."
      />
    </>
  );
};
