import { IsNotEmpty, IsString } from "class-validator";

export class ChatIdDto {
	@IsString()
	@IsNotEmpty()
	readonly chatId: string;

	@IsString()
	@IsNotEmpty()
	readonly user: string;
}
