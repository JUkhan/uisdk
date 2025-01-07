import { ColDef } from 'ag-grid-community';
export declare const toSnakeCase: (str: string) => string;
export declare const toTitleCase: (s: string, space?: string) => string;
export declare const toTitleCaseModel: (record: any) => any;
export declare const toSnakeCaseModel: (record: any) => any;
export declare const actionColHelper: (config: Partial<ColDef>) => ColDef;
