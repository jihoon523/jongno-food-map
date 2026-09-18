import { CATEGORIES, CATEGORY_COLOR } from '../lib/restaurants'
import './Filter.css'

/**
 * 카테고리 칩 필터. 여러 개를 켤 수 있고, 아무것도 안 켜면 전체 표시.
 * active: Set<categoryId>
 */
export default function Filter({ active, onChange }) {
  const toggle = (id) => {
    const next = new Set(active)
    next.has(id) ? next.delete(id) : next.add(id)
    onChange(next)
  }

  return (
    <div className="filter" role="group" aria-label="카테고리 필터">
      <button
        type="button"
        className={`filter__chip ${active.size === 0 ? 'is-active' : ''}`}
        onClick={() => onChange(new Set())}
      >
        전체
      </button>
      {CATEGORIES.map((c) => (
        <button
          key={c.id}
          type="button"
          className={`filter__chip ${active.has(c.id) ? 'is-active' : ''}`}
          style={{ '--chip': CATEGORY_COLOR[c.id] }}
          onClick={() => toggle(c.id)}
          aria-pressed={active.has(c.id)}
        >
          <span className="filter__dot" />
          {c.label}
        </button>
      ))}
    </div>
  )
}
