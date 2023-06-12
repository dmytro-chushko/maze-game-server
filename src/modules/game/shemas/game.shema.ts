import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GAME_STATUS } from "src/types/game.types";

@Schema({ timestamps: true })
export class Game {
	@Prop({ type: String, required: true })
	player_one: string;

	@Prop({ type: String, default: "" })
	player_two: string;

	@Prop({ type: String, default: GAME_STATUS.PENDING })
	status: GAME_STATUS;

	@Prop({ type: String, default: "" })
	turn: string;

	@Prop({ type: String, default: "" })
	winner: string;

	@Prop({ type: String, default: "" })
	maze: string;

	@Prop({ type: String, default: "" })
	p_one_location: string;

	@Prop({ type: String, default: "" })
	p_two_location: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
