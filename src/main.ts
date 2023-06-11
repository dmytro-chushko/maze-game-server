import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { HttpException, HttpStatus, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
	try {
		const PORT = process.env.PORT || 4200;
		const app = await NestFactory.create(AppModule);

		app.useGlobalPipes(new ValidationPipe());

		return await app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch (error) {
		throw new HttpException("Server error", HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
bootstrap();
