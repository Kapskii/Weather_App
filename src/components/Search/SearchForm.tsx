import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Input } from "./input/Input";
import s from './searchForm.module.css'
import { useAppDispatch, useAppSelector } from "../../RTK/store";
import { setCity } from "../../RTK/weatherSlice";
import { useDebounce } from "../../common/hooks/useDebounce";

type PropsType = {
    submit:(event: FormEvent<HTMLFormElement>) => void
}

export const SearchForm = (props: PropsType) => {
  const city = useAppSelector((state)=>state.weatherReducer.city);
  const [value, setValue] = useState(city);
  const debouncedValue = useDebounce<string>(value, 1000)

  const dispatch = useAppDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };


  useEffect(() => {
    dispatch(setCity(debouncedValue));
    localStorage.setItem("cityName", debouncedValue);
  }, [debouncedValue])

  return ( 
      <form className={s.form} onSubmit={props.submit}>
        <Input value={value} onChange={handleChange} />
      </form>
  );
};
