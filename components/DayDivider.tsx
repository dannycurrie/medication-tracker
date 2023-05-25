
type DayDividerProps = {
  date: Date;
}

export default function DayDivider({ date }:DayDividerProps) {
  return (
    <h4 className="text-l font-bold">{date.toDateString()}</h4>
  )
}