import { ICallConfig } from "./call-config.model";

export interface ICallRequest {
    prompt: string;
    moves: string[];
    historyId?: string;
    config?: ICallConfig;
}