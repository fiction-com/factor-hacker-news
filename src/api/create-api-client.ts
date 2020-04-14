import Firebase from "firebase/app"

import "firebase/database"

import { ApiArguments, DataApi } from "./types"

export const createAPI = async ({ config, version }: ApiArguments): Promise<DataApi> => {
  Firebase.initializeApp(config)
  return Firebase.database().ref(version)
}
