import { ChangeEvent } from "react";
import s from './input.module.css'

type PropsType = {
  value: string; 
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const Input = (props: PropsType) => {
    return (
        <>
        <input className={s.input} value={props.value} onChange={props.onChange} placeholder="Введите название города..." />
        </>
    )
}
