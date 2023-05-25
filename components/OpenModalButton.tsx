'use client';
import { useState, cloneElement } from "react";

type OpenModalButtonProps = {
  children: React.ReactNode[],
  labelText: string,
}

export default function OpenModalButton({ children, labelText }: OpenModalButtonProps) {

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => setIsModalOpen(!isModalOpen)}>
      {labelText}
    </button>
    {isModalOpen && (
        { ...children }
      )
    }
    </>
  )
}