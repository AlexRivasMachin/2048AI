import { JsonController, Post, Body, HttpError } from 'routing-controllers';
import { Service } from 'typedi';
import { LMMService } from "../services/lmm.service";
import { ICallRequest } from "../models/call.request.model";

@Service()
@JsonController('/llm')
export class LLMController {

    constructor(private service: LMMService) { }
    
    @Post('/call')
    public async call(@Body() request: ICallRequest): Promise<string> {
        try {
            const response = await this.service.call(request.prompt,request.moves, request.config);
            return response;
        } catch (err) {
            throw new HttpError(500, err);
        }
    }
}
