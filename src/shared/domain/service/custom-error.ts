export type Code = 'not_found' | 'invalid_params' | 'unauthorized' | 'failed' | 'conflict' | 'implementation_failure'

export default class CustomError extends Error {
    code?: Code;
    detailCode?: string;
    errorMessage: string;
    constructor(message: string, code?: Code, detailCode?: string) {
        super(message);
        this.errorMessage = message
        if(code) this.code = code
        if(detailCode) this.detailCode = detailCode
    }
}