type FrontmatterOptions = {
	fileName: string,
	yamlData?: any
}

export function frontmatterBuilder({ fileName, yamlData }: FrontmatterOptions): string {
	// 1. 제목 설정.
	const title = fileName
		.replace(/^\d{4}-\d{2}-\d{2}-/, '') // 날쩨 제거
		.replace('.md', '');                // 확장자 제거

	// 2. slug 생성.
	// TODO: gemini api 사용하여 구현 예정.

	// 3. 생성 일시 설정
	// - 파일 수정시 -> 기존 date, time 이용
	// - 파일 생성시 -> normalizeDate에서 현재 시간을 이용
	const createdAt = dateToDateTimeString(normalizeDate(yamlData.date));
	const updatedAt = dateToDateTimeString(normalizeDate(yamlData.last_modified_at));

	return new FrontmatterBuilder()
		.start()
		.title(title)	// 무조건 새로운 생성
		.slug('')		// 무조건 새로 생성
		.description(yamlData.description || "")
		.author(yamlData.author || "bienew22")
		.date(createdAt.date, createdAt.time)	// 재활용 또는 생성.
		.last_modified_at(updatedAt.date, updatedAt.time, !!yamlData) // yamlData 존재하는 경우 활성화, 없는 경우 비활성화
		.tags(yamlData.tags)
		.media_subpath(yamlData.media_subpath)
		.build();
}

/**
 * Date를 yyyy-mm-dd 문자열과 hh-mm-ss 문자열 추출
 * @param d Date
 * @returns 날짜, 시간 반환.
 */
function dateToDateTimeString(d: Date): { date: string, time: string } {
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');

	const hh = String(d.getHours()).padStart(2, '0');
	const mi = String(d.getMinutes()).padStart(2, '0');
	const ss = String(d.getSeconds()).padStart(2, '0');

	return { date: `${yyyy}-${mm}-${dd}`, time: `${hh}:${mi}:${ss}` };
}

/**
 * yaml에 Date가 없으면 현재 시간을 반환.
 * @param input yaml.Date
 * @returns Date
 */
function normalizeDate(input: unknown): Date {
	if (input instanceof Date) {
		return input;
	}
	return new Date();
}


class FrontmatterBuilder {
	private lines: string[] = [];

	start() {
		this.lines.push('---');
		return this;
	}

	title(value: string) {
		this.lines.push(`title: ${value}`);
		return this;
	}

	slug(value: string) {
		this.lines.push(`slug: ${value}`);
		return this;
	}

	description(value: string) {
		this.lines.push(`description: ${value}`);
		return this;
	}

	date(date: string, time: string) {
		this.lines.push(`date: ${date} ${time} +09:00`);
		return this;
	}

	last_modified_at(date: string, time: string, able: boolean) {
		if (able) {
			this.lines.push(`last_modified_at: ${date} ${time} +09:00`);
		} else {
			this.lines.push(`#last_modified_at: ${date} ${time} +09:00`);
		}
		return this;
	}

	tags(value: any) {
		if (!!value) {
			const tagsString = (value ?? []).join(', ');
			this.lines.push(`tags: [${tagsString}]`);
		} else {
			this.lines.push(`tags: []`);
		}

		return this;
	}

	media_subpath(value: string) {
		if (!!value) {
			this.lines.push(`media_subpath: ${value}`);
		} else {
			this.lines.push(`media_subpath: /assets/img/`);
		}

		return this;
	}

	author(value: string) {
		this.lines.push(`author: ${value}`);
		return this;
	}

	image_path(value: string) {
		if (!!value) {
			this.lines.push('image:');
			this.lines.push(`   path: ${value}`);
		} else {
			this.lines.push('#image:');
			this.lines.push('#   path:');
		}
	}

	build() {
		this.lines.push('---');
		return this.lines.join('\n') + '\n';
	}
}