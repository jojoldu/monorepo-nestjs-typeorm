# ts-jenum 으로 응집력 있는 TS 코드 작성하기

TypeScript의 Enum은 딱 열거형으로서만 사용할 수 있습니다.  

> Enum을 객체로 활용하면 어떤 큰 장점을 얻게되는지는 [배민의 기술 블로그](https://techblog.woowahan.com/2527/)를 참고해보시면 좋습니다.

```js
export enum JobLevel {
  IRRELEVANT = 'IRRELEVANT',
  BEGINNER = 'BEGINNER',
  JUNIOR = 'JUNIOR',
  MIDDLE = 'MIDDLE',
  SENIOR = 'SENIOR',
}
```

```js
import { Enum, EnumType } from 'ts-jenum';

@Enum('code')
export class EJobLevel extends EnumType<EJobLevel>() {
  static readonly IRRELEVANT = new EJobLevel(
    JobLevel.IRRELEVANT,
    '경력무관',
    0,
    99,
  );
  static readonly BEGINNER = new EJobLevel(
    JobLevel.BEGINNER,
    '인턴/신입',
    0,
    0,
  );
  static readonly JUNIOR = new EJobLevel(JobLevel.JUNIOR, '주니어', 1, 3);
  static readonly MIDDLE = new EJobLevel(JobLevel.MIDDLE, '미들', 4, 7);
  static readonly SENIOR = new EJobLevel(JobLevel.SENIOR, '시니어', 8, 20);

  private constructor(
    readonly _code: JobLevel,
    readonly _name: string,
    readonly _startYear,
    readonly _endYear,
  ) {
    super();
  }

  get code(): JobLevel {
    return this._code;
  }

  get name(): string {
    return this._name;
  }

  get startYear(): number {
    return this._startYear;
  }

  get endYear(): number {
    return this._endYear;
  }

  static findByYear(year: number): EJobLevel {
    return this.values().find(
      (e) => e.betweenYear(year) && e !== this.IRRELEVANT,
    );
  }

  betweenYear(year: number): boolean {
    return this.startYear <= year && this.endYear >= year;
  }

  getPeriod(): string {
    return `${this.startYear} ~ ${this.endYear}`;
  }

  toCodeName(): CodeName {
    return new CodeName(this.code, this.name);
  }
}
```
