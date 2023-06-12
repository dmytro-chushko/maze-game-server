import { SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";

import { GameService } from "./game.service";

@WebSocketGateway({
	cors: { origin: "*" },
})
export class GameGateway {
	constructor(private readonly gameService: GameService) {}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage("create-game")
	handleCreateGame(): void {
		this.server.emit("update-game-list");
	}

	@SubscribeMessage("abort-game")
	handleAbortGame(): void {
		this.server.emit("update-game-list");
	}
}
