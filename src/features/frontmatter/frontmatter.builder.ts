import { FrontmatterDSL } from "./frontmatter.dsl";
import { formatDateTime, extractTitle } from "./frontmatter.utils";

type FrontmatterOptions = {
	fileName: string,
	yamlData?: any
}

export function frontmatterBuilder({ fileName, yamlData }: FrontmatterOptions): string {
	// 1. 제목 설정.
	const title = extractTitle(fileName);

	// 2. slug 생성.
	// TODO: gemini api 사용하여 구현 예정.

	// 3. 생성 일시 설정
	// - 파일 수정시 -> 기존 date, time 이용
	// - 파일 생성시 -> normalizeDate에서 현재 시간을 이용
	const createdAt = formatDateTime(normalizeDate(yamlData?.date));
	const updatedAt = formatDateTime(normalizeDate(yamlData?.last_modified_at));

	return new FrontmatterDSL()
		.start()
		.title(title)	// 무조건 새로운 생성
		.slug('')		// 무조건 새로 생성
		.description(yamlData?.description || "")
		.author(yamlData?.author || "bienew22")
		.date(createdAt)	// 재활용 또는 생성.
		.last_modified_at(updatedAt, !!yamlData) // yamlData 존재하는 경우 활성화, 없는 경우 비활성화
		.tags(yamlData?.tags)
		.media_subpath(yamlData?.media_subpath)
		.image_path(yamlData?.image?.path)
		.build();
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