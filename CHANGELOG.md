# Change Log

All notable changes to the "jekll-autocomplete" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [1.1.0] - 2026-05-16

### Added

- gemini api를 통하여 자동으로 slug 생성 기능
- 최초 실행 시 기본적인 환경변수를 workspace 설정하는 로직 추가
    - 나중에 사용자 정의할 때 직접 키 정보를 찾아 보지 않도록 하기 위함

### Changed

- markdown 자동완성 기능이 frontmatter에서는 동작하지 않도록 수정

## [1.0.0] - 2026-05-12

### Added

- frontmatter의 tags에서 `t`를 입력시 기존 태그 자동 완성 기능 추가
- 수동적으로 태그 정보 업데이트 기능 추가
- 파일 저장, 수정, 삭제 시 태그 정보 자동 반영 기능 추가

### Changed

- `_posts` 폴더 하위에 `yyyy-mm-dd-title.md` 파일 아닌 곳에서 동작하지 않도록 수정

## [0.3.0] - 2026-05-12

### Added

- 사용자 설정을 통하여 자동완성 키워드 추가 기능 추가

## [0.2.0] - 2026-05-05

### Added

- '/' 입력 시, markdown 문법 자동완성 기능 추가.
- Heading, List, Prompt, Code block, Image, Foot note, Link, Table 추가

## [0.1.0] - 2026-05-01

### Added

- `_post` 폴더에 `yyyy-mm-dd-title.md` 형식의 파일 생성 시 자동으로 frontmatter 삽입 기능 추가.
- 파일 이름 수정 시 제목 및 생성일자, 수정 일자 자동 업데이트 기능 추가.