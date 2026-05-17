# 📦 jekyll-autocomplete (VSCode Extension)

Jekyll 블로그 작성 생산성을 높이기 위한 vscode 확장입니다. <br />
Markdown 작성 시 자주 사용하는 패턴과 Front Matter를 자동완성으로 제공합니다.

# ✨ Markdown 자동 완성

Notion 스타일의 `/` 명령어를 입력하면 Markdown 문법으로 변환됩니다.

예시:
```text
/h1 -> #
/h2 -> ##
```

# ✨ Frontmatter 자동 추가

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

# ✨ 설정 기반 커스텀마이징

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
    "desc": "string",    
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

# ✨ 태그 자동완성 기능

`frontmatter`에 작성되는 `tags` 필드를 빠르고 일관되게 입력할 수 있도록 태그 자동완성 기능을 제공합니다. 파일 수정, 생성, 삭제 시 자동으로 최신 상태를 유지 시킵니다.

<h4> 동작 방식 </h4>

`_posts`내 `yyyy-mm-dd-title.md` 파일들을 스캔하여 기존에 사용된 태그들을 수집하고, 이를 기반으로 자동완성 후보를 제공합니다.

`tags`의 `[]` 내부에서 `t`를 입력하면 기존 태그 목록이 나옵니다. 이후 입력한 prefix 기준으로 태그 목록을 동적으로 필터링합니다.

예시:

<p align="center">
  <img src="/image/4.png" width="60%">
</p>

<h4>태그 캐시 강제 갱신</h4>
원인 모를 오류로 최신 상태로 유지되지 않는 상황을 방지하기 위하여 수동 갱신 기능을 제공합니다.

1. `ctrl + shit + p` 실행
2. `Jekyll Autocomplete: Rebuild Tag Cache` 선택

-> 전체 파일을 다시 스캔하여 태그 캐시를 갱신합니다.

# ✨ gemini api를 통한 slug 생성

Google의 Gemini API를 활용하여 제목 기반으로 slug를 자동 생성하도록 구현했습니다.

<h4>설정 방법</h4>

1. `ctrl + shift + p`에서 `Jekyll Autocomplete: Open Settings` 실행
2. `WorkSpace -> Edit in settings.json`을 선택합니다.
3. `jekll.autocomplete.gemini.api` 부분에 자신의 gemini api 키 값을 추가합니다.

<h4>동작 과정</h4>

1. `frontmatter`에 `slug: "{여기}"`에 위치에 커서를 둡니다.
2. `s`를 입력하고 `create slug`를 선택합니다.
3. 해당 게시글의 제목을 gemini api에 전달하여 slug 생성을 요청합니다.
4. 응답을 받은 slug를 `frontmatter`에 자동으로 삽입합니다.