import { useState, createContext }from "react"

import styles from "./styles.module.css"
import {ReactComponent as IconCalendar} from "./img/calendar.svg"
import YearComponent from "./YearComponent/YearComponent";
import MonthComponent from "./MonthComponent/MonthComponent";
import DateComponent from "./DateComponent/DateComponent";
import CalendarForm from "./CalendarForm/CalendarForm";
import SelectForm from "./SelectForm/SelectForm";

const defaultValueCalendar = {
    // цвет иконки календаря
    colorIconCalendar: "white",
    // цвет текста
    colorText: "black",
    // Цвет сегоднешнего дня
    colorActivDay: "blue",
    // Цвет нынешнего месяца
    colorActivMonth: "yellow",
    // цвет дней других месяцев
    colorRemainingDay: "grey",
    // можно ли выбирать прошедшие даты
    lastDate: true,
    // можно ли выбирать будушие даты
    nextDate: true,
}

const CalendarContext = createContext(defaultValueCalendar);

export default function Calendar() {
    const newDate = new Date();
    const [date, setDate] = useState(newDate.getDate());
    const [month, setMonth] = useState(newDate.getMonth());
    const [year, setYear] = useState(newDate.getFullYear());
    

    // Отображать иконку календаря или форму календаря
    const [hiddenCalendar, setHiddenCalendar] = useState(true)
    // Отображает форму выбора года и месяца
    const [showSelectForm, setShowSelectForm] = useState(true)

    console.log(defaultValueCalendar)
    
    return (
        <CalendarContext.Provider value={defaultValueCalendar} >
            <div className={styles.root} >
                <p>Дата выполнения</p>
                {showSelectForm 
                ? hiddenCalendar
                    ? <div className={styles.icon} onClick={() => setHiddenCalendar(!hiddenCalendar)}>
                        <IconCalendar className={styles.svg}/>
                        <div className={styles.date}>
                            <DateComponent date={date}/>:
                            <MonthComponent month={month} setMonth={setMonth} year={year} setYear={setYear} typeEvent={"icon"}/>:
                            <YearComponent year={year} />
                        </div>
                    </div>
                    : <CalendarForm 
                        hiddenCalendar={hiddenCalendar} 
                        setHiddenCalendar={setHiddenCalendar} 
                        date={date} 
                        setDate={setDate} 
                        month={month} 
                        setMonth={setMonth}
                        year={year}
                        setYear={setYear}
                        showSelectForm={showSelectForm}
                        setShowSelectForm={setShowSelectForm}
                        />            
                : <SelectForm month={month} setMonth={setMonth} year={year} setYear={setYear} showSelectForm={showSelectForm} setShowSelectForm={setShowSelectForm}/>}            
            </div>
        </CalendarContext.Provider>
    )
}