import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrapSeeder() {
    const app = await NestFactory.create(AppModule)
    app.init()
}

bootstrapSeeder();
