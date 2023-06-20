import { Module } from "@nestjs/common";

import { ChatGateway } from "./chat.gateway";
import { GameModule } from "../game/game.module";

@Module({
	imports: [GameModule],
	providers: [ChatGateway],
})
export class ChatModule {}
