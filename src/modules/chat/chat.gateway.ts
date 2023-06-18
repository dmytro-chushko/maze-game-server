import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CHAT_EVENT } from "src/types/chat.types";
import { ChatIdDto, CreateMessageDto } from "./dto";
import { GameService } from "src/modules/game/game.service";
import { GAME_EVENT } from "src/types/game.types";
import { MoveDto } from "src/modules/game/dto/move.dto";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class ChatGateway {
	constructor(private readonly gameService: GameService) {}

	@WebSocketServer()
	server: Server;

	@SubscribeMessage(CHAT_EVENT.JOIN)
	handleJoinChat(@MessageBody() payload: ChatIdDto, @ConnectedSocket() client: Socket): void {
		console.log("join");
		client.join(payload.chatId);
	}

	@SubscribeMessage(CHAT_EVENT.LEAVE)
	handleLeaveChat(@MessageBody() payload: ChatIdDto, @ConnectedSocket() client: Socket): void {
		client.leave(payload.chatId);
	}

	@SubscribeMessage(CHAT_EVENT.MESSAGE)
	handleMessage(@MessageBody() payload: CreateMessageDto): void {
		this.server
			.to(payload.chatId)
			.emit(CHAT_EVENT.MESSAGE, { sender: payload.sender, message: payload.message });
	}

	@SubscribeMessage(GAME_EVENT.MOVE)
	async handleMove(@MessageBody() payload: MoveDto): Promise<void> {
		const message = await this.gameService.makeMove(payload);
		this.server.to(payload.id).emit(GAME_EVENT.MOVE, { message });
	}
}
