import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GAME_STATUS, IExit, IPoint, maze } from "src/types/game.types";

@Schema({ timestamps: true })
export class Game {
	@Prop({ type: String, required: true })
	player_one: string;

	@Prop({ type: String, default: "" })
	player_two: string;

	@Prop({ type: String, default: GAME_STATUS.PENDING })
	status: GAME_STATUS;

	@Prop({ type: Number, default: 0 })
	turn: number;

	@Prop({ type: String, default: "" })
	winner: string;

	@Prop({ type: Array, default: "" })
	maze: maze;

	@Prop({ type: Array, required: true })
	game_flow_maze: maze;

	@Prop({ type: Object, required: true })
	p_one_location: IPoint;

	@Prop({ type: Object, required: true })
	p_two_location: IPoint;

	@Prop({ type: Object, required: true })
	exit: IExit;
}

export const GameSchema = SchemaFactory.createForClass(Game);
