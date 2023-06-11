import { IsNotEmpty, IsString } from "class-validator";

export class CreateGameDto {
	@IsString()
	@IsNotEmpty()
	readonly player_one: string;
}
