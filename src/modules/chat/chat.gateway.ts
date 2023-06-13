import {
	ConnectedSocket,
	MessageBody,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import { CHAT_EVENT } from "src/types/chat.types";
import { ChatIdDto } from "./dto/chat-id.dto";

@WebSocketGateway({
	cors: {
		origin: "*",
	},
})
export class ChatGateway {
	@WebSocketServer()
	server: Server;

	@SubscribeMessage(CHAT_EVENT.JOIN)
	handleJoinChat(@MessageBody() payload: ChatIdDto, @ConnectedSocket() client: Socket): void {
		client.join(payload.chatId);
	}

	@SubscribeMessage(CHAT_EVENT.LEAVE)
	handleLeaveChat(@MessageBody() payload: ChatIdDto, @ConnectedSocket() client: Socket): void {
		client.leave(payload.chatId);
	}
}
