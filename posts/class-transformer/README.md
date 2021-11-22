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

> 아래 예제는 `class-transformer` 에서 발췌했습니다.

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

여기서 **값만 있는 리터럴 객체**라면 추가 가공은 별도의 함수에서 처리 해야합니다.  
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

흔히 말하는 OOP, 도메인 기반의 Entity 설계, 분산환경 등을 고려했을때 **어떤 객체에 어떤 책임을 줄 것인가**는 대단히 중요합니다.  


## 2. 해결

위와 같은 외부와 연동하는 상황에서 요청/응답값을 리터럴 객체로만 다루는 것은 한계가 분명한데요.  

그래서 리터럴 객체 <-> 클래스 인스턴스 변환은 대단히 빈번하고 중요한 작업 중 하나입니다.  
이런 문제를 [class-transformer](https://github.com/typestack/class-transformer) 가 쉽게 해결할 수 있습니다.

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

여기서 2개의 기능이 비지니스 로직상 필요하다고 한다면

* `time` 의 ms 타임을 `LocalDateTime` 으로 변환된게 필요하다
* `parent` 가 없는 경우엔 최상위 Item 임을 알 수 있어야 한다


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

class-transformer는 일반적으로 `@Expose()` 데코레이터를 기반으로 변환 기준을 잡는데요.  
그래서 모든 클래스의 속성에 `@Expose()`를 선언해야하는게 아닐까 싶지만, 기본적으로 **클래스 속성으로 선언되어있으면 변환 대상으로 자동 인지** 됩니다.  


* `@Expose` 마크 속성을 변형 가능으로 표시합니다.
* `@Type` 은 속성 유형을 설명합니다(내장 패키지 유형 또는 다른 클래스 변환기 클래스일 수 있음).
* `@Transform` 은 커스텀한 사용자 정의값 변환을 할 수 있습니다.
* `plainToClass(Class, data)` 는 데이터를 클래스 인스턴스로 변환합니다.

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

###

### 중첩 객체 변환

중첩된 개체가 있는 개체를 변환하려는 경우 변환하려는 개체의 유형을 알아야 합니다. TypeScript는 아직 좋은 리플렉션 기능이 없기 때문에 각 속성에 포함된 개체 유형을 암시적으로 지정해야 합니다. 이것은 `@Type` 데코레이터를 사용하여 수행됩니다 .

사진이 포함된 앨범이 있다고 가정해 보겠습니다. 그리고 앨범 일반 객체를 클래스 객체로 변환하려고 합니다.

```typescript
import { Type, plainToClass } from 'class-transformer'

export class Album {
  id: number

  name: string

  @Type(() => Photo)
  photos: Photo[]
}

export class Photo {
  id: number
  filename: string
}

let album = plainToClass(Album, albumJson)
```


> 저는 최근엔 axios 보다는 [got](https://github.com/sindresorhus/got) 를 좀 더 사용해보고 있습니다.  
> axios가 브라우저에 최적화 되어있다보니, 백엔드에서 사용하기에는 단점이 하나둘씩 나왔고, 서버만 대상으로 한 (최적화된) HTTP API 라이브러리가 있는게 필요하다는 판단이였습니다.
> 나중에 둘 간의 비교글을 별도로 정리해보겠습니다.
