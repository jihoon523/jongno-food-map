import { useMemo, useState } from 'react'
import { CATEGORIES, CATEGORY_COLOR } from '../lib/restaurants'
import './Card.css'

const categoryLabel = (id) => CATEGORIES.find((c) => c.id === id)?.label ?? id

/**
 * 하단(모바일) / 우측(PC) 패널.
 * selected 가 single 이면 식당 카드, building 이면 그 건물의 식당 목록을 보여준다.
 */
export default function Card({ selected, onSelectRestaurant, onBack, onClose }) {
  if (!selected) return null

  return (
    <aside className="card" role="dialog">
      <div className="card__handle" />
      {selected.kind === 'building' ? (
        <BuildingList group={selected} onSelect={onSelectRestaurant} onClose={onClose} />
      ) : (
        <RestaurantCard
          restaurant={selected.restaurant}
          onBack={selected.from ? onBack : null}
          onClose={onClose}
        />
      )}
    </aside>
  )
}

function Header({ title, subtitle, onBack, onClose }) {
  return (
    <header className="card__header">
      {onBack && (
        <button type="button" className="card__icon" onClick={onBack} aria-label="뒤로">
          ‹
        </button>
      )}
      <div className="card__titles">
        <h2 className="card__title">{title}</h2>
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
      </div>
      <button type="button" className="card__icon" onClick={onClose} aria-label="닫기">
        ×
      </button>
    </header>
  )
}

function RestaurantCard({ restaurant: r, onBack, onClose }) {
  const where = [r.building, r.floor].filter(Boolean).join(' · ')
  return (
    <>
      <Header title={r.name} subtitle={where} onBack={onBack} onClose={onClose} />
      <div className="card__chips">
        <span className="chip chip--category" style={{ '--chip': CATEGORY_COLOR[r.category] }}>
          {categoryLabel(r.category)}
        </span>
        <span className="chip">{r.price}</span>
        <span className="chip">★ {r.rating.toFixed(1)}</span>
      </div>
      <dl className="card__facts">
        <dt>추천 메뉴</dt>
        <dd>{r.menu}</dd>
        <dt>한줄평</dt>
        <dd>{r.review}</dd>
      </dl>
    </>
  )
}

// "B2" → -2, "B1" → -1, "1F" → 1, "2F" → 2 (정렬용)
function floorOrder(floor) {
  const m = /^B(\d+)$/i.exec(floor)
  if (m) return -Number(m[1])
  return parseInt(floor, 10) || 0
}

function BuildingList({ group, onSelect, onClose }) {
  const [floor, setFloor] = useState('all')
  const floors = useMemo(
    () => [...new Set(group.restaurants.map((r) => r.floor))].sort((a, b) => floorOrder(a) - floorOrder(b)),
    [group],
  )
  const items = useMemo(
    () =>
      (floor === 'all' ? group.restaurants : group.restaurants.filter((r) => r.floor === floor))
        .slice()
        .sort((a, b) => floorOrder(a.floor) - floorOrder(b.floor)),
    [group, floor],
  )

  return (
    <>
      <Header
        title={group.name}
        subtitle={`식당 ${group.restaurants.length}곳`}
        onClose={onClose}
      />
      {floors.length > 1 && (
        <div className="floors" role="tablist" aria-label="층 선택">
          <FloorTab id="all" label="전체" active={floor} onClick={setFloor} />
          {floors.map((f) => (
            <FloorTab key={f} id={f} label={f} active={floor} onClick={setFloor} />
          ))}
        </div>
      )}
      <ul className="list">
        {items.map((r) => (
          <li key={r.id}>
            <button type="button" className="list__item" onClick={() => onSelect(r)}>
              <span className="list__floor">{r.floor}</span>
              <span className="list__name">{r.name}</span>
              <span className="list__meta">
                {categoryLabel(r.category)} · {r.price}
              </span>
              <span className="list__dot" style={{ background: CATEGORY_COLOR[r.category] }} />
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

function FloorTab({ id, label, active, onClick }) {
  const isActive = active === id
  return (
    <button
      type="button"
      role="tab"
      aria-selected={isActive}
      className={`floors__tab ${isActive ? 'is-active' : ''}`}
      onClick={() => onClick(id)}
    >
      {label}
    </button>
  )
}
