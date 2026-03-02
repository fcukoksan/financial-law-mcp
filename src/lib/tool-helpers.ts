/**
 * MCPツール共通ヘルパー
 */

/** 成功レスポンス */
export function toolResult(text: string) {
  return {
    content: [{ type: 'text' as const, text }],
  };
}

/** エラーレスポンス */
export function toolError(text: string) {
  return {
    content: [{ type: 'text' as const, text }],
    isError: true as const,
  };
}

/** catch節用: エラーをMCPレスポンスに変換 */
export function toolCatchError(error: unknown) {
  return toolError(`エラー: ${error instanceof Error ? error.message : String(error)}`);
}
