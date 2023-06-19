import { IsNotEmpty, IsString } from "class-validator";

export class GiveUpDto {
	@IsString()
	@IsNotEmpty()
	readonly id: string;

	@IsString()
	@IsNotEmpty()
	readonly user: string;
}
