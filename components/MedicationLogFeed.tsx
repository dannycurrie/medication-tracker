import { MedicationLog, Medication } from ".prisma/client"
import FeedItem from "./FeedItem"
import OpenModalButton from "./OpenModalButton"
import DayDivider from "./DayDivider"
import AddNewLogModal from "./AddNewLogModal"

const bytaken_at = (a:MedicationLog, b:MedicationLog) => {
  if (a.taken_at.getTime() < b.taken_at.getTime()) {
    return 1
  } else if (a.taken_at.getTime() > b.taken_at.getTime()) {
    return -1
  } else {
    return 0
  }
}

type MedicationLogFeedProps = {
  medications: Medication[],
  logs: MedicationLog[]
}

type LogWithDayDivider = MedicationLog & { isDayDivider?: boolean }

export default async function MedicationLogFeed({ logs }:MedicationLogFeedProps) {

  const logsWithDayDividers: LogWithDayDivider[] = logs.sort(bytaken_at).reduce((acc, log, i) => {
    const nextLog = logs[i + 1]
    if (nextLog) {
      if (log.taken_at.toDateString() !== nextLog.taken_at.toDateString()) {
        return [
          ...acc, 
          { ...log, isDayDivider: false }, 
          { taken_at: nextLog.taken_at, isDayDivider: true }]
      }
    }
    return [
      ...acc, 
      {...log, isDayDivider: false}
    ]
  },[])

  return (
    <div className="flex flex-col gap-4 max-h-full">
      <DayDivider date={new Date()} />
      <OpenModalButton labelText={'Add new log'}>
        <AddNewLogModal />
      </OpenModalButton>
      <ol className="flex flex-col gap-6 max-h-full overflow-scroll">
        {logsWithDayDividers.map((log) => {
          if (log.isDayDivider) {
            return (
              <li key={log.taken_at.toDateString()} className="text-center">
                <DayDivider date={log.taken_at} />
              </li>
            )
          } else {
          return (
            <li key={log.id}>
              <FeedItem name={log.medication?.name || 'Unknown'} dose={log.medication?.dose || ''} taken_at={log.taken_at} />
            </li>)
          }}
          )
        }
      </ol>
    </div>
  )
}

