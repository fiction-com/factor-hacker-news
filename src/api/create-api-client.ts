import Firebase from 'firebase/app'

import 'firebase/database'

import { ApiArguments, DataApi} from "./types"


export const createAPI = ({ config, version }: ApiArguments): DataApi => {

  Firebase.initializeApp(config)
  return Firebase.database().ref(version)

}
