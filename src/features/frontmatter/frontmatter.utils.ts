/**
 * Date를 `yyyy-mm-dd hh:mi:ss` 문자열로 변경
 * @param d Date 객체
 * @returns 변환된 문자열.
 */
export function formatDateTime(d: Date): string {
	const yyyy = d.getFullYear();
	const mm = String(d.getMonth() + 1).padStart(2, '0');
	const dd = String(d.getDate()).padStart(2, '0');

	const hh = String(d.getHours()).padStart(2, '0');
	const mi = String(d.getMinutes()).padStart(2, '0');
	const ss = String(d.getSeconds()).padStart(2, '0');

	return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
}
