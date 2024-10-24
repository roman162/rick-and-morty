import { personGenderEnum } from "./personGenderEnum"
import { personStatusEnum } from "./personStatusEnum"

export interface IPerson {
  id: 361,
  name: string,
  status: personStatusEnum,
  species: string,
  type: string,
  gender: personGenderEnum,
  origin: {
    name: string,
    url: string
  },
  location: {
    name: string,
    url: string
  },
  image: string,
  episode: string[],
  url: string,
  created: Date
}