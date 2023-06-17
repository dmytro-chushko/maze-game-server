import { Document } from "mongoose";

export enum GAME_EVENT {
	CREATE_GAME = "create-game",
	ABORT_GAME = "abort-game",
	JOIN_GAME = "join-game",
	START_GAME = "start-game",
	UPDATE_GAME_LIST = "update-game-list",
}

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
	p_one_location: string;
	p_two_location: string;
}

export type maze = boolean[][];

export interface IExit {
	exitX: number;
	exitY: number;
}

export interface IPoint {
	pointX: number;
	pointY: number;
}
