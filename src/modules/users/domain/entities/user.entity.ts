export class User {
  constructor(
    public readonly id: string,
    public name: string,
    public email: string,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}
