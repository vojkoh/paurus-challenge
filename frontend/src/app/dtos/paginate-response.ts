import { Student } from "../classes/student"

export interface PaginateResponse {
  first: number;
  prev: number |null;
  next: number |null;
  last: number;
  pages: number;
  items: number;
  data: Student[];
}
