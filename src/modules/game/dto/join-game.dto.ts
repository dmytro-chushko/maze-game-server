import { IsNotEmpty, IsString } from "class-validator";

export class JoinGameDto {
	@IsString()
	@IsNotEmpty()
	readonly player_two: string;
}
