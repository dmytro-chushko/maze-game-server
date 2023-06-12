import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { GameModule } from "./modules/game/game.module";

@Module({
	imports: [
		ConfigModule.forRoot(),
		MongooseModule.forRoot(process.env.MONGO_URI || ""),
		GameModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
