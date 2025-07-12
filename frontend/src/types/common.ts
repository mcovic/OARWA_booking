export type SingleValidationError = {
    field: string;
    message: string;
}

export type FetchState = {
    isLoading: boolean;
    isError: boolean;
    error?: string;
}
