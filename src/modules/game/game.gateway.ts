import {
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

import { GAME_EVENT } from "src/types/game.types";
import { GiveUpDto } from "./dto/give-up.dto";
import { GameService } from "./game.service";

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

	@SubscribeMessage(GAME_EVENT.GIVE_UP)
	async handleGiveUp(@MessageBody() payload: GiveUpDto): Promise<void> {
		const { id, user } = payload;
		await this.gameService.handleGiveUp(id, user);
		this.server.to(id).emit(GAME_EVENT.GIVE_UP, { user, message: "gave up" });
	}
}
