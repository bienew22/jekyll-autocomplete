class TagCache {
    private fileTags = new Map<string, string[]>();
    private tagCnt = new Map<string, number>();


    updateFile(file: string, newTags: string[]) {
        // 기존 파일의 태그 정보.
        const oldTags = this.fileTags.get(file) || [];

        // 기존 파일의 태그 제거.
        for (const tag of oldTags) {
            this.decTagCount(tag);
        }

        // 새로운 파일의 태그 추가.
        for (const tag of newTags) {
            this.incTagCount(tag);
        }

        this.fileTags.set(file, newTags);
    }

    removeFile(file: string) {
        this.fileTags.delete(file);
    }

    decTagCount(tag: string) {
        if (!this.tagCnt.has(tag)) {
            return;
        }
        
        this.tagCnt.set(tag, this.tagCnt.get(tag)!! - 1);

        if (this.tagCnt.get(tag)!! <= 0) {
            this.tagCnt.delete(tag);
        }
    }

    incTagCount(tag: string) {
        this.tagCnt.set(tag, (this.tagCnt.get(tag) || 0) + 1);
    }

    getAll(): string[][] {
        return [...this.tagCnt.entries()]
        .map(([tag]) => [tag, String(this.tagCnt.get(tag))]);
    }

    clear() {
        this.fileTags.clear();
        this.tagCnt.clear();
    }

    serialize() {
        return {
            fileTags: [...this.fileTags.entries()],
            tagCnt: [...this.tagCnt.entries()]
        };
    }

    deserialize(data: any) {
        this.fileTags = new Map(data.fileTags);
        this.tagCnt = new Map(data.tagCnt);
    }
}

export const tagCache = new TagCache();