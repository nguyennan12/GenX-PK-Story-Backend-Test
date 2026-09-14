export interface ValidationErrorDetail {
  field: string;
  reason: string;
}

export interface ErrorResponse {
  error: {
    code: string;
    message: string;
    details?: ValidationErrorDetail[];
  };
}
