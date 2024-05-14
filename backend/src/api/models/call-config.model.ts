export interface ICallConfig {
    temperature?: number;
    modelName?: string;
    useHistory?: boolean; // if true, the model will be included into the prompt.
}

