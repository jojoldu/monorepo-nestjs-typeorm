# Localstack으로 AWS 테스트 환경 구축하기 (NodeJS)


```yaml
version: "3.8"

services:
  localstack:
    image: localstack/localstack:0.12.20
    ports:
      - "4566:4566"
    environment:
      - SERVICES=ses,s3
    container_name: jojoldu_localstack
    volumes:
      - "./localstack-init:/docker-entrypoint-initaws.d"

```
