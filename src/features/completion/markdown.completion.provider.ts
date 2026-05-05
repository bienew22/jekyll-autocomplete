import * as vscode from 'vscode';


type MarkdownCommand = {
    sort: string,
    label: string,
    desc: string,
    insert: string
}

const COMMANDS: MarkdownCommand[] = [
  { sort: "000", label: "h1", desc: "제목1", insert: "# " },
  { sort: "001", label: "h2", desc: "제목2", insert: "## " },
  { sort: "002", label: "h3", desc: "제목3", insert: "### " },
  { sort: "003", label: "h4", desc: "제목4", insert: "#### " },

  { sort: "010", label: "desc-list", desc: "설명 리스트", insert: "$1\n: $2" },
  { sort: "011", label: "todo-list", desc: "할일 리스트", insert: "- [$1] $2" },

  { sort: "020", label: "prompt-tip", desc: "안내 프롬프트", insert: "> $1\n{: .prompt-tip }" },
  { sort: "021", label: "prompt-info", desc: "설명 프롬프트", insert: "> $1\n{: .prompt-info }" },
  { sort: "022", label: "prompt-warning", desc: "주의 프롬프트", insert: "> $1\n{: .prompt-warning }" },
  { sort: "023", label: "prompt-danger", desc: "위험 프롬프트", insert: "> $1\n{: .prompt-danger }" },

  { sort: "030", label: "code", desc: "코드 블럭", insert: "```$1\n$2\n```" },
  { sort: "031", label: "code-noline", desc: "줄 번호 없는 코드 블럭", insert: "```$1\n$2\n```\n{: .nolineno }" },
  { sort: "032", label: "code-filename", desc: "파일명 채운 코드 블럭", insert: "```$1\n$3\n```\n{: .file='$2' }" },
  { sort: "033", label: "code-noline-filename", desc: "줄 번호 없는 파일명 채운 코드 블럭", insert: "```$1\n$3\n```\n{: .file='$2' .nolineno }" },
  
  { sort: "040", label: "img", desc: "이미지", insert: "![${1:alt}](${2:url})" },
  { sort: "041", label: "img-with-caption", desc: "이미지에 캡션 존재", insert: "![${1:alt}](${2:url})\n_$3_" },
  { sort: "042", label: "img-with-option", desc: "이미지에 옵션 추가", insert: "![${1:alt}](${2:url}){: w=\"$3\" }" },

  { sort: "050", label: "footnote", desc: "각주", insert: "[^${1:각주 이름}]\n[^${2:각 이름}]: ${3:각주 설명}" },

  { sort: "060", label: "link", desc: "하이퍼 링크", insert: "<${1:링크 주소}>" },
  { sort: "061", label: "link-with-desc", desc: "하이퍼 링크 표시할 이름 추가", insert: "[${1:링크 이름}](${2:링크 주소})" },

  { sort: "070", label: "table-order-center", desc: "가운데 정렬 표", insert: "| ${1:제목} |\n| :---: |\n | ${2:내용} |" },
  { sort: "071", label: "table-order-left", desc: "왼쪽 정렬 표", insert: "| ${1:제목} |\n| :--- |\n | ${2:내용} |" },
  { sort: "072", label: "table-order-right", desc: "오른쪽 정렬 표", insert: "| ${1:제목} |\n| ---: |\n | ${2:내용} |" },

  { sort: "100", label: "hello", desc: "test", insert: "![${1:alt}](${2:url})" },
];

export class MarkdownCompletionProvider implements vscode.CompletionItemProvider {
    provideCompletionItems(
        document: vscode.TextDocument, position: vscode.Position, 
        token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.ProviderResult<vscode.CompletionItem[] | vscode.CompletionList<vscode.CompletionItem>> {
        
        const start = position.translate(0, -1);

        return COMMANDS
            .map(cmd => this.createItem(cmd, start, position));
    }

    private createItem(cmd: MarkdownCommand, start: vscode.Position, end: vscode.Position): vscode.CompletionItem {
        const item = new vscode.CompletionItem(
            cmd.label,
            vscode.CompletionItemKind.Snippet
        );

        // 명령어 검색 설정 - 라벨과 설명 허용
        item.filterText = `/${cmd.label} /${cmd.desc}`;
        
        // 명령어 정렬 기준 설정
        item.sortText = cmd.sort;

        // 명령어 설명 설정
        item.detail = cmd.desc;

        // 명령어 선택 시 교체되는 문구 설정
        item.range = new vscode.Range(start, end);
        item.insertText = new vscode.SnippetString(cmd.insert);

        return item;
    }

}