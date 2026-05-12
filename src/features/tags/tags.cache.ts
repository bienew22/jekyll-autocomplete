class TagCache {
    private tagCnt = new Map<string, number>();

    add(tag: string) {
        const t = tag.trim().toLocaleLowerCase();

        if (!t) {
            return;
        }

        this.tagCnt.set(t, (this.tagCnt.get(t) || 0) + 1);
    }

    getAll(): string[][] {
        return [...this.tagCnt.entries()]
        .map(([tag]) => [tag, String(this.tagCnt.get(tag))]);
    }

    search(keyword: string): string[] {
        return [...this.tagCnt.entries()]
            .filter(([tag]) => tag.includes(keyword))
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag);
    }

    serialize() {
        return {
            tagCnt: [...this.tagCnt.entries()]
        };
    }

    deserialize(data: any) {
        this.tagCnt = new Map(data.tagCnt);
    }
}

export const tagCache = new TagCache();