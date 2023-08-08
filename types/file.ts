export interface File {
  id?: string;
  name: string;
  container: string;
  mimetype: string;
  size: number;
  key: string;
  handle: string;
  userId: string;
  status: File_Status;
  createdAt: Date;
  updatedAt: Date;
}

export enum File_Status {
  IN_PROGRESS,
  COMPLETE
}
