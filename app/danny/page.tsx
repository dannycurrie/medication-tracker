import MedicationLogFeed from '@/components/MedicationLogFeed'
import prisma from '../../prisma/PrismaClient'
import MedicationInfo from '@/components/MedicationInfo'

export const mockLogs = [
  {
    id: 1,
    medication_id: 1,
    taken_at: new Date('2023-05-19T12:00:00.000Z'),
  },
  {
    id: 2,
    medication_id: 2,
    taken_at: new Date('2023-05-19T14:00:00.000Z'),
  },
  {
    id: 3,
    medication_id: 1,
    taken_at: new Date('2023-05-20T12:00:00.000Z'),
  },
  {
    id: 4,
    medication_id: 2,
    taken_at: new Date('2023-05-21T12:00:00.000Z'),
  },
]

const mockMedications = [
  {
    id: 1,
    name: 'Paracetemol',
    limit_24_hour: 8,
  },
  {
    id: 2,
    name: 'Ibuprofen',
    limit_24_hour: 6,
  },
]


const getMedicationLogs = async () => {
  // const logs = mockLogs
  // const medications = mockMedications
  const logs = await prisma.medicationLog.findMany()
  const medications = await prisma.medication.findMany()

  return logs.map((log) => ({
    ...log,
    medication: medications.find((medication) => medication.id === log.medication_id),
  }))
}

const getMedications = async () => {
  const medications = await prisma.medication.findMany()
  return medications
}

export default async function Danny() {
  const logs = await getMedicationLogs()
  const medications = await getMedications()

  return (
    <div className="md:flex flex-row h-full">
      <div className="flex flex-col gap-6 p-8">
        <h2 className="text-xl">Medications</h2>
        {medications.map((medication) => (
          <MedicationInfo medication={medication} />
        ))}
      </div>
      <div className="max-h-full">
        <MedicationLogFeed logs={logs} />
      </div>
    </div>
  )
}
