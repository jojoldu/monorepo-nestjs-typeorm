# TypeScript 환경에서 class-transformer 적극적으로 사용하기

요즘 같이 분산 환경이 적극적으로 도입 되고 있는 시기에는 꼭 프론트엔드가 아니더라도 백엔드 환경에서도 외부의 HTTP API를 호출하는 일은 당연한 일입니다.  

그래서 HTTP API (저는 Rest API라는 단어는 선호하진 않습니다. 어차피 규약 지키고 있는 경우가 거의 없거든요) 를 통해 원격 서버에서 JSON 객체를 읽어오는 작업을 자주 하게 되는데요.  

응답으로 넘어온 JSON 객체는 리터럴 객체이지 **클래스의 인스턴스가 아닙니다**.  
[Axios](https://github.com/axios/axios)를 비롯해서 [Got](https://github.com/sindresorhus/got) 등 NodeJS & TypeScript 환경에서 자주 사용하는 HTTP API 중 어느 것도 클래스의 인스턴스를 응답으로 넘겨주진 않습니다.  

Spring이나 닷넷등의 다른 백엔드 프레임워크를 사용해본 분들이라면 여기서 이상한 괴리감을 느낄 수 있는데요.  
**왜 HTTP API 라이브러리에서 인스턴스 변환까지 해주지 않는 것이지?** 라는 의문이 들 수 있습니다.  

자 그럼 왜 리터럴 객체가 좋지 못한지, 기본적으로 클래스의 인스턴스로 변환해서 주는 것이 좋은지에 대해서 이야기하고, 이를 TS/JS에서 하려면 어떻게 해야할지 알아보겠습니다.

## 1. 문제

외부 API를 통해 다음과 같은 결과를 받았다고 가정해보겠습니다.

> 아래 예제는 [class-transformer](https://github.com/typestack/class-transformer#what-is-class-transformer) 에서 발췌했습니다.

```JavaScript
[
  {
    "id": 1,
    "firstName": "Johny",
    "lastName": "Cage",
    "age": 27
  },
  {
    "id": 2,
    "firstName": "Ismoil",
    "lastName": "Somoni",
    "age": 50
  },
  {
    "id": 3,
    "firstName": "Luke",
    "lastName": "Dacascos",
    "age": 12
  }
]
```

이 값을 그대로 사용한다면 좋겠지만, 현실의 세계에서는 그런 경우가 잘 없습니다.  
보통은 이 받은 값을 가공하거나 추가하는 등의 **비지니스 로직이 수반됩니다**.  

위 JSON처럼 값만 있는 리터럴 객체라면 **추가 가공은 별도의 함수에서** 처리 해야합니다.  
이로 인해 **상태와 행위가 따로 노는 응집력이 떨어지는 코드**가 됩니다.

```javascript
const users = api.getUsers();
return users.map(u => toFullName(u)); // 값 user와 toFullName 함수가 별도로 존재한다

export function toFullName (user) {
  return `${user.firstName} ${user.lastName}`;
}
```

만약 여기서 `isAdult` 와 같이 추가 가공 로직이 하나 더 있다면, 응집력은 더더욱 떨어지게 된다.  

반면에, **받은 값 가공 로직을 클래스 내부에 둔다면 상태와 행위가 한 곳에 있는 응집력 있는 코드**가 됩니다.

```javascript
export class User {
  id: number
  firstName: string
  lastName: string
  age: number

  getFullName() {
    return this.firstName + ' ' + this.lastName
  }

  isAdult() {
    return this.age > 36 && this.age < 60
  }
}
```

위와 같이 작성된 코드에서는 아래와 같이 **User 클래스에 모든 책임을 위임할 수 있습니다**

```javascipt
const users: User[] = api.getUsers();
return users.map(u => u.getFullName());
```

꼭 외부 API로 받은 값에서만 발생하지 않고, **프론트엔드에서 넘겨준 Request Body** 에서도 값과 행위가 함께 응집력 있는 코드가 필요한 경우가 대부분입니다.  

흔히 말하는 OOP, 도메인 기반의 Entity 설계등을 고려했을때 **어떤 객체에 어떤 책임을 줄 것인가**는 대단히 중요합니다.  

## 2. 해결

위와 같이 외부와 연동하는 상황에서 요청/응답값을 리터럴 객체로만 다루는 것은 한계가 있습니다.  

그래서 리터럴 객체 <-> 클래스 인스턴스 변환은 꼭 필요한 작업 중 하나인데, 이 문제를 [class-transformer](https://github.com/typestack/class-transformer) 가 쉽게 해결할 수 있습니다.

> 이 때문에 NestJS에서는 `class-transformer` 를 글로벌 설정으로 Controller에서 받는 Request Dto로 변환할 수 있도록 지원하고 있습니다.


이를테면 [HackerNews 의 정보](https://github.com/HackerNews/API)를 가져오는 API를 만든다고 가정해봅시다.  
API 주소로 `https://hacker-news.firebaseio.com/v0/item/2921983.json` 를 호출해보면 다음과 같은 결과가 내려오는데요.

```javascript
{
  "by": "norvig",
  "id": 2921983,
  "kids": [
    2922097,
    2922429,
    2924562,
    2922709,
    2922573,
    2922140,
    2922141
  ],
  "parent": 2921506,
  "text": "Aw shucks, guys ... you make me blush with your compliments.<p>Tell you what, Ill make a deal: I'll keep writing if you keep reading. K?",
  "time": 1314211127,
  "type": "comment"
}
```

여기서 2개의 기능이 비지니스 로직상 필요하다고 생각해봅니다.

* `time` 의 ms 타임을 `LocalDateTime` 으로 변환된 값이 필요하다
* `parent` 가 없는 경우엔 최상위 Item 임을 알 수 있어야 한다

그럼 단일 클래스로는 다음과 같이 표현이 가능합니다.

```javascript
export class HackerNewsItem {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  parent: number;
  score: number;
  time: number;
  title: string;
  type: string;
  url: string;

  constructor() {}

  get createTime(): LocalDateTime {
    const milliTime = this.time * 1000;
    return LocalDateTime.ofInstant(Instant.ofEpochMilli(milliTime));
  }

  get isFirstItem(): boolean {
    return !this.parent;
  }
}
```

이를 Http API (ex: axios 등)과 함께 쓴다면 다음과 같이 가능합니다.

```javascript
const result = api.get();
const hackerNewsItem = plainToClass(HackerNewsItem, result.data);
```

이렇게 `plainToClass` 와 함께 사용한다면 더이상 리터럴 객체를 다룰 필요 없이 **값과 행위가 한곳에 모여있는 클래스 인스턴스 단위로 다룰 수 있게 됩니다**.  

### 2-1. 제네릭을 활용한 HTTP API 함수

만약 매번 `plainToClass` 를 호출하는게 귀찮다면 다음과 같이 별도의 함수를 만들어서 사용할 수도 있습니다.

```javascript
export const instance: AxiosInstance = axios.create({
  responseType: 'json',
  validateStatus(status) {
    return [200].includes(status);
  },
});

export async function request<T>(
  config: AxiosRequestConfig,
  classType: any,
): Promise<T> {
  const response = await instance.request<T>(config);
  return plainToClass<T, AxiosResponse['data']>(classType, response.data);
}
```

이렇게 `request<T>` 제네릭 함수를 이용한다면 다음과 같이 편하게 HTTP API를 호출할 수 있습니다.

```javascript
it('HackerNews를 통해서 가져온다', async () => {
  const data: HackerNewsItem = await request<HackerNewsItem>(
    {
      url: 'https://hacker-news.firebaseio.com/v0/item/2921983.json',
      method: 'get',
    },
    HackerNewsItem,
  );

  expect(data.type).toBe('comment');
  expect(data.createTime.toString()).toBe(
    LocalDateTime.of(2011, 8, 25, 3, 38, 47).toString(),
  );
  expect(data.isFirstItem).toBe(false);
});
```

### 2-2. 카멜케이스 <-> 스네이크

class-transformer는 일반적으로 `@Expose()` 데코레이터를 기반으로 변환 기준을 잡는데요.  
그래서 모든 클래스의 속성에 `@Expose()`를 선언해야하는게 아닐까 싶지만, 기본적으로 **클래스 속성으로 선언되어있으면 변환 대상으로 자동 인지** 됩니다.  
그래서 위 예제에서는 별도로 데코레이터 지정 없이도 가능했습니다.  

그렇다면 `@Expose()` 가 필요한 시점이 언제냐 하면, **서로 이름/컨벤션이 다른 경우**에 유용하게 쓸 수 있습니다.  

대표적으로 카카오와 같은 오픈 API들이 있는데, 이런 오픈 API들이 대부분 **스네이크 케이스로 결과를 내려줍니다**.  

```javascript
{
    email: 'test@test.com',
    phone_number: '+82 10-1234-1234',
};
```

이걸 받아서 써야하는데, 특별한 조작이 없다면 **클래스에서도 스네이크 케이스를 해야만 합니다**.  

거의 대부분의 프로젝트에서 카멜케이스를 기본 컨벤션으로 가지고 있기 때문에 **어떻게 하면 코드에서는 카멜케이스를 하면서 스네이크 케이스의 응답값을 받을 수 있을까**가 문제인데요.  
이때 class-transformer 를 사용하면 편하게 변환이 가능합니다.

```javascript
export class KakaoAccountDto {
  @Expose({ name: 'email' })
  public _email: string;

  @Expose({ name: 'phone_number' })
  public phoneNumber: string;

}
```

위 코드처럼 `@Expose({ name: })` 을 지정하게 되면 **name에 일치하는 값으로 매핑**이 되어 프로젝트의 컨벤션을 훼손하지 않는 선에서 외부의 컨벤션을 대응할 수 있게 됩니다.

### 2-3. 특정 필드 제외

특정 상황에서는 클래스의 일부 필드는 비지니스 로직에서는 사용하되, Http 응답에서는 제외하는 등의 로직이 필요할 때가 있습니다.  

대표적으로 **getter 패턴 Dto**를 들 수 있는데요.  
**private 으로 내부 필드는 보호**하고, getter만 열어두어 **무분별하게 값 변조를 막는 방식**의 경우입니다.  

그럴 경우 `@Exclude()` 를 통해 **private 필드는 변환대상에서 제외** 하면 getter만 변환대상에 포함 되니 의도한대로 응답결과를 내려줄 수 있습니다.

```javascript
export class ResponseEntity<T> {

  // private 필드들은 모두 @Exclude()로 제외
  @Exclude() private readonly _statusCode: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  public constructor(status: ResponseStatus, message: string, data: T) {
    this._statusCode = ResponseStatus[status];
    this._message = message;
    this._data = data;
  }

  // getter 는 모두 @Expose()로 공개
  @Expose()
  get statusCode(): string {
    return this._statusCode;
  }

  @Expose()
  get message(): string {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }
}
```

### 2-4. 중첩 객체 변환

클래스 안의 클래스 (중첩 객체)가 있는 인스턴스를 변환하려는 경우 중첩 객체의 타입을 알아야 합니다.  
TypeScript는 아직 좋은 리플렉션 기능이 없기 때문에 **각 속성에 설정된 객체 타입을 명시적으로 지정**해야 합니다.  
이를 테면 다음과 같이 `Album` 클래스 내부에 `Photo` 클래스 타입의 변수가 있을 경우 `@Type()` 데코레이터를 사용해서 변환이 가능합니다.  


```javascript
export class Photo {
  id: number
  filename: string
}
```

```javascript
import { Type, plainToClass } from 'class-transformer'

export class Album {
  id: number

  name: string

  @Type(() => Photo)
  photos: Photo[]
}
```

위 처럼 `@Type()` 을 이용하면 **무슨 클래스 타입인지 명시**를 할 수 있기 때문에 `class-transformer` 가 변환을 할 수 있게 됩니다.  

이럴 경우 다음과 같이 `plainToClass` 로 편하게 리터럴 객체에서 클래스 인스턴스로 변환이 가능합니다.

```javascript
const album = plainToClass(Album, albumJson)
```

## 마무리

ES6와 Typescript 시대에서 그 어느때보다 클래스 기반의 객체지향 프로그래밍을 많이 시도하고 있습니다.  
이때마다 리터럴 객체 변환의 고통을 피하기 위해 상태와 행위가 분리된 프로그래밍을 사용해서는 안된다고 생각합니다.  
좀 더 응집력 있는 코드, 객체에 권한과 책임을 위임할 수 있는 프로그래밍을 하기 위해서 `class-transformer` 로 고통을 줄일 수 있습니다.
