import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Game } from "./shemas/game.shema";
import { GAME_STATUS, IGame } from "src/types/game.types";
import { CreateGameDto } from "./dto";
import { generateDefaultMaze, generateMaze } from "src/utils/generate-maze";
import { MoveDto } from "./dto/move.dto";
import { makeMove } from "src/utils/make-move";

@Injectable()
export class GameService {
	constructor(@InjectModel(Game.name) private gameModel: Model<IGame>) {}

	private async findGameById(id: string): Promise<IGame> {
		try {
			const game = await this.gameModel.findById(id);
			if (!game) {
				throw new HttpException("game dosn't exist", HttpStatus.BAD_REQUEST);
			}

			return game;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async getAllPendingGames(): Promise<IGame[]> {
		try {
			const games = await this.gameModel.find({ status: GAME_STATUS.PENDING }, { maze: 0 });

			return games;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async getGameById(id: string): Promise<IGame> {
		try {
			const game = await this.findGameById(id);
			game.set({ maze: null });

			return game;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async createGame(createGameDto: CreateGameDto): Promise<IGame> {
		try {
			const { player_one } = createGameDto;
			const { maze, playerOnePoint, playerTwoPoint, exit } = generateMaze(15);
			const game_flow_maze = generateDefaultMaze(15);
			const newGame = new this.gameModel({
				player_one,
				maze,
				game_flow_maze,
				p_one_game_flow_maze: game_flow_maze,
				p_two_game_flow_maze: game_flow_maze,
				p_one_location: playerOnePoint,
				p_two_location: playerTwoPoint,
				exit,
			});

			await newGame.save();

			return newGame;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async joinGame(gameId: string, player_two: string): Promise<IGame> {
		try {
			const game = await this.findGameById(gameId);
			const turn = Math.round(Math.random());
			const updatedGame = await game.set({ player_two, status: GAME_STATUS.STARTED, turn }).save();

			return updatedGame;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async abortGame(id: string): Promise<{ message: string }> {
		try {
			const game = await this.getGameById(id);

			await game.deleteOne();

			return { message: "Game has been aborted" };
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async makeMove({ id, user, move }: MoveDto): Promise<string> {
		try {
			const game = await this.findGameById(id);
			const { game_flow_maze, p_location, message } = await makeMove(game, move, user);
			if (user === game.player_one) {
				await this.gameModel.findByIdAndUpdate(id, {
					p_one_game_flow_maze: game_flow_maze,
					p_one_location: p_location,
				});
			}
			if (user === game.player_two) {
				await this.gameModel.findByIdAndUpdate(id, {
					p_two_game_flow_maze: game_flow_maze,
					p_two_location: p_location,
				});
			}
			await game.set({ turn: !game.turn }).save();

			return message;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}
}
