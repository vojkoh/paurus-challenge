import { Subject } from "./subject";

export interface Enrollment {
    id: string; 
    studentId: string;
    subjectId: string;
    subject: Subject
}
