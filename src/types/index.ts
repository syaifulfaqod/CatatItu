export type NoteStatus =
  | "PROCESSING"
  | "TRANSCRIBING"
  | "FORMATTING"
  | "COMPLETED"
  | "FAILED";

export interface User {
  id: string;
  name: string | null;
  email: string;
  avatarUrl: string | null;
  authProvider: string;
  createdAt: Date;
}

export interface Note {
  id: string;
  title: string;
  transcript: string | null;
  formattedNote: string | null;
  summary: string | null;
  keywords: string[];
  userId: string;
  subjectId: string | null;
  subject: Subject | null;
  audioFile: AudioFile | null;
  status: NoteStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Subject {
  id: string;
  name: string;
  color: string;
  userId: string;
  createdAt: Date;
}

export interface AudioFile {
  id: string;
  noteId: string;
  url: string;
  fileName: string;
  fileSize: number;
  duration: number;
  mimeType: string;
  createdAt: Date;
}

export interface Quiz {
  id: string;
  noteId: string;
  question: string;
  options: string[];
  answer: number;
}

export interface Flashcard {
  id: string;
  noteId: string;
  front: string;
  back: string;
}

// API response types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  limit: number;
}
