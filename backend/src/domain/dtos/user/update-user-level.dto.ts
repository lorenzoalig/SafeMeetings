import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, Max, Min } from "class-validator";


export class UpdateUserLevelDto {
    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    @Type(() => Number)
    level: number;
}