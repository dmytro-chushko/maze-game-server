import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Game } from "./shemas/game.shema";
import { GAME_STATUS, IGame } from "src/types/game.types";
import { CreateGameDto, JoinGameDto } from "./dto";

@Injectable()
export class GameService {
	constructor(@InjectModel(Game.name) private gameModel: Model<IGame>) {}

	async getAllPendingGames(): Promise<IGame[]> {
		try {
			const games = await this.gameModel.find({ status: GAME_STATUS.PENDING });

			return games;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async createGame(createGameDto: CreateGameDto): Promise<IGame> {
		try {
			const newGame = new this.gameModel(createGameDto);

			await newGame.save();

			return newGame;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}

	async joinGame(joinGameDto: JoinGameDto): Promise<IGame> {
		try {
			const { gameId, player_two } = joinGameDto;
			const game = await this.gameModel.findOneAndUpdate(
				{ _id: gameId },
				{ player_two, status: GAME_STATUS.STARTED },
				{ new: true },
			);
			if (!game) {
				throw new HttpException("game dosn't exist", HttpStatus.BAD_REQUEST);
			}

			return game;
		} catch (error) {
			throw new HttpException(`${error}`, error.status);
		}
	}
}
