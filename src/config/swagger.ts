import { DocumentBuilder } from "@nestjs/swagger";

export const configSwagger = new DocumentBuilder()
.setTitle('NoCountryTube Service')
.setDescription('NoCountryTube Service')
.setVersion('1.0')
.build();