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
			.emit("message", { sender: payload.sender, message: payload.message });
	}
}
