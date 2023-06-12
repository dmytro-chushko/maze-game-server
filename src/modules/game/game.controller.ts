import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ROUTE_KEYS } from "src/utils/consts";
import { GameService } from "./game.service";
import { CreateGameDto, JoinGameDto } from "./dto";
import { IGame } from "src/types/game.types";

@Controller(ROUTE_KEYS.GAME)
export class GameController {
	constructor(private readonly gameService: GameService) {}

	@Get()
	getAllPendingGames(): Promise<IGame[]> {
		return this.gameService.getAllPendingGames();
	}

	@Post()
	createGame(@Body() createGameDto: CreateGameDto): Promise<IGame> {
		return this.gameService.createGame(createGameDto);
	}

	@Patch(ROUTE_KEYS.ID)
	joinGame(@Param("id") id: string, @Body() joinGameDto: JoinGameDto): Promise<IGame> {
		return this.gameService.joinGame(id, joinGameDto.player_two);
	}

	@Delete(ROUTE_KEYS.ID)
	abortGame(@Param("id") id: string): Promise<{ message: string }> {
		return this.gameService.abortGame(id);
	}
}
