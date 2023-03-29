import styles from "./styles.module.css"

export default function NewInputCreateObject({index, count, setCount}: {index: number, count: string[], setCount: React.Dispatch<React.SetStateAction<string[]>>}) {
    const newCount = Object.assign([], count);
    newCount.push("0")
    return (
        <div className={styles.root}>
            <label htmlFor={"doc" + index}></label>
            <input type="file" id={"doc" + index} onChange={(event) => checkFileAndCreate(event, setCount, count)}/>
        </div>
    )
}
function checkFileAndCreate(
    event: React.ChangeEvent<HTMLInputElement>,
    setCount: React.Dispatch<React.SetStateAction<string[]>>,
    count: string[]
    ) {
        if (event.target.files?.length === 1) {
            const newCount = Object.assign([], count);
            newCount.push("0");
            setCount(newCount);
        } else if (event.target.files?.length === 0) {
            const newCount = Object.assign([], count);
            newCount.pop();
            setCount(newCount);
        }
}