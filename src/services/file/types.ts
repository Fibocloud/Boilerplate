export interface FileRecord {
  name: string;
  path: string;
}

export interface SingleFileUpload {
  name: string;
  bucket_name: string;
  file: any;
}

export interface MultiFileUpload {
  names: string[];
  bucket_name: string;
  files: any[];
}
