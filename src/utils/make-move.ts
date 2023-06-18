import { HttpException, HttpStatus } from "@nestjs/common";
import { IGame, IPoint, MOVE, maze } from "src/types/game.types";

export const makeMove = async (
	game: IGame,
	move: MOVE,
	user: string,
): Promise<{ game_flow_maze: maze; p_location: IPoint; message: string }> => {
	const {
		player_one,
		player_two,
		p_one_game_flow_maze,
		p_two_game_flow_maze,
		p_one_location,
		p_two_location,
		maze,
	} = game;

	switch (user) {
		case player_one:
			return moveController(p_one_game_flow_maze, p_one_location, maze, move);

		case player_two:
			return moveController(p_two_game_flow_maze, p_two_location, maze, move);

		default:
			throw new HttpException("invalid user name", HttpStatus.BAD_REQUEST);
	}
};

function moveController(
	game_flow_maze: maze,
	p_location: IPoint,
	maze: maze,
	move: MOVE,
): { game_flow_maze: maze; p_location: IPoint; message: string } {
	let message: string;
	const { pointX, pointY } = p_location;
	game_flow_maze[pointY][pointX] = true;

	console.log(move);
	switch (move) {
		case MOVE.UP:
			if (pointY === 0) {
				message = "can`t do this move";
				break;
			}
			game_flow_maze[pointY - 1][pointX] = maze[pointY - 1][pointX] ? true : "W";
			if (game_flow_maze[pointY - 1][pointX] !== "W") {
				p_location.pointY = pointY - 1;
			}
			message = "going up";
			break;
		case MOVE.DOWN:
			if (pointY === maze.length - 1) {
				message = "can`t do this move";
				break;
			}
			game_flow_maze[pointY + 1][pointX] = maze[pointY + 1][pointX] ? true : "W";
			if (game_flow_maze[pointY + 1][pointX] !== "W") {
				p_location.pointY = pointY + 1;
			}
			message = "going down";
			break;
		case MOVE.LEFT:
			if (pointX === 0) {
				message = "can`t do this move";
				break;
			}
			game_flow_maze[pointY][pointX - 1] = maze[pointY][pointX - 1] ? true : "W";
			if (game_flow_maze[pointY][pointX - 1] !== "W") {
				p_location.pointX = pointX - 1;
			}
			message = "going left";
			break;
		case MOVE.RIGHT:
			if (pointX === maze.length - 1) {
				message = "can`t do this move";
				break;
			}
			game_flow_maze[pointY][pointX + 1] = maze[pointY][pointX + 1] ? true : "W";
			if (game_flow_maze[pointY][pointX + 1] !== "W") {
				p_location.pointX = pointX + 1;
			}
			message = "going right";
			break;
		default:
			throw new HttpException("Invalid movement name", HttpStatus.BAD_REQUEST);
	}

	return {
		game_flow_maze,
		p_location,
		message,
	};
}
