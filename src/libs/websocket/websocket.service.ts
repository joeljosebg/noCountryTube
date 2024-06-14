import { Injectable } from '@nestjs/common';

@Injectable()
export class WebsocketService {
  async processMessage(message: string): Promise<string> {
    // Aquí puedes procesar el mensaje recibido y devolver una respuesta
    return `Processed message: ${message}`;
  }
}
