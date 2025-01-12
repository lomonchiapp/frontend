import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { database } from '@/firebase'
import { Application, Client } from "@/types"

export const useNewAppClient = () => {
  const createClient = async (clientData: Omit<Client, 'id'>): Promise<string> => {
    try {
      const clientWithTimestamp = {
        ...clientData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      
      const docRef = await addDoc(collection(database, 'clients'), clientWithTimestamp)
      return docRef.id
    } catch (error) {
      console.error('Error creating client:', error)
      throw error
    }
  }

  const createApplication = async (applicationData: Omit<Application, 'id'>): Promise<string> => {
    try {
      const applicationWithTimestamp = {
        ...applicationData,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }
      
      const docRef = await addDoc(collection(database, 'applications'), applicationWithTimestamp)
      return docRef.id
    } catch (error) {
      console.error('Error creating application:', error)
      throw error
    }
  }

  return { createClient, createApplication }
}