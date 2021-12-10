# ts-jenum 으로 응집력 있는 TS 코드 작성하기

TypeScript의 Enum은 딱 열거형으로서만 사용할 수 있습니다.    
다른 언어에서 Enum을 Static 객체로 사용해본 경험이 있는 분들이라면 이 지점이 굉장히 답답하다는 것을 느낄 수 있는데요.  

> Java에서 Enum을 객체로 활용하면 어떤 큰 장점을 얻게되는지는 [배민 기술 블로그](https://techblog.woowahan.com/2527/) 를 참고해보시면 좋습니다.

저와 똑같이 답답함을 느끼신 분이 계시는지, 이미 TypeScript도 Java의 Enum과 같이 Static 객체로 Enum을 다룰 수 있도록 패키지를 만들어주셨습니다.  
이번 시간에는 이 `ts-jenum` 을 이용해 응집력 있는 Enum 활용법을 소개드리겠습니다.  

## 1. 설치

[ts-jenum](https://www.npmjs.com/package/ts-jenum) 은 Java의 `java.lang.Enum` 과 같은 사용성을 얻기 위해 제공하는 라이브러리입니다.  
Java의 Enum과 같은 사용성을 얻기 위해 별도의 데코레이터를 제공하는데요.  
이를 통해 TS/JS가 가진 Enum의 한계점을 **별도의 데코레이터와 클래스**로 해결합니다.  

이를 사용하기 위한 설치 방법은 간단합니다.

```bash
npm i ts-jenum
```

## 2. 사용법

기본적인 사용법은 [공식 Github](https://github.com/reforms/ts-jenum) 에 나와있습니다.    
여기서는 주요 키워드와 주의해야할 점을 소개드립니다.

```javascript
import { Enum, EnumType } from 'ts-jenum';

@Enum('code') // (1)
export class EJobLevel extends EnumType<EJobLevel>() { // (2)
    // (3)
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

> 저는 Enum과 구분하기 위해서 ts-jenum 클래스는 prefix로 `E`를 붙여서 사용합니다.  
> ex) `Enum: JobLevel`, `ts-jenum: EJobLevel`

이후 오해를 막기 위해 `ts-jenum` 으로 만들어진 클래스들은 **EClass**라고 하겠습니다.

(1) `@Enum('필드명')`
* **EClass 메인 Key**가 될 필드를 지정합니다.
    * 여기서는 `code` 필드를 메인 Key로 사용합니다.
* 해당 Key는 **절대 중복이 되어선 안됩니다**
  * EClass의 `static class` 들의 구분자 역할을 하기 때문입니다.

(2) `extends EnumType<EJobLevel>()`

* `ts-jenum` 이 제공하는 EnumType을 꼭 상속 받아야합니다.
* 이때 EnumType는 제네릭 타입으로 **상속받은 EClass를 꼭 사용해야합니다**
  * EClass 에서 제공하는 여러 편의 메소드들 (`find`, `values`, `valueByName` 등등)을 사용할때 타입 명시가 필요하기 때문입니다.

(3) `static readonly IRRELEVANT ~~`

* Enum 타입을 선언하듯이 **EClass의 타입**을 선언합니다.
* 여기서 선언된 `IRRELEVANT`, `BEGINNER`, `JUNIOR`, `MIDDLE`, `SENIOR` 등이 EClass의 타입으로 작동합니다.

## 3. 예제

저 같은 경우 **실제 Enum과 EClass 2개를 모두 생성**하는데요.  
이는 EClass가 **다른 라이브러리에서는 알 수 없는 타입**이기 때문입니다.  
외부와의 연동에서는 TS의 Enum을 사용하고, 외부 연동 이후 로직을 처리할때는 EClass를 사용합니다.  
  
이를테면 다음과 같이 말이죠.

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

}
```

### 3-1. Code 값과 노출값 연결하기

아래처럼 하면 되지 않냐는 이야기도 한다.

```js
export enum JobLevel {
  IRRELEVANT = '경력무관',
  BEGINNER = '인턴/신입',
  JUNIOR = '주니어',
  MIDDLE = '미들',
  SENIOR = '시니어',
}
```

하지만 이렇게 할 경우 **데이터베이스에 등록할때는 영문코드가 아닌 한글명이 저장**된다.  

### 3-2. 연차로 레벨 찾기
