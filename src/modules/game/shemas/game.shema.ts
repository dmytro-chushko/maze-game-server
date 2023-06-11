import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Game {
	@Prop({ type: String, required: true })
	player_one: string;

	@Prop({ type: String, default: "" })
	player_two: string;

	@Prop({ type: Boolean, default: false })
	start: boolean;

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
