import prisma from "../prisma/PrismaClient"
import LogMedicationForm from "./LogMedicationForm"

const getMedications = async () => {
  const medications = await prisma.medication.findMany()
  return medications
}

export default async function AddNewLogModal() {

  const medications = await getMedications()

  return (
    <LogMedicationForm medications={medications} />
  )
}
