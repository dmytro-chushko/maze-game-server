import { IsEnum, IsNotEmpty, IsString } from "class-validator";

import { MOVE } from "src/types/game.types";

export class MoveDto {
	@IsString()
	@IsNotEmpty()
	readonly id: string;

	@IsString()
	@IsNotEmpty()
	readonly user: string;

	@IsEnum(MOVE)
	@IsNotEmpty()
	readonly move: MOVE;
}
