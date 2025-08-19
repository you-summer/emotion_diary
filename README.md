# 📝 My Diary
<img width="1200" height="630" alt="KakaoTalk_20250818_022645228" src="https://github.com/user-attachments/assets/e81b93c6-da60-4588-b004-f8d2f3e78142" />

React로 만든 개인 감성 일기 웹앱입니다.
사진과 감정을 기록하고, 월별 감정 통계를 확인할 수 있습니다.
로컬 스토리지와 Cloudinary를 활용해 데이터와 이미지를 관리합니다.

🟢 배포 사이트: [mydiary-three.vercel.app](https://mydiary-three.vercel.app)

---

## 💻 미리보기

### 메인 화면
감정 필터링, 일기 리스트 표시
<img width="951" height="1078" alt="image" src="https://github.com/user-attachments/assets/1f348596-e42d-41a5-861c-de3e28b59cfa" />
<img width="923" height="856" alt="image" src="https://github.com/user-attachments/assets/40bed6d7-8631-4b1b-a2c1-4a8732f47ecc" />


### 일기 작성 화면
이미지 업로드, 감정 선택, 미리보기 제공
<img width="1120" height="1305" alt="새-일기-쓰기" src="https://github.com/user-attachments/assets/73715f45-095e-4a16-a3d7-2dc953a04a11" />

### 통계 페이지
월별 감정 시각화 (Chart.js)
<img width="1120" height="868" alt="통계" src="https://github.com/user-attachments/assets/1e389936-b13f-419a-a8b0-55e55d4e8de1" />

### 일기 페이지
<img width="1120" height="963" alt="3번째-일기" src="https://github.com/user-attachments/assets/c99d2389-b187-41a0-97e8-559ec521ee0b" />

### 다크모드
<img width="400" height="431" alt="my-diary" src="https://github.com/user-attachments/assets/267f3fba-3028-48ce-9ab7-c5890f535bc8" />
<img width="460" height="381" alt="3번째-일기 (2)" src="https://github.com/user-attachments/assets/606d126e-5114-4880-9a5e-394f2644ed72" />

### 모바일 반응형
<img width="401" height="819" alt="my-diary (1)" src="https://github.com/user-attachments/assets/5d8d7ad8-1bc3-402e-8b17-5409b3acc24e" />


---

## 📅 개발 기간
2025.08.08 ~ 2025.08.18

---

## 🙋‍♀️ 프로젝트 참가 인원
1인 개인 프로젝트

---

## 🎯 기획 의도
매일 반복되는 일기 작성이 지루할 수 있어, 감정과 시각 요소를 더하여 기록하는 재미를 주고자 했습니다.  
사용자가 하루를 기록할 때마다 자신의 감정을 시각적으로 확인할 수 있습니다.

---

## 🛠️ 사용 기술
- React
- JavaScript (ES6+)  
- CSS / SCSS  
- Context API
- SweetAlert2   
- cloudinary
- Vercel
- Chart.js
- React Router (페이지 전환 및 SPA 구현)

---

## ✨ 주요 기능
- 일기 작성, 수정, 삭제
- sweetalert2로 알림창 구현
- 이미지 첨부 및 미리보기
- 감정 선택 및 시각화  
- 로컬 스토리지 저장  
- 다크 모드 (아이콘: 🌙 / ☀️)  
- 월별 감정 통계 (Chart.js)
- 최신순/오래된순 정렬 
- 감정별 필터링 
- Cloudinary를 이용한 이미지 호스팅


---

## 🙋‍♀️ 트러블슈팅

### ❗Uncaught QuotaExceededError: 이미지 첨부 문제
블로그 주소 : https://blog.naver.com/jojoor201/223975638557
1. **이미지 첨부 방식 문제**  
   - 처음에는 FileReader로 이미지를 base64로 변환 후 localStorage에 저장하려고 했음  
   - 개발 환경(localhost)에서는 잘 작동했지만, 배포 후에는 `QuotaExceededError` 발생  
   - 원인: base64로 변환하면서 용량이 증가 → 브라우저 localStorage 5MB 제한 초과  

2. **해결 방법 찾기**  
   - 외부 이미지 호스팅 필요  
   - Firebase Storage를 고려했지만, 무료 요금제(Spark)에서는 이미지 업로드 지원이 중단되어 사용 불가  
   - 결국 **Cloudinary**를 선택  
     - 브라우저에서 파일 선택 → fetch로 업로드 → URL 반환 → state에 저장 → 미리보기 제공  
     - Unsigned Upload Preset 사용 (서버 없이 프론트 단독 프로젝트에서도 가능)  
     - FormData 객체 활용 → 이미지와 텍스트 데이터를 함께 multipart/form-data 형식으로 전송  

3. **개인적 느낀 점**  
   - base64로 로컬에 저장하던 방식은 구현이 간단했지만 용량 문제로 한계 발생  
      FormData 개념을 깊이 이해하게 됨
     
### ❗배포 후 무한로딩 문제
블로그 주소 : https://blog.naver.com/jojoor201/223974701991
1. **문제 상황**  
   - 개발 모드: 데이터 로딩 정상, 일기 리스트 표시  
   - 배포 후: `"데이터 로딩중입니다..."`만 표시  

2. **원인**
   - `useEffect`에서 localStorage가 비어 있는 경우 **return만 실행**  
   - `isLoading` 상태가 계속 `true` → 화면 멈춤

```javascript
useEffect(() => {
  const storedData = localStorage.getItem("diary");
  if (!storedData) {
    return; // 로딩 상태 종료 없이 바로 return → 무한로딩
  }
  const parsedData = JSON.parse(storedData);
  ...
}, []);
```

3. **해결 방법**
   - return 전에 `setIsLoading(false)` 추가
```javascript
if (!storedData) {
  setIsLoading(false); // 로딩 상태 종료
  return;
}
```

4. **결과**
   - 배포 환경에서도 화면 멈춤 없이 정상 렌더링
   - 개발 모드와 동일하게 웹사이트 작동

---
## 💭 느낀점
- 감정 통계를 어떻게 시각화할까?
  - chart.js를 사용하여 그래프로 표현함
- 다크 모드를 어디서, 어떻게 상태로 관리할까?
  - context와 useState를 활용하여 관리했다 근데 더 효율적인 방법이 있지않을까? 싶음.. 더 고민해봐야할거같다
- 컴포넌트 구조를 이렇게 나누는 게 최적일까?
  - 아직도 어렵다 남들이 만든 코드 뜯어보고 많이 만들어가면서 더 배워야할거같다
- 개선사항에 대한 고민
  - 일기 내용과 감정을 기반으로하는 작곡AI API를 사용해보고싶었는데 비용문제로 그러지 못해서 아쉽다. 일기 내용을 토대로 가사를 만들고 일기 내용을 기반으로 감정에 맞는 음악을 만들어 보고싶었고 실제로 만들어보기도 했으나 비용문제만 해결되면 제대로 해보고싶다.
- 커스텀 훅을 직접 만들어보면서 반복되는 로직을 분리해 재사용성을 높이는 방법과 React의 상태 관리 흐름을 더 명확하게 이해하게 되었다



