import { ChangeEvent, FormEvent } from "react";
import { Input } from "./input/Input";
import s from './searchForm.module.css'

type PropsType = {
    submit:(event: FormEvent<HTMLFormElement>) => void
    inputValue: string
    change: (event: ChangeEvent<HTMLInputElement>) => void
}

export const SearchForm = (props: PropsType) => {
  return ( 
      <form className={s.form} onSubmit={props.submit}>
        <Input value={props.inputValue} onChange={props.change} />
        <button className={s.buttonSearch} type="submit" disabled={!props.inputValue}>Поиск</button>
      </form>
  );
};
