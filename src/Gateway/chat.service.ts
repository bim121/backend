import { Injectable } from '@nestjs/common';
import { AuthService} from '../Auth/auth.service';
import { Socket } from 'socket.io';
import { parse } from 'cookie';
import { WsException } from '@nestjs/websockets';
import { InjectRepository } from '@nestjs/typeorm';
import MessageEntity from 'src/entity/message.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/entity/user.entity';
 
@Injectable()
export class ChatService {
  constructor(
    private readonly authService: AuthService,
    @InjectRepository(MessageEntity)
    private messagesRepository: Repository<MessageEntity>,
  ) {
  }
 
  async saveMessage(content: string, author: UserEntity) {
    const newMessage = await this.messagesRepository.create({
      content,
      author
    });
    await this.messagesRepository.save(newMessage);
    return newMessage;
  }
 
  async getAllMessages() {
    return this.messagesRepository.find({
      relations: ['author']
    });
  }

  async getUserFromSocket(socket: Socket) {
    const cookie = socket.handshake.headers.cookie;
    const { Authentication: authenticationToken } = parse(cookie);
    const user = await this.authService.getUserFromAuthenticationToken(authenticationToken);
    if (!user) {
      throw new WsException('Invalid credentials.');
    }
    return user;
  }
}