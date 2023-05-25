import { Medication } from "@prisma/client"

type MedicationDropdownProps = {
  medications: Medication[]
}

export default function MedicationDropdown({ medications }:MedicationDropdownProps) {

  return (
    <select>
      {medications.map(medication => (
        <option key={medication.id} value={medication.id}>{medication.name}</option>
      ))}
    </select>
  )
}