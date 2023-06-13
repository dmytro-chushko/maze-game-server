import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { GameService } from "./game.service";
import { GAME_EVENT } from "src/types/game.types";

@WebSocketGateway({
	cors: { origin: "*" },
})
export class GameGateway {
	constructor(private readonly gameService: GameService) {}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage(GAME_EVENT.CREATE_GAME)
	handleCreateGame(): void {
		this.server.emit(GAME_EVENT.UPDATE_GAME_LIST);
	}

	@SubscribeMessage(GAME_EVENT.ABORT_GAME)
	handleAbortGame(): void {
		this.server.emit(GAME_EVENT.UPDATE_GAME_LIST);
	}

	@SubscribeMessage(GAME_EVENT.JOIN_GAME)
	handleJoinGame(): void {
		this.server.emit(GAME_EVENT.START_GAME);
	}
}
