import { Document } from "mongoose";

export enum GAME_EVENT {
	CREATE_GAME = "create-game",
	ABORT_GAME = "abort-game",
	JOIN_GAME = "join-game",
	START_GAME = "start-game",
	UPDATE_GAME_LIST = "update-game-list",
	MOVE = "move",
}

export enum GAME_STATUS {
	PENDING = "pending",
	STARTED = "started",
	FINISHED = "finished",
}

export enum MOVE {
	UP = "/up",
	DOWN = "/down",
	LEFT = "/left",
	RIGHT = "/right",
}

export interface IGame extends Document {
	player_one: string;
	player_two: string;
	status: GAME_STATUS;
	turn: number;
	winner: string;
	maze: maze;
	p_one_game_flow_maze: maze;
	p_two_game_flow_maze: maze;
	p_one_location: IPoint;
	p_two_location: IPoint;
	exit: IExit;
}

export type maze = (boolean | "W")[][];

export interface IExit {
	exitX: number;
	exitY: number;
}

export interface IPoint {
	pointX: number;
	pointY: number;
}
