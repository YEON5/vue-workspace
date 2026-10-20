// 트리거 기준 배치. 정렬을 생략하면 center
//   'bottom'       → 아래, 가운데 정렬
//   'bottom-start' → 아래, 왼쪽(트리거 왼쪽 끝) 정렬
//   'bottom-end'   → 아래, 오른쪽 정렬
export type Side = 'top' | 'bottom' | 'left' | 'right';
export type Placement = Side | `${Side}-start` | `${Side}-end`;