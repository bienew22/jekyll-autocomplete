export class TagCache {
    private tagMap = new Map<string, number>();

    add(tag: string) {
        const t = tag.trim().toLocaleLowerCase();

        if (!t) {
            return;
        }

        this.tagMap.set(t, (this.tagMap.get(t) || 0) + 1);
    }

    getAll(): string[][] {
        return [...this.tagMap.entries()]
        .map(([tag]) => [tag, String(this.tagMap.get(tag))]);
    }

    search(keyword: string): string[] {
        return [...this.tagMap.entries()]
            .filter(([tag]) => tag.includes(keyword))
            .sort((a, b) => b[1] - a[1])
            .map(([tag]) => tag);
    }
}