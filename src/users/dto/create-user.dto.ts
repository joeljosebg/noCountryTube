export class CreateUserDto {
    email: string;
    username: string;
    firstName: string; 
    lastName: string;
    password: string;
    birthday?: Date;  
    phone?: string;   
    isActive?: boolean; 
    photo?: string;   
    role?: 'admin' | 'user';
  }
  