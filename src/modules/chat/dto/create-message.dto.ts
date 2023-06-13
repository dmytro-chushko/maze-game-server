import { IsNotEmpty, IsString } from "class-validator";

export class CreateMessageDto {
	@IsString()
	@IsNotEmpty()
	readonly chatId: string;

	@IsString()
	@IsNotEmpty()
	readonly message: string;
}
