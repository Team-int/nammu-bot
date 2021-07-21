# Setup

도커를 활용한 나무 봇 데이터베이스 셋업

> 프로덕션 모드에서는 당연히 벼번 변경을 요함

## Docker 컨테이너 접속
```bash
docker exec -it postgres bash
psql -U postgres # 패스워드 물어볼 시에는 `postgres`입력
```
 
## 데이터베이스 기초 세팅
```sql
CREATE USER nammu WITH PASSWORD 'nammu';
CREATE DATABASE nammu OWNER nammu ENCODING 'utf-8;'
```

## 플러그인 설치 (uuid-ossp)

- `uuid-ossp` : uuid_generator 사용을 위함 (typeorm에서는 v4를 기본으로 사용)

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
SELECT uuid_generate_v4();
```
