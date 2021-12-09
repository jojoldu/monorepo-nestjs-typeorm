# ts-jenum 으로 응집력 있는 TS 코드 작성하기

TypeScript의 Enum은 딱 열거형으로서만 사용할 수 있습니다.    
다른 언어에서 Enum을 Static 객체로 사용해본 경험이 있는 분들이라면 이 지점이 굉장히 답답하다는 것을 느낄 수 있는데요.  

> Java에서 Enum을 객체로 활용하면 어떤 큰 장점을 얻게되는지는 [배민의 기술 블로그](https://techblog.woowahan.com/2527/) 를 참고해보시면 좋습니다.

저와 똑같이 답답함을 느끼신 분이 계시는지, 이미 TypeScript도 Java의 Enum과 같이 Static 객체로 Enum을 다룰 수 있도록 패키지를 만들어주셨습니다.  
  

## 1. 소개 & 설치

ts-jenum 은 Java의 `java.lang.Enum` 과 같은 사용성을 얻기 위해 제공하는 라이브러리입니다.  


```bash
npm i ts-jenum
```


## 2. 사용법

여러 사용법은 [공식 Github](https://github.com/reforms/ts-jenum) 에 나와있습니다.    
여기서는 주요 키워드와 주의해야할 점을 소개드립니다.

```javascript
import { Enum, EnumType } from 'ts-jenum';

@Enum('code') // (1)
export class EJobLevel extends EnumType<EJobLevel>() {
    static readonly IRRELEVANT = new EJobLevel("IRRELEVANT", '경력무관', 0, 99,);
    static readonly BEGINNER = new EJobLevel("BEGINNER", '인턴/신입', 0, 0,);
    static readonly JUNIOR = new EJobLevel("JUNIOR", '주니어', 1, 3);
    static readonly MIDDLE = new EJobLevel("MIDDLE", '미들', 4, 7);
    static readonly SENIOR = new EJobLevel("SENIOR", '시니어', 8, 20);

    private constructor(readonly _code: string, readonly _name: string, readonly _startYear, readonly _endYear,) {
        super();
    }
}
```

(1) `@Enum('필드명')`
* **JEnum의 메인 Key**가 될 필드를 지정합니다.

그래서 저 같은 경우

## 3. 예제


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
  static readonly IRRELEVANT = new EJobLevel(JobLevel.IRRELEVANT, '경력무관', 0, 99,);
  static readonly BEGINNER = new EJobLevel(JobLevel.BEGINNER, '인턴/신입', 0, 0,);
  static readonly JUNIOR = new EJobLevel(JobLevel.JUNIOR, '주니어', 1, 3);
  static readonly MIDDLE = new EJobLevel(JobLevel.MIDDLE, '미들', 4, 7);
  static readonly SENIOR = new EJobLevel(JobLevel.SENIOR, '시니어', 8, 20);

  private constructor(readonly _code: JobLevel, readonly _name: string, readonly _startYear, readonly _endYear,) {
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
