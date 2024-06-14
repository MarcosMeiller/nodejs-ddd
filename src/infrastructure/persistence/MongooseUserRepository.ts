import { UserRepository } from '../../domain/repositories/UserRepository';
import { User } from '../../domain/entities/User';
import mongoose, { Document, Schema } from 'mongoose';

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserDocument>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const UserModel = mongoose.model<UserDocument>('User', UserSchema);

export class MongooseUserRepository implements UserRepository {

  async findAll(): Promise<User[]> {
    const userDocs = await UserModel.find().exec();
    return userDocs.map(userDoc => new User(userDoc.id, userDoc.username, userDoc.email, userDoc.password));
  }
  async findById(id: string): Promise<User | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user id');
    }
    const userDoc = await UserModel.findById(id).exec();
    return userDoc ? new User(userDoc.id, userDoc.username, userDoc.email, userDoc.password) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const userDoc = await UserModel.findOne({ email }).exec();
    return userDoc ? new User(userDoc.id, userDoc.username, userDoc.email, userDoc.password) : null;
  }

  async save(user: User): Promise<void> {
    const userDoc = new UserModel({
      username: user.username,
      email: user.email,
      password: user.password
    });
    await userDoc.save();
  }

  async deleteByEmail(email: string): Promise<void> {
    await UserModel.deleteOne({ email }).exec();
  }

  async update(user: User): Promise<void> {
    await UserModel.findOneAndUpdate({ email: user.email }, user).exec();
  }
  async deleteById(id: string): Promise<void> {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error('Invalid user id');
    }
    await UserModel.findByIdAndDelete(id).exec();
  }
}
