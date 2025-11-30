import * as bcrypt from 'bcrypt';

 class PasswordHasher {
  private saltOrRounds = 10;
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async verify(hash: string, plainPassword: string) {
    return await bcrypt.compare(plainPassword, hash);
  }
}

let passwordHasher: PasswordHasher = new PasswordHasher();

 export {passwordHasher} ;