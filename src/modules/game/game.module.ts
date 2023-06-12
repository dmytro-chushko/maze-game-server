import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { GameController } from "./game.controller";
import { GameService } from "./game.service";
import { Game, GameSchema } from "./shemas/game.shema";
import { GameGateway } from "./game.gateway";

@Module({
	imports: [MongooseModule.forFeature([{ name: Game.name, schema: GameSchema }])],
	controllers: [GameController],
	providers: [GameService, GameGateway],
})
export class GameModule {}
