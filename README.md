# 📦 jekyll-autocomplete (VSCode Extension)

Jekyll 블로그 작성 생산성을 높이기 위한 vscode 확장입니다. <br />
Markdown 작성 시 자주 사용하는 패턴과 Front Matter를 자동완성으로 제공합니다.

# ✨ 주요 기능

<h3>1. Markdown 자동 완성</h3> 

Notion 스타일의 `/` 명령어를 입력하면 Markdown 문법으로 변환됩니다.

예시:
```text
/h1 -> #
/h2 -> ##
```

<h3>2. Front Matter 자동 추가</h3>

`_posts` 디렉토리에 `yyyy-mm-dd-title.md` 형식의 파일 생성 하면 다음과 같이 front matter가 자동으로 추가됩니다.

```yaml
---
title: "title"
slug: ""
author: bienew22
date: 2026-05-07 16:27:25 +09:00
tags: []
#media_subpath: /assets/img/
#math: true
---
```

또한, 파일 이름이 변경되면 다음 항목이 자동으로 업데이트됩니다.
- title
- last_modified_at


<h3>3. 설정 기반 커스텀마이징</h3>

명령어 및 자동완성 동작을 사용자 설정으로 확장할 수 있습니다.

<h4>설정 방법</h4>

1. `ctrl + shift + p`에서 `Jekyll Autocomplete: Open Settings` 실행

<p align="center">
  <img src="/image/1.png" width="60%">
</p>

2. `WorkSpace -> Edit in settings.json`을 선택합니다.

<p align="center">
  <img src="/image/2.png" width="60%">
</p>


3. 원하는 형태로 설정 수정

<p align="center">
  <img src="/image/3.png" width="60%">
</p>
    
<h4>설정 구조</h4>

```json
"key": {                
    "sort": "string",   
    "desc": "string,    
    "insert": "string"  
}
```

<h4>필드 설명<h4/>

- key
    - `/key` 입력 시 해당 스니펫이 샐행됩니다.
- sort
    - 자동완성 목록에서의 정렬 우선순위 (문자열 숫자, 예: "001")
- desc
    - 자동완성 항목에 표시되는 설명 
    - `/desc` 입력으로도 스니펫이 실행할 수 있습니다.
- insert
    - 실제로 삽입될 스니펫 내용

<h4>사용 예시</h4>

```json
"h1": {
  "sort": "001",
  "desc": "제목 1",
  "insert": "# "
}
```

- **입력**
    - `/h`, `/제 ` 입력
    - `/h1`으로 자동완성
- **결과**
    - `# `


배포 명령어 : vsce package