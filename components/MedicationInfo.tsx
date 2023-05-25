import { Medication } from '@prisma/client'
import prisma from '../prisma/PrismaClient'
import { mockLogs } from '@/app/danny/page'

const byTakenAt = (a, b) => {
  if (a.taken_at < b.taken_at) {
    return 1
  }
  if (a.taken_at > b.taken_at) {
    return -1

  }
  return 0
}

const getMedicationLogs = async (medicationId: number) => {
  // const logs = mockLogs.filter((log) => log.medication_id === medicationId)
  const logs = await prisma.medicationLog.findMany({
    where: {
      medication_id: medicationId,
    },
  })
  return logs
}

const getMedicationInsights = async (medication: Medication) => {
  const logs = await getMedicationLogs(medication.id)

  if (logs.length === 0) {
    return {
      lastTaken: null,
      takenInLast24Hours: 0,
      canTakeAgainAt: new Date(),
    }
  }

  const takenInLast24Hours = logs.filter((log) => {
    const now = new Date()
    const twentyFourHoursAgo = new Date(now.getTime() - 1000 * 60 * 60 * 24)
    return log.taken_at > twentyFourHoursAgo
  })
  
  const lastTaken = logs.sort(byTakenAt)[0]

  const canTakeAgainAt = new Date(lastTaken.taken_at.getTime() + 1000 * 60 * 60 * 4)

  return {
    lastTaken: lastTaken.taken_at,
    takenInLast24Hours: takenInLast24Hours.length,
    canTakeAgainAt
  }
}

const getTimeString = (date: Date) => {
  return date.toTimeString().split(' ')[0].split(':').slice(0, 2).join(':')
}


export default async function MedicationInfo({ medication }: { medication: Medication}) {

  const insights = await getMedicationInsights(medication)

  const { lastTaken, takenInLast24Hours, canTakeAgainAt } = insights

  const { name, limit_24_hour } = medication
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-4 max-w-42">
      <div className="text-xl font-bold">{name}</div>
      {canTakeAgainAt > new Date() ? (
        <div className="flex flex-row justify-center items-center gap-4 text-amber-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.05 4.575a1.575 1.575 0 10-3.15 0v3m3.15-3v-1.5a1.575 1.575 0 013.15 0v1.5m-3.15 0l.075 5.925m3.075.75V4.575m0 0a1.575 1.575 0 013.15 0V15M6.9 7.575a1.575 1.575 0 10-3.15 0v8.175a6.75 6.75 0 006.75 6.75h2.018a5.25 5.25 0 003.712-1.538l1.732-1.732a5.25 5.25 0 001.538-3.712l.003-2.024a.668.668 0 01.198-.471 1.575 1.575 0 10-2.228-2.228 3.818 3.818 0 00-1.12 2.687M6.9 7.575V12m6.27 4.318A4.49 4.49 0 0116.35 15m.002 0h-.002" />
          </svg>

          <p>
            You can take {name} again at <time>{getTimeString(canTakeAgainAt)}</time> today.
          </p>
        </div>
      ) : (
        <div className="flex flex-row justify-center items-center gap-4 text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="green" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>
            You can take {name} again now.
          </p>
        </div>
        )}

      <p>You last took {name} at <time>{getTimeString(lastTaken)}</time> today.</p>
      <p>
        You've taken <em>{takenInLast24Hours}</em> out of a maximum of <em>{limit_24_hour}</em> doses in the past 24 hours.
      </p>
    </div>
  )
}