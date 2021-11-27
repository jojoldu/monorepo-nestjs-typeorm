export class EmailRequestDto {
  private readonly _from: string;
  private readonly _to: string;
  private readonly _subject: string;
  private readonly _content: string;

  constructor(from: string, to: string, subject: string, content: string) {
    this._from = from;
    this._to = to;
    this._subject = subject;
    this._content = content;
  }

  get from(): string {
    return this._from;
  }

  get to(): string {
    return this._to;
  }

  get subject(): string {
    return this._subject;
  }

  get content(): string {
    return this._content;
  }
}
