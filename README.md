# jekyll-autocomplete
vscode-extension
src/
 ├── extension.ts              # 진입점 (얇게 유지)
 │
 ├── core/                    # 공통 로직
 │   ├── context.ts
 │   ├── config.ts
 │   ├── logger.ts
 │
 ├── features/               # 기능 단위 (핵심)
 │   ├── frontmatter/
 │   │    ├── index.ts
 │   │    ├── generator.ts
 │   │    ├── updater.ts
 │   │
 │   ├── completion/
 │   │    ├── frontmatterCompletion.ts
 │   │    ├── liquidCompletion.ts
 │   │    ├── markdownCompletion.ts
 │   │
 │   ├── slug/
 │   │    ├── slugGenerator.ts
 │   │
 │   ├── tag/
 │   │    ├── tagAnalyzer.ts
 │   │    ├── tagCompletion.ts
 │
 ├── services/               # 외부/확장 로직
 │   ├── fileService.ts
 │   ├── workspaceService.ts
 │   ├── cacheService.ts
 │
 ├── parsers/                # 텍스트 파싱
 │   ├── frontmatterParser.ts
 │   ├── markdownParser.ts
 │
 ├── utils/
 │   ├── string.ts
 │   ├── path.ts
 │
 ├── constants/
 │   ├── jekyll.ts

임시 구조

배포 명령어 : vsce package