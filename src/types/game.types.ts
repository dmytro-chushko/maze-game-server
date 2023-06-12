import { Document } from "mongoose";

export enum GAME_STATUS {
	PENDING = "pending",
	STARTED = "started",
	FINISHED = "finished",
}

export interface IGame extends Document {
	player_one: string;
	player_two: string;
	status: GAME_STATUS;
	turn: string;
	winner: string;
	maze: string;
	p_one_locztion: string;
	p_two_location: string;
}
