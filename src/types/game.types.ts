import { Document } from "mongoose";

export interface IGame extends Document {
	player_one: string;
	player_two: string;
	start: boolean;
	turn: string;
	winner: string;
	maze: string;
	p_one_locztion: string;
	p_two_location: string;
}
