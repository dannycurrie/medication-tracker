'use client'

import { useRouter } from 'next/navigation'
import { Medication } from "@prisma/client"

type LogMedicationFormProps = {
  medications: Medication[]
}


export default function LogMedicationForm({ medications }:LogMedicationFormProps) {

  const router = useRouter()


  const onSubmit = async (e) => {
    e.preventDefault()
    const medication_id = e.target[0].value
    const taken_at = new Date()
    const [hours, minutes] = e.target[1].value.split(':')
    taken_at.setHours(parseInt(hours))
    taken_at.setMinutes(parseInt(minutes))

    await fetch('api/log', {
      method: 'POST',
      body: JSON.stringify({ medication_id, taken_at }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    router.refresh()
  }

  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`
    return `${hoursString}:${minutesString}`
  }

  return (
    <form className="w-42 h-32 bg-white rounded-md shadow flex flex-col justify-center items-center gap-4 mt-6" onSubmit={onSubmit}>
      <select className="w-32">
        {medications.map(medication => (
          <option key={medication.id} value={medication.id}>{medication.name}</option>
        ))}
      </select>
      <input type="time" defaultValue={getCurrentTime()}/>
      <button
        className="w-12 bg-blue-600 rounded-md text-white hover:bg-blue-700 h-10"
      >Log</button>
    </form>
  )
}