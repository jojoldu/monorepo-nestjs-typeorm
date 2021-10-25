# TypeScript에서 class-transformer 적극적으로 사용하기

## 문제

대부분의 경우 원격 REST 서버에서 JSON 개체를 읽습니다. 이 JSON 객체에는 TypeScript 클래스의 모든 속성이 있습니다. 항상 머리에 맴도는 질문이 있습니다 . 수신된 JSON 객체를 해당 클래스의 인스턴스로 어떻게 캐스팅/파싱합니까? .

시간이 지남에 따라 이 클래스 변환기 라이브러리가 매우 유용 하다는 것을 알았습니다 . 이것을 프로젝트에 설치하고 지금부터 사용하여 차이점을 확인할 수 있습니다. 그들은 중첩 속성도 지원하므로 그것에 대해 걱정할 필요가 없습니다.

항상 JSON 객체에서 클래스로 캐스트해야 하는 것은 아니지만 때로는 정말 유용하다는 점을 언급할 가치가 있습니다. 위의 예 getFullName에 따라 클래스의 인스턴스에 메서드가 없으면 일반 User개체를 인수로 사용하고 예상 결과를 반환 하는 새 util 메서드를 만들 수 있습니다. 내 프로젝트에서 여러 가지 구체적인 클래스를 처리하기 위해 방문자 패턴 을 여러 번 사용 했으며 작동하려면 각 클래스의 인스턴스가 필요합니다. 일반 개체에는 작동하지 않습니다. 결정은 당신의 것입니다. 모든 속성과 메서드를 단일 클래스에 넣는 것은 객체 지향 프로그래밍(OOP)의 캡슐화이며 기능 프로그래밍은 모든 것을 함수로 취급합니다.


JavaScript에는 두 가지 유형의 객체가 있습니다.

일반(리터럴) 객체
클래스(생성자) 객체
일반 객체는 Object클래스의 인스턴스인 객체입니다 . 때로는 표기법을 통해 생성될 때 리터럴 객체 라고 합니다 {}. 예를 들어 var obj = {} Class 객체는 정의된 생성자, 속성 및 메서드가 있는 클래스의 인스턴스입니다. 일반적으로 class표기법을 통해 정의합니다 .

문제가 무엇입니까?

때로는 일반 자바스크립트 객체를 가지고 있는 ES6 클래스 로 변환하고 싶을 때가 있습니다 . 예를 들어 백엔드, 일부 API 또는 JSON 파일에서 JSON을 로드하는 경우입니다. 당신 후에 JSON.parse그것은 당신에게 당신이 가지고있는 클래스의 인스턴스가 아닌 일반 JavaScript 객체를 제공합니다.

예를 들어 서버에서 받은 사용자 목록이 있습니다.

```typescript
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

그리고 User클라이언트 측에서 정의된 클래스 가 있습니다 .

```typescript
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

이 코드에서는 users[0].id, users[0].firstName및 도 사용할 수 있습니다 users[0].lastName. 그러나 당신은 사용할 수 없습니다 users[0].getFullName()또는 users[0].isAdult()"사용자"때문에 실제로 일반 자바 스크립트 객체, 사용자 개체의하지 인스턴스의 배열입니다. 당신은 컴파일러에게 그것이 users: User[].

그래서 뭘 할건데? 일반 자바 스크립트 객체 대신 객체 users인스턴스의 배열 을 만드는 방법은 User무엇입니까? 해결책은 User 개체의 새 인스턴스를 만들고 모든 속성을 새 개체에 수동으로 복사하는 것입니다. 그러나 개체 계층이 더 복잡해지면 상황이 매우 빠르게 잘못될 수 있습니다.

대안 ? 예, 클래스 변환기를 사용할 수 있습니다. 이 라이브러리의 목적은 일반 자바스크립트 객체를 가지고 있는 클래스의 인스턴스에 매핑하는 데 도움을 주는 것입니다.

이 라이브러리는 API에 노출되는 모델을 제어하는 ​​훌륭한 도구를 제공하기 때문에 API에 노출된 모델에도 유용합니다. 다음은 다음과 같이 표시됩니다.


중첩된 개체 작업
중첩된 개체가 있는 개체를 변환하려는 경우 변환하려는 개체의 유형을 알아야 합니다. Typescript는 아직 좋은 리플렉션 기능이 없기 때문에 각 속성에 포함된 개체 유형을 암시적으로 지정해야 합니다. 이것은 @Type데코레이터를 사용하여 수행됩니다 .

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
