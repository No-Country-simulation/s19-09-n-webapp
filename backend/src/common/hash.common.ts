import * as bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (plainPassword: string) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};

export const comparePassword = (plainPassword: string, hash: string) => {
  return bcrypt.compareSync(plainPassword, hash);
};
