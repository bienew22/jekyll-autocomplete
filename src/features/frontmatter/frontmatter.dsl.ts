export class FrontmatterDSL {
	private lines: string[] = [];

	start() {
		this.lines.push('---');
		return this;
	}

	title(value: string) {
		this.lines.push(`title: "${value}"`);
		return this;
	}

	slug(value: string) {
		this.lines.push(`slug: "${value}"`);
		return this;
	}

	description(value: string) {
		this.lines.push(`description: "${value}"`);
		return this;
	}

	author(value: string) {
		this.lines.push(`author: ${value}`);
		return this;
	}

	date(value: string) {
		this.lines.push(`date: ${value} +09:00`);
		return this;
	}

	last_modified_at(value: string, able: boolean) {
		if (able) {
			this.lines.push(`last_modified_at: ${value} +09:00`);
		} else {
			this.lines.push(`#last_modified_at: ${value} +09:00`);
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

	image_path(value: string) {
		if (!!value) {
			this.lines.push('image:');
			this.lines.push(`   path: ${value}`);
		} else {
			this.lines.push('#image:');
			this.lines.push('#   path:');
		}

		return this;
	}

	build() {
		this.lines.push('---');
		return this.lines.join('\n') + '\n';
	}
}